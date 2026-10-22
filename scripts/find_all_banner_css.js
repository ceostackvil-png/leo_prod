import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

// Find all css affecting primary-banner
const styleTags = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
for (const st of styleTags) {
  const css = st[1];
  if (css.includes('primary-banner')) {
    console.log('=== CSS BLOCK ===');
    console.log(css);
  }
}
