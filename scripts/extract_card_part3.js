import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_shackets.html', 'utf8');
const start = html.indexOf('class="common-product-card');
if (start !== -1) {
  // get from 10000 to 14000
  const chunk = html.substring(start + 9000, start + 14000);
  fs.writeFileSync('scripts/nobero_card_part3.html', chunk);
  console.log('Saved nobero_card_part3.html');
}
