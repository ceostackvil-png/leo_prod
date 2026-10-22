import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

const regex = /applyDiamondSliderDots[^\n]*/g;
console.log(html.match(regex));
