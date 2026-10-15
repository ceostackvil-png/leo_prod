import fs from 'fs';

async function testPairing() {
  const res = await fetch('https://nobero.com/products/classic-polo-t-shirt.json');
  const d = await res.json();
  const p = d.product;
  const colors = p.options.find(o => o.name.toLowerCase().includes('color')).values;

  console.log(`Product: ${p.title} (${colors.length} colors)`);

  const colorPairs = colors.map(c => {
    const v = p.variants.find(v => v.option1 === c);
    const frontImg = p.images.find(i => i.id === v?.image_id);
    
    // Look for matching back image
    const cSlug = c.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cWords = c.toLowerCase().split(/\s+/);
    
    // Check all images
    let backImg = p.images.find(i => {
      if (!frontImg || i.id === frontImg.id) return false;
      const src = i.src.toLowerCase();
      const isBack = src.includes('back');
      const matchesColor = cWords.some(w => w.length > 2 && src.includes(w)) || src.includes(cSlug);
      return isBack && matchesColor;
    });

    // Fallback: If no filename contains 'back', check if there's a second image tagged with the color or next image in order
    if (!backImg && frontImg) {
      const frontIdx = p.images.findIndex(i => i.id === frontImg.id);
      if (frontIdx !== -1 && frontIdx + 1 < p.images.length) {
        const nextImg = p.images[frontIdx + 1];
        if (nextImg.src.toLowerCase().includes('back')) {
          backImg = nextImg;
        }
      }
    }

    return {
      color: c,
      front: frontImg ? frontImg.src.split('?')[0].split('/').pop() : 'none',
      back: backImg ? backImg.src.split('?')[0].split('/').pop() : 'none'
    };
  });

  console.table(colorPairs);
}

testPairing();
