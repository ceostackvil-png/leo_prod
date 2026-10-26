const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../server/data/db.json');
const dlPath = path.resolve(__dirname, '../server/data/downloaded_products.json');

const SHOPIFY_PREFIX = 'https://cdn.shopify.com/s/files/1/0337/9413/0052/files/';

function replaceShopifyUrl(val) {
  if (typeof val === 'string' && val.includes(SHOPIFY_PREFIX)) {
    const filename = val.split(SHOPIFY_PREFIX)[1].split('?')[0];
    return `/images/products/${filename}`;
  }
  return val;
}

function processObject(obj) {
  if (typeof obj === 'string') {
    return replaceShopifyUrl(obj);
  }
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    return obj.map(item => processObject(item));
  }
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      result[key] = replaceShopifyUrl(value);
    } else if (typeof value === 'object' && value !== null) {
      result[key] = processObject(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

console.log('Reading db.json...');
const rawDb = fs.readFileSync(dbPath, 'utf8');
const db = JSON.parse(rawDb);
console.log('Processing db.json...');
const newDb = processObject(db);
fs.writeFileSync(dbPath, JSON.stringify(newDb, null, 2), 'utf8');
console.log('Successfully updated db.json!');

if (fs.existsSync(dlPath)) {
  console.log('Reading downloaded_products.json...');
  const dl = JSON.parse(fs.readFileSync(dlPath, 'utf8'));
  const newDl = processObject(dl);
  fs.writeFileSync(dlPath, JSON.stringify(newDl, null, 2), 'utf8');
  console.log('Successfully updated downloaded_products.json!');
}

const serverPath = path.resolve(__dirname, '../server/server.js');
if (fs.existsSync(serverPath)) {
  console.log('Reading server.js...');
  const lines = fs.readFileSync(serverPath, 'utf8').split('\n');
  let replaced = 0;
  const newLines = lines.map(line => {
    // Skip the line defining shopifyUrl fallback
    if (line.includes('const shopifyUrl =') || line.includes('return res.redirect(302, `https://cdn.shopify.com')) {
      return line;
    }
    if (line.includes(SHOPIFY_PREFIX)) {
      replaced++;
      return line.replace(new RegExp(SHOPIFY_PREFIX + '([^"\'?]+)(?:\\?[^"\']*)?', 'g'), '/images/products/$1');
    }
    return line;
  });
  fs.writeFileSync(serverPath, newLines.join('\n'), 'utf8');
  console.log(`Successfully updated server.js! Replaced ${replaced} lines.`);
}

