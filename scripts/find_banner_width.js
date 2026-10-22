import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

// Search for any CSS mentioning max-width or width for primary-banner or banner
const cssMatches = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
for (const match of cssMatches) {
  const content = match[1];
  if (content.includes('primary-banner')) {
    console.log('--- Style block ---');
    console.log(content);
  }
}
