import fs from 'fs';

const html = fs.readFileSync('scripts/polo_page.html', 'utf8');

// Find all src= or srcset= or background
const urls = new Set();
const regex = /(?:src|srcset|href|content)=["']([^"']+\.(?:jpg|jpeg|png|webp|avif)[^"']*)["']/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  urls.add(m[1]);
}

console.log('Total media URLs found in polo page:', urls.size);
Array.from(urls).slice(0, 30).forEach(u => console.log('  ', u));
