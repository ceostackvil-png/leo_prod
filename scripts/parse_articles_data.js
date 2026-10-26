import fs from 'fs';

const blogs = [
  'top-5-mens-shorts-stylish-summer-wardrobe',
  'mens-shorts-trends-2025',
  'mens-shorts-outfit-ideas',
  'find-your-perfect-pair-of-shorts'
];

for (const slug of blogs) {
  const html = fs.readFileSync(`scripts/raw_${slug}.html`, 'utf8');
  console.log(`\n========================================`);
  console.log(`SLUG: ${slug}`);
  console.log(`========================================`);

  // Meta title & description
  const ogTitle = (html.match(/<meta property="og:title" content="([^"]+)"/i) || [])[1] || '';
  const ogDesc = (html.match(/<meta property="og:description" content="([^"]+)"/i) || [])[1] || '';
  const ogImg = (html.match(/<meta property="og:image" content="([^"]+)"/i) || [])[1] || '';
  console.log('Title:', ogTitle);
  console.log('OG Image:', ogImg);

  // Find headings
  const headings = [];
  const hRegex = /<(h[1-4])[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = hRegex.exec(html)) !== null) {
    const text = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (text && !text.includes('Check Delivery') && !text.includes('Menu') && !text.includes('Search') && text.length < 150) {
      headings.push(`${m[1]}: ${text}`);
    }
  }
  console.log('Headings sample:', headings.slice(0, 10));
}
