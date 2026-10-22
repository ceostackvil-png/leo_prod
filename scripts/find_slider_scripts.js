import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

const regex = /<script[\s\S]*?primary-banner[\s\S]*?<\/script>/gi;
const matches = html.match(regex);
console.log('Matches:', matches ? matches.length : 0);
if (matches) {
  matches.forEach((m, i) => {
    console.log(`\n--- Script ${i} ---`);
    console.log(m.substring(0, 1500));
  });
}
