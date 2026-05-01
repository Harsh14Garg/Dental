const fs = require('fs');

const path = 'src/index.css';
let css = fs.readFileSync(path, 'utf8');

// Replace standard rgb values with their corresponding color variables
const replacements = [
  { match: /rgba\(146, 64, 14,/g, var: '--color-caramel' },
  { match: /rgba\(180, 83, 9,/g, var: '--color-bronze' },
  { match: /rgba\(250, 246, 241,/g, var: '--color-cream' },
  { match: /rgba\(245, 240, 232,/g, var: '--color-ivory' },
  { match: /rgba\(231, 220, 207,/g, var: '--color-latte' },
  { match: /rgba\(12, 10, 9,/g, var: '--color-espresso' },
  { match: /rgba\(28, 25, 23,/g, var: '--color-warmgray' },
  { match: /rgba\(69, 26, 3,/g, var: '--color-coffee' },
  { match: /rgba\(153, 27, 27,/g, var: '--color-red-800' } // guessing red
];

// Replace rgba(..., opacity) with color-mix
replacements.forEach(({match, var: colorVar}) => {
  css = css.replace(new RegExp(`rgba\\([^,]+,\\s*[^,]+,\\s*[^,]+,\\s*([0-9.]+)\\)`, 'g'), (full, alpha) => {
    // Check which one it matches initially
    let foundVar = null;
    if (full.includes('146, 64, 14')) foundVar = '--color-caramel';
    else if (full.includes('180, 83, 9')) foundVar = '--color-bronze';
    else if (full.includes('250, 246, 241')) foundVar = '--color-cream';
    else if (full.includes('245, 240, 232')) foundVar = '--color-ivory';
    else if (full.includes('231, 220, 207')) foundVar = '--color-latte';
    else if (full.includes('12, 10, 9')) foundVar = '--color-espresso';
    else if (full.includes('28, 25, 23')) foundVar = '--color-warmgray';
    else if (full.includes('69, 26, 3')) foundVar = '--color-coffee';
    else if (full.includes('153, 27, 27')) foundVar = 'red'; // ignore this
    
    if (foundVar && foundVar !== 'red') {
      const percentage = (parseFloat(alpha) * 100).toFixed(0);
      return `color-mix(in srgb, var(${foundVar}) ${percentage}%, transparent)`;
    }
    return full;
  });
});

fs.writeFileSync(path, css);
console.log('Done!');
