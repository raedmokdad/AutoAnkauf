import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LightningIcon, DocumentIcon, CheckIcon } from '../components/Icons';
import '../styles/shared-green-hero.css';
import './FAQPage.css';

function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'Allgemein',
      questions: [
        {
          question: 'Wie funktioniert der Verkaufsprozess?',
          answer: 'Der Verkaufsprozess ist einfach und bequem: 1) Füllen Sie unser Online-Formular mit den Fahrzeugdaten aus. 2) Wir melden uns innerhalb von 24 Stunden mit einem fairen Angebot. 3) Bei Annahme vereinbaren wir einen Wunschtermin und kommen zu Ihnen nach Hause. 4) Wir holen Ihr Auto kostenlos ab und zahlen den Kaufpreis sofort aus - Sie müssen nirgendwo hinfahren!'
        },
        {
          question: 'Ist die Bewertung wirklich kostenlos?',
          answer: 'Ja, unsere Fahrzeugbewertung ist 100% kostenlos und unverbindlich. Es entstehen keinerlei Kosten für Sie, auch wenn Sie unser Angebot nicht annehmen.'
        },
        {
          question: 'Wie schnell erhalte ich ein Angebot?',
          answer: 'In der Regel melden wir uns innerhalb von 24 Stunden nach Eingang Ihrer Anfrage mit einem unverbindlichen Angebot.'
        },
        {
          question: 'Kaufen Sie auch beschädigte Fahrzeuge?',
          answer: 'Ja, wir kaufen Fahrzeuge in jedem Zustand - ob Unfall-, Motorschaden oder einfach altersbedingte Mängel. Teilen Sie uns einfach den Zustand ehrlich mit.'
        }
      ]
    },
    {
      category: 'Bewertung & Preis',
      questions: [
        {
          question: 'Wie wird der Preis für mein Auto ermittelt?',
          answer: 'Wir bewerten Ihr Fahrzeug anhand verschiedener Faktoren: Marke, Modell, Baujahr, Kilometerstand, Zustand, Ausstattung und aktueller Marktwert. Dabei nutzen wir aktuelle Marktdaten und unsere langjährige Erfahrung.'
        },
        {
          question: 'Kann ich den Preis verhandeln?',
          answer: 'Unser Angebot basiert auf einer fairen Marktbewertung. Sollten Sie mit dem Preis nicht einverstanden sein, können wir gerne noch einmal ins Gespräch gehen, wenn zusätzliche Faktoren zu berücksichtigen sind.'
        },
        {
          question: 'Welche Faktoren beeinflussen den Preis?',
          answer: 'Der Preis wird beeinflusst durch: Alter des Fahrzeugs, Kilometerstand, Zustand (innen & außen), Scheckheftpflege, Ausstattung, aktuelle Marktnachfrage und eventuelle Schäden oder Mängel.'
        },
        {
          question: 'Berücksichtigen Sie Sonderausstattungen?',
          answer: 'Ja, hochwertige Sonderausstattungen wie Navigationssystem, Ledersitze, Schiebedach etc. fließen in unsere Bewertung mit ein und können den Preis positiv beeinflussen.'
        }
      ]
    },
    {
      category: 'Abholung & Übergabe',
      questions: [
        {
          question: 'Muss ich zu einer Filiale fahren?',
          answer: 'Nein! Das ist unser Service: Sie müssen nirgendwo hinfahren. Wir kommen deutschlandweit kostenlos zu Ihnen nach Hause und holen Ihr Fahrzeug vor Ihrer Haustür ab. Maximale Bequemlichkeit für Sie!'
        },
        {
          question: 'Wie lange dauert die Abholung?',
          answer: 'Nach Vertragsabschluss kommen wir in der Regel innerhalb von 2-5 Werktagen zu Ihnen. Gerne richten wir uns nach Ihrem Wunschtermin - wir sind flexibel und passen uns Ihrem Zeitplan an. Sie bestimmen, wann wir Ihr Auto abholen.'
        },
        {
          question: 'Was muss ich zur Übergabe mitbringen?',
          answer: 'Benötigt werden: Fahrzeugbrief (Zulassungsbescheinigung Teil II), Fahrzeugschein (Teil I), alle Schlüssel, Serviceheft falls vorhanden, und ein gültiger Personalausweis.'
        },
        {
          question: 'Wann erhalte ich das Geld?',
          answer: 'Bei Fahrzeugübergabe erhalten Sie den Kaufpreis sofort ausgezahlt - wahlweise bar, per Überweisung oder Scheck.'
        }
      ]
    },
    {
      category: 'Formalitäten',
      questions: [
        {
          question: 'Müssen Sie das Auto noch abmelden?',
          answer: 'Nein, um die Abmeldung kümmern wir uns. Sie müssen sich um keine Formalitäten kümmern.'
        },
        {
          question: 'Was passiert mit meinen Daten?',
          answer: 'Ihre Daten werden vertraulich behandelt und ausschließlich für die Abwicklung des Fahrzeugverkaufs verwendet. Wir geben keine Daten an Dritte weiter.'
        },
        {
          question: 'Brauche ich einen Kaufvertrag?',
          answer: 'Ja, wir erstellen einen ordnungsgemäßen Kaufvertrag, der alle wichtigen Punkte regelt und beide Seiten absichert.'
        },
        {
          question: 'Was passiert bei offenen Finanzierungen?',
          answer: 'Bei noch laufender Finanzierung können wir diese in Absprache mit Ihrer Bank ablösen. Der Restbetrag wird dann mit dem Kaufpreis verrechnet.'
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
          <div className="hero-badge-green">💡 Alle Antworten auf einen Blick</div>
          <h1 className="faq-hero-title">Häufig gestellte Fragen</h1>
          <p className="faq-hero-subtitle">
            Finden Sie schnell Antworten auf die wichtigsten Fragen rund um den Autoverkauf - klar, verständlich und hilfreich
          </p>
          <div className="faq-hero-features">
            <div className="hero-feature-green">
              <LightningIcon className="feature-icon-white" />
              <span>Schnelle Antworten</span>
            </div>
            <div className="hero-feature-green">
              <DocumentIcon className="feature-icon-white" />
              <span>Übersichtlich</span>
            </div>
            <div className="hero-feature-green">
              <CheckIcon className="feature-icon-white" />
              <span>Hilfreich</span>
            </div>
          </div>
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
              Wenn Sie weitere Fragen haben, zögern Sie nicht, uns zu kontaktieren. 
              Unser Team steht Ihnen gerne zur Verfügung.
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

