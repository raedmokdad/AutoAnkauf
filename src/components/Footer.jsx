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
              <span className="footer-logo-badge">ARZ</span> Automobile
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
              <li><Link to="/bewertung">Fahrzeugbewertung</Link></li>
              <li><Link to="/ankauf">Auto verkaufen</Link></li>
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
          <p>&copy; 2024 ARZ Delivery & Automobile - Alle Rechte vorbehalten</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

