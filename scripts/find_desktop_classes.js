import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

const target = 'class="hidden lg:block"';
const idx = html.indexOf(target);
if (idx !== -1) {
  // Let's print out all classes of all elements in this desktop banner container
  const chunk = html.substring(idx, idx + 3000);
  const classes = [...chunk.matchAll(/class="([^"]+)"/g)].map(m => m[1]);
  console.log('Classes inside hidden lg:block:');
  console.log(classes);
}
