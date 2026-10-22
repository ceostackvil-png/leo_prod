import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

const start = html.indexOf('data-testid="index-primary-banner"');
if (start !== -1) {
  const chunk = html.substring(start - 100, start + 6000);
  fs.writeFileSync('scripts/nobero_primary_banner.html', chunk);
  console.log('Saved nobero_primary_banner.html');
}
