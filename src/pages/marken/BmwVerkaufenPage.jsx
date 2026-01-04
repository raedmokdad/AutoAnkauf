import React from 'react';
import ContentPage from '../../components/ContentPage';

function BmwVerkaufenPage() {
  const content = (
    <>
      <p>
        <strong>BMW verkaufen leicht gemacht</strong> - Verkaufen Sie Ihren BMW zum fairen Preis! 
        Egal ob 1er, 3er, 5er, X1, X3 oder X5 - wir kaufen alle BMW-Modelle und kommen deutschlandweit 
        kostenlos zu Ihnen nach Hause.
      </p>

      <h2>Warum BMW bei ARZ Automobile verkaufen?</h2>
      <p>
        BMW-Fahrzeuge sind aufgrund ihrer Qualität, Zuverlässigkeit und Sportlichkeit besonders begehrt. 
        Als erfahrener Autoankäufer kennen wir den Wert Ihres BMWs genau und bieten Ihnen einen fairen 
        Preis basierend auf dem aktuellen Marktwert.
      </p>

      <h3>Diese BMW-Modelle kaufen wir an:</h3>
      <ul>
        <li><strong>BMW 1er</strong> - Kompakte Sportlichkeit mit Premium-Qualität</li>
        <li><strong>BMW 3er</strong> - Der Klassiker unter den Mittelklasse-Limousinen</li>
        <li><strong>BMW 5er</strong> - Luxus und Komfort in der oberen Mittelklasse</li>
        <li><strong>BMW 7er</strong> - Die Oberklasse von BMW</li>
        <li><strong>BMW X1</strong> - Kompakter Premium-SUV</li>
        <li><strong>BMW X3</strong> - Beliebter Mittelklasse-SUV</li>
        <li><strong>BMW X5</strong> - Der Großraum-SUV mit Prestige</li>
        <li><strong>BMW Z4</strong> - Roadster mit Fahrspaß</li>
      </ul>

      <h2>BMW Ankaufsprozess - So einfach geht's</h2>
      <ol>
        <li><strong>Online-Bewertung</strong> - Geben Sie die Daten Ihres BMWs in unser Formular ein</li>
        <li><strong>Angebot erhalten</strong> - Innerhalb von 24h bekommen Sie ein faires Ankaufsangebot</li>
        <li><strong>Wir holen ab</strong> - Bei Zusage kommen wir kostenlos zu Ihnen und holen Ihren BMW ab</li>
        <li><strong>Sofort-Auszahlung</strong> - Sie erhalten den Kaufpreis direkt bei Übergabe</li>
      </ol>

      <h2>Was beeinflusst den BMW Ankaufspreis?</h2>
      <p>
        Der Wert Ihres BMWs hängt von verschiedenen Faktoren ab:
      </p>
      <ul>
        <li>Modell und Baujahr</li>
        <li>Kilometerstand</li>
        <li>Zustand (innen und außen)</li>
        <li>Serviceheft-gepflegt</li>
        <li>Ausstattung (z.B. Navi, Leder, M-Paket)</li>
        <li>Unfallfrei oder repariert</li>
      </ul>

      <h2>Benötigte Unterlagen für den BMW-Verkauf</h2>
      <ul>
        <li>Fahrzeugbrief (Zulassungsbescheinigung Teil II)</li>
        <li>Fahrzeugschein (Zulassungsbescheinigung Teil I)</li>
        <li>Alle Fahrzeugschlüssel</li>
        <li>Serviceheft (falls vorhanden)</li>
        <li>TÜV-Berichte</li>
      </ul>
    </>
  );

  const faqs = [
    {
      question: "Kaufen Sie auch BMW mit hohem Kilometerstand?",
      answer: "Ja, wir kaufen BMWs in jedem Zustand - auch mit hohem Kilometerstand. Der Preis wird entsprechend angepasst."
    },
    {
      question: "Muss mein BMW für den Verkauf fahrbereit sein?",
      answer: "Nein, wir kaufen auch nicht fahrb ereite BMWs. Wir organisieren bei Bedarf einen Abschleppdienst."
    },
    {
      question: "Wie schnell kann ich meinen BMW verkaufen?",
      answer: "Nach Ihrer Zusage zu unserem Angebot können wir Ihren BMW innerhalb von 2-5 Werktagen abholen."
    }
  ];

  const relatedLinks = [
    { label: "Mercedes verkaufen", path: "/marken/mercedes-verkaufen" },
    { label: "Audi verkaufen", path: "/marken/audi-verkaufen" },
    { label: "VW verkaufen", path: "/marken/volkswagen-verkaufen" },
    { label: "Alle Marken", path: "/" }
  ];

  return (
    <ContentPage
      title="BMW verkaufen - Wir kaufen Ihren BMW zum Bestpreis"
      subtitle="Kostenlose Abholung deutschlandweit | Faire Preise | Sofort-Auszahlung"
      seoTitle="BMW verkaufen - Seriöser BMW-Ankauf deutschlandweit"
      seoDescription="BMW verkaufen leicht gemacht ✓ Alle Modelle: 1er, 3er, 5er, X1, X3, X5 ✓ Kostenlose Abholung ✓ Faire Preise ✓ Wir kommen zu Ihnen!"
      seoKeywords="bmw verkaufen, bmw ankauf, bmw 3er verkaufen, bmw x5 verkaufen, gebrauchtwagen bmw"
      breadcrumbs={[
        { label: "Marken", link: "/" },
        { label: "BMW verkaufen" }
      ]}
      content={content}
      relatedLinks={relatedLinks}
      faqs={faqs}
      ctaTitle="Ihren BMW jetzt bewerten lassen"
      ctaText="Kostenlos und unverbindlich - wir kommen zu Ihnen und holen Ihren BMW ab!"
    />
  );
}

export default BmwVerkaufenPage;

