import https from 'https';
import fs from 'fs';

https.get('https://nobero.com/collections/classic-polo', { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/classic_polo.html', data);
    console.log('Saved classic_polo.html, size:', data.length);
    
    // Look for banner images
    const regex = /(?:src|srcset|href|content)=["']([^"']+\.(?:jpg|jpeg|png|webp|avif)[^"']*)["']/gi;
    const matches = new Set();
    let m;
    while ((m = regex.exec(data)) !== null) {
      matches.add(m[1]);
    }
    console.log('Media matches found:', matches.size);
    Array.from(matches).forEach(u => {
      if (/banner|polo|plp|hb|des|mob/i.test(u)) {
        console.log('  ->', u);
      }
    });
    
    const p1 = data.search(/POLOS THAT MOVE/i);
    const p2 = data.search(/Ready for every plan/i);
    const p3 = data.search(/B2G10/i);
    console.log('Text matches:', { p1, p2, p3 });
    if (p1 !== -1) {
      console.log('Around POLOS THAT MOVE:');
      console.log(data.substring(p1 - 300, p1 + 500));
    }
  });
}).on('error', e => console.error(e.message));
