import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

const idx = html.indexOf('customer-review-card');
console.log('Index:', idx);

// Find the enclosing section
const sectionStart = html.lastIndexOf('<section', idx);
const sectionEnd = html.indexOf('</section>', idx);

console.log('Section start:', sectionStart, 'end:', sectionEnd);
const sectionHtml = html.substring(sectionStart, sectionEnd + 10);
fs.writeFileSync('scripts/customer_reviews_full.html', sectionHtml);
console.log('Saved customer_reviews_full.html, size:', sectionHtml.length);
