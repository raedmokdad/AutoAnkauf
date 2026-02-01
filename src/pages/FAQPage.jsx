import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LightningIcon, DocumentIcon, CheckIcon } from '../components/Icons';
import '../styles/shared-green-hero.css';
import './FAQPage.css';

function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'Allgemeines zum Autoverkauf bei AutoHD',
      questions: [
        {
          question: 'Wie funktioniert der Autoverkauf bei AutoHD?',
          answer: 'Der Autoverkauf bei AutoHD läuft in wenigen einfachen Schritten ab:\n\n1. Fülle unser Online-Formular mit den Basisdaten deines Fahrzeugs aus.\n\n2. Wir melden uns innerhalb von 24 Stunden (telefonisch oder per E-Mail) mit dem Ergebnis der Autowertermittlung. Bei Fragen sind wir jederzeit dich erreichbar - transparent und fair.\n\n3. Wenn du verkaufen möchtest, vereinbaren wir einen Termin. Du gibst die Adresse an. Im Umkreis von 100 km rund um Rheinberg kommen wir kostenlos zu dir (keine Anfahrtskosten). Alternativ kannst du auch zu uns nach Rheinberg kommen. Vor Ort bestätigen wir die von dir gemachten Angaben zum Fahrzeug.\n\n4. Der Kaufpreis wird sofort per Überweisung oder bar ausgezahlt. Auf Wunsch übernehmen wir die kostenlose Abmeldung und tragen die Abmeldegebühren. Im Umkreis von 100 km holen wir dein Auto kostenlos ab – ist es nicht verkehrstüchtig, wird es ebenso kostenfrei abtransportiert. Du musst nirgendwo hinfahren und keinen Papierkram erledigen.'
        },
        {
          question: 'Welche Autos kauft AutoHD an?',
          answer: 'Wir kaufen viele Fahrzeugtypen an: Pkw, SUV, Transporter und Kleinbusse – aller Marken. Ob dein Auto gebraucht ist, einen Unfallschaden hat oder eine hohe Laufleistung aufweist: Du bekommst ein faires Angebot. Auch Fahrzeuge mit Mängeln, Motorschaden, Getriebeschaden oder ohne TÜV kaufen wir in der Regel problemlos an. Auch Fahrzeuge ohne Zulassung, mit Totalschaden oder nicht mehr fahrbereite Autos werden von uns kostenlos abtransportiert. Sprich uns einfach an – wir sagen dir schnell, was möglich ist, und kümmern uns um den Rest.'
        },
        {
          question: 'Ist die Online-Bewertung meines Autos wirklich kostenlos?',
          answer: 'Ja. Die Online-Autobewertung ist 100 % kostenlos und unverbindlich. Du gibst deine Fahrzeuginformationen ein und bekommst zeitnah eine Rückmeldung. Auch eine Besichtigung vor Ort ist im Umkreis von 100 km rund um Rheinberg kostenfrei. Alternativ kannst du uns auch abrufen und die Fahrzeugbewertung telefonisch anfragen.\n\nDieser Service ist für dich komplett kostenfrei – auch wenn du dein Auto am Ende nicht verkaufst.'
        },
        {
          question: 'Muss ich mein Auto vor dem Verkauf aufbereiten?',
          answer: 'Nein, eine aufwendige Fahrzeugaufbereitung ist nicht nötig. Wir kaufen dein Auto im Ist-Zustand. Eine normale Sauberkeit reicht – du musst kein Geld in Reinigung oder Reparaturen investieren. Das macht den Autoverkauf bei AutoHD besonders unkompliziert.'
        },
        {
          question: 'Kann ich auch ein Auto mit Motorschaden verkaufen?',
          answer: 'Ja, absolut! Wir kaufen auch Fahrzeuge mit Motorschaden, Getriebeschaden oder anderen technischen Defekten an. Gib den Zustand bei der Online-Autobewertung bitte ehrlich an – dann erstellen wir dir ein passendes Kaufangebot. So sparst du dir teure Reparaturen.'
        },
        {
          question: 'Bei AutoHD bekomme ich eine Autobewertung ohne Registrierung.\nWarum werden trotzdem E-Mail und Telefonnummer benötigt?',
          answer: 'Damit wir dir das Ergebnis der durchgeführten Wertermittlung deines Fahrzeugs zukommen lassen können. Die Telefonnummer ist wichtig, um den Besichtigungs- und Abholtermin zu bestätigen und Rückfragen schnell zu klären. Weitere Informationen findest du in unserer Datenschutzerklärung. Für alle datenschutzrechtliche Fragen verweisen wir auf unsere Datenschutzbestimmungen.'
        },
        {
          question: 'Kauft ihr auch Fahrzeuge, die nicht mehr fahrbereit sind?',
          answer: 'Ja. Wir kaufen auch Autos, die nicht mehr fahrtauglich sind. Du kannst dir online oder telefonisch eine Autobewertung einholen. Wenn du unser Angebot annimmst, kümmern wir uns um alles – inklusive Abtransport. Unser Service von der Wertermittlung bis zum Abtransport (im Umkreis von 100 km) ist komplett kostenfrei.'
        },
        {
          question: 'Kauft ihr auch Autos ohne Zulassung?',
          answer: 'Ja, wir kaufen auch Fahrzeuge ohne Zulassung. Du kannst online eine Bewertung machen oder telefonisch eine Wertermittlung einholen. Danach vereinbaren wir einen Termin und kümmern uns um den Abtransport – im Umkreis von 100 km rund um Rheinberg kostenlos.\n\nDas gilt ebenso für Unfallautos, Defektautos oder Exportfahrzeuge: einfach anrufen oder Formular/E-Mail senden – wir melden uns zeitnah und klären alles.'
        }
      ]
    },
    {
      category: 'Autobewertung & Preis',
      questions: [
        {
          question: 'Wie wird der Preis für mein Auto ermittelt?',
          answer: 'Die Fahrzeugbewertung basiert auf aktuellen Marktdaten, Fahrzeugzustand, Kilometerstand, Ausstattung, Baujahr und der aktuellen Nachfrage.'
        },
        {
          question: 'Wie erfahre ich, wie viel mein Auto wert ist?',
          answer: 'Ganz einfach: Du füllst unser Online-Formular aus oder rufst uns direkt an. In beiden Fällen bekommst du schnell eine kostenlose, unverbindliche Wertermittlung für dein Auto.'
        },
        {
          question: 'Welche Faktoren beeinflussen den Preis?',
          answer: 'Der Preis wird beeinflusst durch unterschiedliche Faktoren. Dazu zählen unter anderem:\n\n• Alter des Fahrzeugs\n• Kilometerstand\n• Zustand (innen & außen)\n• Scheckheftpflege\n• Ausstattung\n• aktuelle Marktnachfrage\n• eventuelle Schäden oder Mängel'
        },
        {
          question: 'Berücksichtigt ihr Sonderausstattung?',
          answer: 'Ja, hochwertige Sonderausstattungen wie Ledersitze, Schiebedach etc. fließen in unsere Bewertung mit ein und können den Preis positiv beeinflussen.'
        },
        {
          question: 'Ich habe eine Bewertung für mein Auto gemacht und möchte doch nicht verkaufen.',
          answer: 'Kein Problem. Unser Angebot ist unverbindlich – der gesamte Service bleibt für dich kostenfrei.'
        }
      ]
    },
    {
      category: 'Dokumente & Formalitäten',
      questions: [
        {
          question: 'Welche Dokumente brauche ich für den Gebrauchtwagenverkauf?',
          answer: 'Für den Verkauf benötigst du:\n\n• Zulassungsbescheinigung Teil II (Fahrzeugbrief)\n• Zulassungsbescheinigung Teil I (Fahrzeugschein)\n• Gültigen Personalausweis oder Reisepass\n\nWenn vorhanden, hilfreich:\n\n• Serviceheft\n• Nachweise der letzten Hauptuntersuchung (HU) / ggf. Abgasuntersuchung\n• Rechnungen/Belege zu Reparaturen, Wartung oder Kauf\n\nWenn Dokumente fehlen, sprich uns an – oft finden wir gemeinsam eine Lösung. Bitte denk auch daran, alle Fahrzeugschlüssel zu übergeben. Zubehör kann den Ankaufpreis verbessern.'
        },
        {
          question: 'Muss ich mein Auto abmelden?',
          answer: 'Nein, um die Abmeldung kümmern wir uns! Nach dem Kauf übernehmen wir die Formalitäten inklusive Fahrzeugabmeldung bei der Zulassungsstelle. Du sparst dir den Gang zur Behörde -- das ist Teil unseres Rundum-Sorglos-Service.'
        },
        {
          question: 'Kann ich ein Auto mit laufender Finanzierung verkaufen?',
          answer: 'Ja, wir kaufen auch finanzierte Fahrzeuge. Wir kümmern uns um die Ablösung und wickeln alles direkt mit deiner Bank ab. Dafür benötigen wir die Unterlagen deiner Finanzierungsbank, um die noch offenen Kosten zu bestimmen. Nach Abzug der offenen Finanzierung vom Verkaufspreis wird der Restbetrag an dich ausgezahlt und das Fahrzeug bei der Bank ausgelöst. Dieser Service ist für dich kostenlos.'
        },
        {
          question: 'Kann ich mein Auto auch ohne TÜV verkaufen?',
          answer: 'Ja. Der Ankauf läuft genauso ab wie bei Fahrzeugen mit gültigem TÜV. Ruf uns an oder nutze die Online-Autobewertung. Du bekommst zeitnah eine Rückmeldung, wir vereinbaren einen Termin und holen deinen Wagen ab. Du musst keine teure Hauptuntersuchung durchführen lassen, um dein Auto zu verkaufen.'
        },
        {
          question: 'Was brauche ich, wenn die Fahrzeugpapiere nicht auf mich ausgestellt sind?',
          answer: 'Du kannst auch als Vertreter des Fahrzeughalters verkaufen. Dazu brauchst du eine auf deinen Namen ausgestellte Verkaufsvollmacht und jeweils eine Kopie des Personalausweises oder Reisepasses von dir und vom eingetragenen Eigentümer/Halter.'
        },
        {
          question: 'Kann ich meinen PKW auch ohne Fahrzeugschein und/oder Fahrzeugbrief verkaufen?',
          answer: 'Ohne die Zulassungsbescheinigung Teil I (Fahrzeugschein) oder die Zulassungsbescheinigung Teil II (Fahrzeugbrief) können wir dein Auto leider nicht kaufen.\n\nBei Verlust deiner Zulassungsbescheinigung Teil II (Fahrzeugbrief) muss der Verlust bei der zuständigen Zulassungsstelle amtlich bekannt gemacht werden, damit das Dokument für ungültig erklärt werden kann. Die Zulassungsstelle veröffentlicht den Verlust im elektronischen Verkehrsblatt, um einen neuen Brief auszustellen, was meist 14 Tage dauert.\n\nWenn Teil II wegen einer laufenden Finanzierung bei der Bank hinterlegt ist, ist ein Verkauf an uns grundsätzlich möglich: Melde dich bei uns – wir kümmern uns um die Ablösung beim Kreditinstitut.'
        }
      ]
    },
    {
      category: 'Zahlung & Fahrzeug Abholung',
      questions: [
        {
          question: 'Wie und wann bekomme ich mein Geld?',
          answer: 'Die Auszahlung erfolgt sofort nach Vertragsunterzeichnung – wahlweise per Banküberweisung oder bar. Bei Barzahlung erhältst du das Geld direkt vor Ort. Bei Überweisung ist das Geld in der Regel innerhalb von 24 Stunden auf deinem Konto.'
        },
        {
          question: 'Ist die Barzahlung sicher?',
          answer: 'Ja. Wir sind ein seriöses, etabliertes Unternehmen mit Erfahrung im Autoankauf. Die Barzahlung erfolgt diskret bei der Fahrzeugübergabe. Alternativ bieten wir Sofortüberweisung oder reguläre Banküberweisung an – wie du willst. Mit unserem Standort in Rheinberg hast du eine feste Adresse und einen Ansprechpartner – auch nach dem Verkauf.'
        },
        {
          question: 'Fallen versteckte Kosten oder Gebühren an?',
          answer: 'Nein. Bei AutoHD gibt es keine versteckten Kosten. Autobewertung, Besichtigung, Abholung/Abtransport im Umkreis von 100 km, Abmeldung und die wichtigsten Formalitäten sind für dich kostenlos.'
        },
        {
          question: 'Kann mein Fahrzeug auch abgeholt oder abtransportiert werden?',
          answer: 'Ja. Wir holen dein Auto ab. Im Umkreis von 100 km rund um Rheinberg ist die Abholung kostenlos. Das ist besonders praktisch, wenn dein Fahrzeug nicht mehr fahrtüchtig ist oder du keine Zeit für die Anfahrt hast.'
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <section className="faq-hero-green">
        <div className="faq-hero-container">
          
          <h1 className="faq-hero-title">Häufige Fragen zum Auto verkaufen </h1>
          <p className="faq-hero-subtitle">
          Finde schnell Antworten auf die wichtigsten Fragen rund um den Autoverkauf bei AutoHD.
                    </p>
        </div>
      </section>

      <section className="section faq-main-section">
        <div className="container">
          <div className="faq-content">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="faq-category">
                <h2 className="faq-category-title">{category.category}</h2>
                <div className="faq-list">
                  {category.questions.map((item, questionIndex) => {
                    const index = `${categoryIndex}-${questionIndex}`;
                    const isOpen = openIndex === index;
                    
                    return (
                      <div key={questionIndex} className={`faq-item ${isOpen ? 'open' : ''}`}>
                        <button
                          className="faq-question"
                          onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                        >
                          <span>{item.question}</span>
                          <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                        </button>
                        <div className={`faq-answer ${isOpen ? 'show' : ''}`}>
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq-cta-section">
        <div className="container">
          <div className="faq-cta">
            <h2>Noch Fragen?</h2>
            <p>
            Wenn du weitere Fragen hast, zögere nicht, uns zu kontaktieren. Wir stehen dir gerne zur Verfügung.
            </p>
            <div className="faq-cta-buttons">
              <Link to="/kontakt" className="btn btn-primary btn-large">
                Kontakt aufnehmen
              </Link>
              <Link to="/bewertung" className="btn btn-secondary btn-large">
                Jetzt bewerten
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FAQPage;

