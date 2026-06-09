const Jimp = require('jimp');

async function main() {
  const file = 'l:/My projects/Nexora AI/frontend/public/favicon.png';
  const image = await Jimp.read(file);
  image.circle();
  await image.writeAsync(file);
  console.log('Favicon cropped to circle.');
}

main().catch(console.error);
