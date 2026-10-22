import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_shackets.html', 'utf8');

const h1Idx = html.indexOf('<h1');
if (h1Idx !== -1) {
  // Print 500 characters before and 500 characters after
  console.log(html.substring(h1Idx - 500, h1Idx + 500));
}
