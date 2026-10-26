import https from 'https';
import fs from 'fs';

https.get('https://loox.io/widget/PHBYpxGOVx/reviews', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/loox_reviews.json', data);
    console.log('Saved loox_reviews.json, length:', data.length);
    try {
      const json = JSON.parse(data);
      console.log('Keys:', Object.keys(json));
      if (Array.isArray(json.reviews)) {
        console.log('Reviews count:', json.reviews.length);
        console.log('Sample review:', json.reviews[0]);
      }
    } catch (e) {
      console.log('Not JSON, first 500 chars:', data.slice(0, 500));
    }
  });
}).on('error', e => console.error(e.message));
