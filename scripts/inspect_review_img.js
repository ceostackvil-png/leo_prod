import fs from 'fs';

const html = fs.readFileSync('scripts/loox_reviews.json', 'utf8');
const sIdx = html.indexOf('Shehla A.');
console.log(html.substring(sIdx - 1500, sIdx));
