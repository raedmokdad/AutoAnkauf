import React from 'react';
import ContentPage from '../../components/ContentPage';

function RenaultVerkaufenPage() {
  const content = (
    <>
      <p>
        <strong>Renault verkaufen</strong> - Die französische Marke! Wir kaufen alle Renault-Modelle: 
        Clio, Captur, Megane, Kadjar, Koleos und mehr. Kostenlose Abholung deutschlandweit.
      </p>

      <h2>Renault Ankauf deutschlandweit</h2>
      <p>
        Renault-Fahrzeuge sind bekannt für ihr attraktives Design und innovative Technologie. 
        Wir bieten Ihnen einen fairen Preis für Ihren Renault - unabhängig vom Modell.
      </p>

      <h3>Diese Renault-Modelle kaufen wir:</h3>
      <ul>
        <li><strong>Renault Clio</strong> - Beliebter Kleinwagen</li>
        <li><strong>Renault Captur</strong> - Kompakter Crossover</li>
        <li><strong>Renault Megane</strong> - Kompaktklasse</li>
        <li><strong>Renault Kadjar</strong> - Mittelklasse-SUV</li>
        <li><strong>Renault Koleos</strong> - Großraum-SUV</li>
        <li><strong>Renault Talisman</strong> - Mittelklasse-Limousine</li>
        <li><strong>Renault Scenic</strong> - Kompaktvan</li>
        <li><strong>Renault Zoe</strong> - Elektroauto</li>
      </ul>

      <h2>Renault verkaufen - die Vorteile</h2>
      <ul>
        <li>✓ Faire Preise für alle Modelle</li>
        <li>✓ Kostenlose Abholung</li>
        <li>✓ Schnelle Abwicklung</li>
        <li>✓ Auch Elektro-Renault (Zoe)</li>
      </ul>

      <h2>Renault Wertfaktoren</h2>
      <ul>
        <li>Modell und Ausstattung (Life, Zen, Intens, Bose)</li>
        <li>Motor (TCe, dCi, E-Tech)</li>
        <li>Baujahr und Kilometerstand</li>
        <li>Zustand und Wartung</li>
        <li>Extras wie R-Link, Easy Park Assist</li>
      </ul>
    </>
  );

  const faqs = [
    {
      question: "Kaufen Sie auch Renault mit hoher Laufleistung?",
      answer: "Ja, wir kaufen Renault mit jedem Kilometerstand. Der Preis wird fair angepasst."
    }
  ];

  const relatedLinks = [
    { label: "Opel verkaufen", path: "/marken/opel-verkaufen" },
    { label: "Ford verkaufen", path: "/marken/ford-verkaufen" },
    { label: "Toyota verkaufen", path: "/marken/toyota-verkaufen" },
    { label: "Bewertung", path: "/bewertung" }
  ];

  return (
    <ContentPage
      title="Renault verkaufen - Wir kaufen Ihren Renault"
      subtitle="Clio, Captur, Megane & mehr | Kostenlose Abholung"
      seoTitle="Renault verkaufen - Renault-Ankauf deutschlandweit"
      seoDescription="Renault verkaufen zum fairen Preis ✓ Clio, Captur, Kadjar ✓ Kostenlose Abholung ✓ Auch E-Autos"
      seoKeywords="renault verkaufen, renault ankauf, clio verkaufen, captur verkaufen"
      breadcrumbs={[
        { label: "Marken", link: "/" },
        { label: "Renault verkaufen" }
      ]}
      content={content}
      relatedLinks={relatedLinks}
      faqs={faqs}
    />
  );
}

export default RenaultVerkaufenPage;

