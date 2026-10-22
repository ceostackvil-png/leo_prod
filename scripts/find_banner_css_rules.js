import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

const regex = /\.primary-banner[^{]*\{[^}]*\}/gi;
const matches = html.match(regex);
console.log('Matches for .primary-banner:');
console.log(matches);
