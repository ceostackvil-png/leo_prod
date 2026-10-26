import https from 'https';
import fs from 'fs';

// Search Nobero products for graphic tee
const searchTerms = ['japanese', 'torii', 'cherry', 'graphic', 'back-print', 'oversized'];

function searchNobero(term) {
  return new Promise((resolve) => {
    https.get(`https://nobero.com/search/suggest.json?q=${term}&resources[type]=product`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ term, products: json.resources.results.products });
        } catch (e) {
          resolve({ term, products: [] });
        }
      });
    }).on('error', () => resolve({ term, products: [] }));
  });
}

async function run() {
  for (const t of searchTerms) {
    const res = await searchNobero(t);
    console.log(`Results for ${t}:`, res.products.length);
    res.products.forEach(p => console.log('  ', p.title, '->', p.url));
  }
}

run();
