// Sitemap Generator für ARZ Automobile
// Diese Datei generiert automatisch eine sitemap.xml

const baseUrl = 'https://arz-automobile.de';

const routes = [
  { path: '/', priority: 1.0 },
  { path: '/bewertung', priority: 0.9 },
  { path: '/ankauf', priority: 0.9 },
  { path: '/ueber-uns', priority: 0.7 },
  { path: '/faq', priority: 0.6 },
  { path: '/kontakt', priority: 0.8 },
  
  // Marken-Seiten
  { path: '/marken/bmw-verkaufen', priority: 0.8 },
  { path: '/marken/mercedes-verkaufen', priority: 0.8 },
  { path: '/marken/volkswagen-verkaufen', priority: 0.8 },
  { path: '/marken/audi-verkaufen', priority: 0.8 },
  { path: '/marken/opel-verkaufen', priority: 0.7 },
  { path: '/marken/ford-verkaufen', priority: 0.7 },
  { path: '/marken/skoda-verkaufen', priority: 0.7 },
  { path: '/marken/renault-verkaufen', priority: 0.7 },
  { path: '/marken/seat-verkaufen', priority: 0.7 },
  { path: '/marken/toyota-verkaufen', priority: 0.7 },
  
  // Ratgeber-Seiten (wenn erstellt)
  { path: '/ratgeber/auto-verkaufen-checkliste', priority: 0.7 },
  { path: '/ratgeber/kaufvertrag-auto-muster', priority: 0.7 },
  { path: '/ratgeber/fahrzeugbewertung-ablauf', priority: 0.7 },
  { path: '/ratgeber/auto-ohne-tuev-verkaufen', priority: 0.6 },
  { path: '/ratgeber/unfallwagen-verkaufen', priority: 0.6 },
  { path: '/ratgeber/export-auto-verkaufen', priority: 0.6 },
  { path: '/ratgeber/gebrauchtwagen-preise', priority: 0.6 },
  { path: '/ratgeber/auto-abmelden-verkauf', priority: 0.6 },
  
  // Standort-Seiten (wenn erstellt)
  { path: '/standorte/autoankauf-rheinberg', priority: 0.9 },
  { path: '/standorte/autoankauf-wesel', priority: 0.8 },
  { path: '/standorte/autoankauf-moers', priority: 0.8 },
  { path: '/standorte/autoankauf-duisburg', priority: 0.8 },
  { path: '/standorte/autoankauf-krefeld', priority: 0.8 },
  { path: '/standorte/autoankauf-oberhausen', priority: 0.8 },
  { path: '/standorte/autoankauf-nrw', priority: 0.8 }
];

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  return sitemap;
}

console.log(generateSitemap());

export default generateSitemap;

