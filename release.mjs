// Publica una nueva versión: actualiza la marca de versión, hace commit y push.
// Uso: node release.mjs "mensaje del cambio"
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
const msg = process.argv.slice(2).join(' ') || 'Actualización';
const v = Date.now().toString(36);
let html = readFileSync('index.html', 'utf8');
html = html.replace(/const APP_VERSION = '[^']*';/, `const APP_VERSION = '${v}';`)
           .replace(/<meta name="app-version" content="[^"]*">/, `<meta name="app-version" content="${v}">`);
writeFileSync('index.html', html);
writeFileSync('version.json', JSON.stringify({ v }) + '\n');
execSync('git add -A', { stdio: 'inherit' });
execSync(`git commit -q -m "${msg.replace(/"/g, "'")} (v${v})\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"`, { stdio: 'inherit' });
execSync('git push -q origin main', { stdio: 'inherit' });
console.log('Publicada versión', v);
