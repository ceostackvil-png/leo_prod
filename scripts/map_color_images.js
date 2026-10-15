import fs from 'fs';

async function mapColorImages() {
  const res = await fetch('https://leo.com/products/classic-polo-t-shirt.json');
  const d = await res.json();
  const p = d.product;
  const colors = p.options.find(o => o.name.toLowerCase().includes('color')).values;

  console.log('All image filenames in product:');
  p.images.forEach((img, idx) => {
    const fn = img.src.split('?')[0].split('/').pop();
    console.log(`[${idx}] id=${img.id} alt="${img.alt}" -> ${fn}`);
  });

  console.log('\nMatching colors to front & back:');
  colors.forEach(col => {
    const cLow = col.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cWords = col.toLowerCase().split(/\s+/).filter(w => w.length > 2);

    // Find images that match this color name in alt or filename
    const matched = p.images.filter(img => {
      const alt = (img.alt || '').toLowerCase();
      const fn = img.src.toLowerCase();
      if (alt.includes(col.toLowerCase())) return true;
      if (fn.includes(cLow)) return true;
      return cWords.some(w => fn.includes(w));
    });

    const front = matched.find(m => !m.src.toLowerCase().includes('back')) || matched[0];
    const back = matched.find(m => m.src.toLowerCase().includes('back')) || (matched.length > 1 ? matched[1] : null);

    console.log(`Color: "${col}" -> Matched: ${matched.length} | Front: ${front?.src.split('/').pop().split('?')[0]} | Back: ${back?.src.split('/').pop().split('?')[0]}`);
  });
}

mapColorImages();
