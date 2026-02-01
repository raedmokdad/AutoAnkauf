import React, { useState } from 'react';
import { ClockIcon, CheckIcon, CarIcon } from '../components/Icons';
import '../styles/shared-green-hero.css';
import './KontaktPage.css';

function KontaktPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'allgemein',
    message: '',
    acceptedPrivacy: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuliere API-Call
    setTimeout(() => {
      alert('Vielen Dank für Ihre Nachricht! Wir melden uns schnellstmöglich bei Ihnen.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'allgemein',
        message: '',
        acceptedPrivacy: false
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="kontakt-page">
      <section className="kontakt-hero-green">
        <div className="kontakt-hero-container">
          <div className="hero-badge-green">✓ Schnell erreichbar – persönlich & unkompliziert
          </div>
          <h1 className="kontakt-hero-title">Kontakt zu AutoHD           </h1>
          <p className="kontakt-hero-subtitle">
          Hast du Fragen? Ruf uns an, schreib uns oder nutze das Formular – Wir sind für dich da
          </p>
          <div className="kontakt-hero-features">
            <div className="hero-feature-green">
              <CheckIcon className="feature-icon-white" />
              <span>Kostenlose Beratung</span>
            </div>
            <div className="hero-feature-green">
              <ClockIcon className="feature-icon-white" />
              <span>Flexible Termine</span>
            </div>
            <div className="hero-feature-green">
              <CarIcon className="feature-icon-white" />
              <span>Rheinberg & Umkreis 100 km</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section kontakt-content-section">
        <div className="container">
          <div className="kontakt-content">
            <div className="kontakt-info">
              

              <div className="kontakt-adresse-block">
                <h3>Adresse</h3>
                <p><strong>AutoHD – Autoankauf Rheinberg</strong></p>
                <p>Sauerfeldstraße 4</p>
                <p>47495 Rheinberg</p>
              </div>

              <div className="kontakt-kontakt-block">
                <h3>Kontakt</h3>
                <p className="kontakt-line">📞 +49 176 30339020</p>
                <p className="kontakt-line">✉️ info@autohd.de</p>
                <p className="kontakt-line">💬 WhatsApp: +49 176 30339020</p>
                <p className="kontakt-note">Wir antworten meist innerhalb von 24 Stunden</p>
              </div>

              <div className="opening-hours-section">
                <h3>Öffnungszeiten</h3>
                <p className="opening-hours-intro">
                  Du arbeitest zu unseren Bürozeiten oder hast am Wochenende mehr Zeit? Kein Problem! Wir bieten dir flexible Termine außerhalb der regulären Bürozeiten an.
                </p>
                <div className="opening-hours-grid">
                  <div className="opening-hours-box">
                    <h4>Bürozeiten</h4>
                    <ul className="hours-list">
                      <li>Montag 09:00 – 18:00</li>
                      <li>Samstag 09:00 – 14:00</li>
                      <li>Sonntag geschlossen</li>
                    </ul>
                  </div>
                  <div className="opening-hours-box">
                    <h4>Servicezeiten und Erreichbarkeit</h4>
                    <p className="opening-hours-sub">(Mobile & WhatsApp)</p>
                    <ul className="hours-list">
                      <li>Mo – So 7:30 – 21:00</li>
                    </ul>
                  </div>
                </div>
                <p className="opening-hours-outro">
                  Ruf uns einfach an oder schreib uns – wir finden einen Termin, der zu deinem Zeitplan passt!
                </p>
              </div>
            </div>

            <div className="kontakt-form-container">
              <h2>Nachricht senden</h2>
              <form onSubmit={handleSubmit} className="kontakt-form">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Ihr vollständiger Name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-Mail *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="ihre@email.de"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Telefon</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+49 172 123456789"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Betreff *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="bewertung">Fahrzeugbewertung anfordern</option>
                    <option value="verkauf">Fahrzeug verkaufen</option>
                    <option value="termin">Termin vereinbaren</option>
                    <option value="allgemein">Allgemeine Anfrage</option>
                    <option value="sonstiges">Sonstiges</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Deine Nachricht *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Beschreiben Sie Ihr Anliegen..."
                  ></textarea>
                </div>

                <div className="form-group privacy-checkbox-group">
                  <label className="privacy-checkbox-label">
                    <input
                      type="checkbox"
                      name="acceptedPrivacy"
                      checked={formData.acceptedPrivacy}
                      onChange={handleChange}
                      required
                    />
                    <span>Ich akzeptiere die <a href="/datenschutz" target="_blank" rel="noopener noreferrer" className="privacy-link">Datenschutzerklärung</a> *</span>
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-large"
                  disabled={isSubmitting || !formData.acceptedPrivacy}
                >
                  {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="map-info">
          <h3>📍 Unser Standort</h3>
          <p><strong>AutoHD</strong></p>
          <p>Sauerfeldstraße 4, 47495 Rheinberg</p>
        </div>
        <div className="map-container">
          <iframe
            src="https://maps.google.com/maps?q=Sauerfeldstraße+4,+47495+Rheinberg&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="ARZ Delivery & Automobile Standort"
          ></iframe>
          <div className="map-fallback">
            <p>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Sauerfeldstraße+4,47495+Rheinberg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="map-link"
              >
                📍 Route planen zu AutoHD
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default KontaktPage;

