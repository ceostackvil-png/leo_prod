import https from 'https';
import fs from 'fs';
import path from 'path';

const downloads = [
  {
    url: 'https://nobero.com/cdn/shop/files/CargoShortsFinalFrontImages-0005.jpg?v=1743680868',
    file: 'cargo_model_olive.jpg'
  },
  {
    url: 'https://nobero.com/cdn/shop/files/CargoShortsFinalFrontImages-0007.jpg?v=1743680912',
    file: 'cargo_short_offwhite.jpg'
  },
  {
    url: 'https://nobero.com/cdn/shop/files/CargoShortsFinalFrontImages-0001.jpg?v=1743680986',
    file: 'cargo_short_khaki.jpg'
  },
  {
    url: 'https://nobero.com/cdn/shop/files/CargoShortsFinalFrontImages-0006.jpg?v=1743680943',
    file: 'cargo_short_navy.jpg'
  },
  {
    url: 'https://nobero.com/cdn/shop/files/2PackCargoShortsShoot2.webp?v=1748930540',
    file: 'cargo_short_2pack.webp'
  },
  {
    url: 'https://nobero.com/cdn/shop/files/CargoShortsFinalFrontImages-0002.jpg?v=1743680933',
    file: 'cargo_short_charcoal.jpg'
  },
  {
    url: 'https://nobero.com/cdn/shop/files/CargoShortsFinalFrontImages-0003.jpg?v=1743680922',
    file: 'cargo_short_sage.jpg'
  }
];

const targetDir = path.resolve('client/public/images/blogs');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

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
  for (const item of downloads) {
    await download(item);
  }
}

run();
