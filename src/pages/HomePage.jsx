import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { TruckIcon, MoneyIcon, LightningIcon, ChartIcon, CarIcon } from '../components/Icons';
import vehicleData from '../data/vehicleData.json';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    makeId: '',
    modelId: '',
    year: '',
    mileage: '',
    condition: '',
    email: '',
    phone: ''
  });
  
  const [availableModels, setAvailableModels] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const makes = vehicleData.makes || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'makeId' && value) {
      const selectedMake = makes.find(m => m.id === parseInt(value));
      setAvailableModels(selectedMake?.models || []);
      setFormData(prev => ({ ...prev, modelId: '', year: '' }));
      setAvailableYears([]);
    }

    if (name === 'modelId' && value) {
      const selectedModel = availableModels.find(m => m.id === parseInt(value));
      if (selectedModel?.generations.length > 0) {
        const allYears = new Set();
        selectedModel.generations.forEach(gen => {
          if (gen.yearBegin && gen.yearEnd) {
            for (let y = gen.yearBegin; y <= gen.yearEnd; y++) {
              allYears.add(y);
            }
          }
        });
        setAvailableYears(Array.from(allYears).sort((a, b) => b - a));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Finde Marke und Modell Namen für die E-Mail
      const selectedMake = makes.find(m => m.id === parseInt(formData.makeId));
      const selectedModel = selectedMake?.models.find(m => m.id === parseInt(formData.modelId));
      
      const formDataToSend = new FormData();
      formDataToSend.append('makeId', formData.makeId);
      formDataToSend.append('makeName', selectedMake?.name || '');
      formDataToSend.append('modelId', formData.modelId);
      formDataToSend.append('modelName', selectedModel?.name || '');
      formDataToSend.append('year', formData.year);
      formDataToSend.append('mileage', formData.mileage);
      formDataToSend.append('condition', formData.condition);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);

      const response = await fetch('/backend/bewertung.php', {
        method: 'POST',
        body: formDataToSend
      });

      // Prüfe ob Response OK ist
      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP Error:', response.status, errorText);
        throw new Error(`Server-Fehler: ${response.status} - ${errorText.substring(0, 100)}`);
      }

      // Versuche JSON zu parsen
      let result;
      try {
        const text = await response.text();
        console.log('Response:', text);
        result = JSON.parse(text);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error('Ungültige Antwort vom Server. Bitte prüfen Sie, ob der PHP-Server läuft.');
      }
      
      if (result.success) {
        setSubmitted(true);
        // Reset Formular
        setFormData({
          makeId: '',
          modelId: '',
          year: '',
          mileage: '',
          condition: '',
          email: '',
          phone: ''
        });
        setAvailableModels([]);
        setAvailableYears([]);
      } else {
        alert('Fehler beim Senden: ' + (result.message || 'Unbekannter Fehler'));
      }
    } catch (error) {
      console.error('Fehler:', error);
      const errorMessage = error.message || 'Unbekannter Fehler';
      alert(`Fehler beim Senden der Anfrage:\n\n${errorMessage}\n\nBitte:\n1. Prüfen Sie, ob der PHP-Server läuft (php -S localhost:8000 im backend-Ordner)\n2. Öffnen Sie die Browser-Konsole (F12) für mehr Details`);
    } finally {
      setIsSubmitting(false);
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
            <div className="hero-badge-green">Dein Autoankauf in Rheinberg & Umgebung</div>
            <h1 className="hero-title-white">
            Auto verkaufen in Rheinberg, Wesel, Moers & Umgebung.
            </h1>
            <p className="hero-subtitle-white">
            Verkaufe dein Auto ohne Aufwand & ohne Anfahrt. <br></br>Wir kommen zu dir!            </p>
            <div className="hero-features-white">
              <div className="hero-feature-white">
                <TruckIcon className="feature-icon-white" />
                <span>Bequem</span>
              </div>
              <div className="hero-feature-white">
                <MoneyIcon className="feature-icon-white" />
                <span>Ohne versteckte Kosten</span>
              </div>
              <div className="hero-feature-white">
                <LightningIcon className="feature-icon-white" />
                <span>Sofortige Zahlung</span>
              </div>
            </div>
          </div>
          
          <div className="hero-right-form">
            <div className="form-box-white">
              <h2 className="form-title">Wie viel ist dein Auto wert?</h2>
              <p className="form-subtitle">Kostenlose Bewertung in 3 Schritten</p>
              
              <form onSubmit={handleSubmit} className="inline-form">
                <div className="home-form-grid">
                  <div className="form-group-vertical">
                    <label htmlFor="home-makeId">Marke *</label>
                    <select
                      id="home-makeId"
                      name="makeId"
                      value={formData.makeId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Bitte wählen</option>
                      {makes.map(make => (
                        <option key={make.id} value={make.id}>
                          {make.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group-vertical">
                    <label htmlFor="home-modelId">Modell *</label>
                    <select
                      id="home-modelId"
                      name="modelId"
                      value={formData.modelId}
                      onChange={handleChange}
                      required
                      disabled={!formData.makeId}
                    >
                      <option value="">Bitte wählen</option>
                      {availableModels.map(model => (
                        <option key={model.id} value={model.id}>
                          {model.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group-vertical">
                    <label htmlFor="home-year">Erstzulassung *</label>
                    <select
                      id="home-year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      required
                      disabled={!formData.modelId || availableYears.length === 0}
                    >
                      <option value="">Bitte wählen</option>
                      {availableYears.map(year => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group-vertical">
                    <label htmlFor="home-mileage">Kilometerstand *</label>
                    <select
                      id="home-mileage"
                      name="mileage"
                      value={formData.mileage}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Bitte wählen</option>
                      <option value="0-30000">0 - 30.000 km</option>
                      <option value="30001-60000">30.001 - 60.000 km</option>
                      <option value="60001-100000">60.001 - 100.000 km</option>
                      <option value="100001-150000">100.001 - 150.000 km</option>
                      <option value="150001-plus">über 150.000 km</option>
                    </select>
                  </div>

                  <div className="form-group-vertical">
                    <label htmlFor="home-condition">Fahrzeugzustand *</label>
                    <select
                      id="home-condition"
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Bitte wählen</option>
                      <option value="excellent">Sehr gut (neuwertig)</option>
                      <option value="good">Gut (gepflegt)</option>
                      <option value="fair">Befriedigend (Gebrauchsspuren)</option>
                      <option value="poor">Ausreichend (Reparaturbedarf)</option>
                    </select>
                  </div>

                  <div className="form-group-vertical">
                    <label htmlFor="home-email">E-Mail-Adresse *</label>
                    <input
                      type="email"
                      id="home-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ihre@email.de"
                      required
                    />
                  </div>

                  <div className="form-group-vertical">
                    <label htmlFor="home-phone">Telefonnummer *</label>
                    <input
                      type="tel"
                      id="home-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0176 12345678"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-form-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Wird gesendet...' : 'Jetzt kostenlos bewerten'}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Success Section */}
      {submitted && (
        <section className="section" style={{ paddingTop: '40px' }}>
          <div className="container">
            <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <svg style={{ width: '64px', height: '64px', margin: '0 auto 1.5rem', color: '#4CAF50' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h2 style={{ marginBottom: '1rem', fontSize: '1.8rem' }}>Vielen Dank für Ihre Anfrage!</h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#666' }}>
                Wir haben Ihre Fahrzeugbewertungsanfrage erhalten. Unser Team wird Ihr Fahrzeug 
                professionell bewerten und Ihnen die Bewertung <strong>per E-Mail</strong> zusenden.
              </p>
              <p style={{ fontSize: '1rem', marginBottom: '2rem', color: '#666' }}>
                <strong>Sie erhalten Ihre Bewertung meist noch am selben Tag.</strong>
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/ankauf" className="btn btn-primary">
                  Auto verkaufen
                </Link>
                <Link to="/kontakt" className="btn btn-secondary">
                  Kontakt aufnehmen
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Social Proof Bar */}
      <section className="social-proof-bar">
        <div className="container">
          <div className="proof-grid">
            <div className="proof-item">
              <div className="proof-number">100%</div>
              <div className="proof-text">Kostenlos</div>
              <div className="proof-subtext">Bewertung, Abholung & Abmeldung inklusive</div>
            </div>
            <div className="proof-item">
              <div className="proof-number">0 Km</div>
              <div className="proof-text">Anfahrt</div>
              <div className="proof-subtext">Wir kommen zu dir - im Umkreis von 100 km</div>
            </div>
            <div className="proof-item">
              <div className="proof-number">24h</div>
              <div className="proof-text">Reaktionszeit</div>
              <div className="proof-subtext">Schnelle Rückmeldung - oft am selben Tag</div>
            </div>
            
            <div className="proof-item">
              <div className="proof-number">1</div>
              <div className="proof-text">Ansprechpartner</div>
              <div className="proof-subtext">Persönlich & auf Augenhöhe – kein Callcenter</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">Gebrauchtwagen verkaufen in Rheinberg & Umgebung</h2>
          <p className="section-subtitle">
          Transparente Bewertung und faire Verhandlung – ohne Druck und ohne versteckte Kosten. 
          Wir kommen zu dir (bis 100 km kostenfrei) oder du besuchst uns in Rheinberg.
          </p>
          <div className="grid-2">
            <div className="service-card">
              <div className="service-icon">
                <ChartIcon className="icon-svg" />
              </div>
              <h3 className="service-title">Kostenlose Autobewertung online oder am Telefon einholen</h3>
              <p className="service-description">
              Finde heraus, was dein Auto wert ist. Gib einfach deine Fahrzeugdaten ein und erhalte eine realistische Preiseinschätzung.
              </p>
              <ul className="service-features">
                <li>Schnelle Rückmeldung</li>
                <li>Kostenlose Fahrzeugbewertung ohne Registrierung</li>
                <li>Persönlicher Ansprechpartner von A-Z</li>
                <li>Faires Kaufangebot, ohne versteckte Kosten</li>
              </ul>
              <Link to="/bewertung" className="btn btn-primary">
              Jetzt Autobewertung starten
              </Link>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <CarIcon className="icon-svg" />
              </div>
              <h3 className="service-title">Autoankauf mit Abholservice in Rheinberg & Umgebung</h3>
              <p className="service-description">
              Wir erklären dir unser Angebot kurz und klar – du entscheidest in Ruhe. 
              Kein Druck, keine Show – ein Gespräch auf Augenhöhe.
              </p>
              <ul className="service-features">
                <li>Klarer Kaufvertrag – keine Überraschungen</li>
                <li>Kostenfreie Abholung – direkt vor deiner Tür</li>
                <li>Zahlung bei Übergabe – bar/Überweisung</li>
                <li>Abmeldung inkl. Gebührenübernahme</li>
              </ul>
              <Link to="/ankauf" className="btn btn-primary">
                Jetzt Autoverkauf starten
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title">So verkaufst du dein Auto in Rheinberg - ohne Stress</h2>
          <p className="section-subtitle">
          Keine Inserate • Kein Hin- und her • Einfach verkaufen. Fertig. 
          </p>
          <div className="grid-3">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="step-title">Kostenloses Kaufangebot anfordern</h3>
              <p className="step-description">
                Gib deine Fahrzeugdaten ein (online oder am Telefon) und erfahren den Wert deine Autos.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">Termin vereinbaren & Besichtigung</h3>
              <p className="step-description">
              Wir vereinbaren einen Termin an deinem Wunschort oder an unserem Standort in Rheinberg. 
              Wir schauen uns das Auto in Ruhe an und beantworten deine Fragen.              
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">Verkauf abschließen – Zahlung bei Übergabe</h3>
              <p className="step-description">
              Der Kaufvertrag wird unterschrieben und der Preis wird ausgezahlt (bar oder per Überweisung). 
              Abholung und Abmeldung übernehmen wir kostenfrei.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section benefits-section">
        <div className="container">
          <h2 className="section-title">Deine Vorteile beim Autoverkauf in Rheinberg</h2>
          <p className="section-subtitle">
          Inhabergeführt heißt bei uns: (Du bekommst) persönliche Betreuung für dich– ohne Callcenter, ohne Standardabläufe.          </p>
          <div className="grid-4">
            <div className="benefit-card">
              <div className="benefit-icon">🤝</div>
              <h3 className="benefit-title benefit-title-centered">Persönlich</h3>
              <p className="benefit-text">
              Ein fester Ansprechpartner von A bis Z – direkt erreichbar (Telefon, WhatsApp, E-Mail).
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">💎</div>
              <h3 className="benefit-title benefit-title-centered">Ehrlich</h3>
              <p className="benefit-text">
                Transparente Bewertung und faire Preise – keine Tricks, keine versteckten Abzüge.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">📍</div>
              <h3 className="benefit-title benefit-title-centered">Lokal</h3>
              <p className="benefit-text">
              Fester Standort in Rheinberg – feste Adresse, statt nur Handy-Nummer.

              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">⏰</div>
              <h3 className="benefit-title benefit-title-centered">Flexibel</h3>
              <p className="benefit-text">
              Termine auch abends oder am Wochenende – bei dir oder bei uns in Rheinberg.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">Das sagen unsere Kunden</h2>
          <p className="section-subtitle">
          Erfahrungen beim Autoverkauf mit AutoHD in Rheinberg und Umgebung
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
              <h3 className="testimonial-title">Guter Service</h3>
              <p className="testimonial-text">
                "Ich bekam schnell eine Rückmeldung. Für mich war der Preis am wichtigsten – und ich war mehr als zufrieden. 
                Guter Service, alles wurde direkt vor Ort erledigt. "
              </p>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <h3 className="testimonial-title">Kann ich weiterempfehlen</h3>

              <p className="testimonial-text">
                "Freundlich und pünktlich. Ich habe einen guten Preis bekommen und musste mich um nichts kümmern. 
                Top – kann ich definitiv weiterempfehlen!"
              </p>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <h3 className="testimonial-title">Absolut unkompliziert</h3>
              <p className="testimonial-text">
                "Absolut unkompliziert: Ich musste nirgendwo hinfahren. AutoHD kam zu uns nach Hause, 
                hat das Auto professionell bewertet und direkt ausgezahlt. Genau so soll es sein!"
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
          <h2 className="section-title">AutoHD – Autoankauf am Niederrhein</h2>
          <p className="section-subtitle">
          PKW-Ankauf aller Marken – auch ohne TÜV, mit Defekt, Unfall oder Finanzierung.<br></br>
          Wir kaufen dein Auto und holen es am gesamten Niederrhein kostenlos ab.
          </p>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">Einfach</div>
              <div className="stat-label">Fahrzeugdaten eingeben, fertig</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">Schnell</div>
              <div className="stat-label">Faires Kaufangebot erhalten</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">Sicher</div>
              <div className="stat-label">Zahlung direkt erhalten</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">Bequem</div>
              <div className="stat-label">Kostenlose Abholung vereinbaren</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

