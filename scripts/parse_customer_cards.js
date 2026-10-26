import fs from 'fs';

const html = fs.readFileSync('scripts/customer_reviews_full.html', 'utf8');

// Print first 1000 characters and heading
console.log('--- START OF SECTION ---');
console.log(html.substring(0, 1500));

// Find all cards
const cards = html.split('customer-review-card');
console.log('\n--- NUMBER OF CARDS:', cards.length - 1);

cards.slice(1).forEach((card, idx) => {
  console.log(`\n================ CARD ${idx + 1} ================`);
  // Find images
  const imgs = card.match(/src=["']([^"']+)["']/g) || [];
  // Find stars
  const stars = (card.match(/svg/gi) || []).length;
  // Find text
  const cleanText = card.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log('Images:', imgs);
  console.log('Text content:', cleanText.slice(0, 300));
});
