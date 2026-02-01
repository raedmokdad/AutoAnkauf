import React from 'react';
import SEO from '../components/SEO';
import './ImpressumPage.css';

function ImpressumPage() {
  return (
    <div className="impressum-page">
      <SEO 
        title="Impressum – AutoHD Autoankauf Rheinberg"
        description="Impressum und rechtliche Informationen von AutoHD – Autoankauf Rheinberg."
      />

      <section className="section impressum-section">
        <div className="container">
          <div className="impressum-content">
            
            <h1 className="impressum-main-title">Impressum</h1>

            <div className="impressum-simple-block">
              <h2 class="impressum-h2-normal">Angaben gemäß § 5 TMG</h2>
              <p><strong>AutoHD – AutoAnkauf Rheinberg</strong></p>
              <p>Inhaber: Hussein Hajj Sleiman</p>
              <br />
              <p>Sauerfeldstraße 4</p>
              <p>47495 Rheinberg</p>
            </div>

            <div className="impressum-simple-block">
              <h2>Kontakt:</h2>
              <p>Telefon: <a href="tel:+4917630339020">0176 30339020</a></p>
              <p>E-Mail: <a href="mailto:info@autohd.de">info@autohd.de</a></p>
              <p>Website: <a href="https://www.autohd.de" target="_blank" rel="noopener noreferrer">www.autohd.de</a></p>
            </div>

            <div className="impressum-simple-block">
              <h2>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:</h2>
              <p>DE283898872</p>
            </div>

            <div className="impressum-simple-block">
              <h2>Zuständige Aufsichtsbehörde:</h2>
              <p>Stadt Rheinberg - Ordnungsamt</p>
              <p>Rathausplatz 1</p>
              <p>47495 Rheinberg</p>
            </div>

            <div className="impressum-simple-block">
              <h2>Berufsbezeichnung:</h2>
              <p>Kfz-Handel (An- und Verkauf)</p>
            </div>

            <div className="impressum-simple-block">
              <h2>Online-Streitbeilegung:</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur 
                Online-Streitbeilegung (OS) bereit:
              </p>
              <p>
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
            </div>

            <div className="impressum-simple-block">
              <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:</h2>
              <p>Hussein Hajj Sleiman</p>
              <p>Sauerfeldstraße 4, 47495 Rheinberg</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default ImpressumPage;
