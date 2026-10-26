import fs from 'fs';
import path from 'path';

const dbPath = path.resolve('server/data/db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

if (!db.coupons.some(c => c.code === 'B3G15')) {
  db.coupons.push({
    code: 'B3G15',
    type: 'percent',
    value: 15,
    minOrder: 1499,
    description: 'Buy 3 & Get 15% Off with code B3G15',
    active: true,
    usageCount: 340
  });
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log('Added B3G15 coupon to db.json!');
} else {
  console.log('B3G15 already exists in db.json!');
}
