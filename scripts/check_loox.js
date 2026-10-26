import https from 'https';

const shopId = 'my-dream-store-final.myshopify.com';
const looxId = 'PHBYpxGOVx';

// Try typical Loox endpoints
const urls = [
  `https://loox.io/api/reviews?shop=${shopId}&widget=${looxId}&limit=20`,
  `https://loox.io/widget/${looxId}/reviews.json`,
  `https://loox.io/widget/${looxId}/reviews`,
  `https://loox.io/api/v1/reviews?shop_id=${shopId}`
];

urls.forEach(url => {
  https.get(url, res => {
    console.log(url, 'Status:', res.statusCode);
  }).on('error', e => console.log(url, e.message));
});
