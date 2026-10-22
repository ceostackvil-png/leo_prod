import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

// Find IndiGo or BluChip or Travel
const matches = [];
const keywords = ['IndiGo', 'BluChip', 'Upgrade', 'indigo', 'bluchip'];

for (const kw of keywords) {
  let idx = 0;
  while ((idx = html.indexOf(kw, idx)) !== -1) {
    matches.push({ kw, idx, snippet: html.substring(Math.max(0, idx - 200), idx + 300) });
    idx += kw.length;
  }
}

console.log('Found matches:', matches.length);
matches.slice(0, 10).forEach((m, i) => {
  console.log(`\n--- Match ${i} (${m.kw}) ---`);
  console.log(m.snippet);
});
