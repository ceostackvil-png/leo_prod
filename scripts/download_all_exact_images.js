const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const clientImagesDir = path.join(__dirname, '../client/public/images/nobero');
if (!fs.existsSync(clientImagesDir)) {
  fs.mkdirSync(clientImagesDir, { recursive: true });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    let fullUrl = url;
    if (fullUrl.startsWith('//')) fullUrl = 'https:' + fullUrl;
    
    const client = fullUrl.startsWith('https') ? https : http;
    const req = client.get(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Referer': 'https://nobero.com/'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode} for ${fullUrl}`));
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(destPath);
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error(`Timeout downloading ${fullUrl}`));
    });
  });
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('=== 1. HERO BANNERS ===');
  const heroBanners = [
    {
      id: 'banner-1',
      title: 'SUMMER TRAVEL ESSENTIALS',
      subtitle: '240 GSM HEAVYWEIGHT OVERSIZED TEES & 4-WAY JOGGERS',
      ctaText: 'SHOP NOW',
      ctaLink: '/travel',
      badge: 'NEW ARRIVAL',
      desktopUrl: 'https://nobero.com/cdn/shop/files/HB_Fashion_Joggers_des.jpg',
      mobileUrl: 'https://nobero.com/cdn/shop/files/HB_Fashion_Joggers_mob.jpg',
      desktopFile: 'hero_banner_joggers_des.jpg',
      mobileFile: 'hero_banner_joggers_mob.jpg',
      order: 1
    },
    {
      id: 'banner-2',
      title: 'AIR-FLEX CO-ORD SETS',
      subtitle: 'PREMIUM WAFFLE & FRENCH TERRY COMBOS',
      ctaText: 'EXPLORE COLLECTION',
      ctaLink: '/co-ords',
      badge: 'BESTSELLER',
      desktopUrl: 'https://nobero.com/cdn/shop/files/HB_Co-Ords_des.jpg',
      mobileUrl: 'https://nobero.com/cdn/shop/files/HB_Co-Ords_mob.jpg',
      desktopFile: 'hero_banner_coords_des.jpg',
      mobileFile: 'hero_banner_coords_mob.jpg',
      order: 2
    },
    {
      id: 'banner-3',
      title: 'CHINO UTILITY & CARGOS',
      subtitle: 'ENGINEERED FOR ALL DAY TRANSIT COMFORT',
      ctaText: 'SHOP CHINOS',
      ctaLink: '/cargos',
      badge: 'TRENDING',
      desktopUrl: 'https://nobero.com/cdn/shop/files/HB_Chinos_des.jpg',
      mobileUrl: 'https://nobero.com/cdn/shop/files/HB_Chinos_mob.jpg',
      desktopFile: 'hero_banner_chinos_des.jpg',
      mobileFile: 'hero_banner_chinos_mob.jpg',
      order: 3
    },
    {
      id: 'banner-4',
      title: 'SHACKETS & HOODIES',
      subtitle: 'PREMIUM LAYERED APPAREL',
      ctaText: 'SHOP WINTERWEAR',
      ctaLink: '/hoodies',
      badge: 'SEASONAL',
      desktopUrl: 'https://nobero.com/cdn/shop/files/HB_Shacket_des_jpg.jpg',
      mobileUrl: 'https://nobero.com/cdn/shop/files/HB_Shacket_mob_jpg.jpg',
      desktopFile: 'hero_banner_shacket_des.jpg',
      mobileFile: 'hero_banner_shacket_mob.jpg',
      order: 4
    }
  ];

  for (const b of heroBanners) {
    try {
      await downloadImage(b.desktopUrl, path.join(clientImagesDir, b.desktopFile));
      await downloadImage(b.mobileUrl, path.join(clientImagesDir, b.mobileFile));
    } catch (err) {
      console.error(`Error downloading banner ${b.id}:`, err.message);
    }
  }

  console.log('\n=== 2. DOWNLOADING ALL MEN COLLECTIONS FROM NOBERO ===');
  const collectionsToFetch = [
    { category: 'oversized-tees', url: 'https://nobero.com/collections/men-oversized-t-shirts/products.json' },
    { category: 't-shirts', url: 'https://nobero.com/collections/all-tees/products.json' },
    { category: 'polos', url: 'https://nobero.com/collections/all-polos/products.json' },
    { category: 'joggers', url: 'https://nobero.com/collections/active-joggers/products.json' },
    { category: 'cargos', url: 'https://nobero.com/collections/airport-cargo-pants/products.json' },
    { category: 'co-ords', url: 'https://nobero.com/collections/airport-co-ords-sets/products.json' },
    { category: 'shorts', url: 'https://nobero.com/collections/active-shorts/products.json' },
    { category: 'hoodies', url: 'https://nobero.com/collections/all-jackets/products.json' }
  ];

  const allProducts = [];
  let productIndex = 1;

  for (const col of collectionsToFetch) {
    try {
      console.log(`\nFetching collection: ${col.category}...`);
      const res = await fetchJson(col.url);
      const items = (res.products || []).slice(0, 8); // Grab 8 products per collection!

      for (const item of items) {
        const id = `leo-${productIndex++}`;
        const cleanTitle = item.title.replace(/Nobero/gi, 'LEO');
        const slug = item.handle;
        
        // Download up to 4 images per product
        const downloadedImgPaths = [];
        const rawImages = (item.images || []).slice(0, 4);

        for (let imgIdx = 0; imgIdx < rawImages.length; imgIdx++) {
          const imgUrl = rawImages[imgIdx].src;
          const fileName = `item_${id}_img_${imgIdx + 1}.jpg`;
          const localDest = path.join(clientImagesDir, fileName);
          try {
            await downloadImage(imgUrl, localDest);
            downloadedImgPaths.push(`/images/nobero/${fileName}`);
          } catch (imgErr) {
            console.error(`Could not download image ${imgUrl}:`, imgErr.message);
          }
        }

        const price = Math.round(parseFloat(item.variants[0]?.price || '599'));
        const comparePrice = item.variants[0]?.compare_at_price 
          ? Math.round(parseFloat(item.variants[0].compare_at_price)) 
          : Math.round(price * 1.5);
        const discountPct = comparePrice > price ? Math.round(((comparePrice - price) / comparePrice) * 100) : 40;

        const colors = [];
        if (item.options) {
          const colorOpt = item.options.find(o => o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'colour');
          if (colorOpt && colorOpt.values) {
            colorOpt.values.forEach((val, cIdx) => {
              colors.push({
                name: val,
                code: cIdx === 0 ? '#1E293B' : cIdx === 1 ? '#0F172A' : cIdx === 2 ? '#64748B' : '#CBD5E1',
                image: downloadedImgPaths[0] || '/images/nobero/prod_1_1.jpg'
              });
            });
          }
        }
        if (colors.length === 0) {
          colors.push({ name: 'Midnight Black', code: '#18181B', image: downloadedImgPaths[0] || '/images/nobero/prod_1_1.jpg' });
          colors.push({ name: 'Navy Blue', code: '#1E3A8A', image: downloadedImgPaths[1] || downloadedImgPaths[0] });
        }

        allProducts.push({
          id: id,
          title: cleanTitle,
          subtitle: 'Men Premium Apparel',
          slug: slug,
          price: price,
          mrp: comparePrice,
          discount: `${discountPct}% OFF`,
          lowestPrice30Days: Math.round(price * 0.95),
          rating: 4.8,
          reviewCount: Math.floor(Math.random() * 450) + 120,
          isBestseller: productIndex % 2 === 0,
          isFavourite: productIndex % 3 === 0,
          category: col.category,
          fit: col.category.includes('oversized') ? 'Oversized Boxy Fit' : 'Relaxed Comfort Fit',
          fabric: '100% Super Combed Cotton, 240 GSM Pre-Shrunk Bio-Washed',
          care: 'Machine wash cold inside-out, tumble dry low, do not iron on print.',
          sku: `LEO-${id.toUpperCase()}`,
          inventory: 85,
          image: downloadedImgPaths[0] || '/images/nobero/prod_1_1.jpg',
          secondaryImage: downloadedImgPaths[1] || downloadedImgPaths[0] || '/images/nobero/prod_1_2.jpg',
          images: downloadedImgPaths.length > 0 ? downloadedImgPaths : ['/images/nobero/prod_1_1.jpg', '/images/nobero/prod_1_2.jpg'],
          sizes: ['S', 'M', 'L', 'XL', 'XXL'],
          colors: colors,
          description: `Designed for everyday luxury and effortless style. Features ultra-soft combed cotton with reinforced stitching for long-lasting shape retention.`,
          tags: ['Bestseller', '100% Cotton', 'Super Combed', 'Travel Ready']
        });
        console.log(`Saved Product: ${id} - ${cleanTitle} (${downloadedImgPaths.length} images)`);
      }
    } catch (colErr) {
      console.error(`Error processing collection ${col.category}:`, colErr.message);
    }
  }

  console.log(`\nTotal products created: ${allProducts.length}`);

  // Save to server/data/downloaded_products.json
  const prodJsonPath = path.join(__dirname, '../server/data/downloaded_products.json');
  fs.writeFileSync(prodJsonPath, JSON.stringify(allProducts, null, 2));

  // Also format banners for db.json
  const formattedBanners = heroBanners.map(b => ({
    id: b.id,
    title: b.title,
    subtitle: b.subtitle,
    ctaText: b.ctaText,
    ctaLink: b.ctaLink,
    badge: b.badge,
    desktopImage: `/images/nobero/${b.desktopFile}`,
    mobileImage: `/images/nobero/${b.mobileFile}`,
    active: true,
    order: b.order
  }));

  // Update server/data/db.json
  const dbPath = path.join(__dirname, '../server/data/db.json');
  let currentDb = {};
  if (fs.existsSync(dbPath)) {
    try {
      currentDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    } catch (e) {}
  }

  currentDb.heroBanners = formattedBanners;
  currentDb.products = allProducts;
  fs.writeFileSync(dbPath, JSON.stringify(currentDb, null, 2));
  console.log('Successfully updated server/data/db.json with new hero banners and products!');
}

main().catch(err => {
  console.error('Script error:', err);
  process.exit(1);
});
