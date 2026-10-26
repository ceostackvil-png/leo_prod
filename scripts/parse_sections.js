import fs from 'fs';

const html = fs.readFileSync('scripts/extracted_blog_article.html', 'utf8');

// Find all h2, h3
const headings = [];
const hRegex = /<(h[1-3])[^>]*>([\s\S]*?)<\/\1>/gi;
let m;
while ((m = hRegex.exec(html)) !== null) {
  const text = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (text && !text.includes('Check Delivery') && !text.includes('Menu')) {
    headings.push({ tag: m[1], text });
  }
}
console.log('HEADINGS:');
headings.forEach(h => console.log(`${h.tag}: ${h.text}`));

// Print sections text
const sections = html.split(/<h2[^>]*>/i);
console.log('\nNUMBER OF H2 SECTIONS:', sections.length);
sections.slice(1).forEach((sec, idx) => {
  const titleEnd = sec.indexOf('</h2>');
  const title = sec.substring(0, titleEnd).replace(/<[^>]+>/g, '').trim();
  const rest = sec.substring(titleEnd + 5);
  // first 400 chars of text content
  const textSample = rest.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 300);
  console.log(`\n--- SECTION ${idx + 1}: ${title} ---`);
  console.log(textSample);
});
