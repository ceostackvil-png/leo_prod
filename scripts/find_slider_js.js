import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

const target = 'primary_banner_template--16047755886758__primary-bannerSlider';
const idx = html.indexOf(target);
if (idx !== -1) {
  console.log(html.substring(idx - 200, idx + 1000));
}
