import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

const target = 'id="shopify-section-template--16047755886758__primary-banner"';
const idx = html.indexOf(target);
if (idx !== -1) {
  // Let's print out 500 characters before this
  console.log(html.substring(idx - 600, idx));
}
