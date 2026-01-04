import React from 'react';
import ContentPage from '../../components/ContentPage';

function FordVerkaufenPage() {
  const content = (
    <>
      <p>
        <strong>Ford verkaufen</strong> - Die amerikanische Traditionsmarke! Wir kaufen alle Ford-Modelle: 
        Fiesta, Focus, Mondeo, Kuga, Puma und mehr. Kostenlose Abholung deutschlandweit.
      </p>

      <h2>Ford Ankauf mit Abholservice</h2>
      <p>
        Ford-Fahrzeuge sind robust, zuverlässig und beliebt. Ob Kleinwagen, Limousine oder SUV - 
        wir bieten Ihnen einen fairen Preis für Ihren Ford.
      </p>

      <h3>Diese Ford-Modelle kaufen wir:</h3>
      <ul>
        <li><strong>Ford Fiesta</strong> - Beliebter Kleinwagen</li>
        <li><strong>Ford Focus</strong> - Kompaktklasse-Bestseller</li>
        <li><strong>Ford Mondeo</strong> - Mittelklasse-Limousine</li>
        <li><strong>Ford Kuga</strong> - Kompakt-SUV</li>
        <li><strong>Ford Puma</strong> - Crossover mit Stil</li>
        <li><strong>Ford Mustang</strong> - Amerikanischer Sportwagen</li>
        <li><strong>Ford Ranger</strong> - Robuster Pickup</li>
        <li><strong>Ford Transit</strong> - Transporter und Kastenwagen</li>
      </ul>

      <h2>Ford verkaufen - so geht's</h2>
      <ol>
        <li>Ford-Daten im Online-Formular eingeben</li>
        <li>Kostenloses Ankaufsangebot erhalten</li>
        <li>Termin vereinbaren</li>
        <li>Ford übergeben und Geld erhalten</li>
      </ol>

      <h2>Ford Wertfaktoren</h2>
      <ul>
        <li>Modell und Ausstattungslinie (Trend, Titanium, ST-Line, Vignale)</li>
        <li>Motor (EcoBoost, TDCi)</li>
        <li>Baujahr und Kilometerstand</li>
        <li>Zustand und Wartung</li>
        <li>Extras wie SYNC, Park Assist, ACC</li>
      </ul>
    </>
  );

  const faqs = [
    {
      question: "Kaufen Sie auch Ford-Transporter?",
      answer: "Ja, wir kaufen auch Ford Transit und andere Nutzfahrzeuge."
    }
  ];

  const relatedLinks = [
    { label: "Opel verkaufen", path: "/marken/opel-verkaufen" },
    { label: "Renault verkaufen", path: "/marken/renault-verkaufen" },
    { label: "VW verkaufen", path: "/marken/volkswagen-verkaufen" },
    { label: "Bewertung", path: "/bewertung" }
  ];

  return (
    <ContentPage
      title="Ford verkaufen - Wir kaufen Ihren Ford"
      subtitle="Fiesta, Focus, Kuga & mehr | Kostenlose Abholung"
      seoTitle="Ford verkaufen - Ford-Ankauf deutschlandweit"
      seoDescription="Ford verkaufen zum fairen Preis ✓ Fiesta, Focus, Mondeo ✓ Kostenlose Abholung ✓ Auch Transporter"
      seoKeywords="ford verkaufen, ford ankauf, fiesta verkaufen, focus verkaufen"
      breadcrumbs={[
        { label: "Marken", link: "/" },
        { label: "Ford verkaufen" }
      ]}
      content={content}
      relatedLinks={relatedLinks}
      faqs={faqs}
    />
  );
}

export default FordVerkaufenPage;

