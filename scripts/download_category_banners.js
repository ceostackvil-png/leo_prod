import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BANNERS = [
  { name: 'hoodies_promo_bg.jpg', url: 'https://nobero.com/cdn/shop/files/HB_Shacket_des_jpg.jpg' },
  { name: 'joggers_promo_bg.jpg', url: 'https://nobero.com/cdn/shop/files/HB_Fashion_Joggers_des.jpg' },
  { name: 'oversized-tees_promo_bg.jpg', url: 'https://nobero.com/cdn/shop/files/AW_26_Homepage_Banners_Desktop_jpg.jpg' },
  { name: 'shirts_promo_bg.jpg', url: 'https://nobero.com/cdn/shop/files/HB_Shacket_des_jpg.jpg' },
  { name: 'shackets_promo_bg.jpg', url: 'https://nobero.com/cdn/shop/files/HB_Shacket_des_jpg.jpg' },
  { name: 'coords_promo_bg.jpg', url: 'https://nobero.com/cdn/shop/files/HB_Co-Ords_des.jpg' }
];

const targetDir = path.join(__dirname, '..', 'client', 'public', 'images');

async function downloadBanners() {
  for (const b of BANNERS) {
    try {
      console.log(`Downloading ${b.name}...`);
      const res = await fetch(b.url);
      if (res.ok) {
        const buf = await res.arrayBuffer();
        fs.writeFileSync(path.join(targetDir, b.name), Buffer.from(buf));
        console.log(`Saved ${b.name} (${buf.byteLength} bytes)`);
      }
    } catch (e) {
      console.error(`Error downloading ${b.name}:`, e.message);
    }
  }
}

downloadBanners();
