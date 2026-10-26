const https = require('https');

https.get('https://nobero.com/', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const regex = /<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
    let m;
    while ((m = regex.exec(data)) !== null) {
      const text = m[2].replace(/<[^>]+>/g, '').trim();
      if (text.toLowerCase().includes('jogger')) {
        console.log(`Joggers link: text="${text}" href="${m[1]}"`);
      }
    }
  });
});
