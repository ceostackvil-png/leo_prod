import fs from 'fs';

const html = fs.readFileSync('scripts/loox_reviews.json', 'utf8');

// Find all review blocks
// Look for data-testid="review-...
const reviews = [];
const rRegex = /data-testid="review-([^"]+)-title" class="block title">([^<]+)<[\s\S]*?(<div[^>]*class="[^"]*pre-wrap[^"]*"[^>]*>([\s\S]*?)<\/div>)/gi;

// Also look for images in each review
const imgRegex = /https:\/\/images\.loox\.io\/uploads\/[^\s"'>]+/gi;
const allLooxImgs = new Set();
let im;
while ((im = imgRegex.exec(html)) !== null) {
  allLooxImgs.add(im[0]);
}

console.log('Total Loox images found:', allLooxImgs.size);
console.log('Sample images:', Array.from(allLooxImgs).slice(0, 15));

// Let's inspect slice around Shehla
const sIdx = html.indexOf('Shehla A.');
console.log('Around Shehla:');
console.log(html.substring(sIdx - 1000, sIdx + 1500));
