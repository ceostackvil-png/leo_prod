import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_shackets.html', 'utf8');

// Find first common-product-card
const start = html.indexOf('class="common-product-card');
if (start !== -1) {
  // Let's find the closing tag for common-product-card
  const end = html.indexOf('class="common-product-card', start + 30);
  const cardChunk = html.substring(start, end !== -1 ? end : start + 6000);
  fs.writeFileSync('scripts/full_card_sample.html', cardChunk);
  console.log('Saved full_card_sample.html, length:', cardChunk.length);
}

// Check collection layout details: filters, breadcrumbs, sort, banner
const breadcrumbMatch = html.match(/<nav[^>]*aria-label="breadcrumb"[^>]*>[\s\S]*?<\/nav>/i) || html.match(/<ol[^>]*breadcrumb[^>]*>[\s\S]*?<\/ol>/i);
if (breadcrumbMatch) {
  console.log('Breadcrumb:', breadcrumbMatch[0].substring(0, 300));
}

// Check filter pills or filter drawer trigger
const filterMatches = html.match(/<div[^>]*class="[^"]*filter[^"]*"[^>]*>[\s\S]*?<\/div>/gi) || [];
console.log('Filter divs found:', filterMatches.length);
if (filterMatches[0]) {
  console.log('Filter div 0:', filterMatches[0].substring(0, 300));
}
