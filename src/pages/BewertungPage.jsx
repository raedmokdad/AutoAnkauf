import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import vehicleData from '../data/vehicleData.json';
import { CheckIcon, LightningIcon, TruckIcon, DocumentIcon, ChartIcon } from '../components/Icons';
import './BewertungPage.css';
import './FAQPage.css';

function BewertungPage() {
  const location = useLocation();
  const prefilledData = location.state; // Daten von HomePage
  
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
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  const makes = vehicleData.makes || [];

  // Prefill form with data from HomePage
  useEffect(() => {
    if (prefilledData && prefilledData.marke) {
      // Find make by name
      const selectedMake = makes.find(m => 
        m.name.toLowerCase() === prefilledData.marke.toLowerCase()
      );
      
      if (selectedMake) {
        setFormData(prev => ({ ...prev, makeId: selectedMake.id.toString() }));
        setAvailableModels(selectedMake.models || []);
        
        // Find model by name
        if (prefilledData.modell) {
          const selectedModel = selectedMake.models.find(m => 
            m.name.toLowerCase() === prefilledData.modell.toLowerCase()
          );
          
          if (selectedModel) {
            setFormData(prev => ({ 
              ...prev, 
              makeId: selectedMake.id.toString(),
              modelId: selectedModel.id.toString(),
              year: prefilledData.jahr || ''
            }));
            
            // Set available years
            if (selectedModel.generations.length > 0) {
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
        }
      }
    }
  }, [prefilledData, makes]);

  // Scroll to form when coming from HomePage
  useEffect(() => {
    if (prefilledData && prefilledData.marke) {
      const formSection = document.getElementById('bewertung-form-section');
      if (formSection) {
        setTimeout(() => {
          formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    }
  }, [prefilledData]);

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
    <div className="bewertung-page">
      <SEO
        title="Kostenlose Fahrzeugbewertung - Bei Verkauf holen wir ab!"
        description="Kostenlose Online-Bewertung für Ihr Auto ✓ Sofortiger Fahrzeugwert ✓ Bei Verkauf holen wir kostenlos ab ✓ Sie bleiben zu Hause. Jetzt Auto bewerten lassen!"
        keywords="fahrzeugbewertung kostenlos, auto bewerten, autowert ermitteln, auto verkaufen mit abholung, gebrauchtwagen bewertung"
        canonical="https://www.autoankauf-deutschland.de/bewertung"
      />
      
      {/* Hero with Form - Green Background Split Layout */}
      <section className="bewertung-hero-green">
        <div className="bewertung-split-container">
          {/* Left Side - Info */}
          <div className="bewertung-left-content">
            <div className="hero-badge-green">✓ 100% Kostenlos & Unverbindlich</div>
            <h1 className="bewertung-title-white">Kostenlose KFZ-Bewertung Online</h1>
            <p className="bewertung-subtitle-white">
              Lassen Sie Ihr Fahrzeug professionell bewerten - unser Team erstellt eine individuelle Bewertung meist noch am selben Tag
            </p>
            <ul className="bewertung-features-list">
              <li>
                <svg className="check-icon-green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Bewertung meist noch am selben Tag</span>
              </li>
              <li>
                <svg className="check-icon-green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Aktuelle Marktdaten & faire Bewertung</span>
              </li>
              <li>
                <svg className="check-icon-green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>100% kostenlos & unverbindlich</span>
              </li>
              <li>
                <svg className="check-icon-green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Bei Verkauf holen wir kostenlos ab</span>
              </li>
            </ul>
          </div>

          {/* Right Side - Form */}
          <div className="bewertung-right-form">
            <div className="bewertung-form-box-white">
              <h2 className="form-title-bewertung">Jetzt Auto bewerten</h2>
              <p className="form-subtitle-bewertung">Alle Felder ausfüllen für genaue Bewertung</p>
              
              <form onSubmit={handleSubmit} className="bewertung-compact-form">
                <div className="bewertung-form-grid">
                  <div className="form-group-bewertung">
                    <label htmlFor="makeId">Marke *</label>
                    <select
                      id="makeId"
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

                  <div className="form-group-bewertung">
                    <label htmlFor="modelId">Modell *</label>
                    <select
                      id="modelId"
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

                  <div className="form-group-bewertung">
                    <label htmlFor="year">Erstzulassung *</label>
                    <select
                      id="year"
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

                  <div className="form-group-bewertung">
                    <label htmlFor="mileage">Kilometerstand *</label>
                    <select
                      id="mileage"
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

                  <div className="form-group-bewertung">
                    <label htmlFor="condition">Fahrzeugzustand *</label>
                    <select
                      id="condition"
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

                  <div className="form-group-bewertung">
                    <label htmlFor="email">E-Mail-Adresse *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ihre@email.de"
                      required
                    />
                  </div>

                  <div className="form-group-bewertung">
                    <label htmlFor="phone">Telefonnummer *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0176 12345678"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-bewertung-orange" disabled={isSubmitting}>
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
        <section className="section bewertung-form-section" id="bewertung-form-section">
          <div className="container">
            <div className="estimation-result">
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <svg style={{ width: '64px', height: '64px', margin: '0 auto 1.5rem', color: '#4CAF50' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h2 style={{ marginBottom: '1rem' }}>Vielen Dank für Ihre Anfrage!</h2>
                <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#666' }}>
                  Wir haben Ihre Fahrzeugbewertungsanfrage erhalten. Unser Team wird Ihr Fahrzeug 
                  professionell bewerten und Ihnen die Bewertung <strong>per E-Mail</strong> zusenden.
                </p>
                <p style={{ fontSize: '1rem', marginBottom: '2rem', color: '#666' }}>
                  <strong>Sie erhalten Ihre Bewertung meist noch am selben Tag.</strong>
                </p>
                <div className="estimation-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link to="/ankauf" className="btn btn-primary">
                    Auto verkaufen
                  </Link>
                  <Link to="/kontakt" className="btn btn-secondary">
                    Kontakt aufnehmen
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section bewertung-benefits-section">
        <div className="container">
          <h2 className="section-title">Online Autobewertung – So funktioniert's.</h2>
          <div className="bewertung-features-grid">
            <div className="bewertung-feature-card">
              <div className="bewertung-feature-icon-wrapper">
                <DocumentIcon className="bewertung-feature-icon" />
              </div>
              <h3 className="bewertung-feature-title">1. Fahrzeugdaten eingeben</h3>
              <p className="bewertung-feature-description">Fahrzeugdetails & Kontaktdaten eingeben – optional mit Fotos (in 2 Minuten)</p>
            </div>
            <div className="bewertung-feature-card">
              <div className="bewertung-feature-icon-wrapper">
                <ChartIcon className="bewertung-feature-icon" />
              </div>
              <h3 className="bewertung-feature-title">2. Bewertung vom Profi erhalten</h3>
              <p className="bewertung-feature-description">Professionelle Kfz-Bewertung von unseren Experten (oft am selben Tag)</p>
            </div>
            <div className="bewertung-feature-card">
              <div className="bewertung-feature-icon-wrapper">
                <CheckIcon className="bewertung-feature-icon" />
              </div>
              <h3 className="bewertung-feature-title">3. Entscheiden, wie es weitergeht</h3>
              <p className="bewertung-feature-description">Auto direkt verkaufen oder nur Bewertung erhalten – du entscheidest, ganz ohne Verpflichtung</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bewertung-phone-section">
        <div className="container">
          <div className="bewertung-phone-content">
            <h2 className="bewertung-phone-title">Lieber kurz telefonieren statt tippen?</h2>
            <p className="bewertung-phone-text">
              Ruf einfach an – wir klären alle deine Fragen in 2–3 Minuten. Auch wenn du nur mal schnuppern willst, ohne dich festzulegen.
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

      <section className="section faq-main-section">
        <div className="container">
          <h2 className="section-title">Häufige Fragen zur Autobewertung</h2>
          <div className="faq-content">
            <div className="faq-category">
              <div className="faq-list">
                <div className={`faq-item ${openFAQIndex === 0 ? 'open' : ''}`}>
                  <button
                    className="faq-question"
                    onClick={() => setOpenFAQIndex(openFAQIndex === 0 ? null : 0)}
                  >
                    <span>1) Ist die Autobewertung wirklich kostenlos & unverbindlich?</span>
                    <span className="faq-icon">{openFAQIndex === 0 ? '−' : '+'}</span>
                  </button>
                  <div className={`faq-answer ${openFAQIndex === 0 ? 'show' : ''}`}>
                    <p>Ja – du kannst dein Auto kostenlos online bewerten lassen, ohne Verpflichtung.</p>
                  </div>
                </div>

                <div className={`faq-item ${openFAQIndex === 1 ? 'open' : ''}`}>
                  <button
                    className="faq-question"
                    onClick={() => setOpenFAQIndex(openFAQIndex === 1 ? null : 1)}
                  >
                    <span>2) Wie schnell bekomme ich meinen Fahrzeugwert bzw. eine Rückmeldung?</span>
                    <span className="faq-icon">{openFAQIndex === 1 ? '−' : '+'}</span>
                  </button>
                  <div className={`faq-answer ${openFAQIndex === 1 ? 'show' : ''}`}>
                    <p>Meist sehr schnell, oft noch am selben Tag. Vollständige Angaben und Fotos sind sehr hilfreich.</p>
                  </div>
                </div>

                <div className={`faq-item ${openFAQIndex === 2 ? 'open' : ''}`}>
                  <button
                    className="faq-question"
                    onClick={() => setOpenFAQIndex(openFAQIndex === 2 ? null : 2)}
                  >
                    <span>3) Welche Daten brauche ich für die Autobewertung?</span>
                    <span className="faq-icon">{openFAQIndex === 2 ? '−' : '+'}</span>
                  </button>
                  <div className={`faq-answer ${openFAQIndex === 2 ? 'show' : ''}`}>
                    <p>Marke/Modell, Baujahr, Kilometerstand, Zustand, TÜV. Fotos sind optional, erhöhen aber die Genauigkeit der Einschätzung.</p>
                  </div>
                </div>

                <div className={`faq-item ${openFAQIndex === 3 ? 'open' : ''}`}>
                  <button
                    className="faq-question"
                    onClick={() => setOpenFAQIndex(openFAQIndex === 3 ? null : 3)}
                  >
                    <span>4) Wie wird der Marktwert meines Autos ermittelt?</span>
                    <span className="faq-icon">{openFAQIndex === 3 ? '−' : '+'}</span>
                  </button>
                  <div className={`faq-answer ${openFAQIndex === 3 ? 'show' : ''}`}>
                    <p>Wir vergleichen deine Fahrzeugdaten mit aktuellen Marktpreisen und typischen Preisfaktoren wie Zustand, Laufleistung, Ausstattung und aktueller Nachfrage.</p>
                  </div>
                </div>

                <div className={`faq-item ${openFAQIndex === 4 ? 'open' : ''}`}>
                  <button
                    className="faq-question"
                    onClick={() => setOpenFAQIndex(openFAQIndex === 4 ? null : 4)}
                  >
                    <span>5) Muss ich nach der Bewertung verkaufen?</span>
                    <span className="faq-icon">{openFAQIndex === 4 ? '−' : '+'}</span>
                  </button>
                  <div className={`faq-answer ${openFAQIndex === 4 ? 'show' : ''}`}>
                    <p>Nein. Du kannst nur den Marktwert erfahren – ein Verkauf ist optional.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BewertungPage;

