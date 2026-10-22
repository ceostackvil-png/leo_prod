import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

const target = 'class="primary-banner-wrapper primary-banner_template--';
const idx = html.indexOf(target);
if (idx !== -1) {
  // Print container around it
  console.log(html.substring(idx - 300, idx + 1200));
}
