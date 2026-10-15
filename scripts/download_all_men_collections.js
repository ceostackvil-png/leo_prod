import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';

const TARGET_BASE = 'C:\\Users\\ASUS\\Downloads\\LEO\\leo_prod\\server\\public\\men(1)';
const CONCURRENCY = 20;

const COLLECTIONS = [
  { folder: 'curated looks', handle: 'shop-the-looks', url: 'https://nobero.com/collections/shop-the-looks' },
  { folder: 'full sleeves T-shirts', handle: 'full-sleeve-t-shirts', url: 'https://nobero.com/collections/full-sleeve-t-shirts' },
  { folder: 'Active wear', handle: 'men-activewear', url: 'https://nobero.com/collections/men-activewear' },
  { folder: 'pants', handle: 'mens-cargo-pants', url: 'https://nobero.com/collections/mens-cargo-pants' },
  { folder: 'shorts', handle: 'mens-shorts-collection', url: 'https://nobero.com/collections/mens-shorts-collection' },
  { folder: 'jackets', handle: 'textured-shackets', url: 'https://nobero.com/collections/textured-shackets' },
  { folder: 'Co-ords sets', handle: 'best-selling-co-ord-sets', url: 'https://nobero.com/collections/best-selling-co-ord-sets' },
  { folder: 'premium HD  T - shirts', handle: 'premium-hd-tees', url: 'https://nobero.com/collections/premium-hd-tees' },
  { folder: 'joggers', handle: 'fashion-joggers-men', url: 'https://nobero.com/collections/fashion-joggers-men' },
  { folder: 'hoodies & jackets', handle: 'hoodies-jackets', url: 'https://nobero.com/collections/hoodies-jackets' },
  { folder: 'T-shirts', handle: 't-shirts', url: 'https://nobero.com/collections/t-shirts' },
  { folder: 'POLOS', handle: 'classic-polo', url: 'https://nobero.com/collections/classic-polo' }
];

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function downloadSingleImage(url, destPath, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      if (fs.existsSync(destPath) && fs.statSync(destPath).size > 100) {
        return { status: 'skipped' };
      }

      const res = await fetch(url, { headers });
      if (!res.ok) {
        if (res.status === 404) return { status: 'failed', error: '404 Not Found' };
        throw new Error(`HTTP ${res.status}`);
      }

      const tempPath = `${destPath}.tmp_${Date.now()}`;
      const fileStream = fs.createWriteStream(tempPath);
      await pipeline(Readable.fromWeb(res.body), fileStream);
      
      fs.renameSync(tempPath, destPath);
      return { status: 'downloaded' };
    } catch (e) {
      if (attempt === retries) {
        return { status: 'failed', error: e.message };
      }
      await sleep(500 * attempt);
    }
  }
}

async function processCollection(col) {
  const destDir = path.join(TARGET_BASE, col.folder);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  console.log(`\n======================================================`);
  console.log(`▶ Starting collection: "${col.folder}" (${col.handle})`);
  console.log(`  Destination: ${destDir}`);
  console.log(`======================================================`);

  // 1. Fetch collection metadata for banner
  const imageTasks = [];
  try {
    const colRes = await fetch(`https://nobero.com/collections/${col.handle}.json`, { headers });
    if (colRes.ok) {
      const colData = await colRes.json();
      if (colData.collection?.image?.src) {
        const rawUrl = colData.collection.image.src;
        const baseName = path.basename(rawUrl.split('?')[0]);
        imageTasks.push({
          url: rawUrl,
          destPath: path.join(destDir, `collection_banner_${baseName}`),
          name: `collection_banner_${baseName}`
        });
      }
    }
  } catch (e) {
    console.warn(`Could not get collection metadata for ${col.handle}:`, e.message);
  }

  // 2. Fetch all products
  let page = 1;
  const allProducts = [];
  while (true) {
    try {
      const prodRes = await fetch(`https://nobero.com/collections/${col.handle}/products.json?limit=250&page=${page}`, { headers });
      if (!prodRes.ok) break;
      const data = await prodRes.json();
      if (!data.products || data.products.length === 0) break;
      allProducts.push(...data.products);
      if (data.products.length < 250) break;
      page++;
    } catch (e) {
      console.error(`Error loading page ${page} of ${col.handle}:`, e.message);
      break;
    }
  }

  console.log(`Found ${allProducts.length} products for "${col.folder}". Extracting image links...`);

  // 3. Extract all images from each product
  const seenUrls = new Set();
  const seenFileNames = new Set();

  for (const product of allProducts) {
    const images = product.images || [];
    images.forEach((img, idx) => {
      if (!img.src) return;
      const cleanUrl = img.src.split('?')[0];
      if (seenUrls.has(cleanUrl)) return;
      seenUrls.add(cleanUrl);

      const baseName = path.basename(cleanUrl);
      let fileName = `${product.handle}_${idx + 1}_${baseName}`;
      
      // Ensure file name is not excessively long
      if (fileName.length > 200) {
        fileName = `${product.handle.slice(0, 50)}_${idx + 1}_${baseName}`;
      }

      if (seenFileNames.has(fileName)) {
        fileName = `${idx + 1}_${Date.now()}_${baseName}`;
      }
      seenFileNames.add(fileName);

      imageTasks.push({
        url: img.src,
        destPath: path.join(destDir, fileName),
        name: fileName
      });
    });
  }

  console.log(`Total unique images to download for "${col.folder}": ${imageTasks.length}`);

  // 4. Download images with concurrency pool
  let completed = 0;
  let downloadedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;
  const total = imageTasks.length;

  async function worker(task) {
    const res = await downloadSingleImage(task.url, task.destPath);
    completed++;
    if (res.status === 'downloaded') downloadedCount++;
    else if (res.status === 'skipped') skippedCount++;
    else failedCount++;

    if (completed % 100 === 0 || completed === total) {
      const pct = Math.round((completed / total) * 100);
      process.stdout.write(`\r[${col.folder}] Progress: ${completed}/${total} (${pct}%) | New: ${downloadedCount} | Skipped: ${skippedCount} | Failed: ${failedCount}`);
    }
  }

  // Queue runner
  for (let i = 0; i < imageTasks.length; i += CONCURRENCY) {
    const chunk = imageTasks.slice(i, i + CONCURRENCY);
    await Promise.all(chunk.map(worker));
  }

  console.log(`\n✔ Finished "${col.folder}": ${downloadedCount} new, ${skippedCount} existing, ${failedCount} failed.`);
  return {
    folder: col.folder,
    handle: col.handle,
    products: allProducts.length,
    totalImages: total,
    downloaded: downloadedCount,
    skipped: skippedCount,
    failed: failedCount
  };
}

async function main() {
  const startTime = Date.now();
  console.log('Starting full download of all images for all 12 Men\'s collections...');
  console.log(`Destination Base: ${TARGET_BASE}`);
  console.log(`Concurrency: ${CONCURRENCY}\n`);

  const summary = [];
  for (const col of COLLECTIONS) {
    const res = await processCollection(col);
    summary.push(res);
  }

  const durationMin = ((Date.now() - startTime) / 60000).toFixed(1);
  console.log('\n======================================================');
  console.log(`🎉 ALL 12 COLLECTIONS DOWNLOAD COMPLETE in ${durationMin} minutes!`);
  console.log('======================================================');

  // Verify files on disk
  console.log('\n--- VERIFICATION OF DIRECTORIES ON DISK ---');
  let grandTotalFiles = 0;
  let grandTotalBytes = 0;

  for (const col of COLLECTIONS) {
    const dirPath = path.join(TARGET_BASE, col.folder);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      let sizeBytes = 0;
      files.forEach(f => {
        try {
          sizeBytes += fs.statSync(path.join(dirPath, f)).size;
        } catch (_) {}
      });
      const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(1);
      grandTotalFiles += files.length;
      grandTotalBytes += sizeBytes;
      console.log(`📁 ${col.folder.padEnd(25)} : ${String(files.length).padStart(5)} files | ${sizeMB.padStart(7)} MB`);
    } else {
      console.log(`❌ ${col.folder.padEnd(25)} : DIRECTORY MISSING`);
    }
  }

  console.log('------------------------------------------------------');
  console.log(`TOTAL FILES ON DISK: ${grandTotalFiles}`);
  console.log(`TOTAL DISK SIZE: ${(grandTotalBytes / (1024 * 1024)).toFixed(1)} MB (${(grandTotalBytes / (1024 * 1024 * 1024)).toFixed(2)} GB)`);
  console.log('======================================================');
}

main().catch(console.error);
