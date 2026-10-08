const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const clientImagesDir = path.join(__dirname, '../client/public/images/nobero');

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    let fullUrl = url;
    if (fullUrl.startsWith('//')) fullUrl = 'https:' + fullUrl;
    
    const client = fullUrl.startsWith('https') ? https : http;
    const req = client.get(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Referer': 'https://nobero.com/'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode}`));
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

async function run() {
  const dbPath = path.join(__dirname, '../server/data/db.json');
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  
  console.log(`Current products in DB: ${db.products.length}`);
  let nextIndex = db.products.length + 1;

  const res = await fetchJson('https://nobero.com/collections/all-bottomwear/products.json');
  const bottomwearItems = (res.products || []).slice(0, 12);

  for (const item of bottomwearItems) {
    const id = `leo-${nextIndex++}`;
    const cleanTitle = item.title.replace(/Nobero/gi, 'LEO');
    const slug = item.handle;
    const isCargo = cleanTitle.toLowerCase().includes('cargo');
    const category = isCargo ? 'cargos' : 'joggers';

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

    const price = Math.round(parseFloat(item.variants[0]?.price || '999'));
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
            code: cIdx === 0 ? '#1E293B' : cIdx === 1 ? '#334155' : cIdx === 2 ? '#475569' : '#0F172A',
            image: downloadedImgPaths[0] || '/images/nobero/col_joggers_exact.jpg'
          });
        });
      }
    }
    if (colors.length === 0) {
      colors.push({ name: 'Jet Black', code: '#18181B', image: downloadedImgPaths[0] || '/images/nobero/col_joggers_exact.jpg' });
      colors.push({ name: 'Military Olive', code: '#3F4A3C', image: downloadedImgPaths[1] || downloadedImgPaths[0] });
    }

    const newProd = {
      id: id,
      title: cleanTitle,
      subtitle: isCargo ? 'Men 6-Pocket Cargo Joggers' : 'Men 4-Way Stretch Travel Joggers',
      slug: slug,
      price: price,
      mrp: comparePrice,
      discount: `${discountPct}% OFF`,
      lowestPrice30Days: Math.round(price * 0.95),
      rating: 4.8,
      reviewCount: Math.floor(Math.random() * 300) + 90,
      isBestseller: true,
      isFavourite: nextIndex % 2 === 0,
      category: category,
      fit: 'Relaxed Tapered Fit',
      fabric: '95% Premium Combed Cotton, 5% Spandex French Terry, 320 GSM',
      care: 'Machine wash cold inside-out, tumble dry low.',
      sku: `LEO-${id.toUpperCase()}`,
      inventory: 60,
      image: downloadedImgPaths[0] || '/images/nobero/col_joggers_exact.jpg',
      secondaryImage: downloadedImgPaths[1] || downloadedImgPaths[0] || '/images/nobero/col_cargos_exact.jpg',
      images: downloadedImgPaths.length > 0 ? downloadedImgPaths : ['/images/nobero/col_joggers_exact.jpg'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: colors,
      description: `Engineered for effortless transit and all-day mobility with deep secure zip pockets and four-way stretch comfort.`,
      tags: ['Bestseller', '4-Way Stretch', 'Zip Pockets', 'Travel Ready']
    };

    db.products.push(newProd);
    console.log(`Added bottomwear: ${id} - ${cleanTitle}`);
  }

  // Also update looks images in db.looks
  if (db.looks) {
    db.looks[0].image = '/images/nobero/col_coords_exact.jpg';
    if (db.looks[1]) db.looks[1].image = '/images/nobero/mood_travel.jpg';
    if (db.looks[2]) db.looks[2].image = '/images/nobero/col_cargos_exact.jpg';
    if (db.looks[3]) db.looks[3].image = '/images/nobero/mood_cozy.jpg';
  }

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  fs.writeFileSync(path.join(__dirname, '../server/data/downloaded_products.json'), JSON.stringify(db.products, null, 2));
  console.log(`Updated DB! Total products now: ${db.products.length}`);
}

run().catch(console.error);
