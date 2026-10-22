import fs from 'fs';

const html = fs.readFileSync('scripts/nobero_home.html', 'utf8');

const imgIdx = html.indexOf('HB_Hoodies_Jackets_des.jpg');
if (imgIdx !== -1) {
  // Let's go backwards and print every opening tag up to 2000 chars before
  const chunk = html.substring(imgIdx - 2500, imgIdx + 200);
  console.log('--- CHUNK BEFORE DESKTOP IMAGE ---');
  console.log(chunk);
}
