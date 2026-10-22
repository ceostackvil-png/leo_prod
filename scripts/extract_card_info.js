import fs from 'fs';

const html = fs.readFileSync('scripts/full_card_sample.html', 'utf8');

// Find all elements with classes or tags
console.log('--- Product Tag Badge ---');
const tagMatch = html.match(/class="[^"]*tag[^"]*"[^>]*>([\s\S]*?)<\/[a-z0-9]+>/gi);
console.log(tagMatch);

console.log('--- Rating Badge ---');
const ratingMatch = html.match(/class="[^"]*rating[^"]*"[^>]*>([\s\S]*?)<\/[a-z0-9]+>/gi) || html.match(/\d\.\d\s*★/g) || html.match(/class="[^"]*star[^"]*"[^>]*>([\s\S]*?)<\/[a-z0-9]+>/gi);
console.log(ratingMatch);

console.log('--- Swatches ---');
const swatchMatch = html.match(/class="[^"]*swatch[^"]*"[^>]*>([\s\S]*?)<\/[a-z0-9]+>/gi) || html.match(/class="[^"]*color[^"]*"[^>]*>([\s\S]*?)<\/[a-z0-9]+>/gi);
console.log(swatchMatch ? swatchMatch.slice(0, 5) : 'None');

console.log('--- Info Section under Image ---');
const titleIdx = html.indexOf('Bomber Fleece Jacket');
if (titleIdx !== -1) {
  console.log(html.substring(titleIdx - 200, titleIdx + 800));
}
