import React from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon, CheckIcon, StarIcon, LightningIcon, MoneyIcon, ShieldCheckIcon } from '../components/Icons';
import '../styles/shared-green-hero.css';
import './UeberUnsPage.css';

function UeberUnsPage() {
  return (
    <div className="ueber-uns-page">
      <section className="ueber-uns-hero-green">
        <div className="ueber-uns-hero-container">
          <div className="hero-badge-green">Inhabergeführt · Autoankauf Rheinberg</div>
          <h1 className="ueber-hero-title">Wir sind AutoHD <br></br><span className="ueber-hero-title-small">Vor Ort am Niederrhein</span></h1>
          <p className="ueber-hero-subtitle">
          Dein zuverlässiger Partner für den Autoankauf – mit persönlicher Beratung statt Hotline.
          </p>
          <div className="ueber-hero-features">
            <div className="hero-feature-green">
              <ClockIcon className="feature-icon-white" />
              <span>Transparent</span>
            </div>
            <div className="hero-feature-green">
              <CheckIcon className="feature-icon-white" />
              <span>Rechtssicher</span>
            </div>
            <div className="hero-feature-green">
              <StarIcon className="feature-icon-white" filled />
              <span>Unkompliziert</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section ueber-about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Warum Kunden zu uns zurückkommen?</h2>
              <br></br>
              <p>
              Wir sind ein inhabergeführtes Familienunternehmen aus Rheinberg am Niederrhein.
              Bei uns hast du einen festen Ansprechpartner, echte Erreichbarkeit und bekommst schnell eine Rückmeldung.
              <br></br>Unser Ruf ist unser Kapital. Deshalb arbeiten wir ehrlich, zuverlässig und respektvoll. Wir setzen auf langfristige Kundenbeziehungen: Wir kennen unsere Kunden persönlich, merken uns ihre Wünsche und sind auch nach dem Verkauf für dich da. 
              Viele kommen wieder oder empfehlen uns weiter – genau so wachsen wir.
              </p>
            </div>  
          </div>
        </div>
      </section>

      <section className="section ueber-values-section">
        <div className="container">
          <h2 className="section-title">Unsere Werte</h2>
          <div className="grid-4">
            <div className="value-card">
              <div className="value-icon">
                <ShieldCheckIcon className="icon-svg" />
              </div>
              <h3>Vertrauen</h3>
              <p>
                Transparenz und Ehrlichkeit sind die Grundlage unserer Arbeit. 
                Bei uns gibt es keine versteckten Kosten oder böse Überraschungen.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <LightningIcon className="icon-svg" />
              </div>
              <h3>Schnelligkeit</h3>
              <p>
                Wir wissen, dass Ihre Zeit wertvoll ist. Deshalb wickeln wir 
                alles schnell und unkompliziert für Sie ab.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">💎</div>
              <h3>Qualität</h3>
              <p>
                Höchste Standards bei der Fahrzeugbewertung und professionelle 
                Abwicklung in allen Bereichen.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Kundenzufriedenheit</h3>
              <p>
                Ihre Zufriedenheit ist unser oberstes Ziel. Das zeigen auch 
                unsere über 5.000 zufriedenen Kunden.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section ueber-advantages-section">
        <div className="container">
          <h2 className="section-title">So läuft dein Autoverkauf bei uns</h2>
          <div className="grid-2">
            <div className="advantage-card">
              <div className="advantage-number">01</div>
              <h3>1. Klare Bewertung</h3>
              <p>
              Du bekommst eine realistische Einschätzung am Markt – nachvollziehbar erklärt.

              </p>
            </div>

            <div className="advantage-card">
              <div className="advantage-number">02</div>
              <h3>Besichtigung vor Ort</h3>
              <p>
              Wir schauen dein Auto an und beantworten deine Fragen – ohne Zeitdruck.

              </p>
            </div>

            <div className="advantage-card">
              <div className="advantage-number">03</div>
              <h3>Kaufvertrag inklusive</h3>
              <p>
              Alles schriftlich und sauber geregelt. Keine Unklarheiten, keine Überraschungen.

              </p>
            </div>

            <div className="advantage-card">
              <div className="advantage-number">04</div>
              <h3>Sichere Zahlung</h3>
              <p>
              Auszahlung bei Übergabe – bar oder per Überweisung, wie du es willst.

              </p>
            </div>

            <div className="advantage-card">
              <div className="advantage-number">05</div>
              <h3>Abholung & Abmeldung</h3>
              <p>
              Auf Wunsch kümmern wir uns um Abholung/Transport und die KFZ-Abmeldung.

              </p>
            </div>

            <div className="advantage-card">
              <div className="advantage-number">06</div>
              <h3>Auch bei Sonderfällen</h3>
              <p>
              Unfall, Defekt, ohne TÜV oder laufende Finanzierung – wir prüfen fair, was möglich ist.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section ueber-stats-section">
        <div className="container">
          <h2 className="section-title">Autoankauf, wie er sein sollte</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-number">Echt</div>
              <div className="stat-label">Echte Menschen statt Hotline</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">Fair</div>
              <div className="stat-label">Preis mit Erklärung statt Druck & Tricks</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">Fix</div>
              <div className="stat-label">24h Rückmeldung statt tagelang warten</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">Nah</div>
              <div className="stat-label">Auch danach da statt einmal & weg</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Bereit für den stressfreien Autoverkauf?</h2>
            <p className="cta-text">
              Lehnen Sie sich zurück - wir kommen zu Ihnen und holen Ihr Auto ab!
            </p>
            <div className="cta-buttons">
              <Link to="/bewertung" className="btn btn-primary btn-large">
                Jetzt bewerten
              </Link>
              <Link to="/kontakt" className="btn btn-secondary btn-large">
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UeberUnsPage;

