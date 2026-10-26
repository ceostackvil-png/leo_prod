import fs from 'fs';

const html = fs.readFileSync('scripts/extracted_reviews_section.html', 'utf8');

// Find headings
const headings = html.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi) || [];
console.log('--- HEADINGS IN REVIEWS SECTION ---');
headings.forEach(h => console.log(h.replace(/<[^>]+>/g, '').trim()));

// Find all review cards or text
// Let's search for customer names and reviews
const names = ['Shehla', 'Rohit', 'Siddhi'];
names.forEach(name => {
  const i = html.indexOf(name);
  if (i !== -1) {
    console.log(`\n=== FOUND ${name} ===`);
    console.log(html.substring(Math.max(0, i - 300), Math.min(html.length, i + 500)));
  }
});

// Also search for images
const imgRegex = /https:\/\/nobero\.com\/cdn\/shop\/files\/[^\s"'>]+/gi;
const imgs = new Set();
let m;
while ((m = imgRegex.exec(html)) !== null) {
  imgs.add(m[0]);
}
console.log('\n--- IMAGES IN REVIEWS SECTION ---');
Array.from(imgs).forEach(img => console.log(img));
