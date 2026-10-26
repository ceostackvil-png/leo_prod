import fs from 'fs';

function inspectBlog(slug) {
  const html = fs.readFileSync(`scripts/raw_${slug}.html`, 'utf8');
  console.log(`\n================== ${slug} ==================`);
  
  // Find article content
  const start = html.indexOf('<div class="article__content') !== -1 
    ? html.indexOf('<div class="article__content') 
    : html.indexOf('<article');
  
  const end = html.indexOf('id="shopify-section-footer"');
  const body = html.substring(start !== -1 ? start : 0, end !== -1 ? end : html.length);
  
  // Extract all H2s and first paragraph under each
  const parts = body.split(/<h2[^>]*>/i);
  console.log(`Found ${parts.length - 1} H2 sections:`);
  parts.slice(1).forEach((p, idx) => {
    const title = p.substring(0, p.indexOf('</h2>')).replace(/<[^>]+>/g, '').trim();
    const text = p.substring(p.indexOf('</h2>') + 5).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 250);
    console.log(`\n[${idx + 1}] ${title}`);
    console.log(`   ${text}`);
  });
}

inspectBlog('mens-shorts-trends-2025');
inspectBlog('mens-shorts-outfit-ideas');
inspectBlog('find-your-perfect-pair-of-shorts');
