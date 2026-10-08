import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_DIR = path.join(__dirname, '..', 'client', 'public', 'images', 'nobero');
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

async function download(url, filename) {
  try {
    let fullUrl = url.startsWith('//') ? `https:${url}` : url;
    fullUrl = fullUrl.split('&')[0]; // get highest base resolution
    const res = await fetch(fullUrl);
    if (!res.ok) return false;
    const buf = await res.arrayBuffer();
    const dest = path.join(TARGET_DIR, filename);
    fs.writeFileSync(dest, Buffer.from(buf));
    console.log(`Saved ${filename} from ${fullUrl} (${buf.byteLength} bytes)`);
    return `/images/nobero/${filename}`;
  } catch(e) {
    console.error(`Error ${url}:`, e.message);
    return false;
  }
}

async function run() {
  console.log('Fetching Nobero homepage source...');
  const res = await fetch('https://nobero.com');
  const html = await res.text();

  // Extract all img src and srcset
  const matches = html.match(/https:\/\/[^"'\s\)]+/g) || [];
  const imageCandidates = matches.filter(u => 
    u.includes('cdn/shop/files/') || 
    u.includes('cdn/shop/collections/') || 
    u.includes('cdn/shop/articles/') || 
    u.includes('cdn/shop/products/') ||
    u.includes('cdn.shopify.com/s/files/')
  );

  console.log(`Found ${imageCandidates.length} image candidates`);

  const unique = [...new Set(imageCandidates.map(u => u.split('?')[0]))];
  console.log(`Unique images: ${unique.length}`);

  let heroCount = 1;
  let blogCount = 1;
  let colCount = 1;
  let prodCount = 1;

  const heroBanners = [];

  for (const imgUrl of unique) {
    const lower = imgUrl.toLowerCase();
    
    // Filter out women wear completely
    if (lower.includes('women') || lower.includes('dress') || lower.includes('crop')) continue;

    if (lower.includes('banner') || lower.includes('hero') || lower.includes('desktop') || lower.includes('main') || lower.includes('slide') || lower.includes('hp_') || lower.includes('homepage')) {
      const filename = `hero_banner_${heroCount}.jpg`;
      const localPath = await download(imgUrl, filename);
      if (localPath) {
        heroBanners.push({
          id: `banner-${heroCount}`,
          title: heroCount === 1 ? 'SUMMER TRAVEL ESSENTIALS' : heroCount === 2 ? 'AIR-FLEX CARGO & JOGGERS' : 'HEAVYWEIGHT OVERSIZED TEES',
          subtitle: '240 GSM BIO-WASHED COTTON & 4-WAY FLEX WEAVE',
          ctaText: 'SHOP NOW',
          ctaLink: '/men',
          badge: heroCount === 1 ? 'NEW ARRIVAL' : 'BESTSELLER',
          desktopImage: localPath,
          mobileImage: localPath,
          active: true,
          order: heroCount
        });
        heroCount++;
      }
    } else if (lower.includes('article') || lower.includes('blog') || lower.includes('sweatshirt') || lower.includes('style')) {
      await download(imgUrl, `blog_${blogCount}.jpg`);
      blogCount++;
    } else if (lower.includes('collection')) {
      await download(imgUrl, `collection_${colCount}.jpg`);
      colCount++;
    }
  }

  // If no explicit hero banners found in static html, download top high-res lifestyle hero banners from collections
  if (heroBanners.length < 3) {
    const fallbackBanners = [
      'https://cdn.shopify.com/s/files/1/0337/9413/0052/collections/Menu_d15011dc-46a1-4c71-8666-3f2a0cd25c40.jpg',
      'https://cdn.shopify.com/s/files/1/0337/9413/0052/collections/15_07961f7b-e70c-4cfa-aebc-53bc6d1d414d.jpg',
      'https://cdn.shopify.com/s/files/1/0337/9413/0052/collections/Tracksuit_9039c9f4-6a15-456d-9078-4a84e4a3806d.jpg',
      'https://cdn.shopify.com/s/files/1/0337/9413/0052/collections/7p_bdea0166-f890-4443-8f12-bdc268921493.jpg'
    ];
    for (let i = 0; i < fallbackBanners.length; i++) {
      const filename = `hero_banner_hq_${i + 1}.jpg`;
      const localPath = await download(fallbackBanners[i], filename);
      if (localPath) {
        heroBanners.push({
          id: `banner-${heroBanners.length + 1}`,
          title: i === 0 ? 'SUMMER TRAVEL ESSENTIALS' : i === 1 ? 'AIR-FLEX 4-WAY STRETCH' : 'MATCHING CO-ORD SETS',
          subtitle: '240 GSM HEAVYWEIGHT COMBED COTTON & 4-WAY TRANSIT WEAVE',
          ctaText: 'EXPLORE COLLECTION',
          ctaLink: '/men',
          badge: i === 0 ? 'NEW ARRIVAL' : 'BESTSELLER',
          desktopImage: localPath,
          mobileImage: localPath,
          active: true,
          order: heroBanners.length + 1
        });
      }
    }
  }

  console.log(`Downloaded ${heroBanners.length} hero banners.`);
  fs.writeFileSync(
    path.join(__dirname, '..', 'server', 'data', 'downloaded_banners.json'),
    JSON.stringify(heroBanners, null, 2)
  );
}

run();
