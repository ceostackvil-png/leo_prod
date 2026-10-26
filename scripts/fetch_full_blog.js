import https from 'https';
import fs from 'fs';

https.get('https://nobero.com/blogs/shorts/top-5-mens-shorts-stylish-summer-wardrobe', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Find where the article body begins and ends
    // Look for 'Top 5 Men'
    const start = data.indexOf('Top 5 Men\'s Shorts for a Stylish Summer Wardrobe');
    // Look for footer or copyright or newsletter
    const end = data.indexOf('id="shopify-section-footer"');
    console.log('start:', start, 'end:', end);
    const body = data.substring(start, end !== -1 ? end : data.length);
    fs.writeFileSync('scripts/extracted_blog_article.html', body);
    console.log('Saved extracted_blog_article.html, size:', body.length);
  });
});
