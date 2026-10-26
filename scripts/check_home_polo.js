import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

const m1 = html.indexOf('10.48.53');
const m2 = html.indexOf('POLOS THAT MOVE');
const m3 = html.indexOf('polos that move');
const m4 = html.indexOf('Ready for every plan');

console.log('Homepage matches:', { m1, m2, m3, m4 });
