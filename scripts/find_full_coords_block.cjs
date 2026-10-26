const https = require('https');

https.get('https://nobero.com', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const idx = data.indexOf('Curated_Looks_megamenu');
    console.log(data.slice(idx - 1500, idx + 1000));
  });
});
