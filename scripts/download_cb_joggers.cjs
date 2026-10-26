const https = require('https');
const fs = require('fs');
const path = require('path');

const banners = [
  { name: 'joggers_banner_desktop.jpg', url: 'https://nobero.com/cdn/shop/files/CB_Mens_Joggers_des.jpg' },
  { name: 'joggers_banner_mobile.jpg', url: 'https://nobero.com/cdn/shop/files/CB_Mens_Joggers_mob.jpg' }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

function getJpegDimensions(filePath) {
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
  return null;
}

async function run() {
  const dir = path.join(__dirname, '..', 'client', 'public', 'images', 'banners');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  for (const item of banners) {
    const dest = path.join(dir, item.name);
    console.log('Downloading', item.url, 'to', dest);
    await download(item.url, dest);
    console.log('Downloaded', item.name, 'size:', fs.statSync(dest).size, 'dimensions:', getJpegDimensions(dest));
  }
}

run();
