import fs from 'fs';

const html = fs.readFileSync('scripts/loox_page_3.html', 'utf8');

const sIdx = html.indexOf('Siddhi N.');
console.log('--- SIDDHI N. BLOCK ---');
console.log(html.substring(sIdx, sIdx + 1500));

const rIdx = html.indexOf('Rohit D.');
console.log('--- ROHIT D. BLOCK ---');
console.log(html.substring(rIdx, rIdx + 1500));
