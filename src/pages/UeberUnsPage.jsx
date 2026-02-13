import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ClockIcon, CheckIcon, StarIcon, LightningIcon, MoneyIcon, ShieldCheckIcon, DocumentIcon } from '../components/Icons';
import '../styles/shared-green-hero.css';
import './UeberUnsPage.css';

function UeberUnsPage() {
  return (
    <div className="ueber-uns-page">
      <SEO
        title="Über uns - AutoHD Autoankauf Rheinberg | Lokaler Partner"
        description="Lernen Sie AutoHD kennen ✓ Ihr lokaler Autoankauf in Rheinberg ✓ Persönliche Beratung ✓ Transparente Abwicklung ✓ Über 10 Jahre Erfahrung"
        keywords="über uns, autoankauf rheinberg, autohändler rheinberg, lokaler autoankauf, seriöser autoankauf"
        canonical="https://autohd.de/ueber-uns"
      />
      <section className="ueber-uns-hero-green">
        <div className="ueber-uns-hero-container">
          <div className="hero-badge-green">Inhabergeführt · Autoankauf Rheinberg</div>
          <h1 className="ueber-hero-title">Wir sind AutoHD <br></br><span className="ueber-hero-title-small">vor Ort am Niederrhein</span></h1>
          <p className="ueber-hero-subtitle">
          Dein zuverlässiger Partner für den Autoankauf – mit persönlicher Beratung statt Hotline.
          </p>
          <div className="ueber-hero-features">
            <div className="hero-feature-green">
              <ClockIcon className="feature-icon-white" />
              <span>Transparent</span>
            </div>
            <div className="hero-feature-green">
              <CheckIcon className="feature-icon-white" />
              <span>Rechtssicher</span>
            </div>
            <div className="hero-feature-green">
              <StarIcon className="feature-icon-white" filled />
              <span>Unkompliziert</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section ueber-about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Warum Kunden zu uns zurückkommen?</h2>
              <br></br>
              <p>
              Wir sind ein inhabergeführtes Familienunternehmen aus Rheinberg am Niederrhein.
              Bei uns hast du einen festen Ansprechpartner, echte Erreichbarkeit und bekommst schnell eine Rückmeldung.
              <br></br>Unser Ruf ist unser Kapital. Deshalb arbeiten wir ehrlich, zuverlässig und respektvoll. Wir setzen auf langfristige Kundenbeziehungen: Wir kennen unsere Kunden persönlich, merken uns ihre Wünsche und sind auch nach dem Verkauf für dich da. 
              Viele kommen wieder oder empfehlen uns weiter – genau so wachsen wir.
              </p>
            </div>  
          </div>
        </div>
      </section>

      <section className="section ueber-values-section">
        <div className="container">
          <h2 className="section-title">Unsere Werte</h2>
          <div className="grid-4">
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Kundennähe</h3>
              <p>
              Bei AutoHD zählt, dass du dich verstanden und fair behandelt fühlst. Wir hören zu und beraten dich so, wie wir selbst beraten werden wollen.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <DocumentIcon className="icon-svg" />
              </div>
              <h3>Transparenz</h3>
              <p>
              Du bekommst bei uns klare Aussagen – ohne versteckte Bedingungen. 
              Unsere Angebote sind nachvollziehbar und passen zur Marktlage und zum Zustand deines Autos.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <ShieldCheckIcon className="icon-svg" />
              </div>
              <h3>Vertrauen</h3>
              <p>
              Ehrlichkeit und Verlässlichkeit sind die Grundlage unserer Arbeit. Bei uns gibt es keine versteckten Kosten, 
              keine unangenehmen Überraschungen, keinen Verkaufsdruck.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <StarIcon className="icon-svg" filled />
              </div>
              <h3>Professionalität</h3>
              <p>
              Jahrelange Erfahrung und Fachwissen – kombiniert mit pünktlichem, höflichem und gepflegtem Service. 
              Unser Ziel ist, dass du uns weiterempfiehlst und gerne wiederkommst.
              </p>
            </div>
          </div>

          <h2 className="ueber-values-subtitle">Unser Service-Versprechen</h2>
          <div className="grid-4">
            <div className="value-card">
              <div className="value-icon">
                <LightningIcon className="icon-svg" />
              </div>
              <h3>Schnelligkeit</h3>
              <p>
                Wir wissen, dass deine Zeit wertvoll ist. Wir melden uns zeitnah und bringen den Verkauf schnell auf den Punkt. Und damit du noch mehr Zeit sparst, holen wir dein Auto auf Wunsch bei dir ab.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <ClockIcon className="icon-svg" />
              </div>
              <h3>Flexibilität</h3>
              <p>
                Wir richten uns nach deinen Wünschen und finden individuelle Lösungen für jeden Kunden. Termine, Ablauf und Übergabe passen wir an deinen Alltag an – auch nach Feierabend und am Wochenende.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <StarIcon className="icon-svg" filled />
              </div>
              <h3>Qualität</h3>
              <p>
                Bei uns erlebst du eine professionelle Abwicklung – von der ersten Kontaktaufnahme bis zur Fahrzeugübergabe. Saubere Abläufe, klare Kommunikation und hohe Standards in jedem Schritt.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">📍</div>
              <h3>Fester Standort</h3>
              <p>
                Wir sind persönlich erreichbar – an unserem festen Standort in Rheinberg am Niederrhein. Bei uns hast du direkten Kontakt zum Inhaber statt anonymer Hotline.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section ueber-advantages-section">
        <div className="container">
          <p className="ueber-advantages-label">Autoankauf Rheinberg</p>
          <h2 className="section-title">So läuft dein Autoverkauf bei uns</h2>
          <div className="grid-2">
            <div className="advantage-card">
              <div className="advantage-number">01</div>
              <h3>Klare Bewertung</h3>
              <p>
              Du bekommst eine realistische Einschätzung am Markt – nachvollziehbar erklärt.

              </p>
            </div>

            <div className="advantage-card">
              <div className="advantage-number">02</div>
              <h3>Besichtigung vor Ort</h3>
              <p>
              Wir schauen dein Auto an und beantworten deine Fragen – ohne Zeitdruck.

              </p>
            </div>

            <div className="advantage-card">
              <div className="advantage-number">03</div>
              <h3>Kaufvertrag inklusive</h3>
              <p>
              Alles schriftlich und sauber geregelt. Keine Unklarheiten, keine Überraschungen.

              </p>
            </div>

            <div className="advantage-card">
              <div className="advantage-number">04</div>
              <h3>Sichere Zahlung</h3>
              <p>
              Auszahlung bei Übergabe – bar oder per Überweisung, wie du es willst.

              </p>
            </div>

            <div className="advantage-card">
              <div className="advantage-number">05</div>
              <h3>Abholung & Abmeldung</h3>
              <p>
              Auf Wunsch kümmern wir uns um Abholung/Transport und die KFZ-Abmeldung.

              </p>
            </div>

            <div className="advantage-card">
              <div className="advantage-number">06</div>
              <h3>Auch bei Sonderfällen</h3>
              <p>
              Unfall, Defekt, ohne TÜV oder laufende Finanzierung – wir prüfen fair, was möglich ist.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section ueber-stats-section">
        <div className="container">
          <h2 className="section-title">Autoankauf, wie er sein sollte</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-number">Echt</div>
              <div className="stat-label">Echte Menschen statt Hotline</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">Fair</div>
              <div className="stat-label">Preis mit Erklärung statt Druck & Tricks</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">Fix</div>
              <div className="stat-label">24h Rückmeldung statt tagelang warten</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">Nah</div>
              <div className="stat-label">Auch danach da statt einmal & weg</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Bereit für den stressfreien Autoverkauf?</h2>
            <p className="cta-text">
            Lehn dich zurück - wir kommen zu dir und holen dein Auto ab!
            </p>
            <div className="cta-buttons">
              <Link to="/bewertung" className="btn btn-primary btn-large">
                Jetzt bewerten
              </Link>
              <Link to="/kontakt" className="btn btn-secondary btn-large">
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UeberUnsPage;

