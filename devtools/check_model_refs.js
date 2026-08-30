const fs = require('fs');
const path = require('path');
const base = 'src/main/resources/assets/gtgcore';
const files = ['models/block/machine/large_gas_collector.json', 'models/block/machine/large_gas_collector_active.json'];
let ok = true;
for (const f of files) {
  const m = JSON.parse(fs.readFileSync(path.join(base, f), 'utf8'));
  const refs = [];
  const walk = (o) => {
    if (typeof o === 'string' && o.startsWith('gtgcore:')) refs.push(o);
    else if (o && typeof o === 'object') Object.values(o).forEach(walk);
  };
  walk(m);
  for (const ref of refs) {
    const p = path.join(base, 'textures', ref.slice(8) + '.png');
    if (!fs.existsSync(p)) { console.log('MISSING: ' + ref + ' -> ' + p); ok = false; }
  }
  console.log(f + ': JSON OK, refs=' + refs.length);
}
console.log(ok ? 'ALL TEXTURE REFS OK' : 'HAS MISSING REFS');
