import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

const target = 'id="shopify-section-template--16047755886758__primary-banner"';
const targetIdx = html.indexOf(target);
const bodyIdx = html.indexOf('<body');

// Find all tags opened between bodyIdx and targetIdx that haven't been closed
const slice = html.substring(bodyIdx, targetIdx);
const openedDivs = [];
const tagRegex = /<([a-z0-9]+)(\s+[^>]*?)?>|<\/([a-z0-9]+)>/gi;
let m;
while ((m = tagRegex.exec(slice)) !== null) {
  if (m[3]) {
    // closing tag
    openedDivs.pop();
  } else if (!m[0].endsWith('/>') && !['img','input','br','hr','meta','link'].includes(m[1].toLowerCase())) {
    openedDivs.push({ tag: m[1], attrs: m[2] || '' });
  }
}
console.log('Open ancestors:');
openedDivs.forEach(d => console.log(`<${d.tag} ${d.attrs.substring(0, 150)}>`));
