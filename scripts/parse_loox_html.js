import fs from 'fs';

const html = fs.readFileSync('scripts/loox_reviews.json', 'utf8');

const s1 = html.indexOf('Shehla');
const s2 = html.indexOf('Rohit');
const s3 = html.indexOf('Siddhi');
const s4 = html.indexOf('The Nobero shirt jacket');

console.log('Indices:', { s1, s2, s3, s4 });

// Let's find all reviewer blocks or review items
const regex = /<div[^>]+class="[^"]*grid-item[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
// Or let's search for customer names
['Shehla', 'Rohit', 'Siddhi'].forEach(name => {
  const i = html.indexOf(name);
  if (i !== -1) {
    console.log(`\n=== FOUND ${name} ===`);
    console.log(html.substring(Math.max(0, i - 200), Math.min(html.length, i + 600)));
  }
});
