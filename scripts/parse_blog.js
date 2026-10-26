import fs from 'fs';

const html = fs.readFileSync('scripts/article_main_part.html', 'utf8');

const headings = html.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi) || [];
console.log('--- HEADINGS ---');
headings.forEach(h => console.log(h.replace(/<[^>]+>/g, '').trim()));

const imgs = [];
const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
let m;
while ((m = imgRegex.exec(html)) !== null) {
  const altMatch = m[0].match(/alt=["']([^"']+)["']/);
  imgs.push({ src: m[1], alt: altMatch ? altMatch[1] : '' });
}

console.log('--- IMAGES (' + imgs.length + ') ---');
imgs.slice(0, 15).forEach(img => console.log(img.src, '|', img.alt));
