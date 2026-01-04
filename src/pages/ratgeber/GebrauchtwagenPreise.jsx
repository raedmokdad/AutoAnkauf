import React from 'react';
import ContentPage from '../../components/ContentPage';

function GebrauchtwagenPreise() {
  const content = (
    <>
      <p>
        <strong>Gebrauchtwagen Preise aktuell - Was ist mein Auto wert?</strong> Der Gebrauchtwagenmarkt 
        schwankt ständig. Wir zeigen Ihnen, wie Gebrauchtwagenpreise entstehen, welche Faktoren den Preis 
        beeinflussen und wie Sie den realistischen Wert Ihres Autos ermitteln.
      </p>

      <h2>Aktuelle Trends am Gebrauchtwagenmarkt 2024</h2>
      <p>
        Der Gebrauchtwagenmarkt hat sich in den letzten Jahren stark verändert:
      </p>
      <ul>
        <li>📈 <strong>Preisanstieg 2020-2023:</strong> Durch Chipmangel und Produktionsengpässe stiegen Gebrauchtwagenpreise um bis zu 30%</li>
        <li>📊 <strong>Stabilisierung 2024:</strong> Preise normalisieren sich langsam</li>
        <li>🔌 <strong>E-Autos:</strong> Gebrauchte Elektroautos verlieren stark an Wert (30-40% pro Jahr)</li>
        <li>⛽ <strong>Diesel:</strong> Preise sinken durch Fahrverbote und Imageverlust</li>
        <li>🚙 <strong>SUVs:</strong> Weiterhin sehr gefragt und wertstabil</li>
      </ul>

      <h2>Faktoren die Gebrauchtwagenpreise beeinflussen</h2>

      <h3>1. Angebot und Nachfrage</h3>
      <p>
        <strong>Hohe Nachfrage = Höhere Preise</strong>
      </p>
      <ul>
        <li>Beliebte Modelle: VW Golf, BMW 3er, Mercedes C-Klasse</li>
        <li>SUVs und Geländewagen</li>
        <li>Transporter (besonders Mercedes Sprinter)</li>
      </ul>

      <h3>2. Marke und Modell</h3>
      <p>
        <strong>Wertstabilste Marken:</strong>
      </p>
      <ul>
        <li>🥇 Porsche (65-70% Restwert nach 3 Jahren)</li>
        <li>🥈 Toyota/Lexus (60-65% Restwert)</li>
        <li>🥉 BMW/Mercedes/Audi (55-60% Restwert)</li>
        <li>VW (50-55% Restwert)</li>
        <li>Opel/Ford (45-50% Restwert)</li>
      </ul>

      <h3>3. Alter des Fahrzeugs</h3>
      <p>
        <strong>Typischer Wertverlust:</strong>
      </p>
      <ul>
        <li><strong>Jahr 1:</strong> -20 bis -25%</li>
        <li><strong>Jahr 2:</strong> -30 bis -35% (gesamt)</li>
        <li><strong>Jahr 3:</strong> -40 bis -45% (gesamt)</li>
        <li><strong>Jahr 4:</strong> -50 bis -55% (gesamt)</li>
        <li><strong>Jahr 5:</strong> -55 bis -60% (gesamt)</li>
        <li><strong>Ab Jahr 6:</strong> Wertverlust verlangsamt sich</li>
      </ul>

      <h3>4. Kilometerstand</h3>
      <p>
        <strong>Faustregel pro 10.000 km:</strong> -3 bis -5% Wertverlust
      </p>
      <ul>
        <li><strong>Unter 50.000 km:</strong> Top-Preis</li>
        <li><strong>50.000-100.000 km:</strong> Normaler Preis</li>
        <li><strong>100.000-150.000 km:</strong> -10 bis -15%</li>
        <li><strong>Über 150.000 km:</strong> -20 bis -30%</li>
      </ul>

      <h3>5. Kraftstoffart</h3>
      <p>
        <strong>Preisentwicklung nach Antrieb:</strong>
      </p>
      <ul>
        <li><strong>Benziner:</strong> Stabil, universell gefragt</li>
        <li><strong>Diesel:</strong> Sinkend (Fahrverbote, Image)</li>
        <li><strong>Hybrid:</strong> Leicht steigend</li>
        <li><strong>Elektro:</strong> Stark fallend (hoher Wertverlust)</li>
        <li><strong>Gas/LPG:</strong> Nischenmarkt, stabil</li>
      </ul>

      <h3>6. Ausstattung</h3>
      <p>
        <strong>Wertsteigernde Extras (ca. +500 bis +2.000 €):</strong>
      </p>
      <ul>
        <li>Navigationssystem</li>
        <li>Ledersitze</li>
        <li>Panorama-Schiebedach</li>
        <li>Xenon/LED-Scheinwerfer</li>
        <li>Sportpaket (M-Sport, S-Line, AMG)</li>
        <li>Assistenzsysteme (Spurhalter, Abstandstempomat)</li>
      </ul>

      <h3>7. Zustand</h3>
      <ul>
        <li><strong>Sehr gut:</strong> 100% des Marktwerts</li>
        <li><strong>Gut:</strong> 90-95%</li>
        <li><strong>Befriedigend:</strong> 80-85%</li>
        <li><strong>Ausreichend:</strong> 70-75%</li>
        <li><strong>Mangelhaft:</strong> 50-60%</li>
      </ul>

      <h3>8. Scheckheft & Service</h3>
      <ul>
        <li>Scheckheftgepflegt: <strong>+10 bis +15%</strong></li>
        <li>Teilweise gepflegt: +5%</li>
        <li>Ohne Nachweis: 0%</li>
      </ul>

      <h3>9. Jahreszeit</h3>
      <ul>
        <li><strong>Cabrios:</strong> Im Sommer +10 bis +15%</li>
        <li><strong>Geländewagen/SUVs:</strong> Im Winter +5 bis +10%</li>
        <li><strong>Normale PKW:</strong> Frühling/Herbst beste Verkaufszeit</li>
      </ul>

      <h2>Preisbeispiele beliebter Modelle (Stand 2024)</h2>

      <h3>VW Golf 7 (2017, 60.000 km, Benzin, 110 PS)</h3>
      <ul>
        <li>Neupreis 2017: ca. 23.000 €</li>
        <li>Aktueller Marktwert: 13.000-15.000 €</li>
        <li>Mit Vollausstattung: +1.500 €</li>
        <li>Ohne Scheckheft: -1.000 €</li>
      </ul>

      <h3>BMW 320d (2018, 80.000 km, Diesel, 190 PS)</h3>
      <ul>
        <li>Neupreis 2018: ca. 42.000 €</li>
        <li>Aktueller Marktwert: 22.000-25.000 €</li>
        <li>Mit M-Paket: +2.500 €</li>
        <li>Diesel-Abschlag: -1.500 €</li>
      </ul>

      <h3>Mercedes C 200 (2019, 50.000 km, Benzin, 184 PS)</h3>
      <ul>
        <li>Neupreis 2019: ca. 45.000 €</li>
        <li>Aktueller Marktwert: 28.000-32.000 €</li>
        <li>Mit AMG-Line: +3.000 €</li>
      </ul>

      <h2>So ermitteln Sie den realistischen Preis</h2>

      <h3>Methode 1: Online-Bewertungsportale (kostenlos)</h3>
      <ul>
        <li>Mobile.de Fahrzeugbewertung</li>
        <li>Autoscout24 Wertermittlung</li>
        <li><strong>ARZ Automobile Bewertung</strong> (schnell & genau!)</li>
        <li>ADAC Autobewertung</li>
      </ul>

      <h3>Methode 2: Schwacke-Liste (kostenpflichtig)</h3>
      <p>
        Der Standard im deutschen Autohandel. Genaueste Werte, aber ca. 10 € pro Abfrage.
      </p>

      <h3>Methode 3: Vergleichsangebote prüfen</h3>
      <p>
        Suchen Sie auf Mobile.de und Autoscout24 nach ähnlichen Fahrzeugen (gleiche Marke, Modell, Jahr, km, Ausstattung).
      </p>

      <h3>Methode 4: Professionelle Begutachtung</h3>
      <p>
        Bei ARZ Automobile: <strong>Kostenlose Vor-Ort-Bewertung</strong> (wir kommen zu Ihnen!)
      </p>

      <h2>Häufige Fehler bei der Preisfindung</h2>

      <h3>❌ Fehler 1: Emotionaler Wert</h3>
      <p>
        "Ich habe das Auto immer gepflegt!" → Leider irrelevant für den Marktwert.
      </p>

      <h3>❌ Fehler 2: Neupreis als Basis</h3>
      <p>
        Der Neupreis ist nicht relevant. Nur der <strong>aktuelle Marktwert</strong> zählt.
      </p>

      <h3>❌ Fehler 3: Zu hohe Preisvorstellung</h3>
      <p>
        Überhöhte Preise = Auto verkauft sich nicht = Weiter Wertverlust durch Zeit
      </p>

      <h3>❌ Fehler 4: Extras überbewerten</h3>
      <p>
        Extras steigern den Wert, aber meist weniger als Sie denken (max. 10-15% des Neuwerts des Extras).
      </p>

      <h2>Kostenlose Fahrzeugbewertung bei ARZ Automobile</h2>
      <ul>
        <li>✓ 100% kostenlos und unverbindlich</li>
        <li>✓ Basierend auf Schwacke & aktuellen Marktpreisen</li>
        <li>✓ Sofort-Bewertung in 2 Minuten</li>
        <li>✓ Auf Wunsch: Kostenlose Vor-Ort-Begutachtung</li>
        <li>✓ Verbindliches Kaufangebot innerhalb 24h</li>
        <li>✓ Bei Zusage: Kostenlose Abholung & sofort Bargeld</li>
      </ul>
    </>
  );

  const faqs = [
    {
      question: "Was ist mein Gebrauchtwagen noch wert?",
      answer: "Nutzen Sie unsere kostenlose Online-Bewertung! In 2 Minuten erhalten Sie eine realistische Schätzung basierend auf Schwacke-Daten und aktuellen Marktpreisen."
    },
    {
      question: "Wie viel Wertverlust hat mein Auto pro Jahr?",
      answer: "Im Schnitt 15-20% pro Jahr in den ersten 3 Jahren. Ab Jahr 4-5 verlangsamt sich der Wertverlust auf 5-10% pro Jahr."
    },
    {
      question: "Sind Gebrauchtwagenpreise aktuell hoch oder niedrig?",
      answer: "Nach dem Höchststand 2022-2023 normalisieren sich die Preise 2024 langsam wieder. Es ist ein guter Zeitpunkt zum Verkaufen."
    }
  ];

  const relatedLinks = [
    { label: "Fahrzeugbewertung Ablauf", path: "/ratgeber/fahrzeugbewertung-ablauf" },
    { label: "Auto verkaufen Checkliste", path: "/ratgeber/auto-verkaufen-checkliste" },
    { label: "Kostenlose Bewertung", path: "/bewertung" },
    { label: "Auto verkaufen", path: "/ankauf" }
  ];

  return (
    <ContentPage
      title="Gebrauchtwagen Preise 2024 - Was ist mein Auto wert?"
      subtitle="Aktuelle Gebrauchtwagenpreise | Wertermittlung | Marktwerte"
      seoTitle="Gebrauchtwagen Preise aktuell - Auto Wert ermitteln"
      seoDescription="Gebrauchtwagen Preise 2024 ✓ Was ist mein Auto wert? ✓ Faktoren & Wertverlust ✓ Kostenlose Bewertung ✓ Marktpreise prüfen ✓ Beste Verkaufszeit"
      seoKeywords="gebrauchtwagen preise, auto wert ermitteln, gebrauchtwagenwert, was ist mein auto wert, gebrauchtwagen marktwert"
      breadcrumbs={[
        { label: "Ratgeber", link: "/" },
        { label: "Gebrauchtwagen Preise" }
      ]}
      content={content}
      relatedLinks={relatedLinks}
      faqs={faqs}
      ctaTitle="Was ist Ihr Auto wert? Jetzt kostenlos bewerten!"
      ctaText="In 2 Minuten den aktuellen Marktwert Ihres Autos ermitteln - 100% kostenlos!"
    />
  );
}

export default GebrauchtwagenPreise;

