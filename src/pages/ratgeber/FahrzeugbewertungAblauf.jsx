import React from 'react';
import ContentPage from '../../components/ContentPage';

function FahrzeugbewertungAblauf() {
  const content = (
    <>
      <p>
        <strong>Fahrzeugbewertung - So wird Ihr Auto bewertet!</strong> Der Wert Ihres Gebrauchtwagens hängt 
        von vielen Faktoren ab. Wir erklären, wie eine professionelle Fahrzeugbewertung abläuft und was Ihr 
        Auto wirklich wert ist.
      </p>

      <h2>Was ist eine Fahrzeugbewertung?</h2>
      <p>
        Bei einer Fahrzeugbewertung wird der aktuelle Marktwert Ihres Autos ermittelt. Dieser Wert ist die 
        Grundlage für den Verkaufspreis - egal ob Sie privat verkaufen oder an einen Händler.
      </p>

      <h2>Faktoren die den Fahrzeugwert beeinflussen</h2>
      
      <h3>1. Marke und Modell</h3>
      <p>
        Premium-Marken wie BMW, Mercedes oder Audi haben oft höhere Restwerte als Volumenmarken. 
        Beliebte Modelle (z.B. VW Golf, BMW 3er) verkaufen sich besser.
      </p>

      <h3>2. Alter und Kilometerstand</h3>
      <ul>
        <li><strong>Bis 30.000 km:</strong> Fast wie neu, höchster Wert</li>
        <li><strong>30.000 - 60.000 km:</strong> Gepflegt, guter Wert</li>
        <li><strong>60.000 - 100.000 km:</strong> Durchschnitt, stabiler Wert</li>
        <li><strong>100.000 - 150.000 km:</strong> Höhere Laufleistung, Wert sinkt</li>
        <li><strong>Über 150.000 km:</strong> Hohe Laufleistung, deutlich niedriger</li>
      </ul>

      <h3>3. Zustand</h3>
      <p>
        Der Zustand ist entscheidend:
      </p>
      <ul>
        <li><strong>Sehr gut:</strong> Neuwertig, keine Mängel</li>
        <li><strong>Gut:</strong> Gepflegt, kleine Gebrauchsspuren</li>
        <li><strong>Befriedigend:</strong> Normale Gebrauchsspuren</li>
        <li><strong>Ausreichend:</strong> Deutliche Mängel, Reparaturbedarf</li>
      </ul>

      <h3>4. Ausstattung</h3>
      <p>
        Extras steigern den Wert:
      </p>
      <ul>
        <li>Navigationssystem</li>
        <li>Ledersitze</li>
        <li>Schiebedach/Panoramadach</li>
        <li>Xenon/LED-Scheinwerfer</li>
        <li>Einparkhilfe/Rückfahrkamera</li>
        <li>Sitzheizung</li>
        <li>Klimaautomatik</li>
        <li>Sportpaket (M-Paket, S-Line, R-Line, AMG)</li>
      </ul>

      <h3>5. Scheckheftgepflegt</h3>
      <p>
        Ein lückenlos geführtes Serviceheft erhöht den Wert um <strong>bis zu 15%</strong>!
      </p>

      <h3>6. Unfallfreiheit</h3>
      <p>
        Unfallfreie Fahrzeuge sind deutlich mehr wert. Auch kleinere Unfälle müssen angegeben werden.
      </p>

      <h3>7. Anzahl der Vorbesitzer</h3>
      <ul>
        <li>1. Hand: Bester Wert (+10%)</li>
        <li>2. Hand: Guter Wert</li>
        <li>3+ Hände: Wert sinkt</li>
      </ul>

      <h2>Wie läuft eine Fahrzeugbewertung ab?</h2>

      <h3>Schritt 1: Online-Bewertung (5 Minuten)</h3>
      <p>
        Geben Sie die Basisdaten ein:
      </p>
      <ul>
        <li>Marke und Modell</li>
        <li>Erstzulassung</li>
        <li>Kilometerstand</li>
        <li>Zustand</li>
        <li>Ausstattung</li>
      </ul>
      <p>
        Sie erhalten sofort eine <strong>erste Schätzung</strong>.
      </p>

      <h3>Schritt 2: Professionelle Begutachtung (optional)</h3>
      <p>
        Für ein verbindliches Angebot:
      </p>
      <ul>
        <li>Besichtigung vor Ort (wir kommen zu Ihnen!)</li>
        <li>Prüfung des Zustands (innen & außen)</li>
        <li>Check der Unterlagen (Fahrzeugbrief, Serviceheft)</li>
        <li>Probefahrt (bei Bedarf)</li>
        <li>Kontrolle von Reifen, Bremsen, Motor</li>
      </ul>

      <h3>Schritt 3: Finales Angebot</h3>
      <p>
        Nach der Begutachtung erhalten Sie ein <strong>verbindliches Kaufangebot</strong>.
      </p>

      <h2>Bewertungstools im Vergleich</h2>

      <h3>1. Schwacke-Liste</h3>
      <p>
        Die Schwacke-Liste ist der Standard im deutschen Autohandel. Kostenpflichtig, aber sehr genau.
      </p>

      <h3>2. DAT (Deutsche Automobil Treuhand)</h3>
      <p>
        Ähnlich wie Schwacke, wird von Versicherungen und Händlern genutzt.
      </p>

      <h3>3. Online-Bewertungen (kostenlos)</h3>
      <ul>
        <li>Mobile.de Fahrzeugbewertung</li>
        <li>Autoscout24 Wertermittlung</li>
        <li>ADAC Autobewertung</li>
        <li><strong>ARZ Automobile Bewertung</strong> (kostenlos & unverbindlich)</li>
      </ul>

      <h2>Wertermittlung bei ARZ Automobile</h2>
      <p>
        <strong>Unsere kostenlose Fahrzeugbewertung:</strong>
      </p>
      <ul>
        <li>✓ 100% kostenlos und unverbindlich</li>
        <li>✓ Sofortige Online-Schätzung in 2 Minuten</li>
        <li>✓ Basierend auf Schwacke und aktuellen Marktpreisen</li>
        <li>✓ Auf Wunsch: Kostenlose Vor-Ort-Begutachtung (wir kommen zu Ihnen!)</li>
        <li>✓ Verbindliches Kaufangebot innerhalb 24h</li>
        <li>✓ Bei Zusage: Kostenlose Abholung deutschlandweit</li>
      </ul>

      <h2>Tipps für höheren Verkaufswert</h2>
      <ul>
        <li>✓ Auto gründlich reinigen (innen & außen)</li>
        <li>✓ Kleine Kratzer ausbessern</li>
        <li>✓ Serviceheft vorlegen</li>
        <li>✓ Alle Extras dokumentieren</li>
        <li>✓ TÜV rechtzeitig erneuern</li>
        <li>✓ Reparaturen vor Verkauf durchführen</li>
        <li>✓ Unfallfreiheit bescheinigen lassen</li>
      </ul>
    </>
  );

  const faqs = [
    {
      question: "Wie viel kostet eine Fahrzeugbewertung?",
      answer: "Online-Bewertungen sind meist kostenlos. Bei ARZ Automobile ist auch die Vor-Ort-Begutachtung 100% kostenlos und unverbindlich."
    },
    {
      question: "Wie genau sind Online-Bewertungen?",
      answer: "Online-Bewertungen geben einen guten Richtwert (±10%). Eine genaue Bewertung erfordert eine Besichtigung des Fahrzeugs."
    },
    {
      question: "Was ist mein Auto noch wert?",
      answer: "Nutzen Sie unsere kostenlose Online-Bewertung oder lassen Sie Ihr Auto von uns begutachten - wir kommen kostenlos zu Ihnen!"
    }
  ];

  const relatedLinks = [
    { label: "Auto verkaufen Checkliste", path: "/ratgeber/auto-verkaufen-checkliste" },
    { label: "Gebrauchtwagen Preise", path: "/ratgeber/gebrauchtwagen-preise" },
    { label: "Kostenlose Bewertung", path: "/bewertung" },
    { label: "Auto verkaufen", path: "/ankauf" }
  ];

  return (
    <ContentPage
      title="Fahrzeugbewertung - So wird Ihr Auto bewertet"
      subtitle="Kostenlose Auto-Bewertung | Faktoren & Ablauf erklärt"
      seoTitle="Fahrzeugbewertung kostenlos - Auto Wert ermitteln"
      seoDescription="Fahrzeugbewertung erklärt ✓ Kostenlos Auto bewerten ✓ Faktoren die den Wert beeinflussen ✓ Schwacke vs. Online-Bewertung ✓ Jetzt Wert ermitteln"
      seoKeywords="fahrzeugbewertung, auto bewerten kostenlos, fahrzeug wert ermitteln, schwacke liste, gebrauchtwagen bewertung"
      breadcrumbs={[
        { label: "Ratgeber", link: "/" },
        { label: "Fahrzeugbewertung" }
      ]}
      content={content}
      relatedLinks={relatedLinks}
      faqs={faqs}
      ctaTitle="Jetzt Auto bewerten lassen - 100% kostenlos!"
      ctaText="Ermitteln Sie in 2 Minuten den Wert Ihres Autos - unverbindlich und ohne Registrierung!"
    />
  );
}

export default FahrzeugbewertungAblauf;

