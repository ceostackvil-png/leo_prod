const https = require('https');

function fetch(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

async function run() {
  const pages = [
    'https://nobero.com/collections/joggers',
    'https://nobero.com/collections/mens-joggers',
    'https://nobero.com/collections/joggers-for-men',
    'https://nobero.com/collections/cargo-joggers',
    'https://nobero.com/collections/cargos',
    'https://nobero.com/collections/pants'
  ];

  for (const p of pages) {
    console.log('=== Checking', p, '===');
    const data = await fetch(p);
    const title = data.match(/<title>([^<]*)<\/title>/i);
    console.log('Title:', title?.[1]);
    const banners = data.match(/https:\/\/nobero\.com\/cdn\/shop\/files\/[a-zA-Z0-9_.-]+(?:jpg|jpeg|png|webp)/gi) || [];
    const bannerMatches = [...new Set(banners.filter(b => 
      b.includes('CB_') || 
      b.includes('WhatsApp') || 
      b.includes('Jogger') || 
      b.includes('jogger') || 
      b.includes('des') || 
      b.includes('mob')
    ))];
    console.log('Banners in', p, ':', bannerMatches);
  }
}

run();
