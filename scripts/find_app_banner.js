import fs from 'fs';
const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');
const allFiles = [...new Set(html.match(/https:\/\/nobero\.com\/cdn\/shop\/files\/[^"'\s>]+\.(?:jpg|webp|png)/gi) || [])];
allFiles.forEach(f => console.log(f.split('?')[0]));
