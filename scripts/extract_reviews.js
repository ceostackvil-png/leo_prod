import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

// Find the section containing the reviews
const idx = html.indexOf('The Nobero shirt jacket has become');
console.log('Index:', idx);

// Look backwards for <section or <div with id or class
const before = html.substring(Math.max(0, idx - 5000), idx);
const lastSectionStart = before.lastIndexOf('<section');
console.log('Section start relative:', lastSectionStart);

// Save the full section
const fullSection = html.substring(Math.max(0, idx - 4000), Math.min(html.length, idx + 25000));
fs.writeFileSync('scripts/extracted_reviews_section.html', fullSection);
console.log('Saved extracted_reviews_section.html, length:', fullSection.length);
