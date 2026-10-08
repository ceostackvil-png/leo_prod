import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const res = await fetch('https://nobero.com');
  const html = await res.text();
  const chunkUrls = html.match(/https:\/\/[^"']+\.js/g) || [];
  console.log(`Found ${chunkUrls.length} JS files`);

  const foundImages = new Set();

  for (const jsUrl of chunkUrls) {
    if (!jsUrl.includes('cdn.shopify.com')) continue;
    try {
      const jsRes = await fetch(jsUrl);
      const jsText = await jsRes.text();
      const imgs = jsText.match(/https:\/\/cdn\.shopify\.com\/s\/files\/[^\s"'\)]+\.(?:jpg|png|webp|jpeg)/gi) || [];
      imgs.forEach(i => foundImages.add(i));
    } catch(e) {}
  }

  console.log(`Total found images from chunks: ${foundImages.size}`);
  const list = Array.from(foundImages);
  list.slice(0, 30).forEach(i => console.log(i));

  // Let's also fetch more Men collections
  const menCollections = [
    'men-collection',
    'oversized-t-shirts',
    'classic-mens-joggers',
    'all-polos',
    'city-ready-co-ords',
    'textured-co-ords-1',
    'classic-hoodie',
    'all-travel-2',
    'active-shorts',
    'active-joggers'
  ];

  for (const slug of menCollections) {
    try {
      const colRes = await fetch(`https://nobero.com/collections/${slug}/products.json?limit=50`);
      const colData = await colRes.json();
      (colData.products || []).forEach(p => {
        (p.images || []).forEach(img => foundImages.add(img.src));
      });
    } catch(e) {}
  }

  console.log(`Grand total images gathered: ${foundImages.size}`);
  
  const targetDir = path.join(__dirname, '..', 'client', 'public', 'images', 'nobero');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  let idx = 1;
  for (const imgUrl of foundImages) {
    if (idx > 35) break; // Download top 35 crisp images
    try {
      const cleanUrl = imgUrl.split('?')[0];
      const imgRes = await fetch(cleanUrl);
      if (imgRes.ok) {
        const buf = await imgRes.arrayBuffer();
        const ext = path.extname(cleanUrl) || '.jpg';
        const filename = `nobero_img_${idx}${ext}`;
        fs.writeFileSync(path.join(targetDir, filename), Buffer.from(buf));
        console.log(`Downloaded: ${filename} (${buf.byteLength} bytes) from ${cleanUrl}`);
        idx++;
      }
    } catch(e) {}
  }
}

run();
