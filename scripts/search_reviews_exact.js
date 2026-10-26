import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

const s1 = html.indexOf('Loved the colour');
const s2 = html.indexOf('bone white');
const s3 = html.indexOf('Siddhi');
const s4 = html.indexOf('Love the fit , the fabric');

console.log('Search in nobero_home.html:', { s1, s2, s3, s4 });
