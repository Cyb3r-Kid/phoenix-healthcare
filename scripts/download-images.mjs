import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
const assets = [
  ['hero',7551667,1400],['elderly-care',18459193,900],['home-nursing',7551649,1000],
  ['personal-care',6647061,900],['household-support',29372727,900],['nursing-support',7345461,800],
  ['family',11138458,1000],['indian-senior',11304640,900],['equipment',20164973,1100],['wheelchair',6129583,900],
];
await mkdir('public/images',{recursive:true});
for (const [name,id,width] of assets) {
  if (process.argv[2] && !process.argv[2].split(',').includes(name)) continue;
  const response = await fetch(`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`);
  if (!response.ok) throw new Error(`${name}: ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(`public/images/${name}.webp`,await sharp(bytes).resize({width,withoutEnlargement:true}).webp({quality:82}).toBuffer());
  console.log(`Saved ${name}.webp`);
}
