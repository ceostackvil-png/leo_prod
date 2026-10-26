import https from 'https';

const slugs = [
  'mens-shorts-trends-you-need-to-know-in-2025',
  'how-to-style-mens-shorts-the-best-outfit-ideas-for-every-look',
  'find-your-perfect-pair-of-shorts'
];

slugs.forEach(slug => {
  const url = `https://nobero.com/blogs/shorts/${slug}`;
  https.get(url, (res) => {
    console.log(slug, 'Status:', res.statusCode);
  }).on('error', e => console.error(slug, e.message));
});
