import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_shackets.html', 'utf8');
const start = html.indexOf('class="common-product-card');
if (start !== -1) {
  // get from 16000 to 22000
  const chunk = html.substring(start + 16000, start + 23000);
  fs.writeFileSync('scripts/nobero_card_part4.html', chunk);
  console.log('Saved nobero_card_part4.html');
}
