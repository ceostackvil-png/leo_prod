import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_shackets.html', 'utf8');

const start = html.indexOf('class="common-product-card');
if (start !== -1) {
  const chunk = html.substring(start - 50, start + 4000);
  fs.writeFileSync('scripts/nobero_card_markup.html', chunk);
  console.log('Saved nobero_card_markup.html');
}

// Find collection title / count bar
const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
if (h1Match) {
  console.log('Collection H1 snippet:', h1Match[0]);
}

// Check for sort / filter element
const sortMatches = html.match(/<select[^>]*name="sort_by"[^>]*>([\s\S]*?)<\/select>/i);
if (sortMatches) {
  console.log('Sort by options:', sortMatches[0]);
}
