async function scrapeBanners() {
  const res = await fetch('https://nobero.com', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const html = await res.text();
  
  // Find all desktop primary banner image sources
  const matches = [...html.matchAll(/src="([^"]*HB_[^"]*|[^"]*Banner[^"]*|[^"]*desktop[^"]*|[^"]*BluChip[^"]*|[^"]*Indigo[^"]*|[^"]*Travel[^"]*)"/gi)];
  console.log('Matches count:', matches.length);
  matches.forEach(m => console.log(m[1]));
  
  // Also find all img tags inside primary-banner
  const primaryIdx = html.indexOf('primary-banner_template--');
  if (primaryIdx !== -1) {
    const chunk = html.substring(primaryIdx, primaryIdx + 20000);
    const imgs = [...chunk.matchAll(/src="([^"]+)"/g)];
    console.log('\nAll images in primary-banner:');
    imgs.forEach(img => console.log(img[1]));
  }
}

scrapeBanners();
