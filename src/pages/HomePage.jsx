import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <SEO
        title="Auto verkaufen - Wir kommen zu Ihnen! | Kostenlose Abholung"
        description="Auto verkaufen ohne Stress ✓ Wir holen Ihr Fahrzeug kostenlos bei Ihnen ab ✓ Keine Anfahrt zur Filiale ✓ Faire Preise ✓ Sofort-Auszahlung. Deutschlandweiter Abholservice!"
        keywords="auto verkaufen, autoankauf mit abholung, fahrzeug abholung kostenlos, auto verkaufen ohne anfahrt, autoankauf vor ort, gebrauchtwagen verkaufen bequem"
        canonical="https://www.autoankauf-deutschland.de"
      />
      <StructuredData />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">⭐ Über 5.000 zufriedene Kunden</div>
          <h1 className="hero-title">
            Auto verkaufen - Wir kommen zu Ihnen!
          </h1>
          <p className="hero-subtitle">
            Verkaufen Sie Ihr Auto bequem von zu Hause aus. Wir holen Ihr Fahrzeug deutschlandweit kostenlos bei Ihnen ab - Sie müssen nirgendwo hinfahren!
          </p>
          <div className="hero-features">
            <div className="hero-feature">
              <span className="feature-icon">🚚</span>
              <span>Wir holen ab</span>
            </div>
            <div className="hero-feature">
              <span className="feature-icon">💰</span>
              <span>Faire Preise</span>
            </div>
            <div className="hero-feature">
              <span className="feature-icon">⚡</span>
              <span>Sofort-Auszahlung</span>
            </div>
          </div>
          <div className="hero-buttons">
            <Link to="/bewertung" className="btn btn-primary btn-large btn-hero-primary">
              Jetzt bewerten lassen
            </Link>
            <Link to="/ankauf" className="btn btn-secondary btn-large btn-hero-secondary">
              Auto verkaufen
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section section-white">
        <div className="container">
          <h2 className="section-title">Ihr Autoverkauf - bequem und stressfrei</h2>
          <p className="section-subtitle">
            Sie bleiben zu Hause, wir kümmern uns um alles - inklusive kostenloser Abholung vor Ihrer Haustür
          </p>
          <div className="grid-2">
            <div className="service-card">
              <div className="service-icon">📊</div>
              <h3 className="service-title">Kostenlose Fahrzeugbewertung Online</h3>
              <p className="service-description">
                Ermitteln Sie den aktuellen Marktwert Ihres Gebrauchtwagens mit unserer kostenlosen Online-Bewertung. 
                Einfach Marke, Modell, Baujahr und Kilometerstand eingeben - sofort erhalten Sie eine realistische 
                Preiseinschätzung für Ihren PKW. Perfekt als Vorbereitung für den Autoverkauf.
              </p>
              <ul className="service-features">
                <li>✓ Kostenlos & unverbindlich</li>
                <li>✓ Sofortiges Ergebnis</li>
                <li>✓ Transparente Bewertung</li>
                <li>✓ Ohne Registrierung</li>
              </ul>
              <Link to="/bewertung" className="btn btn-primary">
                Jetzt bewerten
              </Link>
            </div>

            <div className="service-card">
              <div className="service-icon">🚗</div>
              <h3 className="service-title">Gebrauchtwagen Ankauf mit Abholservice</h3>
              <p className="service-description">
                Der große Unterschied: Sie müssen nicht zu uns fahren - wir kommen zu Ihnen! Verkaufen Sie Ihr 
                Fahrzeug bequem von zu Hause aus. Nach Ihrer Zusage vereinbaren wir einen Wunschtermin und holen 
                Ihr Auto deutschlandweit kostenlos ab. Faire Preise, sichere Abwicklung und sofortige Auszahlung vor Ort.
              </p>
              <ul className="service-features">
                <li>✓ Wir kommen zu Ihnen nach Hause - bundesweit</li>
                <li>✓ Kostenlose Abholung direkt vor Ihrer Haustür</li>
                <li>✓ Sie sparen Zeit und Aufwand - kein Anfahrtsweg</li>
                <li>✓ Sofortige Auszahlung bei Fahrzeugübergabe</li>
              </ul>
              <Link to="/ankauf" className="btn btn-primary">
                Jetzt verkaufen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title">Auto verkaufen in 3 einfachen Schritten</h2>
          <p className="section-subtitle">
            Vom Gebrauchtwagen-Angebot bis zur Auszahlung - so einfach war Autoverkauf noch nie
          </p>
          <div className="grid-3">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="step-title">KFZ-Daten online eingeben</h3>
              <p className="step-description">
                Füllen Sie unser Online-Formular mit den wichtigsten Fahrzeugdaten aus: 
                Marke, Modell, Baujahr, Kilometerstand und Zustand Ihres Gebrauchtwagens. 
                Optional können Sie Fotos hochladen für eine präzisere Bewertung.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">Unverbindliches Ankaufs-Angebot</h3>
              <p className="step-description">
                Unsere KFZ-Gutachter prüfen Ihre Angaben und erstellen ein faires Ankaufsangebot 
                basierend auf aktuellen Marktwerten. Sie erhalten innerhalb von 24 Stunden ein 
                kostenloses und unverbindliches Kaufangebot für Ihr Fahrzeug.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">Wir holen ab & zahlen sofort</h3>
              <p className="step-description">
                Sie bleiben entspannt zu Hause: Wir kommen zum vereinbarten Termin zu Ihnen, 
                holen Ihr Fahrzeug kostenlos ab und zahlen den Kaufpreis sofort aus. Keine Anfahrt 
                zur Filiale nötig - maximale Bequemlichkeit für Sie!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section section-white">
        <div className="container">
          <h2 className="section-title">Autoankauf Deutschland - Ihre Vorteile</h2>
          <p className="section-subtitle">
            Warum über 5.000 Kunden uns beim Gebrauchtwagen-Verkauf vertrauen
          </p>
          <div className="grid-4">
            <div className="benefit-card">
              <div className="benefit-icon">⚡</div>
              <h3 className="benefit-title">Schnell</h3>
              <p className="benefit-text">
                Angebot innerhalb von 24 Stunden. Abwicklung in wenigen Tagen.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3 className="benefit-title">Fair</h3>
              <p className="benefit-text">
                Transparente Bewertung und faire Preise für Ihr Fahrzeug.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🔒</div>
              <h3 className="benefit-title">Sicher</h3>
              <p className="benefit-text">
                Sichere Abwicklung mit sofortiger Auszahlung des Kaufpreises.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🚚</div>
              <h3 className="benefit-title">Wir kommen zu Ihnen</h3>
              <p className="benefit-text">
                Keine Anfahrt nötig - wir holen Ihr Auto kostenlos bei Ihnen ab.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Auto verkaufen ohne Stress?</h2>
            <p className="cta-text">
              Lehnen Sie sich zurück - wir kommen zu Ihnen! Jetzt unverbindlich anfragen
            </p>
            <Link to="/bewertung" className="btn btn-primary btn-large">
              Kostenlos bewerten lassen
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section section-white">
        <div className="container">
          <h2 className="section-title">Vertrauen Sie uns</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">5.000+</div>
              <div className="stat-label">Zufriedene Kunden</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">4.8/5</div>
              <div className="stat-label">Durchschnittliche Bewertung</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24h</div>
              <div className="stat-label">Reaktionszeit</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Kostenlose Abholung</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

