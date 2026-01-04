import React from 'react';
import ContentPage from '../../components/ContentPage';

function AutoVerkaufenCheckliste() {
  const content = (
    <>
      <p>
        <strong>Auto verkaufen Checkliste</strong> - Mit dieser umfassenden Checkliste verkaufen Sie Ihr 
        Auto stressfrei und zum besten Preis. Von der Vorbereitung bis zur Übergabe - wir zeigen Ihnen alle wichtigen Schritte.
      </p>

      <h2>Phase 1: Vorbereitung (1-2 Wochen vorher)</h2>
      <h3>✓ Fahrzeug aufbereiten</h3>
      <ul>
        <li>Auto gründlich waschen (außen und innen)</li>
        <li>Innenraum saugen und Polster reinigen</li>
        <li>Kleine Kratzer mit Politur entfernen</li>
        <li>Steinschläge in der Windschutzscheibe reparieren</li>
        <li>Fußmatten waschen</li>
        <li>Kofferraum ausräumen und reinigen</li>
      </ul>

      <h3>✓ Unterlagen zusammenstellen</h3>
      <ul>
        <li>Fahrzeugbrief (Zulassungsbescheinigung Teil II)</li>
        <li>Fahrzeugschein (Zulassungsbescheinigung Teil I)</li>
        <li>Serviceheft mit allen Wartungseinträgen</li>
        <li>TÜV-/AU-Berichte</li>
        <li>Rechnungen für Reparaturen und Extras</li>
        <li>Bedienungsanleitung</li>
        <li>Zweiter Schlüssel</li>
        <li>COC-Papiere (bei Importfahrzeugen)</li>
      </ul>

      <h3>✓ Fahrzeugwert ermitteln</h3>
      <ul>
        <li>Online-Bewertung nutzen (z.B. bei ARZ Automobile)</li>
        <li>Preise vergleichbarer Fahrzeuge checken</li>
        <li>Schwacke-Liste oder DAT konsultieren</li>
        <li>Mehrere Ankaufs-Angebote einholen</li>
      </ul>

      <h2>Phase 2: Verkauf vorbereiten</h2>
      <h3>✓ Fahrzeug fotografieren</h3>
      <ul>
        <li>Fotos bei Tageslicht machen</li>
        <li>Alle Seiten fotografieren (vorne, hinten, links, rechts)</li>
        <li>Innenraum zeigen (Sitze, Armaturenbrett, Kofferraum)</li>
        <li>Kilometerstand fotografieren</li>
        <li>Besondere Ausstattungsmerkmale hervorheben</li>
        <li>Eventuelle Schäden ehrlich dokumentieren</li>
      </ul>

      <h3>✓ Verkaufsstrategie wählen</h3>
      <ul>
        <li><strong>Privatverkauf:</strong> Höherer Preis, aber mehr Aufwand</li>
        <li><strong>Händler-Ankauf:</strong> Schnell und unkompliziert</li>
        <li><strong>Inzahlungnahme:</strong> Beim Neuwagenkauf</li>
        <li><strong>Online-Ankauf (wie ARZ):</strong> Bequem, faire Preise, kostenlose Abholung</li>
      </ul>

      <h2>Phase 3: Bei der Übergabe</h2>
      <h3>✓ Kaufvertrag erstellen</h3>
      <ul>
        <li>Schriftlichen Kaufvertrag nutzen</li>
        <li>Personalausweise beider Parteien kopieren</li>
        <li>Kilometerstand dokumentieren</li>
        <li>Mängel und "gekauft wie besichtigt" vermerken</li>
        <li>Zahlungsweise festhalten</li>
        <li>Beide Parteien unterschreiben</li>
      </ul>

      <h3>✓ Fahrzeugübergabe</h3>
      <ul>
        <li>Probefahrt ermöglichen (Ausweis als Pfand)</li>
        <li>Alle Unterlagen übergeben</li>
        <li>Beide Schlüssel aushändigen</li>
        <li>Kaufpreis bar oder per Überweisung erhalten</li>
        <li>Abmeldebestätigung / Überführungskennzeichen klären</li>
      </ul>

      <h3>✓ Nach dem Verkauf</h3>
      <ul>
        <li>Auto bei Versicherung abmelden</li>
        <li>Kfz-Steuer-Erstattung beantragen</li>
        <li>Verkauf beim Straßenverkehrsamt melden (optional)</li>
        <li>Kaufvertrag aufbewahren (mindestens 2 Jahre)</li>
      </ul>

      <h2>Warum ARZ Automobile? So wird's noch einfacher!</h2>
      <p>
        <strong>Sie möchten sich den Aufwand sparen?</strong> Bei ARZ Automobile übernehmen wir:
      </p>
      <ul>
        <li>✓ Die faire Bewertung Ihres Autos</li>
        <li>✓ Die kostenlose Abholung deutschlandweit</li>
        <li>✓ Die komplette Abwicklung inkl. Kaufvertrag</li>
        <li>✓ Die Abmeldung beim Straßenverkehrsamt</li>
        <li>✓ Die Sofort-Auszahlung bei Übergabe</li>
      </ul>
      <p>
        <strong>Sie bleiben zu Hause - wir kommen zu Ihnen!</strong>
      </p>
    </>
  );

  const faqs = [
    {
      question: "Muss ich das Auto vor dem Verkauf reinigen?",
      answer: "Eine Reinigung ist nicht Pflicht, erhöht aber den Verkaufspreis deutlich. Ein gepflegtes Auto macht einen besseren Eindruck."
    },
    {
      question: "Brauche ich alle Wartungsrechnungen?",
      answer: "Nicht zwingend, aber ein lückenloses Serviceheft erhöht den Wert. Wichtige Reparaturen sollten dokumentiert sein."
    }
  ];

  const relatedLinks = [
    { label: "Kaufvertrag Muster", path: "/ratgeber/kaufvertrag-auto-muster" },
    { label: "Fahrzeugbewertung", path: "/ratgeber/fahrzeugbewertung-ablauf" },
    { label: "Auto abmelden", path: "/ratgeber/auto-abmelden-verkauf" },
    { label: "Jetzt bewerten", path: "/bewertung" }
  ];

  return (
    <ContentPage
      title="Auto verkaufen Checkliste - Schritt für Schritt zum Erfolg"
      subtitle="Vollständige Checkliste für den stressfreien Autoverkauf"
      seoTitle="Auto verkaufen Checkliste - Komplette Anleitung"
      seoDescription="Auto verkaufen Checkliste ✓ Alle Schritte von Vorbereitung bis Übergabe ✓ Unterlagen ✓ Tipps für besten Preis ✓ PDF zum Ausdrucken"
      seoKeywords="auto verkaufen checkliste, autoverkauf vorbereitung, unterlagen autoverkauf, auto verkaufen tipps"
      breadcrumbs={[
        { label: "Ratgeber", link: "/" },
        { label: "Checkliste" }
      ]}
      content={content}
      relatedLinks={relatedLinks}
      faqs={faqs}
      ctaTitle="Zu viel Aufwand? Wir kaufen Ihr Auto!"
      ctaText="Überspringen Sie alle Schritte - wir kommen zu Ihnen und übernehmen alles!"
    />
  );
}

export default AutoVerkaufenCheckliste;

