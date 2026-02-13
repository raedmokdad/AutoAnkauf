import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { TruckIcon, MoneyIcon, LightningIcon, ShieldCheckIcon, DocumentIcon, CheckIcon, ChartIcon, ClockIcon } from '../components/Icons';
import VehicleForm from '../components/VehicleForm';
import '../styles/shared-green-hero.css';
import './AnkaufPage.css';

function AnkaufPage() {
  return (
    <div className="ankauf-page">
      <SEO
        title="Auto verkaufen - Wir holen bei Ihnen ab | Deutschlandweit kostenlos"
        description="Gebrauchtwagen bequem verkaufen ✓ Wir kommen zu Ihnen nach Hause ✓ Kostenlose Abholung vor Ihrer Haustür ✓ Faire Preise ✓ Sofort-Auszahlung. Sie bleiben zu Hause!"
        keywords="auto verkaufen mit abholung, autoankauf abholservice, fahrzeug verkaufen ohne anfahrt, auto abholen lassen, bequem auto verkaufen, autoankauf vor ort"
        canonical="https://autohd.de/ankauf"
      />
      <section className="ankauf-hero-green">
        <div className="ankauf-hero-container">
          <div className="hero-badge-green">Clever verkaufen statt endlos verhandeln</div>
          <h1 className="ankauf-hero-title">Jetzt Auto verkaufen</h1>

          <p className="ankauf-hero-subtitle">
Einfach Formular ausfüllen, Autobewertung bekommen und sofort Zahlung erhalten. <br></br>Wir holen dein Fahrzeug kostenlos bei dir ab!          </p>
          <div className="ankauf-hero-features">
            <div className="hero-feature-green">
              <ShieldCheckIcon className="feature-icon-white" />
              <span>Verkauf mit Vertrag</span>
            </div>
            <div className="hero-feature-green">
              <MoneyIcon className="feature-icon-white" />
              <span>Sofort-Auszahlung</span>
            </div>
            <div className="hero-feature-green">
              <CheckIcon className="feature-icon-white" />
              <span>Bequem & ohne Anfahrt</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section ankauf-form-section">
        <div className="container">
          <VehicleForm formType="purchase" />
        </div>
      </section>


      {/* So einfach verkaufst du dein Auto */}
      <section className="section ankauf-service-section">
        <div className="container">
          <h2 className="section-title">So einfach verkaufst du dein Auto</h2>
          <p className="section-subtitle">Keine Inserate • Kein Hin- und her • Einfach verkaufen. Fertig.
          <br></br><span className="steps-highlight-black">1 . 2 . 3 Dein Geld ist da!</span> <span className="steps-highlight">Das sind die Schritte.</span></p>

          <div className="grid-2">
            <div className="service-detail-card">
              <div className="service-detail-icon">
                <ChartIcon className="icon-svg" />
              </div>
              <h3>1. Kostenlose Fahrzeugbewertung</h3>
              <p>
              Fülle das Formular in nur wenigen Minuten aus oder ruf uns an. Wir melden uns zeitnah mit einem fairen, 
              marktgerechten Kaufangebot. <br></br><b>Unverbindlich und ohne Kaufdruck</b>.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <ClockIcon className="icon-svg" />
              </div>
              <h3>2. Termin an deinem Wunschort</h3>
              <p>
              Wir vereinbaren zeitnah einen Termin und schauen uns dein Auto an – bei dir oder bei uns in Rheinberg. 
              Wir beantworten deine Fragen. <b>Du entscheidest in Ruhe</b>.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <MoneyIcon className="icon-svg" />
              </div>
              <h3>3. Verkauf & sofortige Auszahlung</h3>
              <p>
              Wir wickeln den Verkauf transparent und rechtssicher mit schriftlichem Kaufvertrag ab. 
              Auszahlung sofort – bar oder per Überweisung. 
              <b> Schnell, sicher und unkompliziert</b>.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <TruckIcon className="icon-svg" />
              </div>
              <h3>4. Abholung & Abmeldung – kostenfrei</h3>
              <p>
              Auf Wunsch holen wir dein Auto kostenlos ab und kümmern uns um die Abmeldung. 
               <b> Kein Gang zur Zulassungsstelle, kein Papierkram, kein Stress</b>.
              </p>
            </div>  
          </div>
        </div>
      </section>

            {/* So einfach verkaufst du dein Auto */}
      <section className="section ankauf-service-section">
        <div className="container">
          <h2 className="section-title">So einfach verkaufst du dein Auto</h2>
          <p className="section-subtitle">Keine Inserate • Kein Hin- und her • Einfach verkaufen. Fertig.
          <br></br><span className="steps-highlight-black">1 . 2 . 3 Dein Geld ist da!</span> <span className="steps-highlight">Das sind die Schritte.</span></p>

          <div className="grid-2">
            <div className="service-detail-card">
              <div className="service-detail-icon">
                <ChartIcon className="icon-svg" />
              </div>
              <h3>1. Kostenlose Fahrzeugbewertung</h3>
              <p>
              Fülle das Formular in nur wenigen Minuten aus oder ruf uns an. Wir melden uns zeitnah mit einem fairen, 
              marktgerechten Kaufangebot. <br></br><b>Unverbindlich und ohne Kaufdruck</b>.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <ClockIcon className="icon-svg" />
              </div>
              <h3>2. Termin an deinem Wunschort</h3>
              <p>
              Wir vereinbaren zeitnah einen Termin und schauen uns dein Auto an – bei dir oder bei uns in Rheinberg. 
              Wir beantworten deine Fragen. <b>Du entscheidest in Ruhe</b>.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <MoneyIcon className="icon-svg" />
              </div>
              <h3>3. Verkauf & sofortige Auszahlung</h3>
              <p>
              Wir wickeln den Verkauf transparent und rechtssicher mit schriftlichem Kaufvertrag ab. 
              Auszahlung sofort – bar oder per Überweisung. 
              <b> Schnell, sicher und unkompliziert</b>.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <TruckIcon className="icon-svg" />
              </div>
              <h3>4. Abholung & Abmeldung – kostenfrei</h3>
              <p>
              Auf Wunsch holen wir dein Auto kostenlos ab und kümmern uns um die Abmeldung. 
               <b> Kein Gang zur Zulassungsstelle, kein Papierkram, kein Stress</b>.
              </p>
            </div>  
          </div>
        </div>
      </section>

        {/* So einfach verkaufst du dein Auto */}
        <section className="section bewertung-phone-section">
            <div className="container">
              <div className="bewertung-phone-content">
                <h2 className="bewertung-phone-title">Lieber eine persönliche Beratung? <br></br>Ganz unverbindlich!  
</h2>
                <p className="bewertung-phone-text">
              Wir sind dein direkter Ansprechpartner rund um den Autoverkauf. 
                </p>
                <a href="tel:+4917630339020" className="bewertung-phone-btn">
                  <span className="phone-icon">📞</span>
                  Kostenlos anrufen: 0176 30339020
                </a>
                <p className="bewertung-phone-subtext">
                  Mo–Fr: 9–18 Uhr | Auch samstags erreichbar
                </p>
                <div className="bewertung-phone-features">
                  <span className="phone-feature-item">
                    <CheckIcon className="phone-feature-icon" />
                    Sofortige Antworten
                  </span>
                  <span className="phone-feature-item">
                    <CheckIcon className="phone-feature-icon" />
                    Persönlicher Ansprechpartner
                  </span>
                  <span className="phone-feature-item">
                    <CheckIcon className="phone-feature-icon" />
                    Unverbindlich
                  </span>
                </div>
              </div>
            </div>
          </section>

      {/* Schnell verkauft. Sicher bezahlt. Einfach erledigt. */}
      <section className="section ankauf-intro-section">
        <div className="container">
          <div className="ankauf-intro">
            <div className="intro-icon">🤝</div>
            <h2>Schnell verkauft. Sicher bezahlt. Einfach erledigt.</h2>
            <p>
            <strong>Auto verkaufen leicht gemacht:</strong> Kostenlose Bewertung, faires Kaufangebot und transparente 
            Abwicklung mit Kaufvertrag vor Ort in Rheinberg & Umgebung. 
            Sofortige Auszahlung und Abholung & KFZ-Abmeldung kostenfrei. 
            <strong> Hol dir jetzt dein unverbindliches Angebot für deinen Autoverkauf!</strong>
            </p>
            <Link to="/bewertung" className="btn btn-primary ankauf-intro-btn">
              Jetzt Auto bewerten
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="btn-icon">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      
      {/* Benötigte Dokumente */}
      <section className="section ankauf-documents-section">
        <div className="container">
          <h2 className="section-title">Benötigte Unterlagen</h2>
          <p className="section-subtitle">
          Fehlt ein Dokument? Sprich uns an – wir klären den Einzelfall.          </p>
          <div className="documents-grid">
            <div className="document-item">
              <div className="document-icon">📄</div>
              <h4>Fahrzeugbrief (Zulassungsbescheinigung Teil II)</h4>
            </div>
            <div className="document-item">
              <div className="document-icon">📋</div>
              <h4>Fahrzeugschein (Zulassungsbescheinigung Teil I)</h4>
            </div>
            <div className="document-item">
              <div className="document-icon">🔑</div>
              <h4>Alle Fahrzeugschlüssel</h4>
            </div>
            <div className="document-item">
              <div className="document-icon">📖</div>
              <h4>Serviceheft / Wartungsnachweise</h4>
            </div>
            <div className="document-item">
              <div className="document-icon">🔍</div>
              <h4>TÜV / AU-Berichte</h4>
            </div>
            <div className="document-item">
              <div className="document-icon">📱</div>
              <h4>Bedienungsanleitung</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AnkaufPage;

