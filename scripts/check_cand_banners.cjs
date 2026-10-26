const https = require('https');
const fs = require('fs');

const candidates = [
  'https://nobero.com/cdn/shop/files/WhatsApp_Image_2026-10-13_at_5.40.52_PM.jpg',
  'https://nobero.com/cdn/shop/files/Jackets_Shackles_Retail_Banner.png',
  'https://nobero.com/cdn/shop/files/WhatsApp_Image_2026-09-04_at_3.30.18_PM.jpg',
  'https://nobero.com/cdn/shop/files/Shirts_1_b8f1dd4e-3a57-458c-bab3-5dc4979178e4.jpg'
];

function download(url, dest) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(fs.statSync(dest).size);
      });
    }).on('error', () => resolve(0));
  });
}

function getJpegDimensions(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xFF) break;
      const marker = buffer[offset + 1];
      if (marker === 0xC0 || marker === 0xC2) {
        const height = buffer.readUInt16BE(offset + 5);
        const width = buffer.readUInt16BE(offset + 7);
        return { width, height };
      }
      const length = buffer.readUInt16BE(offset + 2);
      offset += 2 + length;
    }
  } catch {}
  return null;
}

async function run() {
  for (let i = 0; i < candidates.length; i++) {
    const dest = `client/public/images/banners/test_cand_${i}.jpg`;
    const size = await download(candidates[i], dest);
    console.log(candidates[i], '-> size:', size, 'dims:', getJpegDimensions(dest));
  }
}

run();
