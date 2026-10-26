const https = require('https');

https.get('https://nobero.com/collections/fashion-joggers-men', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const titleMatch = data.match(/<title>([^<]*)<\/title>/i);
    console.log('Title:', titleMatch?.[1]);
    const h1 = data.match(/data-testid="plp-page-title-text"[^>]*>([^<]*)<\/h1>/i) || data.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
    console.log('H1:', h1);
    const breadcrumb = data.match(/<nav[^>]*role="navigation"[^>]*>([\s\S]*?)<\/nav>/i);
    if (breadcrumb) {
      console.log('Breadcrumb:', breadcrumb[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
    }
    const countMatch = data.match(/(\d+)\s+items?/i);
    console.log('Count:', countMatch?.[0]);

    // Check banner images
    const banners = data.match(/https:\/\/nobero\.com\/cdn\/shop\/files\/[a-zA-Z0-9_.-]+(?:jpg|jpeg|png|webp)/gi) || [];
    const cbBanners = [...new Set(banners.filter(b => b.includes('CB_') || b.includes('des') || b.includes('mob') || b.includes('banner')))];
    console.log('Banners in fashion-joggers-men:', cbBanners);
  });
});
