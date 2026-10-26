import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_favourite_full.html', 'utf8');

const cardSections = html.split('data-testid="product-card-section"');
console.log('Cards found:', cardSections.length - 1);

cardSections.slice(1).forEach((c, i) => {
  const nameMatch = c.match(/data-name="([^"]+)"/) || c.match(/alt="([^"]+)"/);
  let name = '';
  if (nameMatch) {
    try {
      name = Buffer.from(nameMatch[1], 'base64').toString('utf8');
    } catch {
      name = nameMatch[1];
    }
  }
  const altMatch = c.match(/alt="([^"]+)"/);
  const srcMatches = c.match(/src="(https:\/\/nobero\.com\/cdn\/shop\/files\/[^"]+)"/g) || [];
  const prices = c.match(/₹[\d,]+/g) || [];
  const ratingMatch = c.match(/product_rating:\s*"([^"]+)"/);
  const tagMatch = c.match(/class="[^"]*tag[^"]*"[^>]*>([^<]+)</);
  const swatchMatch = c.match(/swatch-image[^>]*src="([^"]+)"/) || c.match(/badge[^>]*src="([^"]+)"/);
  const allText = c.match(/<span[^>]*>([^<]+)<\/span>/g) || [];

  console.log(`\n=== Card ${i + 1} ===`);
  console.log('Name:', name);
  console.log('Alt:', altMatch ? altMatch[1] : '');
  console.log('Images:', srcMatches.map(s => s.replace(/src="|"/g, '')));
  console.log('Prices:', prices);
  console.log('Rating:', ratingMatch ? ratingMatch[1] : '');
  console.log('Spans:', allText.map(s => s.replace(/<[^>]+>/g, '').trim()).filter(Boolean).slice(0, 10));
});
