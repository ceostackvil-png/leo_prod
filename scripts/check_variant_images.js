import fs from 'fs';

async function checkVariantImages() {
  const res = await fetch('https://nobero.com/products/classic-polo-t-shirt.json');
  const d = await res.json();
  const p = d.product;
  const colors = p.options.find(o => o.name.toLowerCase().includes('color')).values;

  for (const c of colors) {
    const v = p.variants.find(v => v.option1 === c);
    const img = p.images.find(i => i.id === v?.image_id);
    console.log(`Color: "${c}" -> variant.image_id: ${v?.image_id} -> file: ${img?.src.split('?')[0].split('/').pop()}`);
  }
}

checkVariantImages();
