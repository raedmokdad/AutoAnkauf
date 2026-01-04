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
          <div className="hero-badge-green">🏆 Seit 2009 Ihr Partner</div>
          <h1 className="ueber-hero-title">Über uns - Ihr vertrauensvoller Autoankauf</h1>
          <p className="ueber-hero-subtitle">
            15 Jahre Erfahrung, über 5.000 zufriedene Kunden und faire Preise - Lernen Sie uns kennen
          </p>
          <div className="ueber-hero-features">
            <div className="hero-feature-green">
              <ClockIcon className="feature-icon-white" />
              <span>15+ Jahre Erfahrung</span>
            </div>
            <div className="hero-feature-green">
              <CheckIcon className="feature-icon-white" />
              <span>5.000+ zufriedene Kunden</span>
            </div>
            <div className="hero-feature-green">
              <StarIcon className="feature-icon-white" filled />
              <span>4.8/5 Sterne</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section ueber-about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Wer wir sind</h2>
              <p>
                <strong>ARZ Delivery & Automobile</strong> - unter der Leitung von Hussein Hajj Sleiman - 
                ist Ihr zuverlässiger Partner, wenn es um den Verkauf Ihres Fahrzeugs geht. 
                Was als kleiner Betrieb begann, hat sich zu einem vertrauensvollen Autoankäufer 
                mit bundesweitem Abholservice entwickelt.
              </p>
              <p>
                Unser Erfolgsrezept ist einfach: Faire Preise, transparente Abwicklung 
                und maximale Bequemlichkeit für Sie. <strong>Der große Unterschied: Sie müssen nicht 
                zu uns fahren - wir kommen zu Ihnen!</strong> Mit über 5.000 zufriedenen Kunden jährlich 
                haben wir bewiesen, dass Autoverkauf auch stressfrei funktioniert.
              </p>
              <p>
                Unser erfahrenes Team kommt deutschlandweit zu Ihnen nach Hause, bewertet Ihr 
                Fahrzeug fair und wickelt alles vor Ort ab. Sie sparen Zeit, Aufwand und können 
                sich entspannt zurücklehnen - wir kümmern uns um den Rest.
              </p>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <div className="team-label">Unser Team</div>
              </div>
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
          <h2 className="section-title">Warum uns wählen?</h2>
          <div className="grid-2">
            <div className="advantage-card">
              <div className="advantage-number">01</div>
              <h3>Erfahrung seit 2009</h3>
              <p>
                Über 15 Jahre Erfahrung im Fahrzeugankauf. Wir kennen den Markt 
                und wissen, was Ihr Auto wert ist.
              </p>
            </div>

            <div className="advantage-card">
              <div className="advantage-number">02</div>
              <h3>Wir kommen zu Ihnen</h3>
              <p>
                Bundesweiter Abholservice. Sie müssen nirgendwo hinfahren - 
                wir holen Ihr Auto kostenlos bei Ihnen zu Hause ab.
              </p>
            </div>

            <div className="advantage-card">
              <div className="advantage-number">03</div>
              <h3>Faire Preise</h3>
              <p>
                Wir zahlen Ihnen einen fairen Preis basierend auf dem aktuellen 
                Marktwert Ihres Fahrzeugs.
              </p>
            </div>

            <div className="advantage-card">
              <div className="advantage-number">04</div>
              <h3>Sicher & Zuverlässig</h3>
              <p>
                Sichere Abwicklung mit sofortiger Auszahlung. Keine versteckten 
                Kosten oder unerwartete Überraschungen.
              </p>
            </div>

            <div className="advantage-card">
              <div className="advantage-number">05</div>
              <h3>Professionelles Team</h3>
              <p>
                Unser erfahrenes Team steht Ihnen mit Rat und Tat zur Seite. 
                Kompetente Beratung garantiert.
              </p>
            </div>

            <div className="advantage-card">
              <div className="advantage-number">06</div>
              <h3>Null Aufwand für Sie</h3>
              <p>
                Sie bleiben zu Hause, wir erledigen alles: Abholung, Formalitäten, 
                Abmeldung - maximale Bequemlichkeit!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section ueber-stats-section">
        <div className="container">
          <h2 className="section-title">Unsere Erfolgsgeschichte in Zahlen</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-number">15+</div>
              <div className="stat-label">Jahre Erfahrung</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">5.000+</div>
              <div className="stat-label">Zufriedene Kunden</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">4.8/5</div>
              <div className="stat-label">Durchschnittsbewertung</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">24h</div>
              <div className="stat-label">Reaktionszeit</div>
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

