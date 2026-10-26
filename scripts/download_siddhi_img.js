import https from 'https';
import fs from 'fs';
import path from 'path';

const dest = path.resolve('client/public/images/reviews/review_torii_siddhi.jpg');
const fileStream = fs.createWriteStream(dest);
https.get('https://images.loox.io/uploads/2026/6/26/J8fyCOucr.jpg', res => {
  res.pipe(fileStream);
  fileStream.on('finish', () => {
    fileStream.close();
    console.log(`Downloaded review_torii_siddhi.jpg (${fs.statSync(dest).size} bytes)`);
  });
}).on('error', err => console.error(err.message));
