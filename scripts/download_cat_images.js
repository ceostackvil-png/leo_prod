import https from 'https';
import fs from 'fs';
import path from 'path';

const cats = [
  { url: 'https://nobero.com/cdn/shop/collections/Untitled_design.png?v=1692213488', file: 'cat_oversized_tee.png' },
  { url: 'https://nobero.com/cdn/shop/collections/Website_Shop_men_220_x_304_2.jpg?v=1791530775', file: 'cat_classic_tee.jpg' },
  { url: 'https://nobero.com/cdn/shop/collections/Travel_Cargo-_banner_54f08801-9bb6-48e4-8d48-38bfb884c297.jpg?v=1763553587', file: 'cat_cargo_pants.jpg' },
  { url: 'https://nobero.com/cdn/shop/collections/10.jpg?v=1735548739', file: 'cat_joggers.jpg' },
  { url: 'https://nobero.com/cdn/shop/collections/1.jpg?v=1757851864', file: 'cat_coords.jpg' },
  { url: 'https://nobero.com/cdn/shop/collections/trevel_hoodie.jpg?v=1758008461', file: 'cat_hoodies.jpg' }
];

const targetDir = path.resolve('client/public/images/blogs');

function download(item) {
  return new Promise((resolve) => {
    const dest = path.join(targetDir, item.file);
    const fileStream = fs.createWriteStream(dest);
    https.get(item.url, res => {
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded ${item.file} (${fs.statSync(dest).size} bytes)`);
        resolve();
      });
    }).on('error', err => {
      console.error(`Error downloading ${item.file}:`, err.message);
      resolve();
    });
  });
}

async function run() {
  for (const item of cats) {
    await download(item);
  }
}

run();
