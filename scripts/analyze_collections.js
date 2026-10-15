import fs from 'fs';
import path from 'path';

const COLLECTIONS = [
  { folder: 'POLOS', handle: 'classic-polo', url: 'https://nobero.com/collections/classic-polo' },
  { folder: 'premium HD  T - shirts', handle: 'premium-hd-tees', url: 'https://nobero.com/collections/premium-hd-tees' },
  { folder: 'T-shirts', handle: 't-shirts', url: 'https://nobero.com/collections/t-shirts' },
  { folder: 'hoodies & jackets', handle: 'hoodies-jackets', url: 'https://nobero.com/collections/hoodies-jackets' },
  { folder: 'full sleeves T-shirts', handle: 'full-sleeve-t-shirts', url: 'https://nobero.com/collections/full-sleeve-t-shirts' },
  { folder: 'jackets', handle: 'textured-shackets', url: 'https://nobero.com/collections/textured-shackets' },
  { folder: 'joggers', handle: 'fashion-joggers-men', url: 'https://nobero.com/collections/fashion-joggers-men' },
  { folder: 'pants', handle: 'mens-cargo-pants', url: 'https://nobero.com/collections/mens-cargo-pants' },
  { folder: 'Co-ords sets', handle: 'best-selling-co-ord-sets', url: 'https://nobero.com/collections/best-selling-co-ord-sets' },
  { folder: 'curated looks', handle: 'shop-the-looks', url: 'https://nobero.com/collections/shop-the-looks' },
  { folder: 'shorts', handle: 'mens-shorts-collection', url: 'https://nobero.com/collections/mens-shorts-collection' },
  { folder: 'Active wear', handle: 'men-activewear', url: 'https://nobero.com/collections/men-activewear' }
];

async function fetchCollectionData(col) {
  let allProducts = [];
  let page = 1;
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  };

  while (true) {
    try {
      const res = await fetch(`https://nobero.com/collections/${col.handle}/products.json?limit=250&page=${page}`, { headers });
      if (!res.ok) break;
      const data = await res.json();
      if (!data.products || data.products.length === 0) break;
      allProducts.push(...data.products);
      if (data.products.length < 250) break;
      page++;
    } catch (e) {
      console.error(`Error on page ${page} of ${col.handle}:`, e.message);
      break;
    }
  }

  // Also fetch the collection page HTML to find banner images
  let bannerImages = [];
  try {
    const htmlRes = await fetch(col.url, { headers });
    if (htmlRes.ok) {
      const html = await htmlRes.text();
      // Look for collection banner image
      const matches = html.match(/https:\/\/[^"'\s]+\.(?:jpg|jpeg|png|webp|avif)/gi) || [];
      bannerImages = [...new Set(matches.filter(u => 
        u.includes('cdn.shopify.com') && 
        (u.toLowerCase().includes('banner') || u.toLowerCase().includes('collection') || u.toLowerCase().includes('desktop') || u.toLowerCase().includes('mobile') || u.toLowerCase().includes('hero'))
      ))];
    }
  } catch (e) {
    console.error(`Error fetching HTML for ${col.handle}:`, e.message);
  }

  // Total images from products
  const productImages = allProducts.flatMap(p => p.images ? p.images.map(img => img.src) : []);

  return {
    folder: col.folder,
    handle: col.handle,
    productsCount: allProducts.length,
    productImagesCount: productImages.length,
    bannerImagesCount: bannerImages.length,
    sampleBanner: bannerImages[0] || null
  };
}

async function main() {
  console.log('Analyzing 12 collections...');
  const results = [];
  for (const col of COLLECTIONS) {
    const info = await fetchCollectionData(col);
    results.push(info);
    console.log(`[${info.folder}] (${info.handle}): ${info.productsCount} products, ${info.productImagesCount} product images, ${info.bannerImagesCount} banner images`);
  }

  const totalProducts = results.reduce((sum, r) => sum + r.productsCount, 0);
  const totalImages = results.reduce((sum, r) => sum + r.productImagesCount, 0);
  console.log(`\nTOTALS: ${totalProducts} products, ${totalImages} product images across all 12 collections.`);
}

main();
