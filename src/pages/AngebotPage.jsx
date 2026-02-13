import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { CheckIcon, MoneyIcon, TruckIcon, ClockIcon } from '../components/Icons';
import './AngebotPage.css';

function AngebotPage() {
  const [searchParams] = useSearchParams();
  
  // Daten aus URL-Parametern lesen
  const make = searchParams.get('make') || '';
  const model = searchParams.get('model') || '';
  const year = searchParams.get('year') || '';
  const mileage = searchParams.get('mileage') || '';
  const condition = searchParams.get('condition') || '';
  const price = searchParams.get('price') || '';
  const email = searchParams.get('email') || '';
  
  // Formatierung für Zustand
  const conditionLabels = {
    'excellent': 'Sehr gut (neuwertig)',
    'good': 'Gut (gepflegt)',
    'fair': 'Befriedigend (Gebrauchsspuren)',
    'poor': 'Ausreichend (Reparaturbedarf)'
  };
  
  const conditionLabel = conditionLabels[condition] || condition;
  
  // Formatierung für Kilometerstand
  const formatMileage = (mileage) => {
    if (!mileage) return '';
    return mileage.replace('-', ' - ').replace('plus', '+').replace('150001+', 'über 150.000');
  };

  return (
    <div className="angebot-page">
      <SEO
        title="Ihr Fahrzeugbewertungsangebot - AutoHD Autoankauf Rheinberg"
        description="Ihr persönliches Fahrzeugbewertungsangebot - Professionell erstellt von unseren Experten"
        keywords="fahrzeugbewertung, auto bewertung, preisangebot"
        canonical="https://autohd.de/angebot"
      />
      
      <section className="angebot-hero-section">
        <div className="container">
          <div className="angebot-hero-content">
            <div className="angebot-badge">
              <CheckIcon className="badge-icon" />
              <span>Ihr persönliches Angebot</span>
            </div>
            <h1 className="angebot-title">Ihre Fahrzeugbewertung</h1>
            <p className="angebot-subtitle">
              Professionell erstellt von unseren Experten basierend auf aktuellen Marktdaten
            </p>
          </div>
        </div>
      </section>

      <section className="section angebot-main-section">
        <div className="container">
          <div className="angebot-container">
            {/* Fahrzeugdetails */}
            <div className="angebot-vehicle-details">
              <h2 className="angebot-section-title">Fahrzeugdetails</h2>
              <div className="vehicle-details-grid">
                <div className="detail-item">
                  <span className="detail-label">Marke:</span>
                  <span className="detail-value">{make || 'Nicht angegeben'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Modell:</span>
                  <span className="detail-value">{model || 'Nicht angegeben'}</span>
                </div>
                {year && (
                  <div className="detail-item">
                    <span className="detail-label">Erstzulassung:</span>
                    <span className="detail-value">{year}</span>
                  </div>
                )}
                {mileage && (
                  <div className="detail-item">
                    <span className="detail-label">Kilometerstand:</span>
                    <span className="detail-value">{formatMileage(mileage)} km</span>
                  </div>
                )}
                {condition && (
                  <div className="detail-item">
                    <span className="detail-label">Zustand:</span>
                    <span className="detail-value">{conditionLabel}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Preisvorschlag */}
            {price && (
              <div className="angebot-price-section">
                <div className="price-card">
                  <div className="price-label">Unser Angebot für Ihr Fahrzeug</div>
                  <div className="price-amount">
                    {parseFloat(price).toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €
                  </div>
                  <div className="price-note">
                    * Dieses Angebot ist unverbindlich und basiert auf Ihren Angaben. 
                    Eine Vor-Ort-Besichtigung kann das Angebot bestätigen oder anpassen.
                  </div>
                </div>
              </div>
            )}

            {/* Nächste Schritte */}
            <div className="angebot-next-steps">
              <h2 className="angebot-section-title">Nächste Schritte</h2>
              <div className="steps-grid">
                <div className="step-card">
                  <div className="step-icon-wrapper">
                    <ClockIcon className="step-icon" />
                  </div>
                  <h3 className="step-title">1. Angebot prüfen</h3>
                  <p className="step-description">
                    Nehmen Sie sich Zeit, unser Angebot zu prüfen. Es ist unverbindlich und ohne Verpflichtung.
                  </p>
                </div>
                <div className="step-card">
                  <div className="step-icon-wrapper">
                    <TruckIcon className="step-icon" />
                  </div>
                  <h3 className="step-title">2. Termin vereinbaren</h3>
                  <p className="step-description">
                    Bei Interesse vereinbaren wir einen Termin. Wir kommen zu Ihnen - kostenlos und unverbindlich.
                  </p>
                </div>
                <div className="step-card">
                  <div className="step-icon-wrapper">
                    <MoneyIcon className="step-icon" />
                  </div>
                  <h3 className="step-title">3. Sofort-Auszahlung</h3>
                  <p className="step-description">
                    Bei Übergabe erhalten Sie den Kaufpreis sofort ausgezahlt - bar oder per Überweisung.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="angebot-actions">
              <Link to="/ankauf" className="btn btn-primary btn-large">
                Jetzt verkaufen
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: '20px', height: '20px', marginLeft: '8px' }}>
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <a href="tel:+4917630339020" className="btn btn-secondary btn-large">
                <span style={{ marginRight: '8px' }}>📞</span>
                Jetzt anrufen: 0176 30339020
              </a>
              <Link to="/kontakt" className="btn btn-outline btn-large">
                Kontakt aufnehmen
              </Link>
            </div>

            {/* Info Box */}
            <div className="angebot-info-box">
              <h3 className="info-box-title">Hinweise zum Angebot</h3>
              <ul className="info-box-list">
                <li>
                  <CheckIcon className="info-icon" />
                  <span>Dieses Angebot ist unverbindlich und kostenlos</span>
                </li>
                <li>
                  <CheckIcon className="info-icon" />
                  <span>Bei Interesse vereinbaren wir einen kostenlosen Vor-Ort-Termin</span>
                </li>
                <li>
                  <CheckIcon className="info-icon" />
                  <span>Wir holen Ihr Fahrzeug kostenlos bei Ihnen ab</span>
                </li>
                <li>
                  <CheckIcon className="info-icon" />
                  <span>Die Auszahlung erfolgt sofort bei Übergabe</span>
                </li>
                <li>
                  <CheckIcon className="info-icon" />
                  <span>Sie haben keine Verpflichtung - entscheiden Sie in Ruhe</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AngebotPage;
