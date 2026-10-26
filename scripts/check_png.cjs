const fs = require('fs');

// PNG dimensions parser
function getPngDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (buffer.slice(0, 8).toString('hex') === '89504e470d0a1a0a') {
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height };
  }
  return null;
}

console.log('Jackets_Shackles_Retail_Banner.png:', getPngDimensions('client/public/images/banners/test_cand_1.jpg'));
