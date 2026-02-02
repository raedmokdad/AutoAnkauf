import React, { useState, useEffect, useCallback } from 'react';
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
    phone: '',
    acceptedPrivacy: false
  });
  
  const [availableModels, setAvailableModels] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isDraftRestored, setIsDraftRestored] = useState(false);
  
  // States für Validierung
  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [submitState, setSubmitState] = useState({
    status: 'idle',
    message: ''
  });

  const makes = vehicleData.makes || [];

  // Validierungsfunktion für Felder
  const validateField = useCallback((name, value) => {
    switch(name) {
      case 'email':
        if (!value) return 'E-Mail-Adresse ist erforderlich';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
        }
        return '';
      case 'phone':
        if (!value) return 'Telefonnummer ist erforderlich';
        if (!/^[\d\s+()-]{8,}$/.test(value)) {
          return 'Bitte geben Sie eine gültige Telefonnummer ein';
        }
        return '';
      case 'mileage':
        if (!value) return 'Bitte wählen Sie einen Kilometerstand';
        return '';
      case 'condition':
        if (!value) return 'Bitte wählen Sie einen Fahrzeugzustand';
        return '';
      default:
        return '';
    }
  }, []);

  // Telefonnummer formatieren
  const formatPhoneNumber = useCallback((value) => {
    const cleaned = value.replace(/[^\d+]/g, '');
    if (cleaned.startsWith('0') && cleaned.length > 4) {
      return cleaned.slice(0, 4) + ' ' + cleaned.slice(4);
    }
    return cleaned;
  }, []);

  // Progress berechnen
  const calculateProgress = useCallback(() => {
    const requiredFields = ['makeId', 'modelId', 'year', 'mileage', 'condition', 'email', 'phone'];
    const filledFields = requiredFields.filter(field => formData[field]).length;
    return Math.round((filledFields / requiredFields.length) * 100);
  }, [formData]);

  // LocalStorage Auto-Save (mit Debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.values(formData).some(val => val) && !submitted) {
        localStorage.setItem('homepage_draft', JSON.stringify({
          ...formData,
          timestamp: Date.now()
        }));
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [formData, submitted]);

  // Draft automatisch wiederherstellen beim Laden (ohne Nachfrage)
  useEffect(() => {
    const draft = localStorage.getItem('homepage_draft');
    if (draft && !submitted) {
      try {
        const parsed = JSON.parse(draft);
        // Nur wiederherstellen wenn < 24h alt
        if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
          const { timestamp, ...draftData } = parsed;
          
          // Prüfe ob wirklich Daten vorhanden sind
          const hasContent = Object.entries(draftData).some(([key, value]) => 
            key !== 'acceptedPrivacy' && value && value !== ''
          );
          
          if (hasContent) {
            setFormData(draftData);
            setIsDraftRestored(true);
            
            // Modelle und Jahre wiederherstellen
            if (draftData.makeId) {
              const selectedMake = makes.find(m => m.id === parseInt(draftData.makeId));
              if (selectedMake) {
                setAvailableModels(selectedMake.models || []);
                
                if (draftData.modelId) {
                  const selectedModel = selectedMake.models.find(m => m.id === parseInt(draftData.modelId));
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
              }
            }
          }
        } else {
          // Alten Draft löschen
          localStorage.removeItem('homepage_draft');
        }
      } catch (e) {
        console.error('Fehler beim Laden des Drafts:', e);
        localStorage.removeItem('homepage_draft');
      }
    }
  }, []);

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;
    
    // Draft löschen beim ersten Bearbeiten nach Restore
    if (isDraftRestored) {
      localStorage.removeItem('homepage_draft');
      setIsDraftRestored(false);
    }
    
    // Input-Formatierung & Sanitization
    if (name === 'phone') {
      value = formatPhoneNumber(value);
    }
    if (name === 'email') {
      value = value.trim().toLowerCase();
    }
    
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    
    // Live-Validierung für bereits berührte Felder
    if (touchedFields[name] && !['makeId', 'modelId', 'year'].includes(name)) {
      const error = validateField(name, value);
      setFieldErrors(prev => ({ ...prev, [name]: error }));
    }

    if (name === 'makeId' && value) {
      const selectedMake = makes.find(m => m.id === parseInt(value));
      setAvailableModels(selectedMake?.models || []);
      setFormData(prev => ({ ...prev, modelId: '', year: '' }));
      setAvailableYears([]);
      setFieldErrors(prev => ({ ...prev, modelId: '', year: '' }));
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
      setFieldErrors(prev => ({ ...prev, year: '' }));
    }
  };

  // Handler für Field Blur (Touch-Tracking)
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setFieldErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField]);

  // Keyboard Navigation Enhancement
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && e.target.tagName === 'SELECT') {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.from(form.elements).indexOf(e.target);
      const nextElement = form.elements[index + 1];
      if (nextElement && !nextElement.disabled) {
        nextElement.focus();
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side Validierung
    setSubmitState({ status: 'validating', message: 'Überprüfe Eingaben...' });
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Alle Felder validieren
    const errors = {};
    ['email', 'phone', 'mileage', 'condition'].forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) errors[field] = error;
    });
    
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setTouchedFields({
        email: true,
        phone: true,
        mileage: true,
        condition: true
      });
      setSubmitState({ status: 'error', message: 'Bitte füllen Sie alle Pflichtfelder korrekt aus.' });
      setTimeout(() => setSubmitState({ status: 'idle', message: '' }), 3000);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitState({ status: 'submitting', message: 'Sende Anfrage...' });
    
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
        setSubmitState({ status: 'success', message: 'Erfolgreich gesendet!' });
        setSubmitted(true);
        // LocalStorage Draft löschen
        localStorage.removeItem('homepage_draft');
        // Reset Formular
        setFormData({
          makeId: '',
          modelId: '',
          year: '',
          mileage: '',
          condition: '',
          email: '',
          phone: '',
          acceptedPrivacy: false
        });
        setAvailableModels([]);
        setAvailableYears([]);
        setFieldErrors({});
        setTouchedFields({});
      } else {
        setSubmitState({ 
          status: 'error', 
          message: 'Fehler beim Senden: ' + (result.message || 'Unbekannter Fehler') 
        });
      }
    } catch (error) {
      console.error('Fehler:', error);
      const errorMessage = error.message || 'Unbekannter Fehler';
      setSubmitState({ 
        status: 'error', 
        message: `Fehler beim Senden der Anfrage: ${errorMessage}` 
      });
    } finally {
      setIsSubmitting(false);
      if (submitState.status === 'error') {
        setTimeout(() => setSubmitState({ status: 'idle', message: '' }), 5000);
      }
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
      
      {/* Dein Autoankauf in Rheinberg & Umgebung */}
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
              
              {/* Progress Indicator */}
              <div className="form-progress" style={{ marginBottom: '1.5rem' }}>
                <div className="progress-bar" style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${calculateProgress()}%`,
                      height: '100%',
                      backgroundColor: '#FF6B35',
                      transition: 'width 0.3s ease',
                      borderRadius: '4px'
                    }}
                    role="progressbar"
                    aria-valuenow={calculateProgress()}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
                <span className="progress-text" style={{
                  display: 'block',
                  textAlign: 'center',
                  marginTop: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#666'
                }}>
                  {calculateProgress()}% ausgefüllt
                </span>
              </div>
              
              <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="inline-form">
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
                      onBlur={handleBlur}
                      placeholder="deine@email.de"
                      className={touchedFields.email && fieldErrors.email ? 'input-error' : ''}
                      style={touchedFields.email && fieldErrors.email ? {
                        borderColor: '#dc3545',
                        backgroundColor: '#fff5f5'
                      } : {}}
                      aria-invalid={touchedFields.email && fieldErrors.email ? 'true' : 'false'}
                      aria-describedby={fieldErrors.email ? 'home-email-error' : undefined}
                      required
                    />
                    {touchedFields.email && fieldErrors.email && (
                      <span id="home-email-error" className="field-error" role="alert" style={{
                        display: 'block',
                        marginTop: '0.25rem',
                        fontSize: '0.8rem',
                        color: '#dc3545'
                      }}>
                        {fieldErrors.email}
                      </span>
                    )}
                  </div>

                  <div className="form-group-vertical">
                    <label htmlFor="home-phone">Telefonnummer *</label>
                    <input
                      type="tel"
                      id="home-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="0176 12345678"
                      className={touchedFields.phone && fieldErrors.phone ? 'input-error' : ''}
                      style={touchedFields.phone && fieldErrors.phone ? {
                        borderColor: '#dc3545',
                        backgroundColor: '#fff5f5'
                      } : {}}
                      aria-invalid={touchedFields.phone && fieldErrors.phone ? 'true' : 'false'}
                      aria-describedby={fieldErrors.phone ? 'home-phone-error' : undefined}
                      required
                    />
                    {touchedFields.phone && fieldErrors.phone && (
                      <span id="home-phone-error" className="field-error" role="alert" style={{
                        display: 'block',
                        marginTop: '0.25rem',
                        fontSize: '0.8rem',
                        color: '#dc3545'
                      }}>
                        {fieldErrors.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="privacy-checkbox-group">
                  <label className="privacy-checkbox-label">
                    <input
                      type="checkbox"
                      name="acceptedPrivacy"
                      checked={formData.acceptedPrivacy}
                      onChange={handleChange}
                      required
                    />
                    <span>Ich akzeptiere die <a href="/datenschutz" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a> *</span>
                  </label>
                </div>

                {/* Submit Status Nachricht */}
                {submitState.status !== 'idle' && submitState.status !== 'success' && (
                  <div className={`submit-status status-${submitState.status}`} role="status" style={{
                    padding: '0.75rem',
                    marginBottom: '1rem',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    backgroundColor: submitState.status === 'error' ? '#fee' : '#e3f2fd',
                    color: submitState.status === 'error' ? '#c00' : '#1976d2',
                    border: `1px solid ${submitState.status === 'error' ? '#fcc' : '#90caf9'}`
                  }}>
                    {submitState.message}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn-form-submit" 
                  disabled={isSubmitting || !formData.acceptedPrivacy}
                  aria-busy={isSubmitting}
                  style={isSubmitting ? { cursor: 'not-allowed' } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <span style={{ display: 'inline-block', marginRight: '0.5rem' }}>⏳</span>
                      {submitState.message || 'Wird gesendet...'}
                    </>
                  ) : (
                    <>
                      Jetzt kostenlos bewerten
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </>
                  )}
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

      {/* So verkaufst du dein Auto bei uns - in nur 3 Schritten */}
      <section className="section section-gray how-it-works-section">
        <div className="container">
          <p className="section-subtitle" style={{ marginBottom: '0.5rem' }}><strong>Verkaufe clever statt kompliziert</strong></p>
          <h2 className="section-title">So verkaufst du dein Auto bei uns - in nur 3 Schritten</h2>
          <p className="section-subtitle">
          Keine Inserate • Kein Hin- und her • Einfach verkaufen. Fertig. 
          </p>
          <div className="grid-3">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="step-title"></h3>
              <h3 className="step-title">Kostenloses Kaufangebot anfordern</h3>
              <p className="step-description">
                Gib deine Fahrzeugdaten ein (online oder am Telefon) und erfahren den Wert deine Autos.
                Füge optional ein oder mehrere Fotos hinzu.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title"></h3>
              <h3 className="step-title">Termin vereinbaren & Besichtigung</h3>
              <p className="step-description">
              Wir vereinbaren einen Termin an deinem Wunschort oder an unserem Standort in Rheinberg. 
              Wir schauen uns das Auto in Ruhe an und beantworten deine Fragen.              
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title"></h3>              
              <h3 className="step-title">Verkauf abschließen – Zahlung bei Übergabe</h3>
              <p className="step-description">
              Der Kaufvertrag wird unterschrieben und der Preis wird ausgezahlt (bar oder per Überweisung). 
              Abholung und Abmeldung übernehmen wir kostenfrei.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gebrauchtwagen verkaufen bei AutoHD Rheinberg */}
      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">Gebrauchtwagen verkaufen bei AutoHD Rheinberg</h2>
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

      {/* Deine Vorteile beim Autoverkauf in Rheinberg */}
      <section className="section benefits-section">
        <div className="container">
          <h3 className="section-title">Deine Vorteile beim Autoverkauf in Rheinberg</h3>
          <p className="section-subtitle">
          AutoHD ist inhabergeführt und lokal am Niederrhein. Du bekommst persönliche Beratung und direkten Kontakt – ohne Callcenter, ohne Standardabläufe.          </p>
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

      {/* Das sagen unsere Kunden */}
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

      {/* Dein Autoankauf in Zahlen*/}
      <section className="social-proof-bar stats-section">
        <div className="container">
          <h2 className="section-title">Dein Autoankauf in Zahlen</h2>
          <div className="proof-grid">
            <div className="proof-item">
              <div className="proof-number">100%</div>
              <div className="proof-text">Kostenlos</div>
              <div className="proof-subtext">Bewertung, Abholung & Abmeldung inklusive</div>
            </div>
            <div className="proof-item">
              <div className="proof-number">0 km</div>
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


      {/* Auto verkaufen ohne Stress? */}
      <section className="cta-section cta-bottom-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Auto verkaufen ohne Stress?</h2>
            <p className="cta-text">
              Lehn dich zurück - wir kommen zu dir! Jetzt unverbindlich anfragen!
            </p>
            <Link to="/bewertung" className="btn btn-primary btn-large">
              Kostenlos Auto bewerten
            </Link>
          </div>
        </div>
      </section>

      {/* AutoHD – Autoankauf am Niederrhein */}
      <section className="section section-white niederrhein-section">
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

