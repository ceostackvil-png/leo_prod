import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';

const TARGET_BASE = 'C:\\Users\\ASUS\\Downloads\\LEO\\leo_prod\\server\\public\\men(1)';

async function testDownload() {
  const destDir = path.join(TARGET_BASE, 'POLOS');
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  const res = await fetch('https://leo.com/collections/classic-polo/products.json?limit=1');
  const data = await res.json();
  const product = data.products[0];
  const images = product.images.slice(0, 3);

  console.log(`Testing 3 image downloads for product "${product.title}" into ${destDir}`);

  for (const img of images) {
    const rawUrl = img.src;
    const cleanUrl = rawUrl.split('?')[0];
    const baseName = path.basename(cleanUrl);
    const fileName = `${product.handle}_${baseName}`;
    const filePath = path.join(destDir, fileName);

    const imgRes = await fetch(rawUrl);
    if (!imgRes.ok) throw new Error(`HTTP ${imgRes.status}`);

    const fileStream = fs.createWriteStream(filePath);
    await pipeline(Readable.fromWeb(imgRes.body), fileStream);
    const stats = fs.statSync(filePath);
    console.log(`Saved: ${fileName} (${(stats.size / 1024).toFixed(1)} KB)`);
  }
}

testDownload().catch(console.error);
