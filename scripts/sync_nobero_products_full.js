import fs from 'fs';
import path from 'path';

const DB_PATH = 'C:\\Users\\ASUS\\Downloads\\LEO\\leo_prod\\server\\data\\db.json';
const OUTPUT_PATH = 'C:\\Users\\ASUS\\Downloads\\LEO\\leo_prod\\server\\data\\nobero_full_products.json';
const MEN1_BASE = 'C:\\Users\\ASUS\\Downloads\\LEO\\leo_prod\\server\\public\\men(1)';

const COLLECTIONS = [
  { folder: 'POLOS', handle: 'classic-polo', category: 'polos' },
  { folder: 'premium HD  T - shirts', handle: 'premium-hd-tees', category: 't-shirts' },
  { folder: 'T-shirts', handle: 't-shirts', category: 'oversized-tees' },
  { folder: 'hoodies & jackets', handle: 'hoodies-jackets', category: 'hoodies' },
  { folder: 'full sleeves T-shirts', handle: 'full-sleeve-t-shirts', category: 't-shirts' },
  { folder: 'jackets', handle: 'textured-shackets', category: 'jackets' },
  { folder: 'joggers', handle: 'fashion-joggers-men', category: 'joggers' },
  { folder: 'pants', handle: 'mens-cargo-pants', category: 'pants' },
  { folder: 'Co-ords sets', handle: 'best-selling-co-ord-sets', category: 'co-ords' },
  { folder: 'curated looks', handle: 'shop-the-looks', category: 'curated-looks' },
  { folder: 'shorts', handle: 'mens-shorts-collection', category: 'shorts' },
  { folder: 'Active wear', handle: 'men-activewear', category: 'joggers' }
];

const COLOR_HEX_MAP = {
  'black': '#111111',
  'jet black': '#111111',
  'white': '#FFFFFF',
  'snow white': '#FFFFFF',
  'navy': '#1B2A4A',
  'navy blue': '#1B2A4A',
  'pitch navy': '#131E33',
  'burgundy': '#6A1A24',
  'maroon': '#800000',
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

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function getFabricDescription(category, bodyHtml) {
  const text = stripHtml(bodyHtml).toLowerCase();
  if (text.includes('gsm')) {
    const match = text.match(/\b\d{3}\s*gsm[^\.]*/i);
    if (match) return match[0].toUpperCase();
  }
  if (category === 'polos') return '100% Premium Combed Cotton, Breathable Pique Knit (220 GSM)';
  if (category === 'oversized-tees' || category === 't-shirts') return '100% Super Combed Cotton, 240 GSM Pre-Shrunk Bio-Washed';
  if (category === 'hoodies' || category === 'jackets') return 'Heavyweight 380 GSM Bio-Washed French Terry Cotton';
  if (category === 'joggers' || category === 'pants') return 'Air-Flex 4-Way Stretch Twill Cotton, Pre-Shrunk & Wrinkle-Resistant';
  if (category === 'co-ords') return 'Premium Textured Waffle & Combed Cotton Blend (260 GSM)';
  if (category === 'shorts') return 'Heavyweight French Terry Cotton (280 GSM) with Dual Deep Pockets';
  return '100% Super Combed Cotton, Bio-Washed Premium Finish';
}

function getFitDescription(category, title) {
  const t = (title || '').toLowerCase();
  if (t.includes('oversized') || t.includes('boxy')) return 'Oversized Boxy Drop-Shoulder Fit';
  if (t.includes('cargo') || t.includes('jogger')) return 'Athletic Flex Tapered Streetwear Fit';
  if (t.includes('polo')) return 'Tailored Regular Smart-Casual Fit';
  if (t.includes('shacket') || t.includes('jacket')) return 'Relaxed Layering Silhouette';
  if (t.includes('co-ord')) return 'Relaxed Co-Ord Fit';
  return 'Modern Relaxed Fit';
}

const MANDATORY_SIZES = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

async function fetchCollectionProducts(col) {
  const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' };
  let all = [];
  let page = 1;
  while (true) {
    try {
      const res = await fetch(`https://nobero.com/collections/${col.handle}/products.json?limit=250&page=${page}`, { headers });
      if (!res.ok) break;
      const data = await res.json();
      if (!data.products || data.products.length === 0) break;
      all.push(...data.products);
      if (data.products.length < 250) break;
      page++;
    } catch (e) {
      break;
    }
  }
  return all;
}

async function syncAllProducts() {
  console.log('Fetching all products with full variants, colors, sizes, and features...');
  const allEnrichedProducts = [];
  const seenHandles = new Set();

  for (const col of COLLECTIONS) {
    console.log(`Processing collection: ${col.folder} (${col.handle})...`);
    const rawProducts = await fetchCollectionProducts(col);
    console.log(`  Fetched ${rawProducts.length} raw products for ${col.folder}.`);

    // Check if we have local images downloaded in men(1)/col.folder
    const colLocalDir = path.join(MEN1_BASE, col.folder);
    const localFiles = fs.existsSync(colLocalDir) ? fs.readdirSync(colLocalDir) : [];
    const localFileMap = new Map();
    localFiles.forEach(f => {
      // file is usually handle_idx_basename
      localFileMap.set(f, `/men(1)/${encodeURIComponent(col.folder)}/${encodeURIComponent(f)}`);
    });

    for (const p of rawProducts) {
      if (seenHandles.has(p.handle)) continue;
      seenHandles.add(p.handle);

      const colorOption = p.options?.find(o => o.name?.toLowerCase().includes('color') || o.name?.toLowerCase().includes('colour'));
      const sizeOption = p.options?.find(o => o.name?.toLowerCase().includes('size'));

      const colorNames = colorOption?.values || [];
      const extractedSizes = sizeOption?.values || [];
      const sizes = Array.from(new Set([...extractedSizes, ...MANDATORY_SIZES]));

      // Extract all raw images
      const rawImages = (p.images || []).map(img => img.src);
      const primaryImage = rawImages[0] || '/images/hero-1.jpg';
      const secondaryImage = rawImages[1] || primaryImage;

      // Filter out infographic banners, size charts, macro fabrics
      const cleanRawImages = rawImages.filter(img => {
        const lower = (img || '').toLowerCase();
        return !['fabric', 'blend', 'gsm', 'rich-blend', 'pdp-size', 'size-chart', 'dimension', 'infographic', 'feature', 'spec', 'icon', 'guarantee', '1_c2cdd7fd', '2_cd7be2de'].some(k => lower.includes(k));
      });

      // Extract colors with hex codes and authentic front & back images
      let colors = colorNames.map((name, idx) => {
        const cName = name.toLowerCase().trim();
        const aliases = [
          cName,
          cName.replace(/\s+/g, '-'),
          cName.replace(/\s+/g, '_'),
          cName.replace(/\s+/g, '')
        ];
        if (cName.includes('navy')) aliases.push('navy', 'pitch-navy', 'polopdp-5');
        if (cName.includes('burgundy')) aliases.push('burgundy', 'purple-notion', 'maroon');
        if (cName.includes('canary')) aliases.push('canary', 'pale-green', 'yellow');
        if (cName.includes('black')) aliases.push('black', 'jet-black');
        if (cName.includes('aqua')) aliases.push('aquablue', 'aqua', '15_1f');
        if (cName.includes('mauve')) aliases.push('mauve', 'mauve-mist', '1_786d');
        if (cName.includes('pecan')) aliases.push('pecan', 'toasted-nut');
        if (cName.includes('espresso')) aliases.push('espresso', '18_f15d');
        if (cName.includes('coral')) aliases.push('coral', '2_f616');
        if (cName.includes('deep ocean')) aliases.push('deep-ocean', 'deepocean', '19_a3b9');
        if (cName.includes('amber')) aliases.push('amber', 'amber-yellow', 'polo_pdp-29');
        if (cName.includes('cobalt')) aliases.push('cobalt', 'cobalt-blue', '3_7541');
        if (cName.includes('powder')) aliases.push('powderblue', 'powder-blue');
        if (cName.includes('dusty rose')) aliases.push('dustyrose', 'dusty-rose');
        if (cName.includes('rainforest')) aliases.push('rainforest', 'rf_');
        if (cName.includes('poppy')) aliases.push('poppyred', 'poppy-red', 'pr_');
        if (cName.includes('highland')) aliases.push('highlandgreen', 'highland-green', '16_2d27');
        if (cName.includes('white')) aliases.push('white', 'star-white', 'snow-white');
        if (cName.includes('salmon')) aliases.push('salmon', 'almost-apricot');

        const matched = cleanRawImages.filter(url => {
          const fn = url.toLowerCase();
          return aliases.some(a => fn.includes(a));
        });

        let front = matched.find(url => !url.toLowerCase().includes('back'));
        let back = matched.find(url => url.toLowerCase().includes('back'));

        if (!front && matched.length > 0) front = matched[0];
        if (!back && matched.length >= 2) back = matched[1];

        // Fallback to sequential clean image pair
        if (!front) {
          const pairIdx = (idx * 2) % Math.max(cleanRawImages.length, 1);
          front = cleanRawImages[pairIdx] || primaryImage;
          back = cleanRawImages[pairIdx + 1] || front;
        }
        if (!back) back = front;

        return {
          name,
          code: getColorHex(name),
          image: front,
          frontImage: front,
          backImage: back,
          images: front !== back ? [front, back] : [front]
        };
      });

      // Default color fallback if no color option
      if (colors.length === 0) {
        colors = [
          {
            name: 'Standard',
            code: '#111827',
            image: primaryImage
          }
        ];
      }

      // Extract variants
      const variants = (p.variants || []).map(v => {
        const price = Math.round(parseFloat(v.price) || 799);
        const mrp = Math.round(parseFloat(v.compare_at_price) || price * 1.6);
        const discountPct = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 40;

        let vImg = null;
        if (v.image_id) {
          const mImg = p.images?.find(i => i.id === v.image_id);
          if (mImg) vImg = mImg.src;
        }
        if (!vImg) vImg = primaryImage;

        const colName = colorOption?.position === 1 ? v.option1 : (colorOption?.position === 2 ? v.option2 : colors[0].name);
        const szName = sizeOption?.position === 1 ? v.option1 : (sizeOption?.position === 2 ? v.option2 : (sizeOption?.position === 3 ? v.option3 : 'M'));

        return {
          id: v.id,
          title: v.title,
          color: colName,
          size: szName,
          price,
          mrp,
          discount: `${discountPct}% OFF`,
          sku: v.sku || `LEO-${v.id}`,
          available: v.available !== false,
          image: vImg
        };
      });

      // Min price and MRP
      const minPrice = variants.length > 0 ? Math.min(...variants.map(v => v.price)) : 799;
      const matchingVariant = variants.find(v => v.price === minPrice) || variants[0];
      const mrp = matchingVariant ? matchingVariant.mrp : Math.round(minPrice * 1.6);
      const discount = matchingVariant ? matchingVariant.discount : '40% OFF';

      const isBestseller = (p.tags || []).some(t => t.toLowerCase().includes('best') || t.toLowerCase().includes('bs-men'));
      const isFavourite = (p.tags || []).some(t => t.toLowerCase().includes('fav'));

      const cleanDesc = stripHtml(p.body_html) || `Premium luxury ${p.title} engineered with high-density fabric, structured fit, and all-day transit comfort.`;

      const enriched = {
        id: `leo-${p.id}`,
        title: p.title,
        subtitle: "Men's Premium Collection",
        slug: p.handle,
        price: minPrice,
        mrp,
        discount,
        lowestPrice30Days: Math.max(minPrice - 50, 499),
        rating: 4.8,
        reviewCount: 150 + ((p.id % 350)),
        recentlyBought: 300 + ((p.id % 500)),
        isBestseller,
        isFavourite,
        category: col.category,
        fit: getFitDescription(col.category, p.title),
        fabric: getFabricDescription(col.category, p.body_html),
        care: "Machine wash cold inside-out, tumble dry low, do not iron on print.",
        sku: variants[0]?.sku || `LEO-${p.id}`,
        inventory: 99,
        image: primaryImage,
        secondaryImage,
        images: rawImages.length > 0 ? rawImages : [primaryImage],
        sizes,
        colors,
        variants,
        features: {
          cod: "Cash on Delivery",
          freeShipping: "Free Shipping",
          easyReturns: "Easy Returns",
          guarantee: "100% Refund Guarantee if you don't love it"
        },
        description: cleanDesc,
        tags: p.tags || ['Bestseller', '100% Cotton', 'Travel Ready']
      };

      allEnrichedProducts.push(enriched);
    }
  }

  console.log(`\n✔ Total Enriched Products Built: ${allEnrichedProducts.length}`);

  // Save to JSON
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(allEnrichedProducts, null, 2));
  console.log(`Saved full catalog to ${OUTPUT_PATH}`);

  // Update db.json
  if (fs.existsSync(DB_PATH)) {
    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    db.products = allEnrichedProducts;
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    console.log(`Updated ${DB_PATH} with ${allEnrichedProducts.length} fully enriched products!`);
  }
}

syncAllProducts().catch(console.error);
