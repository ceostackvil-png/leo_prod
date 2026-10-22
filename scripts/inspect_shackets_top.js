import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_shackets.html', 'utf8');

// Find what's right after header in nobero_shackets.html
const headerIdx = html.indexOf('id="shopify-section-header"');
if (headerIdx !== -1) {
  const afterHeader = html.substring(headerIdx + 500);
  const nextSection = afterHeader.indexOf('<section') !== -1 ? afterHeader.indexOf('<section') : afterHeader.indexOf('<div id="shopify-section');
  console.log(afterHeader.substring(nextSection, nextSection + 2000));
}
