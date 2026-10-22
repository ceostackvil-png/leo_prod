import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

// Find all occurrences of primary-banner-wrapper
const idx = html.indexOf('primary-banner-wrapper primary-banner_template--');
if (idx !== -1) {
  // Let's print out the full section element and any parents or child classes
  console.log(html.substring(idx - 200, idx + 1000));
}
