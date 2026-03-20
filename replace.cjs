const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/once:\s*true/g, 'once: false');
  fs.writeFileSync(filePath, content);
}

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
files.forEach(f => replaceInFile(path.join(dir, f)));
console.log('Replaced once: true with once: false in all components');
