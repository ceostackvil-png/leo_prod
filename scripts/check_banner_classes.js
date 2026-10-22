import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

// Let's find the section tag
const secMatch = html.match(/<section[^>]*primary-banner-section[^>]*>/i);
console.log('primary-banner-section tag:', secMatch ? secMatch[0] : 'None');

// Let's find .primary-banner-wrapper tag
const wrapMatch = html.match(/<section[^>]*primary-banner-wrapper[^>]*>/gi);
console.log('primary-banner-wrapper tags:');
wrapMatch?.forEach(m => console.log(m));

// Let's check if there are style tags immediately before or inside
const idx = html.indexOf('primary-banner_template--16047755886758__primary-banner-wrapper');
if (idx !== -1) {
  console.log('\n--- Surrounding HTML (800 chars before and after) ---');
  console.log(html.substring(idx - 800, idx + 800));
}
