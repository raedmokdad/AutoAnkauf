import React from 'react';
import ContentPage from '../../components/ContentPage';

function AutoAbmeldenVerkauf() {
  const content = (
    <>
      <p>
        <strong>Auto abmelden beim Verkauf - So geht's richtig!</strong> Nach dem Autoverkauf müssen Sie 
        Ihr Fahrzeug korrekt abmelden. Wir zeigen Ihnen Schritt für Schritt, wie die Abmeldung funktioniert, 
        was Sie beachten müssen und welche Fristen gelten.
      </p>

      <h2>Muss ich mein Auto beim Verkauf abmelden?</h2>
      <p>
        <strong>Nein, nicht zwingend!</strong> Sie haben zwei Optionen:
      </p>

      <h3>Option 1: Käufer meldet um (häufigste Variante)</h3>
      <ul>
        <li>Auto bleibt angemeldet</li>
        <li>Käufer meldet es auf sich um</li>
        <li>Sie müssen nur den Verkauf melden</li>
        <li>✓ Einfachste Lösung</li>
      </ul>

      <h3>Option 2: Sie melden ab (bei unsicheren Käufern)</h3>
      <ul>
        <li>Auto wird komplett abgemeldet</li>
        <li>Käufer muss neu anmelden</li>
        <li>Sicherer für Verkäufer</li>
        <li>✓ Empfohlen bei Export oder unseriösen Käufern</li>
      </ul>

      <h2>Wichtig: Verkauf bei Versicherung melden!</h2>
      <p>
        <strong>Pflicht innerhalb von 14 Tagen nach Verkauf!</strong>
      </p>
      <ul>
        <li>Bei Ihrer Kfz-Versicherung melden</li>
        <li>Telefonisch, per E-Mail oder online</li>
        <li>Versicherung wird sofort beendet</li>
        <li>Sie erhalten Rückerstattung für nicht genutzte Monate</li>
      </ul>

      <h3>⚠️ Wenn Sie nicht melden:</h3>
      <ul>
        <li>Sie zahlen weiter Versicherung!</li>
        <li>Bei Unfall haften evtl. Sie mit</li>
        <li>Rückerstattung verfällt nach Jahresende</li>
      </ul>

      <h2>Auto abmelden - Schritt für Schritt</h2>

      <h3>Schritt 1: Dokumente vorbereiten</h3>
      <p>
        <strong>Das brauchen Sie:</strong>
      </p>
      <ul>
        <li>✓ Fahrzeugschein (Zulassungsbescheinigung Teil I)</li>
        <li>✓ Fahrzeugbrief (Zulassungsbescheinigung Teil II) - optional</li>
        <li>✓ Kennzeichen (beide Schilder)</li>
        <li>✓ Personalausweis oder Reisepass</li>
        <li>✓ Bei Vollmacht: schriftliche Vollmacht + Ausweis des Bevollmächtigten</li>
      </ul>

      <h3>Schritt 2: Zur Zulassungsstelle</h3>
      <p>
        <strong>Wo?</strong> Bei der Zulassungsstelle Ihres Wohnortes (nicht des Wunschkennzeichens!)
      </p>
      <p>
        <strong>Termin nötig?</strong> In vielen Städten ja (online buchen)
      </p>
      <p>
        <strong>Öffnungszeiten:</strong> Meist Mo-Fr 8:00-12:00 Uhr
      </p>

      <h3>Schritt 3: Kennzeichen entstempeln</h3>
      <ul>
        <li>Kennzeichen werden entwertet</li>
        <li>Sie dürfen nicht mehr damit fahren</li>
        <li>Kennzeichen werden einbehalten oder gestanzt</li>
      </ul>

      <h3>Schritt 4: Unterlagen erhalten</h3>
      <ul>
        <li>Abmeldebescheinigung</li>
        <li>Fahrzeugbrief mit Abmeldevermerk</li>
        <li>Diese Dokumente dem Käufer übergeben</li>
      </ul>

      <h3>Schritt 5: Versicherung informieren</h3>
      <ul>
        <li>Innerhalb 14 Tagen Versicherung kontaktieren</li>
        <li>Verkaufsdatum mitteilen</li>
        <li>Rückerstattung beantragen</li>
      </ul>

      <h2>Online abmelden - So geht's</h2>
      <p>
        <strong>Seit 2023 möglich: Online-Abmeldung!</strong>
      </p>

      <h3>Voraussetzungen:</h3>
      <ul>
        <li>✓ Fahrzeugschein mit Sicherheitscode</li>
        <li>✓ Personalausweis mit Online-Funktion (eID)</li>
        <li>✓ Kartenlesegerät oder NFC-fähiges Smartphone</li>
        <li>✓ AusweisApp2 installiert</li>
      </ul>

      <h3>Ablauf:</h3>
      <ol>
        <li>Auf Portal der Zulassungsstelle gehen</li>
        <li>Mit eID anmelden</li>
        <li>Fahrzeugdaten eingeben</li>
        <li>Sicherheitscode vom Fahrzeugschein eingeben</li>
        <li>Abmeldung bestätigen</li>
        <li>Kennzeichen entstempeln (selbst mit Bohrer/Zange)</li>
        <li>Bescheinigung ausdrucken</li>
      </ol>

      <h3>💰 Kosten: ca. 5-10 € (weniger als vor Ort!)</h3>

      <h2>Kosten der Abmeldung</h2>
      <ul>
        <li><strong>Einfache Abmeldung:</strong> 5-10 €</li>
        <li><strong>Mit Kennzeichen-Reservierung:</strong> 12-15 €</li>
        <li><strong>Vor Ort bei Zulassungsstelle:</strong> ca. 5-7 €</li>
        <li><strong>Online-Abmeldung:</strong> ca. 5 €</li>
      </ul>

      <h2>Auto verkaufen ohne Abmeldung</h2>
      <p>
        <strong>Ist das erlaubt?</strong> Ja! Meistens sogar die bessere Variante.
      </p>

      <h3>Verkauf mit Kennzeichen:</h3>
      <ul>
        <li>✓ Käufer kann direkt fahren (mit Kurzzeitkennzeichen oder Ummeldung)</li>
        <li>✓ Keine extra Kosten für Abmeldung</li>
        <li>✓ Schnellere Abwicklung</li>
        <li>✓ Käufer meldet auf sich um</li>
      </ul>

      <h3>⚠️ Wichtig dabei:</h3>
      <ul>
        <li>Verkauf online melden: <strong>www.zulassung24.de</strong></li>
        <li>Oder direkt zur Zulassungsstelle gehen</li>
        <li>So sind Sie rechtlich abgesichert</li>
      </ul>

      <h2>Verkauf melden - Online oder vor Ort</h2>

      <h3>Online-Meldung (einfachste Methode!):</h3>
      <ol>
        <li>Auf <strong>www.zulassung24.de</strong> gehen</li>
        <li>"Verkaufsanzeige" auswählen</li>
        <li>Fahrzeugdaten eingeben</li>
        <li>Verkaufsdatum und Käuferdaten eingeben</li>
        <li>Bestätigung erhalten</li>
      </ol>

      <h3>Vor Ort bei Zulassungsstelle:</h3>
      <ul>
        <li>Kaufvertrag vorlegen</li>
        <li>Personalausweis vorzeigen</li>
        <li>Verkauf wird registriert</li>
        <li>Kostenlos!</li>
      </ul>

      <h2>Häufige Fehler vermeiden</h2>

      <h3>❌ Fehler 1: Versicherung nicht informiert</h3>
      <p>
        Sie zahlen weiter Prämien und verlieren Rückerstattung!
      </p>

      <h3>❌ Fehler 2: Verkauf nicht gemeldet</h3>
      <p>
        Bei Verstößen des Käufers (Knöllchen, Unfall) werden Sie kontaktiert.
      </p>

      <h3>❌ Fehler 3: Auto abgemeldet übergeben ohne Kurzzeitkennzeichen</h3>
      <p>
        Käufer kann nicht fahren! Immer Kurzzeitkennzeichen organisieren oder angemeldet übergeben.
      </p>

      <h3>❌ Fehler 4: Kennzeichen behalten</h3>
      <p>
        Bei Abmeldung müssen Kennzeichen abgegeben oder entwertet werden.
      </p>

      <h2>Auto verkaufen an ARZ Automobile - Wir kümmern uns um alles!</h2>
      <p>
        <strong>Zu kompliziert? Bei uns läuft alles reibungslos:</strong>
      </p>
      <ul>
        <li>✓ Wir übernehmen alle Formalitäten</li>
        <li>✓ Abmeldung oder Ummeldung - wir regeln das</li>
        <li>✓ Keine Behördengänge für Sie nötig</li>
        <li>✓ Versicherungsmeldung unterstützen wir</li>
        <li>✓ Professioneller Kaufvertrag inklusive</li>
        <li>✓ Sofort Barzahlung bei Übergabe</li>
        <li>✓ Kostenlose Abholung deutschlandweit</li>
        <li>✓ Sie haben keinen Stress - wir erledigen alles!</li>
      </ul>
    </>
  );

  const faqs = [
    {
      question: "Muss ich mein Auto beim Verkauf abmelden?",
      answer: "Nein, nicht zwingend. Meist meldet der Käufer das Fahrzeug auf sich um. Wichtig ist aber, dass Sie den Verkauf bei der Versicherung und idealerweise bei der Zulassungsstelle melden."
    },
    {
      question: "Wie lange habe ich Zeit zum Abmelden?",
      answer: "Es gibt keine feste Frist zur Abmeldung. Aber Sie müssen innerhalb von 14 Tagen die Versicherung informieren, um eine Rückerstattung zu erhalten."
    },
    {
      question: "Kann ich mein Auto online abmelden?",
      answer: "Ja, seit 2023 ist die Online-Abmeldung möglich. Sie brauchen dafür einen Personalausweis mit Online-Funktion (eID) und ein Kartenlesegerät."
    },
    {
      question: "Was kostet die Abmeldung?",
      answer: "Die Abmeldung kostet ca. 5-10 €, egal ob online oder vor Ort bei der Zulassungsstelle."
    }
  ];

  const relatedLinks = [
    { label: "Auto verkaufen Checkliste", path: "/ratgeber/auto-verkaufen-checkliste" },
    { label: "Kaufvertrag Muster", path: "/ratgeber/kaufvertrag-auto-muster" },
    { label: "Fahrzeugbewertung", path: "/ratgeber/fahrzeugbewertung-ablauf" },
    { label: "Jetzt verkaufen", path: "/ankauf" }
  ];

  return (
    <ContentPage
      title="Auto abmelden beim Verkauf - So geht's richtig!"
      subtitle="Kfz-Abmeldung | Online oder vor Ort | Kosten & Ablauf"
      seoTitle="Auto abmelden beim Verkauf - Anleitung 2024 | ARZ"
      seoDescription="Auto beim Verkauf abmelden ✓ Muss ich abmelden? ✓ Online-Abmeldung ✓ Kosten & Dokumente ✓ Versicherung informieren ✓ Schritt-für-Schritt Anleitung"
      seoKeywords="auto abmelden verkauf, kfz abmelden, auto verkaufen abmelden, online abmelden, zulassungsstelle"
      breadcrumbs={[
        { label: "Ratgeber", link: "/" },
        { label: "Auto abmelden" }
      ]}
      content={content}
      relatedLinks={relatedLinks}
      faqs={faqs}
      ctaTitle="Kein Stress mit Abmeldung - Wir übernehmen alles!"
      ctaText="Bei ARZ Automobile kümmern wir uns um alle Formalitäten beim Autoverkauf!"
    />
  );
}

export default AutoAbmeldenVerkauf;

