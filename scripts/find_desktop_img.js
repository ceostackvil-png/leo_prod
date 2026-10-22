import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

const target = 'class="hidden lg:block"';
const idx = html.indexOf(target);
if (idx !== -1) {
  console.log(html.substring(idx, idx + 2000));
}
