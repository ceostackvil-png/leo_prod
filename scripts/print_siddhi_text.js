import fs from 'fs';

const html = fs.readFileSync('scripts/loox_page_3.html', 'utf8');

const sIdx = html.indexOf('Siddhi N.');
console.log('--- SIDDHI N. REVIEW TEXT AREA ---');
console.log(html.substring(sIdx + 800, sIdx + 2000));
