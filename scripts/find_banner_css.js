import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

// Find all CSS rules for primary-banner or hero
const cssMatches = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
for (const match of cssMatches) {
  const content = match[1];
  if (content.includes('primary-banner') || content.includes('slider-dot-diamond')) {
    console.log('--- FOUND BANNER CSS ---');
    console.log(content.substring(0, 2000));
  }
}

// Also check the container wrapping <div class="hidden lg:block">
const target = '<div class="hidden lg:block">';
const idx = html.indexOf(target);
if (idx !== -1) {
  console.log('--- SURROUNDING CONTAINER OF DESKTOP BANNER ---');
  console.log(html.substring(idx - 600, idx + 200));
}
