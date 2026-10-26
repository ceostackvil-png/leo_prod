import https from 'https';
import fs from 'fs';

https.get('https://nobero.com', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/nobero_home.html', data);
    console.log('Saved nobero_home.html, size:', data.length);
    
    // Search for reviews
    const m1 = data.search(/Shehla/i);
    const m2 = data.search(/Rohit/i);
    const m3 = data.search(/Siddhi/i);
    const m4 = data.search(/shirt jacket has become/i);
    console.log('Matches:', { m1, m2, m3, m4 });
    
    if (m4 !== -1) {
      const slice = data.substring(m4 - 500, m4 + 2500);
      fs.writeFileSync('scripts/review_section_raw.html', slice);
      console.log('Saved review_section_raw.html!');
    }
  });
});
