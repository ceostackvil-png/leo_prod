import https from 'https';
import fs from 'fs';

const blogs = [
  {
    id: 'blog-1',
    slug: 'mens-shorts-trends-2025',
    url: 'https://nobero.com/blogs/shorts/mens-shorts-trends-2025'
  },
  {
    id: 'blog-2',
    slug: 'top-5-mens-shorts-stylish-summer-wardrobe',
    url: 'https://nobero.com/blogs/shorts/top-5-mens-shorts-stylish-summer-wardrobe'
  },
  {
    id: 'blog-3',
    slug: 'mens-shorts-outfit-ideas',
    url: 'https://nobero.com/blogs/shorts/mens-shorts-outfit-ideas'
  },
  {
    id: 'blog-4',
    slug: 'find-your-perfect-pair-of-shorts',
    url: 'https://nobero.com/blogs/shorts/find-your-perfect-pair-of-shorts'
  }
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const results = {};
  for (const b of blogs) {
    console.log(`Fetching ${b.slug}...`);
    try {
      const html = await fetchUrl(b.url);
      results[b.slug] = html;
      fs.writeFileSync(`scripts/raw_${b.slug}.html`, html);
      console.log(`Saved ${b.slug}, length: ${html.length}`);
    } catch (e) {
      console.error(`Error fetching ${b.slug}:`, e.message);
    }
  }
}

run();
