import React from 'react';
import ContentPage from '../../components/ContentPage';

function SeatVerkaufenPage() {
  const content = (
    <>
      <p>
        <strong>Seat verkaufen</strong> - Die spanische Sportlichkeit! Wir kaufen alle Seat-Modelle: 
        Ibiza, Leon, Arona, Ateca, Tarraco und mehr. Kostenlose Abholung deutschlandweit.
      </p>

      <h2>Seat Ankauf mit Service</h2>
      <p>
        Seat-Fahrzeuge sind sportlich, modern und bieten viel Ausstattung zum fairen Preis. 
        Als Schwestermarke von VW und Skoda teilen sie sich zuverlässige Technologie.
      </p>

      <h3>Diese Seat-Modelle kaufen wir:</h3>
      <ul>
        <li><strong>Seat Ibiza</strong> - Sportlicher Kleinwagen</li>
        <li><strong>Seat Leon</strong> - Golf-Alternative mit Style</li>
        <li><strong>Seat Arona</strong> - Kompakter Crossover</li>
        <li><strong>Seat Ateca</strong> - Mittelklasse-SUV</li>
        <li><strong>Seat Tarraco</strong> - Großraum-SUV mit 7 Sitzen</li>
        <li><strong>Seat Cupra</strong> - Performance-Marke von Seat</li>
      </ul>

      <h2>Seat verkaufen - so geht's</h2>
      <ol>
        <li>Seat-Daten eingeben und bewerten lassen</li>
        <li>Ankaufsangebot erhalten (24h)</li>
        <li>Termin vereinbaren</li>
        <li>Seat übergeben und Geld erhalten</li>
      </ol>

      <h2>Seat Preisfaktoren</h2>
      <ul>
        <li>Modell und Ausstattungslinie (Reference, Style, Xcellence, FR, Cupra)</li>
        <li>Motor (TSI, TDI, e-Hybrid)</li>
        <li>Baujahr und Kilometerstand</li>
        <li>Extras wie Beats Audio, Digital Cockpit</li>
        <li>Zustand und Wartung</li>
      </ul>
    </>
  );

  const faqs = [
    {
      question: "Ist ein Seat weniger wert als ein VW?",
      answer: "Seat nutzt VW-Technik, ist aber sportlicher ausgelegt. Der Wiederverkaufswert ist fair und attraktiv."
    }
  ];

  const relatedLinks = [
    { label: "VW verkaufen", path: "/marken/volkswagen-verkaufen" },
    { label: "Skoda verkaufen", path: "/marken/skoda-verkaufen" },
    { label: "Audi verkaufen", path: "/marken/audi-verkaufen" },
    { label: "Bewertung", path: "/bewertung" }
  ];

  return (
    <ContentPage
      title="Seat verkaufen - Fairer Seat-Ankauf"
      subtitle="Ibiza, Leon, Ateca & mehr | Kostenlose Abholung"
      seoTitle="Seat verkaufen - Seat-Ankauf deutschlandweit"
      seoDescription="Seat verkaufen zum Bestpreis ✓ Ibiza, Leon, Cupra ✓ Kostenlose Abholung ✓ Faire Preise"
      seoKeywords="seat verkaufen, seat ankauf, leon verkaufen, cupra verkaufen"
      breadcrumbs={[
        { label: "Marken", link: "/" },
        { label: "Seat verkaufen" }
      ]}
      content={content}
      relatedLinks={relatedLinks}
      faqs={faqs}
    />
  );
}

export default SeatVerkaufenPage;

