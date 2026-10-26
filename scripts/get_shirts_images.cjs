const https = require('https');

https.get('https://nobero.com/collections/shirts-for-men', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const allImgs = data.match(/https:\/\/nobero\.com\/cdn\/shop\/files\/[a-zA-Z0-9_.-]+(?:jpg|jpeg|png|webp)/gi) || [];
    console.log('Unique images in shirts-for-men:');
    [...new Set(allImgs)].forEach(img => console.log(img));
  });
});
