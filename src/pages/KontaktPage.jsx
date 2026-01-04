import React, { useState } from 'react';
import { ClockIcon, CheckIcon, TruckIcon } from '../components/Icons';
import '../styles/shared-green-hero.css';
import './KontaktPage.css';

function KontaktPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'allgemein',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="kontakt-page">
      <section className="kontakt-hero-green">
        <div className="kontakt-hero-container">
          <div className="hero-badge-green">✓ Wir sind für Sie da</div>
          <h1 className="kontakt-hero-title">Kontaktieren Sie uns</h1>
          <p className="kontakt-hero-subtitle">
            Haben Sie Fragen? Unser Team steht Ihnen gerne zur Verfügung - per Telefon, E-Mail oder persönlich
          </p>
          <div className="kontakt-hero-features">
            <div className="hero-feature-green">
              <ClockIcon className="feature-icon-white" />
              <span>24h Antwortzeit</span>
            </div>
            <div className="hero-feature-green">
              <CheckIcon className="feature-icon-white" />
              <span>Persönliche Beratung</span>
            </div>
            <div className="hero-feature-green">
              <TruckIcon className="feature-icon-white" />
              <span>Deutschlandweit</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section kontakt-content-section">
        <div className="container">
          <div className="kontakt-content">
            <div className="kontakt-info">
              <h2>Kontaktinformationen</h2>
              <p className="kontakt-intro">
                Haben Sie Fragen oder möchten Sie uns direkt kontaktieren? 
                Wir sind gerne für Sie da!
              </p>

              <div className="kontakt-methods">
                <div className="kontakt-method">
                  <div className="method-icon">📞</div>
                  <div className="method-details">
                    <h3>Telefon</h3>
                    <p>0176 30339020</p>
                    <span className="method-time">Mo-Fr: 8:00 - 18:00 Uhr<br/>Sa: 9:00 - 14:00 Uhr</span>
                  </div>
                </div>

                <div className="kontakt-method">
                  <div className="method-icon">✉️</div>
                  <div className="method-details">
                    <h3>E-Mail</h3>
                    <p>Arzautomobileservice@gmail.com</p>
                    <span className="method-time">Antwort innerhalb von 24h</span>
                  </div>
                </div>

                <div className="kontakt-method">
                  <div className="method-icon">💬</div>
                  <div className="method-details">
                    <h3>WhatsApp</h3>
                    <p>0176 30339020</p>
                    <span className="method-time">Schnelle Antworten per Chat</span>
                  </div>
                </div>

                <div className="kontakt-method">
                  <div className="method-icon">📍</div>
                  <div className="method-details">
                    <h3>Adresse</h3>
                    <p>Sauerfeldstraße 4<br/>47495 Rheinberg</p>
                    <span className="method-time">Nach Terminvereinbarung</span>
                  </div>
                </div>
              </div>

              <div className="opening-hours">
                <h3>Öffnungszeiten</h3>
                <ul>
                  <li>
                    <span>Montag - Freitag:</span>
                    <span>8:00 - 18:00 Uhr</span>
                  </li>
                  <li>
                    <span>Samstag:</span>
                    <span>9:00 - 14:00 Uhr</span>
                  </li>
                  <li>
                    <span>Sonntag:</span>
                    <span>Geschlossen</span>
                  </li>
                </ul>
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
                    <option value="allgemein">Allgemeine Anfrage</option>
                    <option value="bewertung">Fahrzeugbewertung</option>
                    <option value="verkauf">Fahrzeugverkauf</option>
                    <option value="termin">Terminvereinbarung</option>
                    <option value="beschwerde">Beschwerde</option>
                    <option value="sonstiges">Sonstiges</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Ihre Nachricht *</label>
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

                <button 
                  type="submit" 
                  className="btn btn-primary btn-large"
                  disabled={isSubmitting}
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
          <p><strong>ARZ Delivery & Automobile</strong></p>
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
                📍 Route planen zu ARZ Automobile
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default KontaktPage;

