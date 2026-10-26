import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

const matches = [];
let pos = 0;
while (true) {
  const i = html.indexOf('The Nobero shirt jacket has become', pos);
  if (i === -1) break;
  matches.push(i);
  pos = i + 1;
}

console.log('Matches found for "The Nobero shirt jacket":', matches);
matches.forEach((idx, mIdx) => {
  console.log(`\n--- MATCH ${mIdx + 1} at ${idx} ---`);
  console.log(html.substring(Math.max(0, idx - 1000), Math.min(html.length, idx + 4000)));
});
