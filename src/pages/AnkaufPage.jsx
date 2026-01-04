import React from 'react';
import SEO from '../components/SEO';
import { TruckIcon, MoneyIcon, LightningIcon, ShieldCheckIcon, DocumentIcon, CheckIcon } from '../components/Icons';
import VehicleForm from '../components/VehicleForm';
import '../styles/shared-green-hero.css';
import './AnkaufPage.css';

function AnkaufPage() {
  return (
    <div className="ankauf-page">
      <SEO
        title="Auto verkaufen - Wir holen bei Ihnen ab | Deutschlandweit kostenlos"
        description="Gebrauchtwagen bequem verkaufen ✓ Wir kommen zu Ihnen nach Hause ✓ Kostenlose Abholung vor Ihrer Haustür ✓ Faire Preise ✓ Sofort-Auszahlung. Sie bleiben zu Hause!"
        keywords="auto verkaufen mit abholung, autoankauf abholservice, fahrzeug verkaufen ohne anfahrt, auto abholen lassen, bequem auto verkaufen, autoankauf vor ort"
        canonical="https://www.autoankauf-deutschland.de/ankauf"
      />
      <section className="ankauf-hero-green">
        <div className="ankauf-hero-container">
          <div className="hero-badge-green">⭐ Über 5.000 zufriedene Kunden</div>
          <h1 className="ankauf-hero-title">Wir kommen zu Ihnen - Auto verkaufen leicht gemacht</h1>
          <p className="ankauf-hero-subtitle">
            Der stressfreie Weg, Ihr Auto zu verkaufen: Einfach Formular ausfüllen, Angebot erhalten und wir holen Ihr Fahrzeug kostenlos bei Ihnen zu Hause ab!
          </p>
          <div className="ankauf-hero-features">
            <div className="hero-feature-green">
              <TruckIcon className="feature-icon-white" />
              <span>Wir holen kostenlos ab</span>
            </div>
            <div className="hero-feature-green">
              <MoneyIcon className="feature-icon-white" />
              <span>Sofort-Auszahlung</span>
            </div>
            <div className="hero-feature-green">
              <CheckIcon className="feature-icon-white" />
              <span>Bei Ihnen zu Hause</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section ankauf-intro-section">
        <div className="container">
          <div className="ankauf-intro">
            <div className="intro-icon">🤝</div>
            <h2>Der bequeme Weg, Ihr Auto zu verkaufen - ohne Anfahrt!</h2>
            <p>
              <strong>Ihr Vorteil bei uns:</strong> Sie müssen nicht zu einer Filiale fahren - wir kommen direkt zu Ihnen nach Hause! 
              Egal ob BMW, Mercedes, VW, Audi oder andere Marken, egal ob Limousine, Kombi, SUV oder Transporter - 
              wir kaufen alle Fahrzeuge. Füllen Sie einfach unser Online-Formular aus, erhalten Sie innerhalb von 24 Stunden 
              ein faires Angebot und wir vereinbaren einen Termin für die kostenlose Abholung vor Ihrer Haustür. 
              <strong>Sie bleiben entspannt zu Hause - wir kümmern uns um den Rest!</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="section ankauf-form-section">
        <div className="container">
          <VehicleForm />
        </div>
      </section>

      <section className="section ankauf-service-section">
        <div className="container">
          <h2 className="section-title">💼 Unser Service im Detail</h2>
          <p className="section-subtitle">Professioneller Autoankauf mit Rundum-Service</p>
          <div className="grid-2">
            <div className="service-detail-card">
              <div className="service-detail-icon">
                <MoneyIcon className="icon-svg" />
              </div>
              <h3>Faire Preise</h3>
              <p>
                Wir bieten Ihnen einen fairen Preis basierend auf dem aktuellen Marktwert 
                und dem Zustand Ihres Fahrzeugs. Transparente Bewertung ohne versteckte Kosten.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <TruckIcon className="icon-svg" />
              </div>
              <h3>Wir holen ab - Sie bleiben zu Hause</h3>
              <p>
                Das ist unser Service: Wir kommen zu Ihnen! Keine Anfahrt zur Filiale nötig. 
                Wir holen Ihr Fahrzeug deutschlandweit kostenlos direkt bei Ihnen zu Hause ab. 
                Maximale Bequemlichkeit für Sie!
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <LightningIcon className="icon-svg" />
              </div>
              <h3>Schnell & Stressfrei</h3>
              <p>
                Kein langes Warten, keine komplizierten Prozesse. Innerhalb von 24 Stunden 
                erhalten Sie ein Angebot. Termin vereinbaren, wir kommen vorbei - fertig! 
                Einfacher geht Autoverkauf nicht.
              </p>
            </div>

            <div className="service-detail-card">
              <div className="service-detail-icon">
                <ShieldCheckIcon className="icon-svg" />
              </div>
              <h3>Sofortige Auszahlung vor Ort</h3>
              <p>
                Wenn wir Ihr Fahrzeug abholen, erhalten Sie den Kaufpreis direkt ausgezahlt. 
                Bar, per Überweisung oder nach Wunsch - sicher und vertrauensvoll. 
                Keine Verzögerungen, keine Unsicherheiten.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section ankauf-documents-section">
        <div className="container">
          <h2 className="section-title">Benötigte Unterlagen</h2>
          <p className="section-subtitle">
            Bitte halten Sie folgende Dokumente für die Abwicklung bereit:
          </p>
          <div className="documents-grid">
            <div className="document-item">
              <div className="document-icon">📄</div>
              <h4>Fahrzeugbrief (Zulassungsbescheinigung Teil II)</h4>
            </div>
            <div className="document-item">
              <div className="document-icon">📋</div>
              <h4>Fahrzeugschein (Zulassungsbescheinigung Teil I)</h4>
            </div>
            <div className="document-item">
              <div className="document-icon">🔑</div>
              <h4>Alle Fahrzeugschlüssel</h4>
            </div>
            <div className="document-item">
              <div className="document-icon">📖</div>
              <h4>Serviceheft / Wartungsnachweise</h4>
            </div>
            <div className="document-item">
              <div className="document-icon">🔍</div>
              <h4>TÜV / AU-Berichte</h4>
            </div>
            <div className="document-item">
              <div className="document-icon">📱</div>
              <h4>Bedienungsanleitung</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AnkaufPage;

