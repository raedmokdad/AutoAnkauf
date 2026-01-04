import React from 'react';
import ContentPage from '../../components/ContentPage';

function VolkswagenVerkaufenPage() {
  const content = (
    <>
      <p>
        <strong>VW verkaufen</strong> - Volkswagen ist Deutschlands beliebteste Automarke! Wir kaufen alle 
        VW-Modelle: Golf, Polo, Passat, Tiguan, T-Roc und mehr. Faire Preise und kostenlose Abholung garantiert.
      </p>

      <h2>Volkswagen Ankauf bundesweit</h2>
      <p>
        VW-Fahrzeuge sind zuverlässig, wertstabil und in Deutschland sehr gefragt. Ob Golf, Passat oder 
        Tiguan - wir kennen den Markt und zahlen Ihnen einen fairen Preis für Ihren Volkswagen.
      </p>

      <h3>Diese VW-Modelle kaufen wir an:</h3>
      <ul>
        <li><strong>VW Golf</strong> - Der Bestseller aller Klassen</li>
        <li><strong>VW Polo</strong> - Beliebter Kleinwagen</li>
        <li><strong>VW Passat</strong> - Komfortabler Mittelklasse-Klassiker</li>
        <li><strong>VW Tiguan</strong> - Meistverkauftes SUV in Deutschland</li>
        <li><strong>VW T-Roc</strong> - Kompakt-SUV mit Style</li>
        <li><strong>VW Touran</strong> - Familienfreundlicher Van</li>
        <li><strong>VW Touareg</strong> - Premium-SUV von VW</li>
        <li><strong>VW T6/T7 (Multivan/Caravelle)</strong> - Transporter und Busse</li>
      </ul>

      <h2>VW verkaufen - so läuft's ab</h2>
      <ol>
        <li>Fahrzeugdaten eingeben und Fotos hochladen</li>
        <li>Kostenloses Ankaufsangebot erhalten (24h)</li>
        <li>Termin vereinbaren - wir kommen zu Ihnen</li>
        <li>VW übergeben und Sofort-Auszahlung erhalten</li>
      </ol>

      <h2>Was bestimmt den VW-Wert?</h2>
      <ul>
        <li>Modell und Ausstattungslinie (Trendline, Comfortline, Highline, R-Line)</li>
        <li>Motor (TDI, TSI, GTI, GTD)</li>
        <li>Baujahr und Laufleistung</li>
        <li>Zustand und Wartungshistorie</li>
        <li>Extras wie DSG, Navi, ACC, Park Assist</li>
      </ul>
    </>
  );

  const faqs = [
    {
      question: "Kaufen Sie auch VW mit Dieselmotor (TDI)?",
      answer: "Ja, wir kaufen alle VW-Motoren, inklusive TDI-Diesel. Der Dieselskandal wird bei der Preisgestaltung fair berücksichtigt."
    },
    {
      question: "Was ist ein VW Golf wert?",
      answer: "Der Wert hängt von Generation, Ausstattung und Zustand ab. Golf 7 ab ca. 8.000€, Golf 8 ab ca. 15.000€. Nutzen Sie unsere Bewertung für den genauen Wert."
    }
  ];

  const relatedLinks = [
    { label: "Audi verkaufen", path: "/marken/audi-verkaufen" },
    { label: "Skoda verkaufen", path: "/marken/skoda-verkaufen" },
    { label: "Seat verkaufen", path: "/marken/seat-verkaufen" },
    { label: "Jetzt bewerten", path: "/bewertung" }
  ];

  return (
    <ContentPage
      title="VW verkaufen - Volkswagen zum fairen Preis verkaufen"
      subtitle="Golf, Passat, Tiguan & alle Modelle | Kostenlose Abholung"
      seoTitle="VW verkaufen - Volkswagen Ankauf deutschlandweit"
      seoDescription="Volkswagen verkaufen leicht gemacht ✓ Golf, Passat, Tiguan ✓ Faire VW-Ankaufspreise ✓ Kostenlose Abholung ✓ Sofort-Auszahlung"
      seoKeywords="vw verkaufen, volkswagen ankauf, golf verkaufen, passat verkaufen, tiguan verkaufen"
      breadcrumbs={[
        { label: "Marken", link: "/" },
        { label: "VW verkaufen" }
      ]}
      content={content}
      relatedLinks={relatedLinks}
      faqs={faqs}
      ctaTitle="VW jetzt bewerten lassen"
      ctaText="Erfahren Sie, was Ihr Volkswagen wert ist - kostenlos und unverbindlich!"
    />
  );
}

export default VolkswagenVerkaufenPage;

