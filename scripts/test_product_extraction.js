import fs from 'fs';

const COLOR_HEX_MAP = {
  'black': '#111111',
  'white': '#FFFFFF',
  'navy': '#1B2A4A',
  'navy blue': '#1B2A4A',
  'burgundy': '#6A1A24',
  'pecan': '#96715B',
  'pecan brown': '#96715B',
  'espresso': '#3B2F2F',
  'latte': '#C5A992',
  'petunia': '#582B36',
  'aqua blue': '#4BA3E3',
  'mauve mist': '#B784A7',
  'coral': '#FF6F61',
  'deep ocean': '#163E5C',
  'amber yellow': '#FFBF00',
  'cobalt blue': '#0047AB',
  'powder blue': '#B0E0E6',
  'dusty rose': '#DCAE96',
  'rainforest': '#2E5A44',
  'poppy red': '#E32636',
  'highland green': '#355E3B',
  'salmon': '#FA8072',
  'canary': '#FFEF00',
  'olive': '#556B2F',
  'olive green': '#556B2F',
  'sage': '#77815C',
  'sage green': '#77815C',
  'beige': '#D2C6B6',
  'washed beige': '#D2C6B6',
  'grey': '#888888',
  'heather grey': '#888888',
  'charcoal': '#333333',
  'terracotta': '#B85D43'
};

function getColorHex(colorName) {
  const lower = (colorName || '').toLowerCase().trim();
  if (COLOR_HEX_MAP[lower]) return COLOR_HEX_MAP[lower];
  for (const [key, val] of Object.entries(COLOR_HEX_MAP)) {
    if (lower.includes(key)) return val;
  }
  return '#282C3F';
}

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

async function inspectProduct(handle) {
  const res = await fetch(`https://nobero.com/products/${handle}.json`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const p = data.product;

  const colorOption = p.options.find(o => o.name.toLowerCase().includes('color') || o.name.toLowerCase().includes('colour'));
  const sizeOption = p.options.find(o => o.name.toLowerCase().includes('size'));

  const colorNames = colorOption ? colorOption.values : [];
  const sizeNames = sizeOption ? sizeOption.values : ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  // Map colors
  const colors = colorNames.map(name => {
    // Find variant for this color
    const v = p.variants.find(v => v.option1 === name || v.option2 === name);
    let img = null;
    if (v && v.image_id) {
      const match = p.images.find(i => i.id === v.image_id);
      if (match) img = match.src;
    }
    if (!img && p.images && p.images[0]) {
      img = p.images[0].src;
    }
    return {
      name,
      code: getColorHex(name),
      image: img
    };
  });

  // Extract variants
  const variants = p.variants.map(v => ({
    id: v.id,
    title: v.title,
    color: colorOption?.position === 1 ? v.option1 : v.option2,
    size: sizeOption?.position === 1 ? v.option1 : (sizeOption?.position === 2 ? v.option2 : v.option3),
    price: Math.round(parseFloat(v.price) || 0),
    mrp: Math.round(parseFloat(v.compare_at_price) || parseFloat(v.price) * 1.6),
    sku: v.sku || `LEO-${v.id}`,
    available: v.available !== false,
    image: p.images.find(i => i.id === v.image_id)?.src || p.images?.[0]?.src
  }));

  console.log(`Product: ${p.title}`);
  console.log(`Colors (${colors.length}):`, colors.map(c => `${c.name} (${c.code})`).join(', '));
  console.log(`Sizes (${sizeNames.length}):`, sizeNames.join(', '));
  console.log(`Total Variants: ${variants.length}`);
  console.log(`Description preview:`, stripHtml(p.body_html).slice(0, 150));
}

async function main() {
  await inspectProduct('classic-polo-t-shirt');
  console.log('---');
  await inspectProduct('heavy-duty-cargo-jogger');
}

main().catch(console.error);
