import fs from 'fs';

const html = fs.readFileSync('scripts/loox_reviews.json', 'utf8');

const items = html.split('class="grid-item-wrap');
console.log('Total review items:', items.length - 1);

const reviews = [];

items.slice(1).forEach((item, idx) => {
  // Title / Author
  const titleMatch = item.match(/class="block title">([^<]+)</);
  const author = titleMatch ? titleMatch[1].trim() : '';

  // Image
  const imgMatch = item.match(/src="(\/\/images\.loox\.io\/[^"]+)"/);
  const img = imgMatch ? 'https:' + imgMatch[1] : '';

  const altMatch = item.match(/alt="([^"]*)"/);
  const alt = altMatch ? altMatch[1] : '';

  // Text
  const textMatch = item.match(/class="pre-wrap"[^>]*>([\s\S]*?)<\/div>/);
  let text = textMatch ? textMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  // Stars
  const stars = (item.match(/looxicons-rating-icon/g) || []).length;

  if (author || img || text) {
    reviews.push({
      index: idx,
      author,
      image: img,
      alt,
      stars: stars || 5,
      text
    });
  }
});

console.log('Parsed valid reviews:', reviews.length);
reviews.slice(0, 10).forEach(r => {
  console.log(`[${r.index}] ${r.author} (${r.stars}★): ${r.text.slice(0, 70)}...`);
  console.log(`    Image: ${r.image}`);
});

fs.writeFileSync('scripts/parsed_loox_reviews.json', JSON.stringify(reviews, null, 2));
