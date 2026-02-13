import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { routes } from '../prerender.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.resolve(__dirname, '../dist');
const indexPath = path.join(distPath, 'index.html');

// Lese das gebaute index.html
const indexHtml = fs.readFileSync(indexPath, 'utf-8');

console.log('🚀 Starte Prerendering...');

routes.forEach(route => {
  // Erstelle Ordnerstruktur
  const routePath = route === '/' ? distPath : path.join(distPath, route);
  
  if (route !== '/') {
    fs.mkdirSync(routePath, { recursive: true });
  }
  
  const targetFile = route === '/' 
    ? indexPath 
    : path.join(routePath, 'index.html');
  
  // Kopiere index.html in jeden Routen-Ordner
  fs.writeFileSync(targetFile, indexHtml);
  
  console.log(`✅ ${route}`);
});

console.log(`\n✨ ${routes.length} Seiten erfolgreich gerendert!`);
