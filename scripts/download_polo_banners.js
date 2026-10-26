import https from 'https';
import fs from 'fs';
import path from 'path';

const downloads = [
  {
    url: 'https://nobero.com/cdn/shop/files/WhatsApp_Image_2026-10-19_at_10.48.53_PM.jpg?v=1792430351',
    file: 'polo_banner_desktop.jpg'
  },
  {
    url: 'https://nobero.com/cdn/shop/files/WhatsApp_Image_2026-10-19_at_10.44.35_PM.jpg?v=1792430094',
    file: 'polo_banner_mobile.jpg'
  }
];

const targetDir = path.resolve('client/public/images/banners');
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
