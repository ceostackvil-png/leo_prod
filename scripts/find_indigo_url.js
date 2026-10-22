async function fetchIndigo() {
  try {
    const res = await fetch('https://nobero.com', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await res.text();
    // Search for all jpg/png in files/ that have 'Indigo' or 'HB_' or 'Traveller' or 'Travel' or 'AW_'
    const matches = [...new Set(html.match(/https:\/\/nobero\.com\/cdn\/shop\/files\/[a-zA-Z0-9_\-\.]+\.(?:jpg|png|webp)/gi) || [])];
    console.log('Found file URLs:', matches.length);
    matches.forEach(m => console.log(m));
  } catch(e) {
    console.error(e.message);
  }
}

fetchIndigo();
