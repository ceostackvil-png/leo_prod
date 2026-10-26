import fs from 'fs';

const html = fs.readFileSync('scripts/extracted_blog_article.html', 'utf8');

// Find all h1, h2, h3, h4
const headings = [];
const hRegex = /<(h[1-5])[^>]*>([\s\S]*?)<\/\1>/gi;
let m;
while ((m = hRegex.exec(html)) !== null) {
  headings.push({ tag: m[1], text: m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() });
}

console.log('=== ALL HEADINGS ===');
headings.forEach(h => console.log(`${h.tag.toUpperCase()}: ${h.text}`));

// Find all images with alt or class or nearby text
const imgs = [];
const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
while ((m = imgRegex.exec(html)) !== null) {
  const alt = m[0].match(/alt=["']([^"']+)["']/);
  const title = m[0].match(/title=["']([^"']+)["']/);
  imgs.push({ src: m[1], alt: alt ? alt[1] : '', title: title ? title[1] : '' });
}

console.log('\n=== IMAGES (' + imgs.length + ') ===');
imgs.filter(i => !i.src.includes('icon-') && !i.src.includes('svg') && !i.src.includes('logo')).forEach(i => {
  console.log(i.src, '| alt:', i.alt);
});

// Check if there are product links or cards
const productLinks = [];
const pRegex = /<a[^>]+href=["'](\/products\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
while ((m = pRegex.exec(html)) !== null) {
  const text = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (text) {
    productLinks.push({ href: m[1], text });
  }
}
console.log('\n=== PRODUCT LINKS ===');
productLinks.slice(0, 15).forEach(p => console.log(p.href, '|', p.text));
