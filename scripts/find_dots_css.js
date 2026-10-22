import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

const regex = /slider-dot-diamond[^{]*\{[^}]*\}/gi;
console.log(html.match(regex));

// Also let's search for .dots in CSS
const dotsCss = html.match(/\.dots[^{]*\{[^}]*\}/gi);
console.log('Dots CSS:', dotsCss);
