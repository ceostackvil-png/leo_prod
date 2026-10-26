import https from 'https';

https.get('https://nobero.com/blogs/shorts', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const articleLinks = [];
    const regex = /<a[^>]+href=["'](\/blogs\/shorts\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let m;
    while ((m = regex.exec(data)) !== null) {
      articleLinks.push({ href: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() });
    }
    console.log('Article links on /blogs/shorts:');
    articleLinks.forEach(l => console.log(l.href, '->', l.text));
  });
});
