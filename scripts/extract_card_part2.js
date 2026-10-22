import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_shackets.html', 'utf8');
const start = html.indexOf('class="common-product-card');
if (start !== -1) {
  // get from 3500 to 8000
  const chunk = html.substring(start + 3500, start + 8000);
  fs.writeFileSync('scripts/nobero_card_part2.html', chunk);
  console.log('Saved nobero_card_part2.html');
}
