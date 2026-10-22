import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_shackets.html', 'utf8');

// Search for product card or collection elements
const lines = html.split('\n');
console.log('Total lines:', lines.length);

// Look for product card patterns
const cardMatches = html.match(/<div[^>]*class="[^"]*(?:product-card|productCard|card-wrapper|product-item)[^"]*"[^>]*>/gi) || [];
console.log('Class matches:', cardMatches.slice(0, 10));

// Find where "Textured Shacket" appears
const idx = html.indexOf('Shacket');
console.log('First index of Shacket:', idx);
if (idx !== -1) {
  const snippet = html.substring(Math.max(0, idx - 200), idx + 800);
  console.log('Snippet around Shacket:\n', snippet);
}

// Check for breadcrumb
const bIdx = html.indexOf('breadcrumb');
if (bIdx !== -1) {
  console.log('Breadcrumb snippet:\n', html.substring(bIdx - 50, bIdx + 400));
}

// Check for filter or sort bar
const fIdx = html.indexOf('Filter');
if (fIdx !== -1) {
  console.log('Filter snippet:\n', html.substring(fIdx - 50, fIdx + 300));
}
