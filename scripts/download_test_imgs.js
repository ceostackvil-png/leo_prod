import https from 'https';
import fs from 'fs';

const testUrls = [
  'https://nobero.com/cdn/shop/files/WhatsApp_Image_2026-10-19_at_10.44.35_PM.jpg?v=1792430094',
  'https://nobero.com/cdn/shop/files/WhatsApp_Image_2026-10-19_at_10.48.53_PM.jpg?v=1792430351',
  'https://nobero.com/cdn/shop/files/WhatsApp_Image_2026-10-16_at_4.39.30_PM.jpg?v=1792149694',
  'https://nobero.com/cdn/shop/files/WhatsApp_Image_2026-10-16_at_4.39.30_PM_1.jpg?v=1792149693'
];

testUrls.forEach((url, i) => {
  const dest = `scripts/test_img_${i}.jpg`;
  const fileStream = fs.createWriteStream(dest);
  https.get(url, res => {
    res.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`Saved ${dest}, size: ${fs.statSync(dest).size} bytes`);
    });
  });
});
