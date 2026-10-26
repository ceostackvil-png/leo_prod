import fs from 'fs';

const html = fs.readFileSync('scripts/classic_polo.html', 'utf8');

const regex = /https:\/\/nobero\.com\/cdn\/shop\/files\/[^\s"'>]+/gi;
const matches = new Set();
let m;
while ((m = regex.exec(html)) !== null) {
  matches.add(m[0].split('&')[0]);
}

console.log('Unique files in classic_polo.html:');
Array.from(matches).forEach(u => console.log('  ', u));
