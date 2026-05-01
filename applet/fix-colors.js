const fs = require('fs');

const path = 'src/index.css';
let css = fs.readFileSync(path, 'utf8');

// Replace rgba(..., opacity) with color-mix
css = css.replace(/rgba\([^,]+,\s*[^,]+,\s*[^,]+,\s*([0-9.]+)\)/g, (full, alpha) => {
  let foundVar = null;
  if (full.includes('146, 64, 14')) foundVar = '--color-caramel';
  else if (full.includes('180, 83, 9')) foundVar = '--color-bronze';
  else if (full.includes('250, 246, 241')) foundVar = '--color-cream';
  else if (full.includes('245, 240, 232')) foundVar = '--color-ivory';
  else if (full.includes('231, 220, 207')) foundVar = '--color-latte';
  else if (full.includes('12, 10, 9')) foundVar = '--color-espresso';
  else if (full.includes('28, 25, 23')) foundVar = '--color-warmgray';
  else if (full.includes('69, 26, 3')) foundVar = '--color-coffee';
  else if (full.includes('0, 0, 0')) return `rgba(0,0,0,${alpha})`; // keep shadow black
  
  if (foundVar) {
    const percentage = (parseFloat(alpha) * 100).toFixed(0);
    return `color-mix(in srgb, var(${foundVar}) ${percentage}%, transparent)`;
  }
  return full;
});

css = css.replace(/rgba\(0,\s*0,\s*0,\s*([0-9.]+)\)/g, (full, alpha) => `rgba(0,0,0,${alpha})`);

fs.writeFileSync(path, css);
console.log('Done!');
