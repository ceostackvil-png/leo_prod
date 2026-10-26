import https from 'https';
import fs from 'fs';

function fetchPage(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log('Redirecting to:', res.headers.location);
        resolve(fetchPage(res.headers.location));
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', e => {
      console.error(e.message);
      resolve('');
    });
  });
}

async function run() {
  const urls = [
    'https://nobero.com/collections/polo-t-shirts',
    'https://nobero.com/collections/polos',
    'https://nobero.com/collections/mens-polo-t-shirts'
  ];

  for (const url of urls) {
    console.log(`Checking ${url}...`);
    const data = await fetchPage(url);
    console.log(`Length: ${data.length}`);
    if (data.length > 5000) {
      // Find banner images
      const imgMatches = data.match(/https:\/\/nobero\.com\/cdn\/shop\/files\/[^\s"'>]+/gi) || [];
      const cdnMatches = data.match(/https:\/\/cdn\.shopify\.com\/s\/files\/1\/0337\/9413\/0052\/files\/[^\s"'>]+/gi) || [];
      const allImgs = [...new Set([...imgMatches, ...cdnMatches])];
      console.log('Total images:', allImgs.length);
      const banners = allImgs.filter(i => /banner|polo|plp|hb|des|mob/i.test(i));
      console.log('Banners found:');
      banners.forEach(b => console.log('  ', b));
      
      // Also search for POLOS THAT MOVE in text
      const idx = data.indexOf('POLOS THAT MOVE');
      console.log('Index of "POLOS THAT MOVE":', idx);
      if (idx !== -1) {
        console.log(data.substring(idx - 400, idx + 400));
      }
      
      fs.writeFileSync('scripts/polo_page.html', data);
      break;
    }
  }
}

run();
