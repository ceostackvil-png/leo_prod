import https from 'https';
import fs from 'fs';

function fetchPage(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

async function run() {
  const html = await fetchPage('https://nobero.com/products/ikigai-oversized-tee');
  console.log('Ikigai length:', html.length);
  const m1 = html.search(/Siddhi/i);
  const m2 = html.search(/bone white/i);
  const m3 = html.search(/Loved the colour/i);
  console.log('Matches:', { m1, m2, m3 });
  if (m1 !== -1) {
    console.log(html.substring(m1 - 200, m1 + 500));
  } else {
    // Search in loox reviews of this product
    const looxImgs = html.match(/images\.loox\.io\/uploads\/[^\s"'>]+/gi) || [];
    console.log('Loox images on page:', looxImgs);
  }
}

run();
