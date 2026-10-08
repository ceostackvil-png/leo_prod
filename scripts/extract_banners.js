import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const res = await fetch('https://nobero.com');
  const html = await res.text();
  const regex = /https:\/\/cdn\.shopify\.com\/s\/files\/[^"'\s\)]+/g;
  const matches = [...new Set(html.match(regex) || [])];
  console.log(`Found ${matches.length} unique assets on homepage`);
  
  const targetDir = path.join(__dirname, '..', 'client', 'public', 'images', 'nobero');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  let bannerIdx = 1;
  for (const url of matches) {
    if (url.includes('.jpg') || url.includes('.png') || url.includes('.webp')) {
      console.log('Image:', url);
      try {
        const cleanUrl = url.split('?')[0];
        const imgRes = await fetch(cleanUrl);
        if (imgRes.ok) {
          const buf = await imgRes.arrayBuffer();
          const ext = path.extname(cleanUrl) || '.jpg';
          const filename = `banner_${bannerIdx}${ext}`;
          fs.writeFileSync(path.join(targetDir, filename), Buffer.from(buf));
          console.log(`Saved: ${filename} (${buf.byteLength} bytes)`);
          bannerIdx++;
        }
      } catch(e) {
        console.error(e.message);
      }
    }
  }
}

run();
