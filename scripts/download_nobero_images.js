import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_DIR = path.join(__dirname, '..', 'client', 'public', 'images', 'nobero');
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

async function downloadImage(url, filename) {
  try {
    const cleanUrl = url.split('?')[0];
    const res = await fetch(cleanUrl);
    if (!res.ok) {
      console.error(`Failed to fetch ${url}: ${res.statusText}`);
      return false;
    }
    const buffer = await res.arrayBuffer();
    const filePath = path.join(TARGET_DIR, filename);
    fs.writeFileSync(filePath, Buffer.from(buffer));
    console.log(`Saved: ${filename} (${buffer.byteLength} bytes)`);
    return `/images/nobero/${filename}`;
  } catch (err) {
    console.error(`Error downloading ${url}:`, err.message);
    return false;
  }
}

async function run() {
  console.log('Fetching Men Collection products from Nobero...');
  const res = await fetch('https://nobero.com/collections/men-collection/products.json?limit=50');
  const data = await res.json();
  const products = data.products || [];

  console.log(`Found ${products.length} products`);

  const downloadedProducts = [];

  for (let i = 0; i < Math.min(products.length, 12); i++) {
    const p = products[i];
    const mainImgUrl = p.images?.[0]?.src;
    const secImgUrl = p.images?.[1]?.src || mainImgUrl;

    const mainFilename = `prod_${i + 1}_1.jpg`;
    const secFilename = `prod_${i + 1}_2.jpg`;

    let mainPath = '';
    let secPath = '';

    if (mainImgUrl) {
      mainPath = await downloadImage(mainImgUrl, mainFilename);
    }
    if (secImgUrl) {
      secPath = await downloadImage(secImgUrl, secFilename);
    }

    downloadedProducts.push({
      id: `leo-10${i + 1}`,
      title: p.title,
      subtitle: p.product_type || '240 GSM Bio-Washed Combed Cotton',
      slug: p.handle,
      price: parseFloat(p.variants?.[0]?.price) || 799,
      mrp: parseFloat(p.variants?.[0]?.compare_at_price) || (parseFloat(p.variants?.[0]?.price) ? parseFloat(p.variants?.[0]?.price) * 2 : 1599),
      discount: '50% OFF',
      lowestPrice30Days: parseFloat(p.variants?.[0]?.price) ? Math.round(parseFloat(p.variants?.[0]?.price) * 0.95) : 749,
      rating: 4.8 + Math.round(Math.random() * 2) / 10,
      reviewCount: 600 + Math.floor(Math.random() * 1200),
      isBestseller: i < 4,
      isFavourite: i % 2 === 0,
      category: p.handle.includes('hoodie') ? 'hoodies' : p.handle.includes('jogger') || p.handle.includes('cargo') ? 'joggers' : p.handle.includes('polo') ? 'polos' : p.handle.includes('co-ord') ? 'co-ords' : 'oversized-tees',
      fit: 'Oversized Boxy Fit',
      fabric: '100% Super Combed Cotton, 240 GSM',
      care: 'Machine wash cold inside-out, tumble dry low.',
      sku: `LEO-SKU-00${i + 1}`,
      inventory: 50 + Math.floor(Math.random() * 40),
      image: mainPath,
      secondaryImage: secPath || mainPath,
      colors: p.options?.find(o => o.name.toLowerCase().includes('color'))?.values?.slice(0, 3)?.map((val, idx) => ({
        name: val,
        hex: idx === 0 ? '#111111' : idx === 1 ? '#1A2A3A' : '#5A6B5C',
        image: mainPath,
        secondaryImage: secPath || mainPath
      })) || [
        { name: 'Pitch Black', hex: '#111111', image: mainPath, secondaryImage: secPath || mainPath },
        { name: 'Navy Blue', hex: '#1A2A3A', image: mainPath, secondaryImage: secPath || mainPath }
      ],
      sizes: [
        { name: 'S', stock: 10 },
        { name: 'M', stock: 25 },
        { name: 'L', stock: 30 },
        { name: 'XL', stock: 15 },
        { name: 'XXL', stock: 6 }
      ],
      description: p.body_html?.replace(/<[^>]*>?/gm, '').slice(0, 200) || 'Engineered with premium combed cotton for everyday comfort and durability.'
    });
  }

  // Also download collection category images
  const collectionUrls = [
    { name: 'col_travel.jpg', url: 'https://cdn.shopify.com/s/files/1/0337/9413/0052/collections/Menu_d15011dc-46a1-4c71-8666-3f2a0cd25c40.jpg' },
    { name: 'col_polo.jpg', url: 'https://cdn.shopify.com/s/files/1/0337/9413/0052/collections/7p_bdea0166-f890-4443-8f12-bdc268921493.jpg' },
    { name: 'col_cargo.jpg', url: 'https://cdn.shopify.com/s/files/1/0337/9413/0052/collections/15_07961f7b-e70c-4cfa-aebc-53bc6d1d414d.jpg' },
    { name: 'col_joggers.jpg', url: 'https://cdn.shopify.com/s/files/1/0337/9413/0052/collections/11p.jpg' },
    { name: 'col_coord.jpg', url: 'https://cdn.shopify.com/s/files/1/0337/9413/0052/collections/34p.jpg' },
    { name: 'col_hoodie.jpg', url: 'https://cdn.shopify.com/s/files/1/0337/9413/0052/collections/21p.jpg' },
    { name: 'col_active.jpg', url: 'https://cdn.shopify.com/s/files/1/0337/9413/0052/collections/Active_shorts_1.jpg' },
    { name: 'col_shorts.jpg', url: 'https://cdn.shopify.com/s/files/1/0337/9413/0052/collections/Active_Joggers.jpg' },
    { name: 'col_sweatshirt.jpg', url: 'https://cdn.shopify.com/s/files/1/0337/9413/0052/collections/27p.jpg' }
  ];

  for (const c of collectionUrls) {
    await downloadImage(c.url, c.name);
  }

  const manifestPath = path.join(__dirname, '..', 'server', 'data', 'downloaded_products.json');
  fs.writeFileSync(manifestPath, JSON.stringify(downloadedProducts, null, 2));
  console.log(`Saved ${downloadedProducts.length} product entries to manifest.`);
}

run();
