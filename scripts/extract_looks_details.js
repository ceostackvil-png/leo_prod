import fs from 'fs';

async function run() {
  const res = await fetch('https://nobero.com');
  const text = await res.text();
  const names = ['Everyday Hoodie Look', 'Misty Calm Look', 'Soft Lounge Look', 'Airport Comfort Look'];
  
  for (const name of names) {
    const idx = text.indexOf(name);
    if (idx === -1) continue;
    const chunk = text.substring(idx - 2500, idx + 1000);
    // Find all images inside this card
    const regex = /src="(https:\/\/nobero\.com\/cdn\/shop\/files\/[^"?\s]+)[^"]*"/g;
    let m;
    const urls = [];
    while ((m = regex.exec(chunk)) !== null) {
      urls.push(m[1]);
    }
    // Also find floating thumbnail texts
    const textMatches = chunk.match(/<span[^>]*>([^<]+)<\/span>/g) || [];
    console.log('=== ' + name + ' ===');
    console.log('URLs:', [...new Set(urls)]);
    console.log('Spans:', textMatches.map(s => s.replace(/<[^>]+>/g, '').trim()).filter(Boolean));
  }
}

run();
