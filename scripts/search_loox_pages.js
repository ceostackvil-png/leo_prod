import https from 'https';
import fs from 'fs';

function fetchPage(page) {
  return new Promise((resolve) => {
    https.get(`https://loox.io/widget/PHBYpxGOVx/reviews?page=${page}`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

async function run() {
  for (let page = 1; page <= 6; page++) {
    const html = await fetchPage(page);
    console.log(`Page ${page} length: ${html.length}`);
    const m1 = html.search(/Siddhi/i);
    const m2 = html.search(/Rohit D/i);
    const m3 = html.search(/bone white/i);
    console.log(`  Page ${page} matches:`, { m1, m2, m3 });
    if (m1 !== -1) {
      console.log('FOUND SIDDHI on page', page);
      console.log(html.substring(m1 - 300, m1 + 600));
      fs.writeFileSync(`scripts/loox_page_${page}.html`, html);
    }
    if (m2 !== -1) {
      console.log('FOUND ROHIT D on page', page);
      console.log(html.substring(m2 - 300, m2 + 600));
    }
  }
}

run();
