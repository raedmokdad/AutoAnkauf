import React from 'react';
import ContentPage from '../../components/ContentPage';

function MercedesVerkaufenPage() {
  const content = (
    <>
      <p>
        <strong>Mercedes-Benz verkaufen</strong> - Ihr Mercedes verdient einen fairen Preis! Wir kaufen alle 
        Mercedes-Modelle: A-Klasse, C-Klasse, E-Klasse, GLA, GLC, GLE und mehr. Bundesweite kostenlose Abholung inklusive.
      </p>

      <h2>Mercedes-Benz Ankauf mit Abholservice</h2>
      <p>
        Mercedes-Benz steht für Qualität, Luxus und Zuverlässigkeit. Als Premiummarke haben Mercedes-Fahrzeuge 
        einen stabilen Marktwert. Wir kennen den Wert Ihres Mercedes genau und zahlen Ihnen einen fairen Preis.
      </p>

      <h3>Diese Mercedes-Modelle kaufen wir:</h3>
      <ul>
        <li><strong>Mercedes A-Klasse</strong> - Kompaktklasse mit Premium-Anspruch</li>
        <li><strong>Mercedes B-Klasse</strong> - Praktischer Kompaktvan</li>
        <li><strong>Mercedes C-Klasse</strong> - Der Klassiker der Mittelklasse</li>
        <li><strong>Mercedes E-Klasse</strong> - Business-Limousine par excellence</li>
        <li><strong>Mercedes S-Klasse</strong> - Luxus pur in der Oberklasse</li>
        <li><strong>Mercedes GLA</strong> - Kompakter SUV</li>
        <li><strong>Mercedes GLC</strong> - Beliebtes Mittelklasse-SUV</li>
        <li><strong>Mercedes GLE</strong> - Großraum-SUV mit Komfort</li>
      </ul>

      <h2>Vorteile beim Mercedes-Verkauf an ARZ Automobile</h2>
      <ul>
        <li>✓ Faire Bewertung basierend auf Schwacke-Listen</li>
        <li>✓ Kostenlose Abholung deutschlandweit</li>
        <li>✓ Sofortige Barauszahlung</li>
        <li>✓ Wir kaufen auch Unfallwagen und Fahrzeuge mit Schäden</li>
        <li>✓ Komplette Abwicklung inklusive Abmeldung</li>
      </ul>

      <h2>Mercedes Wertfaktoren</h2>
      <p>
        Bei der Bewertung Ihres Mercedes berücksichtigen wir:
      </p>
      <ul>
        <li>Modell-Reihe und Motorisierung (z.B. AMG, Diesel, Benziner)</li>
        <li>Erstzulassung und Kilometerstand</li>
        <li>Zustand und Pflegezustand</li>
        <li>Ausstattungsumfang (Comand, Distronic, Luftfederung, etc.)</li>
        <li>Scheckheft-gepflegt bei Mercedes</li>
        <li>Originalzustand oder Umbauten</li>
      </ul>
    </>
  );

  const faqs = [
    {
      question: "Kaufen Sie auch ältere Mercedes-Modelle?",
      answer: "Ja, wir kaufen Mercedes jeden Baujahrs - von Oldtimern bis zu Neuwagen."
    },
    {
      question: "Was ist mein Mercedes wert?",
      answer: "Nutzen Sie unser kostenloses Bewertungsformular. Sie erhalten innerhalb von 24h ein unverbindliches Angebot."
    }
  ];

  const relatedLinks = [
    { label: "BMW verkaufen", path: "/marken/bmw-verkaufen" },
    { label: "Audi verkaufen", path: "/marken/audi-verkaufen" },
    { label: "VW verkaufen", path: "/marken/volkswagen-verkaufen" },
    { label: "Kostenlose Bewertung", path: "/bewertung" }
  ];

  return (
    <ContentPage
      title="Mercedes-Benz verkaufen - Top Preise für Ihren Mercedes"
      subtitle="A-Klasse, C-Klasse, E-Klasse, GLC & mehr | Kostenlose Abholung"
      seoTitle="Mercedes verkaufen - Seriöser Mercedes-Ankauf"
      seoDescription="Mercedes-Benz verkaufen zum Bestpreis ✓ Alle Modelle ✓ Kostenlose Abholung ✓ Sofort-Auszahlung ✓ Wir kommen zu Ihnen nach Hause!"
      seoKeywords="mercedes verkaufen, mercedes-benz ankauf, c-klasse verkaufen, e-klasse verkaufen"
      breadcrumbs={[
        { label: "Marken", link: "/" },
        { label: "Mercedes verkaufen" }
      ]}
      content={content}
      relatedLinks={relatedLinks}
      faqs={faqs}
      ctaTitle="Mercedes jetzt bewerten lassen"
      ctaText="Erhalten Sie ein faires Angebot für Ihren Mercedes - kostenlos und unverbindlich!"
    />
  );
}

export default MercedesVerkaufenPage;

