import fs from 'fs';

async function main() {
  const res = await fetch('https://nobero.com/products/bomber-fleece-jacket-9');
  const html = await res.text();
  fs.writeFileSync('scripts/nobero_pdp.html', html);
  console.log('Saved nobero_pdp.html, length:', html.length);

  // Find buttons: Add to Cart, Buy Now
  const atcIdx = html.indexOf('name="add"');
  if (atcIdx !== -1) {
    console.log('ATC Button snippet:\n', html.substring(atcIdx - 100, atcIdx + 400));
  }

  // Find Trust Strip or Key Features
  const trustIdx = html.indexOf('Free Shipping') !== -1 ? html.indexOf('Free Shipping') : html.indexOf('7 Days');
  if (trustIdx !== -1) {
    console.log('Trust strip snippet:\n', html.substring(trustIdx - 50, trustIdx + 300));
  }

  // Find Accordions: Details, Fabric, Wash Care
  const accIdx = html.indexOf('Product Description') !== -1 ? html.indexOf('Product Description') : html.indexOf('Product Details');
  if (accIdx !== -1) {
    console.log('Accordion snippet:\n', html.substring(accIdx - 50, accIdx + 400));
  }
}

main().catch(console.error);
