import fs from 'fs';

const html = fs.readFileSync('scripts/raw_top-5-mens-shorts-stylish-summer-wardrobe.html', 'utf8');

const regex = /https:\/\/nobero\.com\/cdn\/shop\/files\/[^\s"'>]+/gi;
const files = new Set();
let m;
while ((m = regex.exec(html)) !== null) {
  files.add(m[0]);
}

console.log('Files found:');
Array.from(files).forEach(f => console.log(f));
