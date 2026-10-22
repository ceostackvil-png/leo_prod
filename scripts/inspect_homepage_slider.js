import fs from 'fs';

async function fetchHome() {
  try {
    const res = await fetch('https://nobero.com', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await res.text();
    fs.writeFileSync('scripts/nobero_home.html', html);
    console.log('Saved nobero_home.html, size:', html.length);

    // Search for hero slider or slideshow
    const slideMatches = html.match(/<section[^>]*hero[^>]*>[\s\S]*?<\/section>/i) ||
                         html.match(/<section[^>]*slider[^>]*>[\s\S]*?<\/section>/i) ||
                         html.match(/class="[^"]*slideshow[^"]*"[^>]*>[\s\S]*?<\/div>/i);
    
    // Search for diamond pagination dots
    const dotsMatch = html.match(/class="[^"]*slider-dots[^"]*"[^>]*>[\s\S]*?<\/div>/i) ||
                      html.match(/class="[^"]*dots[^"]*"[^>]*>[\s\S]*?<\/div>/i) ||
                      html.match(/class="[^"]*pagination[^"]*"[^>]*>[\s\S]*?<\/div>/i);
    
    console.log('Slider section match:', slideMatches ? slideMatches[0].substring(0, 400) : 'None');
    console.log('Dots match:', dotsMatch ? dotsMatch[0].substring(0, 400) : 'None');
  } catch(e) {
    console.error('Error fetching:', e.message);
  }
}

fetchHome();
