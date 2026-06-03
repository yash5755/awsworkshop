const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'src');
const indexHtml = path.join(__dirname, 'index.html');
const keyword = 'techverse';

const results = [];

function searchFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.toLowerCase().includes(keyword)) {
      const lines = content.split('\n');
      results.push(`File: ${path.relative(__dirname, filePath)}`);
      lines.forEach((line, idx) => {
        if (line.toLowerCase().includes(keyword)) {
          results.push(`  ${idx + 1}: ${line.trim()}`);
        }
      });
      results.push('');
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
  }
}

function walkDir(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        walkDir(filePath);
      }
    } else {
      if (filePath.endsWith('.jsx') || filePath.endsWith('.js') || filePath.endsWith('.css') || filePath.endsWith('.json')) {
        searchFile(filePath);
      }
    }
  });
}

if (fs.existsSync(directory)) {
  walkDir(directory);
}
if (fs.existsSync(indexHtml)) {
  searchFile(indexHtml);
}

fs.writeFileSync(path.join(__dirname, 'search_results_node.txt'), results.join('\n'));
console.log('Search complete. Output written to search_results_node.txt');
