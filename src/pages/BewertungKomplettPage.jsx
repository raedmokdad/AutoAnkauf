import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import VehicleForm from '../components/VehicleForm';
import { CheckIcon } from '../components/Icons';
import '../styles/shared-green-hero.css';
import './AnkaufPage.css';

function BewertungKomplettPage() {
  const location = useLocation();
  const prefilledData = location.state?.prefilledData || {};

  return (
    <div className="ankauf-page">
      <SEO
        title="Fahrzeugbewertung ergänzen - Alle Details für eine präzise Bewertung"
        description="Ergänzen Sie Ihre Fahrzeugdaten für eine detaillierte und präzise Bewertung ✓ Kraftstoff ✓ Getriebe ✓ Ausstattung ✓ Fotos. Erhalten Sie ein faires Angebot!"
        keywords="fahrzeugbewertung komplett, auto bewerten detailliert, fahrzeug details, autowert präzise"
        canonical="https://www.autoankauf-deutschland.de/bewertung-komplett"
      />
      
      {/* Hero Section */}
      <section className="ankauf-hero-green">
        <div className="ankauf-hero-container">
          <div className="hero-badge-green">Detaillierte Fahrzeugbewertung</div>
          <h1 className="ankauf-hero-title">Vervollständige deine Fahrzeugdaten</h1>
          
          <p className="ankauf-hero-subtitle">
            Füge weitere Details zu deinem Fahrzeug hinzu, damit wir dir eine präzise und faire Bewertung erstellen können.
          </p>
          <div className="ankauf-hero-features">
            <div className="hero-feature-green">
              <CheckIcon className="feature-icon-white" />
              <span>Detaillierte Bewertung</span>
            </div>
            <div className="hero-feature-green">
              <CheckIcon className="feature-icon-white" />
              <span>Faire Marktpreise</span>
            </div>
            <div className="hero-feature-green">
              <CheckIcon className="feature-icon-white" />
              <span>Schnelle Rückmeldung</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section ankauf-form-section">
        <div className="container">
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#1a1a1a' }}>
              Ergänze deine Fahrzeugdaten für eine präzise Bewertung
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '800px', margin: '0 auto' }}>
              Je mehr Details du angibst, desto genauer können wir dein Fahrzeug bewerten. 
              Alle Angaben sind freiwillig und helfen uns, dir den bestmöglichen Preis anzubieten.
            </p>
          </div>
          
          <VehicleForm 
            buttonText="Jetzt Bewertung anfordern"
            pageTitle="Vervollständige deine Fahrzeugdaten für eine präzise Bewertung."
            initialData={prefilledData}
          />
        </div>
      </section>

      {/* Info Section */}
      <section className="section ankauf-service-section">
        <div className="container">
          <h2 className="section-title">Warum sind diese Details wichtig?</h2>
          <div className="grid-3">
            <div className="service-card">
              <div className="service-icon">🔧</div>
              <h3>Kraftstoff & Getriebe</h3>
              <p>Diese Informationen beeinflussen den Marktwert erheblich. Diesel, Benzin oder Elektro? Automatik oder Schaltgetriebe?</p>
            </div>
            <div className="service-card">
              <div className="service-icon">✨</div>
              <h3>Ausstattung</h3>
              <p>Extras wie Navigation, Sitzheizung oder Xenon-Scheinwerfer steigern den Wert deines Fahrzeugs deutlich.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📸</div>
              <h3>Fotos</h3>
              <p>Bilder helfen uns, den tatsächlichen Zustand einzuschätzen und dir ein faires, realistisches Angebot zu machen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bewertung-phone-section">
        <div className="container">
          <div className="bewertung-phone-content">
            <h2 className="bewertung-phone-title">Fragen zum Formular?</h2>
            <p className="bewertung-phone-text">
              Ruf uns einfach an – wir helfen dir gerne beim Ausfüllen oder beantworten deine Fragen.
            </p>
            <a href="tel:+4917630339020" className="bewertung-phone-btn">
              <span className="phone-icon">📞</span>
              Kostenlos anrufen: 0176 30339020
            </a>
            <p className="bewertung-phone-subtext">
              Mo–Fr: 9–18 Uhr | Auch samstags erreichbar
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BewertungKomplettPage;
