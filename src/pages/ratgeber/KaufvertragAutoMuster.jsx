import React from 'react';
import ContentPage from '../../components/ContentPage';

function KaufvertragAutoMuster() {
  const content = (
    <>
      <p>
        <strong>Kfz-Kaufvertrag Muster</strong> - Beim privaten Autoverkauf ist ein schriftlicher Kaufvertrag 
        unverzichtbar. Wir zeigen Ihnen, was in einem rechtssicheren Kaufvertrag stehen muss und bieten Ihnen 
        eine kostenlose Vorlage zum Download.
      </p>

      <h2>Warum ist ein Kfz-Kaufvertrag wichtig?</h2>
      <p>
        Ein Kaufvertrag schützt sowohl Käufer als auch Verkäufer. Er dokumentiert:
      </p>
      <ul>
        <li>Welches Fahrzeug verkauft wurde (Kennzeichen, FIN, Kilometerstand)</li>
        <li>Zu welchem Preis und zu welchen Bedingungen</li>
        <li>Welche Mängel bekannt waren ("gekauft wie besichtigt")</li>
        <li>Dass die Gewährleistung ausgeschlossen wird</li>
        <li>Wann die Übergabe erfolgte</li>
      </ul>

      <h2>Was muss im Kaufvertrag stehen?</h2>
      <h3>1. Verkäufer-Daten</h3>
      <ul>
        <li>Name und Vorname</li>
        <li>Vollständige Adresse</li>
        <li>Telefonnummer</li>
        <li>Personalausweis-Nummer (optional, aber empfohlen)</li>
      </ul>

      <h3>2. Käufer-Daten</h3>
      <ul>
        <li>Name und Vorname</li>
        <li>Vollständige Adresse</li>
        <li>Telefonnummer</li>
        <li>Personalausweis-Nummer</li>
      </ul>

      <h3>3. Fahrzeug-Daten</h3>
      <ul>
        <li>Marke und Modell</li>
        <li>Fahrzeug-Identifizierungsnummer (FIN/Fahrgestellnummer)</li>
        <li>Amtliches Kennzeichen</li>
        <li>Erstzulassung</li>
        <li>Kilometerstand (bei Übergabe)</li>
        <li>TÜV-Datum</li>
        <li>Farbe</li>
      </ul>

      <h3>4. Kaufpreis und Zahlung</h3>
      <ul>
        <li>Kaufpreis in Zahlen und Worten</li>
        <li>Zahlungsweise (bar, Überweisung)</li>
        <li>Zahlungszeitpunkt</li>
      </ul>

      <h3>5. Gewährleistungsausschluss</h3>
      <p>
        <strong>Wichtig für Privatverkäufer:</strong> Die Formulierung "gekauft wie besichtigt" oder 
        "unter Ausschluss jeglicher Gewährleistung" schließt spätere Ansprüche des Käufers aus.
      </p>

      <h3>6. Unterschriften</h3>
      <ul>
        <li>Datum der Vertragsunterzeichnung</li>
        <li>Unterschrift Verkäufer</li>
        <li>Unterschrift Käufer</li>
      </ul>

      <h2>Kostenloser Kaufvertrag beim ADAC</h2>
      <p>
        Der <strong>ADAC-Kaufvertrag</strong> ist kostenlos und rechtssicher. Sie können ihn online ausfüllen 
        oder als PDF ausdrucken. Alternativ gibt es Formulare bei:
      </p>
      <ul>
        <li>ADAC (kostenlos für Mitglieder und Nicht-Mitglieder)</li>
        <li>Dekra (kostenlos als PDF)</li>
        <li>TÜV (kostenlos als Download)</li>
        <li>Mobile.de (kostenlos)</li>
      </ul>

      <h2>Häufige Fehler beim Kaufvertrag vermeiden</h2>
      <h3>❌ Fehler 1: Kilometerstand nicht dokumentiert</h3>
      <p>
        Tragen Sie den <strong>exakten Kilometerstand bei Übergabe</strong> ein. Dies schützt vor 
        späteren Vorwürfen der Kilometermanipulation.
      </p>

      <h3>❌ Fehler 2: Gewährleistung nicht ausgeschlossen</h3>
      <p>
        Privatverkäufer müssen die Gewährleistung explizit ausschließen, sonst gelten 12 Monate 
        gesetzliche Gewährleistung!
      </p>

      <h3>❌ Fehler 3: Bekannte Mängel verschwiegen</h3>
      <p>
        Arglistige Täuschung! Tragen Sie alle bekannten Mängel ein (z.B. "Kratzer rechts hinten", 
        "Klimaanlage defekt").
      </p>

      <h3>❌ Fehler 4: Keine Unterschriften</h3>
      <p>
        Ohne Unterschrift beider Parteien ist der Vertrag nicht gültig.
      </p>

      <h2>Checkliste: Nach Vertragsunterzeichnung</h2>
      <ul>
        <li>✓ Kaufvertrag in zweifacher Ausfertigung (je 1x für Käufer und Verkäufer)</li>
        <li>✓ Personalausweise kopieren</li>
        <li>✓ Fahrzeugbrief und -schein übergeben</li>
        <li>✓ Alle Schlüssel übergeben</li>
        <li>✓ Serviceheft und Bedienungsanleitung übergeben</li>
        <li>✓ Kaufpreis erhalten</li>
        <li>✓ Fahrzeug beim Versicherung abmelden</li>
        <li>✓ Verkauf bei Zulassungsstelle melden (online möglich)</li>
      </ul>

      <h2>Kaufvertrag bei ARZ Automobile - Wir übernehmen alles!</h2>
      <p>
        <strong>Zu kompliziert?</strong> Bei ARZ Automobile übernehmen wir den kompletten Papierkram:
      </p>
      <ul>
        <li>✓ Professioneller Kaufvertrag</li>
        <li>✓ Alle Formalitäten</li>
        <li>✓ Sofort-Auszahlung bei Übergabe</li>
        <li>✓ Kostenlose Abholung</li>
        <li>✓ Wir kommen zu Ihnen - deutschlandweit!</li>
      </ul>
    </>
  );

  const faqs = [
    {
      question: "Muss ein Kaufvertrag schriftlich sein?",
      answer: "Nein, rechtlich ist auch ein mündlicher Kaufvertrag gültig. Aus Beweisgründen ist ein schriftlicher Vertrag aber dringend empfohlen."
    },
    {
      question: "Kann ich die Gewährleistung als Privatverkäufer ausschließen?",
      answer: "Ja, mit der Formulierung 'unter Ausschluss jeglicher Gewährleistung' oder 'gekauft wie besichtigt'. Dies gilt aber nicht bei arglistiger Täuschung (Mängel verschweigen)."
    },
    {
      question: "Was passiert, wenn ich einen Mangel verschweige?",
      answer: "Das ist arglistige Täuschung. Der Käufer kann vom Vertrag zurücktreten oder Schadenersatz verlangen, auch wenn die Gewährleistung ausgeschlossen wurde."
    }
  ];

  const relatedLinks = [
    { label: "Auto verkaufen Checkliste", path: "/ratgeber/auto-verkaufen-checkliste" },
    { label: "Fahrzeugbewertung", path: "/ratgeber/fahrzeugbewertung-ablauf" },
    { label: "Auto abmelden", path: "/ratgeber/auto-abmelden-verkauf" },
    { label: "Jetzt verkaufen", path: "/ankauf" }
  ];

  return (
    <ContentPage
      title="Kfz-Kaufvertrag Muster - Kostenlose Vorlage für Privatverkauf"
      subtitle="Rechtssicherer Kaufvertrag für Auto-Privatverkauf | ADAC-Vorlage"
      seoTitle="Auto Kaufvertrag Muster - Kostenlose PDF Vorlage"
      seoDescription="Kfz-Kaufvertrag Muster ✓ Kostenlose Vorlage ✓ Rechtssicher ✓ Was muss rein ✓ ADAC-Kaufvertrag ✓ Gewährleistung ausschließen"
      seoKeywords="kaufvertrag auto, kfz kaufvertrag muster, auto kaufvertrag pdf, kaufvertrag privatverkauf"
      breadcrumbs={[
        { label: "Ratgeber", link: "/" },
        { label: "Kaufvertrag" }
      ]}
      content={content}
      relatedLinks={relatedLinks}
      faqs={faqs}
      ctaTitle="Kein Papierkram - Wir übernehmen alles!"
      ctaText="Bei ARZ Automobile kümmern wir uns um den Kaufvertrag und alle Formalitäten!"
    />
  );
}

export default KaufvertragAutoMuster;

