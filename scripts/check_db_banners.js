import fs from 'fs';

const db = JSON.parse(fs.readFileSync('server/data/db.json', 'utf8'));
console.log('Hero banners in db.json:');
console.log(db.heroBanners);
