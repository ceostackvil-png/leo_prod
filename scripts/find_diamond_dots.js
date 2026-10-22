import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

const target = 'applyDiamondSliderDots';
const idx = html.indexOf(target);
if (idx !== -1) {
  console.log(html.substring(idx - 200, idx + 1200));
}
