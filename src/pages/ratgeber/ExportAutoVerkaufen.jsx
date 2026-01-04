import React from 'react';
import ContentPage from '../../components/ContentPage';

function ExportAutoVerkaufen() {
  const content = (
    <>
      <p>
        <strong>Auto für Export verkaufen - Lohnt sich das?</strong> Viele Gebrauchtwagen werden ins Ausland 
        exportiert. Wir erklären, wann Export sinnvoll ist, welche Autos gefragt sind und wie Sie den besten 
        Preis erzielen.
      </p>

      <h2>Was bedeutet "Auto für Export"?</h2>
      <p>
        Export-Fahrzeuge sind Gebrauchtwagen, die ins Ausland (meist Osteuropa, Afrika, Naher Osten) verkauft 
        werden. Dort haben ältere deutsche Autos einen guten Ruf und erzielen höhere Preise.
      </p>

      <h3>Typische Export-Ziele:</h3>
      <ul>
        <li>🇵🇱 Polen</li>
        <li>🇷🇴 Rumänien</li>
        <li>🇧🇬 Bulgarien</li>
        <li>🇺🇦 Ukraine</li>
        <li>🇷🇺 Russland</li>
        <li>🌍 Afrika (Nigeria, Ghana, Kenia)</li>
        <li>🇦🇪 Naher Osten (Dubai, Libanon)</li>
      </ul>

      <h2>Welche Autos eignen sich für Export?</h2>

      <h3>✅ Sehr gefragt für Export:</h3>
      <ul>
        <li><strong>Deutsche Premium-Marken:</strong> Mercedes, BMW, Audi, VW, Porsche</li>
        <li><strong>Robust und langlebig:</strong> Mercedes W124, W210, BMW E36, E46, VW Passat, Golf</li>
        <li><strong>Geländewagen/SUVs:</strong> Land Rover, Toyota Land Cruiser, Mercedes G-Klasse</li>
        <li><strong>Transporter:</strong> Mercedes Sprinter, VW T5/T6, Ford Transit</li>
        <li><strong>Diesel-Fahrzeuge:</strong> In vielen Ländern sehr begehrt</li>
      </ul>

      <h3>❌ Weniger gefragt für Export:</h3>
      <ul>
        <li>Französische/italienische Marken (Peugeot, Renault, Fiat)</li>
        <li>Kleinwagen (außer VW Polo, Golf)</li>
        <li>Sehr alte Fahrzeuge (über 20 Jahre)</li>
        <li>Unfallwagen mit Strukturschäden</li>
        <li>Fahrzeuge ohne Papiere</li>
      </ul>

      <h2>Wann lohnt sich Export?</h2>

      <h3>Export lohnt sich bei:</h3>
      <ul>
        <li>✓ Älteren Fahrzeugen (10-20 Jahre)</li>
        <li>✓ Hohem Kilometerstand (über 150.000 km)</li>
        <li>✓ Abgelaufenem TÜV</li>
        <li>✓ Kleineren Mängeln</li>
        <li>✓ Diesel-Fahrzeugen (Fahrverbote in Deutschland)</li>
        <li>✓ Deutscher Premium-Marke</li>
      </ul>

      <h3>Export lohnt sich NICHT bei:</h3>
      <ul>
        <li>✗ Neuwertigen Fahrzeugen (unter 5 Jahre)</li>
        <li>✗ Totalschaden</li>
        <li>✗ Fehlenden Fahrzeugpapieren</li>
        <li>✗ Gestohlenen Fahrzeugen</li>
      </ul>

      <h2>Export vs. Privatverkauf - Was ist besser?</h2>

      <h3>Export-Verkauf</h3>
      <p>
        <strong>Vorteile:</strong>
      </p>
      <ul>
        <li>✓ Schnelle Abwicklung (oft 24-48h)</li>
        <li>✓ Sofortige Barzahlung</li>
        <li>✓ Keine Aufbereitung nötig</li>
        <li>✓ Auch mit Mängeln/ohne TÜV</li>
        <li>✓ Kein Wertverlust durch langes Anbieten</li>
      </ul>
      <p>
        <strong>Nachteile:</strong>
      </p>
      <ul>
        <li>✗ Oft niedrigerer Preis als Privatverkauf</li>
        <li>✗ Verhandlungstaktiken der Händler</li>
      </ul>

      <h3>Privatverkauf</h3>
      <p>
        <strong>Vorteile:</strong>
      </p>
      <ul>
        <li>✓ Potenziell höherer Preis</li>
        <li>✓ Direkter Kontakt zum Käufer</li>
      </ul>
      <p>
        <strong>Nachteile:</strong>
      </p>
      <ul>
        <li>✗ Zeitaufwand (Inserate, Besichtigungen)</li>
        <li>✗ Unsichere Zahlungsmethoden</li>
        <li>✗ Betrugsrisiko</li>
        <li>✗ Rechtliche Risiken</li>
        <li>✗ Schwieriger bei Mängeln</li>
      </ul>

      <h2>Vorsicht vor Export-Betrügern!</h2>

      <h3>🚨 Typische Betrugsmaschen:</h3>

      <h4>1. Der "ausländische Käufer"</h4>
      <ul>
        <li>Angeblich aus dem Ausland</li>
        <li>Bietet sofort den vollen Preis</li>
        <li>Will per Auslandsüberweisung zahlen</li>
        <li>Schickt "Spedition" zur Abholung</li>
        <li>⚠️ <strong>Gefahr:</strong> Geld kommt nie an, Auto ist weg!</li>
      </ul>

      <h4>2. Die "Nachverhandlung"</h4>
      <ul>
        <li>Kommt zur Besichtigung</li>
        <li>Findet plötzlich "versteckte Mängel"</li>
        <li>Drückt den Preis massiv</li>
        <li>Setzt unter Zeitdruck</li>
      </ul>

      <h4>3. Der "Blitzverkauf"</h4>
      <ul>
        <li>Will sofort kaufen</li>
        <li>Zahlt bar</li>
        <li>Fährt sofort weg</li>
        <li>⚠️ <strong>Gefahr:</strong> Falschgeld, keine ordentliche Abmeldung</li>
      </ul>

      <h3>✅ So schützen Sie sich:</h3>
      <ul>
        <li>✓ Nur Barzahlung oder bestätigte Überweisung akzeptieren</li>
        <li>✓ Ausweiskopie des Käufers anfertigen</li>
        <li>✓ Ordentlichen Kaufvertrag ausfüllen</li>
        <li>✓ Nie Fahrzeug übergeben bevor Geld da ist</li>
        <li>✓ Bei großen Summen: Bank zur Prüfung</li>
        <li>✓ Verkauf bei Zulassungsstelle melden</li>
      </ul>

      <h2>Auto für Export verkaufen - So geht's</h2>

      <h3>Schritt 1: Fahrzeugwert ermitteln</h3>
      <p>
        Nutzen Sie unsere kostenlose Online-Bewertung für Export-Fahrzeuge.
      </p>

      <h3>Schritt 2: Seriösen Export-Händler finden</h3>
      <p>
        Achten Sie auf:
      </p>
      <ul>
        <li>Feste Geschäftsadresse in Deutschland</li>
        <li>Positive Bewertungen</li>
        <li>Transparente Preisgestaltung</li>
        <li>Professioneller Auftritt</li>
      </ul>

      <h3>Schritt 3: Angebot einholen</h3>
      <p>
        Bei ARZ Automobile erhalten Sie innerhalb 24h ein verbindliches Angebot.
      </p>

      <h3>Schritt 4: Fahrzeug übergeben</h3>
      <ul>
        <li>Kaufvertrag unterzeichnen</li>
        <li>Barzahlung erhalten</li>
        <li>Fahrzeugpapiere übergeben</li>
        <li>Schlüssel übergeben</li>
      </ul>

      <h3>Schritt 5: Abmeldung</h3>
      <p>
        Melden Sie den Verkauf online bei der Zulassungsstelle oder lassen Sie dies vom Käufer übernehmen.
      </p>

      <h2>Export-Fahrzeug an ARZ Automobile verkaufen</h2>
      <p>
        <strong>Wir kaufen Fahrzeuge für Export - Fair und sicher!</strong>
      </p>
      <ul>
        <li>✓ Spezialisiert auf Export-Fahrzeuge</li>
        <li>✓ Auch ältere Fahrzeuge (10-20 Jahre)</li>
        <li>✓ Auch mit hohem Kilometerstand</li>
        <li>✓ Auch ohne TÜV</li>
        <li>✓ Faire Preise - basierend auf internationalem Marktwert</li>
        <li>✓ Sofort Barzahlung</li>
        <li>✓ Kostenlose Abholung deutschlandweit</li>
        <li>✓ Alle Formalitäten übernehmen wir</li>
        <li>✓ Seriös und professionell - keine Tricks!</li>
      </ul>
    </>
  );

  const faqs = [
    {
      question: "Welche Autos sind für Export gefragt?",
      answer: "Deutsche Premium-Marken (Mercedes, BMW, Audi, VW) mit 10-20 Jahren Alter und robuste Diesel-Modelle sind besonders gefragt für Export."
    },
    {
      question: "Bekomme ich für Export mehr Geld?",
      answer: "Bei älteren Fahrzeugen mit hohem Kilometerstand oder ohne TÜV oft ja. Neuwertige Autos erzielen privat meist mehr."
    },
    {
      question: "Ist Export-Verkauf sicher?",
      answer: "Bei seriösen Händlern ja. Achten Sie auf Barzahlung, feste Geschäftsadresse und ordentlichen Kaufvertrag. Wir von ARZ Automobile garantieren sichere Abwicklung!"
    },
    {
      question: "Kann ich ein Auto ohne TÜV für Export verkaufen?",
      answer: "Ja! Export-Händler kaufen oft Fahrzeuge ohne TÜV, da im Ausland andere Bestimmungen gelten. Wir kaufen auch ohne TÜV!"
    }
  ];

  const relatedLinks = [
    { label: "Auto ohne TÜV verkaufen", path: "/ratgeber/auto-ohne-tuev-verkaufen" },
    { label: "Unfallwagen verkaufen", path: "/ratgeber/unfallwagen-verkaufen" },
    { label: "Fahrzeugbewertung", path: "/ratgeber/fahrzeugbewertung-ablauf" },
    { label: "Jetzt verkaufen", path: "/ankauf" }
  ];

  return (
    <ContentPage
      title="Auto für Export verkaufen - Lohnt sich das?"
      subtitle="Export-Fahrzeuge Ankauf | Faire Preise | Sichere Abwicklung"
      seoTitle="Auto Export verkaufen - Beste Preise | ARZ"
      seoDescription="Auto für Export verkaufen ✓ Welche Autos sind gefragt? ✓ Export vs. Privatverkauf ✓ Vorsicht Betrug ✓ Sichere Abwicklung ✓ Sofort Bargeld"
      seoKeywords="auto export verkaufen, exportfahrzeug verkaufen, auto ausland verkaufen, gebrauchtwagen export"
      breadcrumbs={[
        { label: "Ratgeber", link: "/" },
        { label: "Export-Auto" }
      ]}
      content={content}
      relatedLinks={relatedLinks}
      faqs={faqs}
      ctaTitle="Export-Fahrzeug jetzt sicher verkaufen!"
      ctaText="Faire Preise, sofort Bargeld, kostenlose Abholung - Seriöser Export-Ankauf!"
    />
  );
}

export default ExportAutoVerkaufen;

