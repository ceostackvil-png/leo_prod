import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

// Search for desktop primary banner
const idx = html.indexOf('desktop-primary-banner') !== -1 ? html.indexOf('desktop-primary-banner') : html.indexOf('lg:block');
const matches = [...html.matchAll(/class="[^"]*primary-banner[^"]*"/gi)];
console.log('Primary banner matches:', matches.map(m => m[0]));

// Let's find what is right after the mobile banner block
const mobIdx = html.indexOf('lg:hidden min-h-[204px]');
if (mobIdx !== -1) {
  console.log('After mob banner:\n', html.substring(mobIdx + 1000, mobIdx + 8000));
}
