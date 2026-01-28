import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Spalte 1: Firmeninfo */}
          <div className="footer-section footer-section-main">
            <h3 className="footer-title">
              <div className="footer-logo-container">
                <div className="footer-logo-icon-wrapper">
                  <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="footer-logo-icon-svg">
                    <rect width="64" height="64" rx="14" fill="#4CAF50"/>
                    <path d="M54 32L50 24C49 22 47 21 45 21H19C17 21 15 22 14 24L10 32V44C10 45.1 10.9 46 12 46H14C15.1 46 16 45.1 16 44V42H48V44C48 45.1 48.9 46 50 46H52C53.1 46 54 45.1 54 44V32Z" fill="none" stroke="white" strokeWidth="2.5"/>
                    <circle cx="18" cy="38" r="3" fill="none" stroke="white" strokeWidth="2"/>
                    <circle cx="46" cy="38" r="3" fill="none" stroke="white" strokeWidth="2"/>
                    <path d="M16 30L20 22H44L48 30" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M20 23C20 23 25 21 32 21C39 21 44 23 44 23" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="52" cy="12" r="6" fill="#52b788"/>
                  </svg>
                </div>
                <div className="footer-logo-text-wrapper">
                  <span className="footer-logo-text-main">AutoHD</span>
                  <span className="footer-logo-text-sub">Autoankauf Rheinberg</span>
                </div>
              </div>
            </h3>
            <p className="footer-text">
              Ihr zuverlässiger Partner für den Autoverkauf. 
              Wir kommen zu Ihnen - deutschlandweit!
            </p>
            <div className="footer-contact">
              <p>📞 0176 30339020</p>
              <p>✉️ Arzautomobileservice@gmail.com</p>
              <p>📍 Sauerfeldstraße 4, 47495 Rheinberg</p>
            </div>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">📘</a>
              <a href="#" className="social-link" aria-label="Instagram">📷</a>
              <a href="#" className="social-link" aria-label="Twitter">🐦</a>
              <a href="#" className="social-link" aria-label="LinkedIn">💼</a>
            </div>
          </div>

          {/* Spalte 2: Services & Rechtliches */}
          <div className="footer-section">
            <h4 className="footer-section-title">Unternehmen</h4>
            <ul className="footer-links">
              <li><Link to="/ankauf">Auto verkaufen</Link></li>
              <li><Link to="/bewertung">Auto bewerten</Link></li>
              <li><Link to="/ueber-uns">Über uns</Link></li>
              <li><Link to="/faq">Häufige Fragen</Link></li>
              <li><Link to="/kontakt">Kontakt</Link></li>
            </ul>
            <h4 className="footer-section-title" style={{ marginTop: 'var(--spacing-lg)' }}>Rechtliches</h4>
            <ul className="footer-links">
              <li><Link to="/impressum">Impressum</Link></li>
              <li><Link to="/datenschutz">Datenschutz</Link></li>
              <li><Link to="/agb">AGB</Link></li>
            </ul>
          </div>

          {/* Spalte 3: Top Marken */}
          <div className="footer-section">
            <h4 className="footer-section-title">Auto verkaufen</h4>
            <ul className="footer-links">
              <li><Link to="/marken/bmw-verkaufen">BMW verkaufen</Link></li>
              <li><Link to="/marken/mercedes-verkaufen">Mercedes verkaufen</Link></li>
              <li><Link to="/marken/volkswagen-verkaufen">VW verkaufen</Link></li>
              <li><Link to="/marken/audi-verkaufen">Audi verkaufen</Link></li>
              <li><Link to="/marken/opel-verkaufen">Opel verkaufen</Link></li>
            </ul>
          </div>

          {/* Spalte 4: Top Ratgeber */}
          <div className="footer-section">
            <h4 className="footer-section-title">Ratgeber</h4>
            <ul className="footer-links">
              <li><Link to="/ratgeber/auto-verkaufen-checkliste">Verkaufs-Checkliste</Link></li>
              <li><Link to="/ratgeber/kaufvertrag-auto-muster">Kaufvertrag</Link></li>
              <li><Link to="/ratgeber/fahrzeugbewertung-ablauf">Bewertung</Link></li>
              <li><Link to="/ratgeber/auto-ohne-tuev-verkaufen">Auto ohne TÜV</Link></li>
              <li><Link to="/ratgeber/unfallwagen-verkaufen">Unfallwagen</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 AutoHD Autoankauf Rheinberg - Alle Rechte vorbehalten</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

