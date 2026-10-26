const https = require('https');

https.get('https://nobero.com', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    // Look for mega menu or Co-ords dropdown in the header of Nobero
    const idx = data.indexOf('best-selling-co-ord-sets');
    if (idx !== -1) {
      console.log('Snippet around best-selling-co-ord-sets:');
      console.log(data.slice(Math.max(0, idx - 400), idx + 800));
    } else {
      console.log('best-selling-co-ord-sets not found on homepage');
    }

    const idx2 = data.indexOf('Curated Looks');
    if (idx2 !== -1) {
      console.log('Snippet around Curated Looks:');
      console.log(data.slice(Math.max(0, idx2 - 400), idx2 + 800));
    } else {
      console.log('Curated Looks not found on homepage');
    }
  });
});
