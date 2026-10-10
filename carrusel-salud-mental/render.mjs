// Exporta cada placa de carrusel.html a PNG 1080 x 1350 en la carpeta png/.
// Uso: node render.mjs
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
// Usa playwright local o, si no está, el instalado globalmente.
const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require(execSync('npm root -g').toString().trim() + '/playwright'); }
const { chromium } = pw;
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dir = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 1500 }, deviceScaleFactor: 1 });
await page.goto('file://' + path.join(dir, 'carrusel.html'));
await page.evaluate(() => document.fonts.ready);

const placas = await page.$$('section.placa');
for (const [i, placa] of placas.entries()) {
  const nombre = `oajnu-salud-mental-${String(i + 1).padStart(2, '0')}.png`;
  await placa.screenshot({ path: path.join(dir, 'png', nombre) });
  console.log('ok', nombre);
}
await browser.close();
