import fs from 'fs';

const COLLECTIONS = [
  { folder: 'POLOS', handle: 'classic-polo' },
  { folder: 'premium HD  T - shirts', handle: 'premium-hd-tees' },
  { folder: 'T-shirts', handle: 't-shirts' },
  { folder: 'hoodies & jackets', handle: 'hoodies-jackets' },
  { folder: 'full sleeves T-shirts', handle: 'full-sleeve-t-shirts' },
  { folder: 'jackets', handle: 'textured-shackets' },
  { folder: 'joggers', handle: 'fashion-joggers-men' },
  { folder: 'pants', handle: 'mens-cargo-pants' },
  { folder: 'Co-ords sets', handle: 'best-selling-co-ord-sets' },
  { folder: 'curated looks', handle: 'shop-the-looks' },
  { folder: 'shorts', handle: 'mens-shorts-collection' },
  { folder: 'Active wear', handle: 'men-activewear' }
];

async function inspectCollection(col) {
  let allProducts = [];
  let page = 1;
  const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' };

  while (true) {
    const res = await fetch(`https://nobero.com/collections/${col.handle}/products.json?limit=250&page=${page}`, { headers });
    if (!res.ok) break;
    const data = await res.json();
    if (!data.products || data.products.length === 0) break;
    allProducts.push(...data.products);
    if (data.products.length < 250) break;
    page++;
  }

  const allImages = allProducts.flatMap(p => (p.images || []).map(img => img.src));
  const uniqueImages = [...new Set(allImages)];
  const featuredImages = allProducts.map(p => p.images?.[0]?.src).filter(Boolean);

  console.log(`[${col.folder}]: ${allProducts.length} products | ${allImages.length} total image refs | ${uniqueImages.length} unique image URLs | ${featuredImages.length} featured images`);
  return { folder: col.folder, handle: col.handle, products: allProducts, uniqueImages };
}

async function main() {
  for (const c of COLLECTIONS) {
    await inspectCollection(c);
  }
}

main();
