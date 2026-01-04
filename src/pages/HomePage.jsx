import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { TruckIcon, MoneyIcon, LightningIcon, ChartIcon, CarIcon } from '../components/Icons';
import carData from '../data/carData.js';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    marke: '',
    modell: '',
    jahr: ''
  });
  
  const [availableModels, setAvailableModels] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);

  const handleMarkeChange = (e) => {
    const selectedMarke = e.target.value;
    setFormData({ marke: selectedMarke, modell: '', jahr: '' });
    
    if (selectedMarke && carData[selectedMarke]) {
      setAvailableModels(Object.keys(carData[selectedMarke]));
      setAvailableYears([]);
    } else {
      setAvailableModels([]);
      setAvailableYears([]);
    }
  };

  const handleModellChange = (e) => {
    const selectedModell = e.target.value;
    setFormData(prev => ({ ...prev, modell: selectedModell, jahr: '' }));
    
    if (formData.marke && selectedModell && carData[formData.marke][selectedModell]) {
      const allYears = new Set();
      carData[formData.marke][selectedModell].forEach(car => {
        const years = car.year.split('-');
        const startYear = parseInt(years[0]);
        const endYear = years[1] === 'heute' ? new Date().getFullYear() : parseInt(years[1]);
        
        for (let y = startYear; y <= endYear; y++) {
          allYears.add(y);
        }
      });
      setAvailableYears(Array.from(allYears).sort((a, b) => b - a));
    }
  };

  const handleJahrChange = (e) => {
    setFormData(prev => ({ ...prev, jahr: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.marke && formData.modell && formData.jahr) {
      navigate('/bewertung', { state: formData });
    }
  };

  return (
    <div className="home-page">
      <SEO
        title="Auto verkaufen - Wir kommen zu Ihnen! | Kostenlose Abholung"
        description="Auto verkaufen ohne Stress ✓ Wir holen Ihr Fahrzeug kostenlos bei Ihnen ab ✓ Keine Anfahrt zur Filiale ✓ Faire Preise ✓ Sofort-Auszahlung. Deutschlandweiter Abholservice!"
        keywords="auto verkaufen, autoankauf mit abholung, fahrzeug abholung kostenlos, auto verkaufen ohne anfahrt, autoankauf vor ort, gebrauchtwagen verkaufen bequem"
        canonical="https://www.autoankauf-deutschland.de"
      />
      <StructuredData />
      
      {/* Hero Section with Side Form */}
      <section className="hero-with-form-section">
        <div className="hero-form-container">
          <div className="hero-left-content">
            <div className="hero-badge-green">⭐ Über 5.000 zufriedene Kunden</div>
            <h1 className="hero-title-white">
              Auto verkaufen - Wir kommen zu Ihnen!
            </h1>
            <p className="hero-subtitle-white">
              Verkaufen Sie Ihr Auto bequem von zu Hause aus. Wir holen Ihr Fahrzeug deutschlandweit kostenlos bei Ihnen ab - Sie müssen nirgendwo hinfahren!
            </p>
            <div className="hero-features-white">
              <div className="hero-feature-white">
                <TruckIcon className="feature-icon-white" />
                <span>Wir holen ab</span>
              </div>
              <div className="hero-feature-white">
                <MoneyIcon className="feature-icon-white" />
                <span>Faire Preise</span>
              </div>
              <div className="hero-feature-white">
                <LightningIcon className="feature-icon-white" />
                <span>Sofort-Auszahlung</span>
              </div>
            </div>
          </div>
          
          <div className="hero-right-form">
            <div className="form-box-white">
              <h2 className="form-title">Wie viel ist dein Auto wert?</h2>
              <p className="form-subtitle">Kostenlose Bewertung in 3 Schritten</p>
              
              <form onSubmit={handleSubmit} className="inline-form">
                <div className="form-group-vertical">
                  <label>Von welcher Marke ist dein Auto?</label>
                  <select
                    value={formData.marke}
                    onChange={handleMarkeChange}
                    required
                  >
                    <option value="">Marke auswählen</option>
                    {Object.keys(carData).map(marke => (
                      <option key={marke} value={marke}>{marke}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group-vertical">
                  <label>Welches Modell?</label>
                  <select
                    value={formData.modell}
                    onChange={handleModellChange}
                    disabled={!formData.marke}
                    required
                  >
                    <option value="">Modell auswählen</option>
                    {availableModels.map(modell => (
                      <option key={modell} value={modell}>{modell}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group-vertical">
                  <label>In welchem Jahr zugelassen?</label>
                  <select
                    value={formData.jahr}
                    onChange={handleJahrChange}
                    disabled={!formData.modell}
                    required
                  >
                    <option value="">Jahr auswählen</option>
                    {availableYears.map(jahr => (
                      <option key={jahr} value={jahr}>{jahr}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn-form-submit">
                  Bewertung ansehen
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="social-proof-bar">
        <div className="container">
          <div className="proof-grid">
            <div className="proof-item">
              <div className="proof-stars">★★★★★</div>
              <div className="proof-text">4.8/5 Bewertung</div>
              <div className="proof-subtext">auf Google</div>
            </div>
            <div className="proof-item">
              <div className="proof-number">24h</div>
              <div className="proof-text">Reaktionszeit</div>
              <div className="proof-subtext">Schnelle Antwort</div>
            </div>
            <div className="proof-item">
              <div className="proof-number">100%</div>
              <div className="proof-text">Kostenlos</div>
              <div className="proof-subtext">Bewertung & Abholung</div>
            </div>
            <div className="proof-item">
              <div className="proof-number">5.000+</div>
              <div className="proof-text">Zufriedene Kunden</div>
              <div className="proof-subtext">Seit 2020</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">Ihr Autoverkauf - bequem und stressfrei</h2>
          <p className="section-subtitle">
            Sie bleiben zu Hause, wir kümmern uns um alles - inklusive kostenloser Abholung vor Ihrer Haustür
          </p>
          <div className="grid-2">
            <div className="service-card">
              <div className="service-icon">
                <ChartIcon className="icon-svg" />
              </div>
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
              <div className="service-icon">
                <CarIcon className="icon-svg" />
              </div>
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
      <section className="section benefits-section">
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

      {/* Testimonials Section */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">Was unsere Kunden sagen</h2>
          <p className="section-subtitle">
            Über 5.000 zufriedene Kunden vertrauen auf unseren Service
          </p>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <p className="testimonial-text">
                "Absolut unkompliziert! Ich musste nirgendwo hinfahren - ARZ kam direkt zu mir nach Hause, 
                hat mein Auto professionell bewertet und sofort bar ausgezahlt. Genau so soll Autoverkauf sein!"
              </p>
              <div className="testimonial-author">
                <div className="author-info">
                  <strong className="author-name">Michael S.</strong>
                  <span className="author-location">Duisburg</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <p className="testimonial-text">
                "Faire Bewertung, schnelle Abwicklung und vor allem: keine Anfahrt nötig! 
                Das Team war pünktlich, freundlich und hat alles vor Ort erledigt. Top Service!"
              </p>
              <div className="testimonial-author">
                <div className="author-info">
                  <strong className="author-name">Sarah M.</strong>
                  <span className="author-location">Moers</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <p className="testimonial-text">
                "Ich war skeptisch, aber ARZ hat mich überzeugt. Transparente Preisgestaltung, 
                keine versteckten Kosten und die Abholung war kostenlos. Sehr empfehlenswert!"
              </p>
              <div className="testimonial-author">
                <div className="author-info">
                  <strong className="author-name">Thomas K.</strong>
                  <span className="author-location">Wesel</span>
                </div>
              </div>
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

