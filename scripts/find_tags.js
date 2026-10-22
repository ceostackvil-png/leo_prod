import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_shackets.html', 'utf8');

// Find all occurrences of 'tag' or 'badge' or 'bestseller'
const lines = html.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('bestseller') || lines[i].includes('BESTSELLER') || lines[i].includes('product-tag')) {
    console.log(`Line ${i}:`, lines[i].trim().substring(0, 200));
  }
}
