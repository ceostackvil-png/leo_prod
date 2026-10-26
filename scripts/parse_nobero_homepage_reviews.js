import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');
const start = 938000;
const end = 955000;
const slice = html.substring(start, end);

// Find all buttons or cards
const cards = slice.split('data-testid="index-customer-review-card-');
console.log('Found cards:', cards.length - 1);

cards.slice(1).forEach((card, idx) => {
  console.log(`\n================ REVIEW CARD ${idx} ================`);
  const imgs = card.match(/src="([^"]+)"/g) || [];
  const textMatch = card.match(/class="customer-review-text[^"]*">([\s\S]*?)<\/p>/);
  const text = textMatch ? textMatch[1].trim() : '';
  const authorMatch = card.match(/- ([^<]+)<\/p>/);
  const author = authorMatch ? authorMatch[1].trim() : '';
  const tagMatch = card.match(/<span[^>]*whitespace-nowrap[^>]*>([^<]+)<\/span>/);
  const tag = tagMatch ? tagMatch[1].trim() : '';

  console.log('Author:', author);
  console.log('Category tag:', tag);
  console.log('Text:', text);
  console.log('Images:', imgs.filter(i => !i.includes('star')));
});
