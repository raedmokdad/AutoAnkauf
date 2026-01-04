import React from 'react';
import ContentPage from '../../components/ContentPage';

function AudiVerkaufenPage() {
  const content = (
    <>
      <p>
        <strong>Audi verkaufen</strong> - "Vorsprung durch Technik" bedeutet auch: Wertstabilität! 
        Wir kaufen alle Audi-Modelle: A3, A4, A6, Q3, Q5, Q7 und mehr. Kostenlose Abholung deutschlandweit.
      </p>

      <h2>Audi Ankauf mit Premium-Service</h2>
      <p>
        Audi-Fahrzeuge überzeugen durch hochwertige Verarbeitung, moderne Technologie und zeitloses Design. 
        Als Premiummarke haben Audis einen stabilen Marktwert, den wir fair bewerten.
      </p>

      <h3>Diese Audi-Modelle kaufen wir:</h3>
      <ul>
        <li><strong>Audi A1</strong> - Sportlicher Premium-Kleinwagen</li>
        <li><strong>Audi A3</strong> - Kompaktklasse mit Stil</li>
        <li><strong>Audi A4</strong> - Business-Limousine und Kombi (Avant)</li>
        <li><strong>Audi A6</strong> - Obere Mittelklasse mit Technologie</li>
        <li><strong>Audi Q2/Q3</strong> - Kompakte SUVs</li>
        <li><strong>Audi Q5</strong> - Bestseller unter den Premium-SUVs</li>
        <li><strong>Audi Q7/Q8</strong> - Großraum-SUVs mit Luxus</li>
        <li><strong>Audi TT/R8</strong> - Sportwagen</li>
      </ul>

      <h2>Audi Ankaufsprozess</h2>
      <p>
        Verkaufen Sie Ihren Audi stressfrei an ARZ Automobile:
      </p>
      <ol>
        <li>Online-Formular mit Audi-Daten ausfüllen</li>
        <li>Unverbindliches Ankaufsangebot erhalten</li>
        <li>Termin vereinbaren - wir kommen zu Ihnen</li>
        <li>Audi übergeben und Sofort-Auszahlung erhalten</li>
      </ol>

      <h2>Preisfaktoren bei Audi</h2>
      <ul>
        <li>Modellreihe und Ausstattungslinie (Attraction, Ambition, S-Line, S/RS-Modelle)</li>
        <li>Motorisierung (TFSI, TDI, e-tron)</li>
        <li>Quattro-Allrad oder Frontantrieb</li>
        <li>MMI-Navi, Virtual Cockpit, Matrix-LED</li>
        <li>Wartungshistorie und Scheckheftpflege</li>
      </ul>
    </>
  );

  const faqs = [
    {
      question: "Kaufen Sie auch Audi S-Line und RS-Modelle?",
      answer: "Ja, besonders gerne! S-Line, S- und RS-Modelle sind sehr gefragt und erzielen höhere Preise."
    },
    {
      question: "Was ist mein Audi mit Quattro-Antrieb wert?",
      answer: "Quattro-Modelle sind wertvoller als Fronttriebler. Nutzen Sie unsere Bewertung für den genauen Preis."
    }
  ];

  const relatedLinks = [
    { label: "BMW verkaufen", path: "/marken/bmw-verkaufen" },
    { label: "Mercedes verkaufen", path: "/marken/mercedes-verkaufen" },
    { label: "VW verkaufen", path: "/marken/volkswagen-verkaufen" },
    { label: "Bewertung starten", path: "/bewertung" }
  ];

  return (
    <ContentPage
      title="Audi verkaufen - Wir kaufen Ihren Audi zum Top-Preis"
      subtitle="A3, A4, A6, Q3, Q5, Q7 & alle Modelle | Kostenlose Abholung"
      seoTitle="Audi verkaufen - Seriöser Audi-Ankauf deutschlandweit"
      seoDescription="Audi verkaufen zum Bestpreis ✓ A3, A4, A6, Q5 ✓ Kostenlose Abholung ✓ Faire Preise ✓ S-Line und RS-Modelle willkommen"
      seoKeywords="audi verkaufen, audi ankauf, a4 verkaufen, q5 verkaufen, s-line verkaufen"
      breadcrumbs={[
        { label: "Marken", link: "/" },
        { label: "Audi verkaufen" }
      ]}
      content={content}
      relatedLinks={relatedLinks}
      faqs={faqs}
      ctaTitle="Audi jetzt bewerten lassen"
    />
  );
}

export default AudiVerkaufenPage;

