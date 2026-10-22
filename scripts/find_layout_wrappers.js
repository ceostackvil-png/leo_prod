import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

// Find all elements wrapping around shopify-section-template--16047755886758__primary-banner
const target = 'id="shopify-section-template--16047755886758__primary-banner"';
const idx = html.indexOf(target);
if (idx !== -1) {
  // Let's look up to 4000 characters before to see the <body> and wrapper structure
  const before = html.substring(idx - 4000, idx);
  // find all opening tags in before
  console.log(before.substring(before.lastIndexOf('<body')));
}
