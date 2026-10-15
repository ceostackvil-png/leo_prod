import fs from 'fs';

async function testPageImages() {
  const url = 'https://nobero.com/collections/classic-polo';
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  const html = await res.text();
  
  // Find all img tags src and data-src and srcset
  const srcRegex = /<img[^>]+(?:src|data-src)=["']([^"']+)["']/gi;
  const matches = [];
  let m;
  while ((m = srcRegex.exec(html)) !== null) {
    matches.push(m[1]);
  }

  // Also check for background-image: url(...)
  const bgRegex = /url\(["']?(https:\/\/[^"')]+)["']?\)/gi;
  while ((m = bgRegex.exec(html)) !== null) {
    matches.push(m[1]);
  }

  const shopifyImgs = [...new Set(matches.filter(u => u.includes('cdn.shopify.com')))];
  console.log('Found Shopify images in HTML:', shopifyImgs.length);
  console.log('Sample:', shopifyImgs.slice(0, 10));
}

testPageImages();
