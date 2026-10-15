import fs from 'fs';
import path from 'path';

const DB_PATH = 'C:\\Users\\ASUS\\Downloads\\LEO\\leo_prod\\server\\data\\db.json';

const COLOR_HEX_MAP = {
  'black': '#111111',
  'jet black': '#111111',
  'white': '#FFFFFF',
  'snow white': '#FFFFFF',
  'star white': '#FAFAFA',
  'navy': '#1B2A4A',
  'navy blue': '#1B2A4A',
  'pitch navy': '#131E33',
  'burgundy': '#6A1A24',
  'maroon': '#800000',
  'pecan': '#96715B',
  'pecan brown': '#96715B',
  'espresso': '#3B2F2F',
  'latte': '#C5A992',
  'petunia': '#845070',
  'aqua blue': '#4BA3E3',
  'aqua': '#4BA3E3',
  'mauve mist': '#B784A7',
  'coral': '#FF6F61',
  'deep ocean': '#163E5C',
  'amber yellow': '#D49B28',
  'cobalt blue': '#3D6CA8',
  'powder blue': '#9BC4D6',
  'dusty rose': '#DCAE96',
  'rainforest': '#2E5A44',
  'poppy red': '#CE333B',
  'highland green': '#8F9B82',
  'salmon': '#E68A78',
  'canary': '#D6D472',
  'olive': '#556B2F',
  'olive green': '#556B2F',
  'sage': '#77815C',
  'sage green': '#77815C',
  'beige': '#D2C6B6',
  'washed beige': '#D2C6B6',
  'grey': '#888888',
  'heather grey': '#888888',
  'charcoal': '#333333',
  'terracotta': '#B85D43',
  'khaki': '#C3B091',
  'brown': '#5C4033',
  'coffee': '#4B3621',
  'mustard': '#E1AD01',
  'teal': '#008080',
  'rust': '#B7410E',
  'lilac': '#C8A2C8',
  'mint': '#98FF98',
  'lavender': '#E6E6FA'
};

function getColorHex(colorName) {
  const lower = (colorName || '').toLowerCase().trim();
  if (COLOR_HEX_MAP[lower]) return COLOR_HEX_MAP[lower];
  for (const [key, val] of Object.entries(COLOR_HEX_MAP)) {
    if (lower.includes(key)) return val;
  }
  return '#282C3F';
}

const COLOR_ALIASES = {
  'navy blue': ['navy', 'pitch-navy', 'polopdp-5'],
  'navy': ['navy', 'pitch-navy', 'polopdp-5'],
  'pitch navy': ['pitch-navy', 'navy'],
  'burgundy': ['burgundy', 'purple-notion', 'maroon'],
  'maroon': ['maroon', 'burgundy'],
  'canary': ['canary', 'pale-green', 'yellow'],
  'black': ['black', 'jet-black'],
  'jet black': ['jet-black', 'black'],
  'latte': ['latte'],
  'petunia': ['petunia'],
  'aqua blue': ['aquablue', 'aqua', '15_1f'],
  'mauve mist': ['mauve', 'mauve-mist', '1_786d'],
  'pecan': ['pecan', 'toasted-nut'],
  'espresso': ['espresso', '18_f15d', 'coffee'],
  'coral': ['coral', '2_f616'],
  'deep ocean': ['deep-ocean', 'deepocean', '19_a3b9'],
  'amber yellow': ['amber', 'amber-yellow', 'polo_pdp-29'],
  'cobalt blue': ['cobalt', 'cobalt-blue', '3_7541'],
  'powder blue': ['powderblue', 'powder-blue', 'powder'],
  'dusty rose': ['dustyrose', 'dusty-rose'],
  'rainforest': ['rainforest', 'rf_'],
  'poppy red': ['poppyred', 'poppy-red', 'pr_'],
  'highland green': ['highlandgreen', 'highland-green', '16_2d27'],
  'white': ['white', 'star-white', 'snow-white'],
  'salmon': ['salmon', 'almost-apricot'],
  'olive': ['olive', 'olive-green'],
  'sage': ['sage', 'sage-green'],
  'grey': ['grey', 'gray', 'heather-grey'],
  'charcoal': ['charcoal', 'anthracite'],
  'beige': ['beige', 'washed-beige'],
  'khaki': ['khaki'],
  'terracotta': ['terracotta', 'rust'],
  'rust': ['rust', 'terracotta']
};

// Filter out infographic banners, size charts, macro fabrics
function isInfographicOrBanner(url) {
  const lower = (url || '').toLowerCase();
  const badKeywords = [
    'fabric', 'blend', 'gsm', 'rich-blend', 'pdp-size', 'size-chart',
    'dimension', 'infographic', 'feature', 'spec', 'icon', 'guarantee',
    '1_c2cdd7fd', '2_cd7be2de'
  ];
  return badKeywords.some(k => lower.includes(k));
}

export function matchColorImages(colorName, productImages) {
  const cName = (colorName || '').toLowerCase().trim();
  const cleanImages = (productImages || []).filter(img => !isInfographicOrBanner(typeof img === 'string' ? img : img.src));
  
  const aliases = COLOR_ALIASES[cName] || [
    cName.replace(/\s+/g, '-'),
    cName.replace(/\s+/g, '_'),
    cName.replace(/\s+/g, ''),
    cName
  ];
  
  // Find all matching images
  const matching = [];
  for (const item of cleanImages) {
    const url = typeof item === 'string' ? item : item.src;
    const fn = url.toLowerCase();
    const isMatch = aliases.some(a => fn.includes(a.toLowerCase()));
    if (isMatch) matching.push(url);
  }

  // Separate front and back
  let front = matching.find(img => !img.toLowerCase().includes('back'));
  let back = matching.find(img => img.toLowerCase().includes('back'));

  if (!front && matching.length > 0) front = matching[0];
  if (!back && matching.length >= 2) back = matching[1];
  if (!back && front) back = front; // Front fallback if only 1 image exists

  return { front, back, all: matching };
}

async function fixDbColors() {
  console.log('Reading database from:', DB_PATH);
  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  let fixedCount = 0;

  for (const product of data.products) {
    const rawImages = product.images || (product.image ? [product.image] : []);
    const cleanRawImages = rawImages.filter(img => !isInfographicOrBanner(typeof img === 'string' ? img : img.src));

    if (product.colors && product.colors.length > 0) {
      // Re-map each color with accurate front & back images
      const enrichedColors = [];

      for (let i = 0; i < product.colors.length; i++) {
        const c = product.colors[i];
        const match = matchColorImages(c.name, rawImages);

        let front = match.front;
        let back = match.back;

        // If no match found by name, fallback to paired clean raw images
        if (!front) {
          const pairIdx = (i * 2) % Math.max(cleanRawImages.length, 1);
          front = cleanRawImages[pairIdx] || product.image || '/images/hero-1.jpg';
          back = cleanRawImages[pairIdx + 1] || front;
        }
        if (!back) back = front;

        enrichedColors.push({
          name: c.name,
          code: getColorHex(c.name),
          image: front,
          frontImage: front,
          backImage: back,
          images: front !== back ? [front, back] : [front]
        });
      }

      product.colors = enrichedColors;

      // Update primary image to match first color front
      if (enrichedColors[0]?.frontImage) {
        product.image = enrichedColors[0].frontImage;
      }
      fixedCount++;
    }

    // Also update variants image, frontImage, backImage
    if (product.variants && Array.isArray(product.variants)) {
      product.variants.forEach(v => {
        const matchingColor = product.colors?.find(c => c.name?.toLowerCase() === v.color?.toLowerCase());
        if (matchingColor) {
          v.image = matchingColor.frontImage || matchingColor.image;
          v.frontImage = matchingColor.frontImage;
          v.backImage = matchingColor.backImage;
        }
      });
    }
  }

  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  console.log(`Successfully fixed colors and front/back images for ${fixedCount} products in db.json!`);

  // Verify Classic Polo
  const classicPolo = data.products.find(p => (p.title && p.title.toLowerCase().includes('classic polo')) || p.id.includes('8436277051558'));
  if (classicPolo) {
    console.log('\n--- Classic Polo Verification ---');
    console.log('Title:', classicPolo.title);
    console.log('Colors length:', classicPolo.colors.length);
    console.log('First 5 colors:');
    classicPolo.colors.slice(0, 5).forEach(c => {
      console.log(`- ${c.name}:`);
      console.log(`    Front: ${c.frontImage?.split('/').pop().split('?')[0]}`);
      console.log(`    Back:  ${c.backImage?.split('/').pop().split('?')[0]}`);
    });
  }
}

fixDbColors();
