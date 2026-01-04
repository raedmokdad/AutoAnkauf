import React from 'react';
import ContentPage from '../../components/ContentPage';

function OpelVerkaufenPage() {
  const content = (
    <>
      <p>
        <strong>Opel verkaufen</strong> - Die deutsche Traditionsmarke! Wir kaufen alle Opel-Modelle: 
        Corsa, Astra, Insignia, Mokka, Crossland und mehr. Fair, schnell und unkompliziert.
      </p>

      <h2>Opel Ankauf deutschlandweit</h2>
      <p>
        Opel-Fahrzeuge sind bekannt für ihr gutes Preis-Leistungs-Verhältnis und ihre Zuverlässigkeit. 
        Wir kennen den Markt und bieten Ihnen einen fairen Preis für Ihren Opel.
      </p>

      <h3>Diese Opel-Modelle kaufen wir:</h3>
      <ul>
        <li><strong>Opel Corsa</strong> - Beliebter Kleinwagen</li>
        <li><strong>Opel Astra</strong> - Kompaktklasse-Klassiker</li>
        <li><strong>Opel Insignia</strong> - Mittelklasse-Limousine</li>
        <li><strong>Opel Mokka</strong> - Kompakt-SUV</li>
        <li><strong>Opel Crossland</strong> - Familienfreundlicher Crossover</li>
        <li><strong>Opel Grandland</strong> - Mittelklasse-SUV</li>
        <li><strong>Opel Zafira</strong> - Van mit flexiblem Raumangebot</li>
      </ul>

      <h2>Opel verkaufen - die Vorteile</h2>
      <ul>
        <li>✓ Faire Bewertung nach aktuellem Marktwert</li>
        <li>✓ Kostenlose Abholung in ganz Deutschland</li>
        <li>✓ Sofortige Auszahlung bei Übergabe</li>
        <li>✓ Wir kaufen auch ältere Opel-Modelle</li>
      </ul>

      <h2>Was beeinflusst den Opel-Wert?</h2>
      <ul>
        <li>Modell und Baujahr</li>
        <li>Kilometerstand</li>
        <li>Motor (Benziner, Diesel)</li>
        <li>Ausstattung und Extras</li>
        <li>Zustand und Pflege</li>
      </ul>
    </>
  );

  const faqs = [
    {
      question: "Kaufen Sie auch ältere Opel-Modelle wie Vectra oder Omega?",
      answer: "Ja, wir kaufen Opel jeden Baujahrs, auch ältere Modelle wie Vectra, Omega oder Kadett."
    }
  ];

  const relatedLinks = [
    { label: "VW verkaufen", path: "/marken/volkswagen-verkaufen" },
    { label: "Ford verkaufen", path: "/marken/ford-verkaufen" },
    { label: "Renault verkaufen", path: "/marken/renault-verkaufen" },
    { label: "Bewertung", path: "/bewertung" }
  ];

  return (
    <ContentPage
      title="Opel verkaufen - Fairer Opel-Ankauf"
      subtitle="Corsa, Astra, Mokka & mehr | Kostenlose Abholung"
      seoTitle="Opel verkaufen - Opel-Ankauf deutschlandweit"
      seoDescription="Opel verkaufen zum fairen Preis ✓ Corsa, Astra, Insignia ✓ Kostenlose Abholung ✓ Schnelle Abwicklung"
      seoKeywords="opel verkaufen, opel ankauf, corsa verkaufen, astra verkaufen"
      breadcrumbs={[
        { label: "Marken", link: "/" },
        { label: "Opel verkaufen" }
      ]}
      content={content}
      relatedLinks={relatedLinks}
      faqs={faqs}
    />
  );
}

export default OpelVerkaufenPage;

