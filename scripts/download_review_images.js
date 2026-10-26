import https from 'https';
import fs from 'fs';
import path from 'path';

const reviewImgs = [
  { name: 'review_mountain_shehla.jpg', url: 'https://cdn.shopify.com/s/files/1/0337/9413/0052/files/DBGTN_aj8_orig_1.jpg?v=1792140666' },
  { name: 'review_bench_shehla.jpg', url: 'https://cdn.shopify.com/s/files/1/0337/9413/0052/files/fIhK5P14M_orig_1.jpg?v=1792140667' },
  { name: 'review_selfie_rohit.jpg', url: 'https://cdn.shopify.com/s/files/1/0337/9413/0052/files/pSiTW1G4V_orig.jpg?v=1792142759' },
  { name: 'review_tshirt_paritosh.jpg', url: 'https://cdn.shopify.com/s/files/1/0337/9413/0052/files/SxzKQydub_orig.jpg?v=1792141071' },
  { name: 'review_pants_tirth.jpg', url: 'https://cdn.shopify.com/s/files/1/0337/9413/0052/files/ixyEYW3Uze_orig.jpg?v=1792141400' },
  { name: 'review_coord_jatin.jpg', url: 'https://cdn.shopify.com/s/files/1/0337/9413/0052/files/XS9hiU_b2_orig.jpg?v=1792141697' }
];

const targetDir = path.resolve('client/public/images/reviews');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function download(item) {
  return new Promise((resolve) => {
    const dest = path.join(targetDir, item.name);
    const fileStream = fs.createWriteStream(dest);
    https.get(item.url, res => {
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded ${item.name} (${fs.statSync(dest).size} bytes)`);
        resolve();
      });
    }).on('error', err => {
      console.error(`Error downloading ${item.name}:`, err.message);
      resolve();
    });
  });
}

async function run() {
  for (const item of reviewImgs) {
    await download(item);
  }
}

run();
