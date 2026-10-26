import fs from 'fs';

const html = fs.readFileSync('scripts/loox_page_3.html', 'utf8');

function extractAround(name) {
  const idx = html.indexOf(name);
  if (idx === -1) return;
  const before = html.substring(Math.max(0, idx - 1500), idx);
  const after = html.substring(idx, Math.min(html.length, idx + 2000));
  
  // Image
  const imgMatch = before.match(/src="(\/\/images\.loox\.io\/[^"]+)"/);
  const textMatch = after.match(/class="pre-wrap"[^>]*>([\s\S]*?)<\/div>/);
  
  console.log(`\n=================== ${name} ===================`);
  console.log('Image:', imgMatch ? 'https:' + imgMatch[1] : 'NONE');
  console.log('Review text:', textMatch ? textMatch[1].trim() : 'NONE');
}

extractAround('Siddhi N.');
extractAround('Rohit D.');
