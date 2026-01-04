import React from 'react';
import ContentPage from '../../components/ContentPage';

function SkodaVerkaufenPage() {
  const content = (
    <>
      <p>
        <strong>Skoda verkaufen</strong> - "Simply Clever"! Wir kaufen alle Skoda-Modelle: 
        Fabia, Octavia, Superb, Kodiaq, Karoq und mehr. Kostenlose Abholung deutschlandweit.
      </p>

      <h2>Skoda Ankauf mit Service</h2>
      <p>
        Skoda-Fahrzeuge überzeugen durch viel Platz, gute Ausstattung und ein faires Preis-Leistungs-Verhältnis. 
        Wir kennen den Wert Ihres Skodas und zahlen einen fairen Preis.
      </p>

      <h3>Diese Skoda-Modelle kaufen wir:</h3>
      <ul>
        <li><strong>Skoda Fabia</strong> - Praktischer Kleinwagen</li>
        <li><strong>Skoda Scala</strong> - Kompaktklasse mit Raum</li>
        <li><strong>Skoda Octavia</strong> - Bestseller mit riesigem Kofferraum</li>
        <li><strong>Skoda Superb</strong> - Oberklasse zum Mittelklasse-Preis</li>
        <li><strong>Skoda Kamiq</strong> - Kompaktes SUV</li>
        <li><strong>Skoda Karoq</strong> - Mittelklasse-SUV</li>
        <li><strong>Skoda Kodiaq</strong> - Großraum-SUV mit 7 Sitzen</li>
      </ul>

      <h2>Vorteile beim Skoda-Verkauf</h2>
      <ul>
        <li>✓ Faire Bewertung nach Marktwert</li>
        <li>✓ Kostenlose Abholung</li>
        <li>✓ Schnelle Abwicklung</li>
        <li>✓ Sofort-Auszahlung</li>
      </ul>

      <h2>Skoda Preisfaktoren</h2>
      <ul>
        <li>Modell und Ausstattungslinie (Active, Ambition, Style, L&K)</li>
        <li>Baujahr und Laufleistung</li>
        <li>Motor (TSI, TDI)</li>
        <li>Extras wie Canton-Sound, Virtual Cockpit</li>
        <li>Zustand und Wartungshistorie</li>
      </ul>
    </>
  );

  const faqs = [
    {
      question: "Ist ein Skoda weniger wert als ein VW?",
      answer: "Skoda teilt sich die Technik mit VW, hat aber oft mehr Ausstattung zum gleichen Preis. Der Wiederverkaufswert ist fair."
    }
  ];

  const relatedLinks = [
    { label: "VW verkaufen", path: "/marken/volkswagen-verkaufen" },
    { label: "Seat verkaufen", path: "/marken/seat-verkaufen" },
    { label: "Audi verkaufen", path: "/marken/audi-verkaufen" },
    { label: "Bewertung", path: "/bewertung" }
  ];

  return (
    <ContentPage
      title="Skoda verkaufen - Fairer Skoda-Ankauf"
      subtitle="Fabia, Octavia, Kodiaq & mehr | Kostenlose Abholung"
      seoTitle="Skoda verkaufen - Skoda-Ankauf deutschlandweit"
      seoDescription="Skoda verkaufen zum Bestpreis ✓ Octavia, Superb, Kodiaq ✓ Kostenlose Abholung ✓ Faire Preise"
      seoKeywords="skoda verkaufen, skoda ankauf, octavia verkaufen, kodiaq verkaufen"
      breadcrumbs={[
        { label: "Marken", link: "/" },
        { label: "Skoda verkaufen" }
      ]}
      content={content}
      relatedLinks={relatedLinks}
      faqs={faqs}
    />
  );
}

export default SkodaVerkaufenPage;

