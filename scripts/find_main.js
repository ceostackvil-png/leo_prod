import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

const mainIdx = html.indexOf('<main');
if (mainIdx !== -1) {
  console.log(html.substring(mainIdx, mainIdx + 1000));
}
