import fs from 'fs';

async function extract() {
  const res = await fetch('https://nobero.com');
  const text = await res.text();
  const idx = text.indexOf('Shop by Collection');
  if (idx === -1) {
    console.log('Shop by Collection not found');
    return;
  }
  const chunk = text.substring(idx, idx + 40000);
  fs.writeFileSync('scripts/shop_by_collection_chunk.html', chunk);

  // Parse each custom-section-grid-item
  const items = [];
  const parts = chunk.split('class="custom-section-grid-item"');
  for (let i = 1; i < parts.length; i++) {
    const p = parts[i];
    const srcMatch = p.match(/src="([^"]+)"/);
    const textMatch = p.match(/<span[^>]*class="[^"]*font-\[familyMedium\][^"]*"[^>]*>([^<]+)<\/span>/);
    const linkMatch = p.match(/href="([^"]+)"/);
    if (srcMatch && textMatch) {
      items.push({
        name: textMatch[1].trim(),
        image: srcMatch[1],
        link: linkMatch ? linkMatch[1] : ''
      });
    }
  }

  console.log(JSON.stringify(items, null, 2));
}

extract();
