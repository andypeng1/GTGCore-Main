# -*- coding: utf-8 -*-
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
path = r'C:\Users\Hi\AppData\Local\Temp\run87.log'
data = open(path, encoding='utf-8', errors='replace').read()
# Player dump
idx = data.find('Player methods total=')
seg = data[idx:idx+400000]
parts = seg.split('\n')
out = []
for i, p in enumerate(parts):
    if 'm_6117_' in p or 'isUsingItem' in p:
        out.append('part %d: %s' % (i, p.strip()))
open(r'D:\GTGCore-Main\devtools\m6117_hits.txt', 'w', encoding='utf-8').write('\n'.join(out))
print('wrote', len(out), 'hits')
