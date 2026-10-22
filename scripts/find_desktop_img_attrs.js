import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

const target = 'HB_Hoodies_Jackets_des.jpg';
const idx = html.indexOf(target);
if (idx !== -1) {
  console.log(html.substring(idx - 100, idx + 1000));
}
