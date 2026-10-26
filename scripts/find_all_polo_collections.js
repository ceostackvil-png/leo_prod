import https from 'https';

function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  for (let page = 1; page <= 5; page++) {
    const json = await fetchJson(`https://nobero.com/collections.json?limit=250&page=${page}`);
    if (!json || !json.collections || json.collections.length === 0) break;
    const polos = json.collections.filter(c => /polo/i.test(c.title) || /polo/i.test(c.handle));
    polos.forEach(c => console.log('  ', c.title, '-> /collections/' + c.handle, '| image:', c.image?.src));
  }
}

run();
