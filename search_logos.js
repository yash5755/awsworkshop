const fs = require('fs');
const path = require('path');

const directory = 'C:/Users/HP/.gemini/antigravity/scratch/downloaded/chunks';
const keywords = ['ACM UMT', 'Logo/', 'Gamer Lounge', 'Cyber Security'];

if (!fs.existsSync(directory)) {
  console.log('Directory not found:', directory);
  process.exit(1);
}

const files = fs.readdirSync(directory);
for (const file of files) {
  if (!file.endsWith('.js')) continue;
  const filePath = path.join(directory, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  for (const kw of keywords) {
    if (content.includes(kw)) {
      console.log(`Keyword '${kw}' found in file '${file}':`);
      const idx = content.indexOf(kw);
      console.log(content.substring(Math.max(0, idx - 200), Math.min(content.length, idx + 500)).replace(/\n/g, ' '));
      console.log('-'.repeat(40));
    }
  }
}
