import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import vehicleData from '../data/vehicleData.json';
import './BewertungPage.css';

function BewertungPage() {
  const location = useLocation();
  const prefilledData = location.state; // Daten von HomePage
  
  const [formData, setFormData] = useState({
    makeId: '',
    modelId: '',
    year: '',
    mileage: '',
    condition: ''
  });

  const [availableModels, setAvailableModels] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [estimation, setEstimation] = useState(null);

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

  const calculateEstimation = (e) => {
    e.preventDefault();
    
    // Einfache Berechnung (in Produktion: echte API/Bewertung verwenden)
    const baseValues = {
      'excellent': 1.2,
      'good': 1.0,
      'fair': 0.8,
      'poor': 0.6
    };

    const mileageFactors = {
      '0-30000': 1.2,
      '30001-60000': 1.1,
      '60001-100000': 1.0,
      '100001-150000': 0.9,
      '150001-plus': 0.7
    };

    const currentYear = new Date().getFullYear();
    const age = currentYear - parseInt(formData.year);
    const ageFactor = Math.max(0.4, 1 - (age * 0.05));

    const basePrice = 15000; // Basis-Preis
    const estimatedValue = Math.round(
      basePrice * 
      baseValues[formData.condition] * 
      mileageFactors[formData.mileage] * 
      ageFactor
    );

    const min = Math.round(estimatedValue * 0.9);
    const max = Math.round(estimatedValue * 1.1);

    setEstimation({
      value: estimatedValue,
      min: min,
      max: max
    });
  };

  return (
    <div className="bewertung-page">
      <SEO
        title="Kostenlose Fahrzeugbewertung - Bei Verkauf holen wir ab!"
        description="Kostenlose Online-Bewertung für Ihr Auto ✓ Sofortiger Fahrzeugwert ✓ Bei Verkauf holen wir kostenlos ab ✓ Sie bleiben zu Hause. Jetzt Auto bewerten lassen!"
        keywords="fahrzeugbewertung kostenlos, auto bewerten, autowert ermitteln, auto verkaufen mit abholung, gebrauchtwagen bewertung"
        canonical="https://www.autoankauf-deutschland.de/bewertung"
      />
      <section className="bewertung-hero">
        <div className="bewertung-hero-content">
          <div className="hero-badge">✓ 100% Kostenlos & Unverbindlich</div>
          <h1>Kostenlose KFZ-Bewertung Online</h1>
          <p className="hero-subtitle">
            Ermitteln Sie in nur 2 Minuten den aktuellen Marktwert Ihres Fahrzeugs - professionell, präzise und völlig kostenlos
          </p>
          <div className="hero-features">
            <div className="hero-feature">
              <span className="feature-icon">⚡</span>
              <span>Sofort-Ergebnis</span>
            </div>
            <div className="hero-feature">
              <span className="feature-icon">📊</span>
              <span>Aktuelle Marktdaten</span>
            </div>
            <div className="hero-feature">
              <span className="feature-icon">🔒</span>
              <span>100% Kostenlos</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section bewertung-form-section">
        <div className="container">
          <div className="bewertung-content">
            <div className="bewertung-form-container">
              <div className="form-header">
                <h2>🚗 Fahrzeugdaten eingeben</h2>
                <p className="form-intro">Füllen Sie einfach die folgenden Felder aus und erhalten Sie sofort eine professionelle Bewertung</p>
              </div>
              <form onSubmit={calculateEstimation} className="bewertung-form">
                <div className="form-group">
                  <label htmlFor="makeId"><span className="label-icon">🏷️</span> Marke *</label>
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

                <div className="form-group">
                  <label htmlFor="modelId"><span className="label-icon">🚙</span> Modell *</label>
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

                <div className="form-group">
                  <label htmlFor="year"><span className="label-icon">📅</span> Erstzulassung *</label>
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

                <div className="form-group">
                  <label htmlFor="mileage"><span className="label-icon">🛣️</span> Kilometerstand *</label>
                  <select
                    id="mileage"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Bitte wählen</option>
                    <option value="0-30000">Bis 30.000 km</option>
                    <option value="30001-60000">30.001 - 60.000 km</option>
                    <option value="60001-100000">60.001 - 100.000 km</option>
                    <option value="100001-150000">100.001 - 150.000 km</option>
                    <option value="150001-plus">Über 150.000 km</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="condition"><span className="label-icon">⭐</span> Zustand *</label>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Bitte wählen</option>
                    <option value="excellent">Sehr gut (Neuwertig)</option>
                    <option value="good">Gut (Gepflegt)</option>
                    <option value="fair">Durchschnittlich</option>
                    <option value="poor">Reparaturbedürftig</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary btn-large">
                  Jetzt bewerten
                </button>
              </form>
            </div>

            {estimation && (
              <div className="estimation-result">
                <h2>Ihre Fahrzeugbewertung</h2>
                <div className="estimation-value">
                  <div className="estimation-main">
                    <span className="estimation-label">Geschätzter Wert:</span>
                    <span className="estimation-amount">{estimation.value.toLocaleString('de-DE')} €</span>
                  </div>
                  <div className="estimation-range">
                    Preisspanne: {estimation.min.toLocaleString('de-DE')} € - {estimation.max.toLocaleString('de-DE')} €
                  </div>
                </div>
                <div className="estimation-info">
                  <p>
                    <strong>Hinweis:</strong> Dies ist eine automatische Schätzung basierend auf Ihren Angaben. 
                    Für ein verbindliches Angebot kontaktieren Sie uns - <strong>wir kommen zu Ihnen und holen 
                    Ihr Auto kostenlos ab!</strong>
                  </p>
                </div>
                <div className="estimation-actions">
                  <Link to="/ankauf" className="btn btn-primary">
                    Jetzt verkaufen
                  </Link>
                  <Link to="/kontakt" className="btn btn-secondary">
                    Kontakt aufnehmen
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section bewertung-benefits-section">
        <div className="container">
          <h2 className="section-title">Warum unsere Bewertung?</h2>
          <div className="grid-3">
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Kostenlos</h3>
              <p>Nutzen Sie unsere Bewertung völlig kostenlos und unverbindlich</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Schnell & Bequem</h3>
              <p>Sofortige Bewertung - bei Verkauf holen wir Ihr Auto bei Ihnen ab</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Wir kommen zu Ihnen</h3>
              <p>Keine Anfahrt nötig - kostenlose Abholung deutschlandweit</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BewertungPage;

