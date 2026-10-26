import fs from 'fs';

const html = fs.readFileSync('scripts/classic_polo.html', 'utf8');

const sIdx = html.indexOf('10.48.53');
console.log('sIdx:', sIdx);
if (sIdx !== -1) {
  console.log(html.substring(Math.max(0, sIdx - 500), Math.min(html.length, sIdx + 1500)));
}
