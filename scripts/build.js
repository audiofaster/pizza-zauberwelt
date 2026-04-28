const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'src');
const www = path.join(__dirname, '..', 'www');

if (!fs.existsSync(www)) fs.mkdirSync(www, { recursive: true });

function copyDir(srcDir, destDir) {
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) fs.mkdirSync(destPath, { recursive: true });
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(src, www);
console.log('✓ Build complete: src -> www');
