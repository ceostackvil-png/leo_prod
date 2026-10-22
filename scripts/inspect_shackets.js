import fs from 'fs';

async function main() {
  const res = await fetch('https://nobero.com/collections/textured-shackets');
  const html = await res.text();
  fs.writeFileSync('scripts/nobero_shackets.html', html);
  console.log('Saved nobero_shackets.html, length:', html.length);

  // Extract collection header / breadcrumb / count
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1] || '';
  console.log('Title:', title);

  // Look for product items
  const products = [];
  // Find JSON product payloads or product card markup
  const scriptTags = html.match(/<script type="application\/json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
  console.log('JSON script tags count:', scriptTags.length);
  for (const tag of scriptTags) {
    if (tag.includes('"products"') || tag.includes('"collection"')) {
      console.log('Found collection JSON script, snippet:', tag.slice(0, 200));
    }
  }

  // Look for product elements
  const cards = html.match(/<li[^>]*class="[^"]*grid__item[^"]*"[^>]*>([\s\S]*?)<\/li>/gi) || [];
  console.log('Grid items count:', cards.length);
  if (cards.length > 0) {
    fs.writeFileSync('scripts/sample_card.html', cards[0]);
    console.log('Saved sample_card.html');
  }
}

main().catch(console.error);
