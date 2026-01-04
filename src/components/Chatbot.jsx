import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Chatbot.css';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hallo! 👋 Ich bin Ihr Auto-Ankauf-Assistent.\n\nIch helfe Ihnen gerne bei:\n• 🚗 Fahrzeugbewertung (kostenlos)\n• 💰 Preisermittlung\n• 🚚 Abholung & Prozess\n• 📋 Fragen & Dokumente\n\nWie kann ich Ihnen helfen?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    '🚗 Auto bewerten lassen',
    '💰 Wie viel ist mein Auto wert?',
    '🚚 Kostenlose Abholung?',
    '📋 Welche Dokumente brauche ich?'
  ];

  // Umfassende Wissensdatenbank
  const knowledgeBase = {
    // Unternehmensinformationen
    firma: {
      keywords: ['firma', 'unternehmen', 'wer seid ihr', 'über euch', 'geschichte', 'erfahrung', 'team'],
      response: '🏢 ARZ Delivery & Automobile\n\n👨‍💼 Leitung: Hussein Hajj Sleiman\n📍 Standort: Rheinberg\n⏱️ Seit 2009 (15+ Jahre Erfahrung)\n⭐ 5.000+ zufriedene Kunden\n📊 4.8/5 Sterne Bewertung\n\nWir sind Ihr vertrauensvoller Partner für den stressfreien Autoverkauf - bundesweit mit kostenloser Abholung!'
    },
    
    // Verkaufsprozess (3 Schritte)
    prozess: {
      keywords: ['prozess', 'ablauf', 'wie funktioniert', 'schritte', 'vorgang', 'wie läuft', 'verkaufsablauf'],
      response: '✅ So einfach verkaufen Sie Ihr Auto:\n\n1️⃣ BEWERTUNG (2 Min.)\nOnline-Formular ausfüllen mit Fahrzeugdaten\n\n2️⃣ ANGEBOT (24h)\nFaires Angebot innerhalb von 24 Stunden\n\n3️⃣ ABHOLUNG & ZAHLUNG\n• Wir kommen zu Ihnen (kostenlos!)\n• Vor-Ort-Besichtigung\n• Sofort-Auszahlung\n• Fertig!\n\nSie müssen nirgendwo hinfahren! 🚗✨'
    },

    // Bewertung & Preis
    bewertung: {
      keywords: ['bewert', 'schätz', 'einschätz', 'berechnen', 'ermittel', 'preis ermittlung'],
      response: '📊 KOSTENLOSE FAHRZEUGBEWERTUNG\n\n✓ Dauer: Nur 2 Minuten\n✓ Ergebnis: Sofort\n✓ Kosten: 100% kostenlos\n✓ Bindung: Unverbindlich\n\n🔍 Wir berücksichtigen:\n• Marke & Modell\n• Baujahr & Kilometerstand\n• Zustand (innen & außen)\n• Ausstattung\n• Scheckheftpflege\n• Aktueller Marktwert\n\n👉 Jetzt starten: Klicken Sie unten auf "Jetzt bewerten"!'
    },

    preisfaktoren: {
      keywords: ['preis berechnung', 'preisfaktoren', 'was beeinflusst', 'preis zusammensetzung', 'bewertungsfaktoren'],
      response: '💰 PREISERMITTLUNG - Das fließt ein:\n\n📋 Hauptfaktoren:\n• Marke & Modell (Beliebtheit)\n• Alter / Baujahr\n• Kilometerstand\n• Allgemeiner Zustand\n\n⭐ Wertsteigernd:\n• Scheckheftgepflegt\n• Sonderausstattung (Navi, Leder, etc.)\n• Unfallfrei\n• 1. Hand\n• Vollausstattung\n\n📉 Wertmindernd:\n• Unfallschäden\n• Hoher Kilometerstand\n• Fehlende Wartung\n• Rost oder Lackschäden\n\nWir bieten faire Preise basierend auf aktuellen Marktdaten!'
    },

    // Abholung & Transport
    abholung: {
      keywords: ['abhol', 'komm', 'bring', 'transport', 'liefern', 'hinfahren', 'zu mir', 'vor ort'],
      response: '🚚 KOSTENLOSE BUNDESWEITE ABHOLUNG!\n\n✅ Unser Service:\n• Wir kommen zu Ihnen nach Hause\n• Deutschlandweit (überall!)\n• 100% kostenlos\n• Flexibler Wunschtermin\n• Keine Filiale nötig\n\n⏱️ Zeitrahmen:\n• Termin: 2-5 Werktage nach Zusage\n• Sie bestimmen den Tag\n• Auch am Wochenende möglich\n\n📍 Abholorte:\n• Zu Hause\n• Arbeitsstelle\n• Wunschort nach Vereinbarung\n\nMaximale Bequemlichkeit für Sie!'
    },

    standort: {
      keywords: ['standort', 'adresse', 'wo seid', 'stadt', 'rheinberg', 'nähe', 'region', 'filiale'],
      response: '📍 ARZ Delivery & Automobile\n\n🏢 Hauptsitz: Rheinberg, NRW\n\n🚚 ABER: Wir holen DEUTSCHLANDWEIT ab!\n\nEgal wo Sie sind:\n• Berlin\n• München\n• Hamburg\n• Köln\n• Alle anderen Städte\n\n→ Sie müssen NICHT zu uns kommen!\n→ Wir kommen zu Ihnen - kostenlos!\n\nKeine Anfahrt, kein Stress. Alles bequem von zu Hause aus!'
    },

    // Kosten
    kosten: {
      keywords: ['kostenlos', 'gratis', 'umsonst', 'gebühr', 'bezahl', 'kosten', 'geld ausgeben', 'teuer'],
      response: '💯 ALLES 100% KOSTENLOS!\n\n✅ Kostenfrei für Sie:\n• Online-Bewertung\n• Telefonische Beratung\n• Angebotserstellung\n• Vor-Ort-Besichtigung\n• Bundesweite Abholung\n• Fahrzeugprüfung\n• Alle Formalitäten\n• Kaufvertrag\n\n❌ KEINE:\n• Versteckten Kosten\n• Bearbeitungsgebühren\n• Abholkosten\n• Sonstige Gebühren\n\nSie zahlen NICHTS - wir zahlen SIE! 💰'
    },

    // Dokumente & Unterlagen
    dokumente: {
      keywords: ['dokument', 'papier', 'brief', 'schein', 'unterlagen', 'brauche', 'benötig', 'mitbring', 'papiere'],
      response: '📋 BENÖTIGTE DOKUMENTE\n\n📱 Für Online-Bewertung:\n→ Nur Fahrzeugdaten (keine Dokumente!)\n\n📄 Bei Verkauf/Übergabe:\n✓ Fahrzeugbrief (Zulassungsbescheinigung Teil II)\n✓ Fahrzeugschein (Zulassungsbescheinigung Teil I)\n✓ Alle Fahrzeugschlüssel\n✓ Personalausweis (gültig)\n✓ Serviceheft (falls vorhanden)\n✓ TÜV-Berichte (falls vorhanden)\n✓ Reparaturrechnungen (optional)\n\n💡 Tipp: Je mehr Unterlagen, desto besser die Bewertung!'
    },

    // Zeit & Dauer
    zeit: {
      keywords: ['dauer', 'schnell', 'lange', 'zeit', 'wann', 'termin', 'wartezeit', 'wie lange'],
      response: '⚡ ZEITÜBERSICHT - Super schnell!\n\n1️⃣ Online-Bewertung:\n→ 2 Minuten Formular\n→ Sofortiges Ergebnis\n\n2️⃣ Angebotsabgabe:\n→ Innerhalb 24 Stunden\n→ Oft schon nach wenigen Stunden\n\n3️⃣ Abholtermin:\n→ 2-5 Werktage\n→ Nach Ihrem Wunschtermin\n\n4️⃣ Vor-Ort-Besichtigung:\n→ Ca. 30-45 Minuten\n\n5️⃣ Auszahlung:\n→ SOFORT bei Übergabe!\n\nKeine langen Wartezeiten - alles schnell & unkompliziert!'
    },

    // Zahlung & Auszahlung
    zahlung: {
      keywords: ['zahlung', 'auszahl', 'geld', 'bezahl', 'überweis', 'bar', 'wann geld', 'bekomme geld'],
      response: '💰 SOFORT-AUSZAHLUNG!\n\n✅ Bei Fahrzeugübergabe erhalten Sie:\n→ Sofortige Bezahlung\n→ Keine Wartezeit\n\n💵 Zahlungsmethoden:\n• BAR in die Hand (beliebteste Option)\n• Banküberweisung (nach Vereinbarung)\n• Verrechnungsscheck\n\n🔒 Sicher & Zuverlässig:\n• Ordentlicher Kaufvertrag\n• Vollständige Abwicklung\n• Keine versteckten Abzüge\n\nSie bekommen den vereinbarten Preis - zu 100%!'
    },

    // Fahrzeugzustände
    zustand: {
      keywords: ['defekt', 'kaputt', 'schaden', 'unfall', 'zustand', 'mängel', 'problem', 'motor', 'getriebe'],
      response: '🔧 WIR KAUFEN ALLE AUTOS!\n\n✅ Auch bei:\n• ⚙️ Motorschaden\n• 🔩 Getriebeschaden\n• 💥 Unfallschäden\n• 🚫 Ohne TÜV / AU\n• 🦀 Rost & Blechschäden\n• 🔋 Elektronikdefekten\n• ⏰ Älteren Fahrzeugen\n• 🏚️ Standschäden\n• 🚗 Export-Fahrzeugen\n\n💡 Wichtig:\n→ Bitte Zustand ehrlich angeben!\n→ Wir bewerten fair\n→ Kein Auto ist zu alt/kaputt\n\nJeder Wagen hat seinen Wert - auch Ihres!'
    },

    tuev: {
      keywords: ['tüv', 'tuv', 'hu', 'au', 'hauptuntersuchung', 'abgasuntersuchung', 'plakette'],
      response: '🚫 AUTO OHNE TÜV VERKAUFEN?\n\n✅ Kein Problem - wir kaufen auch:\n• Ohne gültigen TÜV\n• Ohne AU (Abgasuntersuchung)\n• Abgelaufene HU\n• Durchgefallen bei Prüfung\n\n💡 Hinweise:\n• Beeinflusst den Preis (leicht niedriger)\n• Bitte bei Bewertung angeben\n• Wir holen trotzdem ab!\n• Keine TÜV-Vorführung nötig\n\nSelbst ohne TÜV kaufen wir Ihr Auto - fair & unkompliziert!'
    },

    // Formalitäten
    abmeldung: {
      keywords: ['abmeld', 'ummeld', 'zulassung', 'kennzeichen', 'stilllegung', 'formalitäten'],
      response: '📋 ABMELDUNG & FORMALITÄTEN\n\n✅ WIR kümmern uns um:\n• Fahrzeug-Abmeldung\n• Alle Formalitäten\n• Ummeldung auf uns\n\n❌ SIE müssen NICHTS tun!\n\n📄 Wir erstellen:\n• Ordnungsgemäßen Kaufvertrag\n• Übergabeprotokoll\n• Alle nötigen Unterlagen\n\n🔒 Rechtlich sicher:\n• Sie sind ab Übergabe raus\n• Keine Haftung mehr\n• Alles wasserdicht abgesichert\n\nEntspannt verkaufen - wir regeln alles!'
    },

    kaufvertrag: {
      keywords: ['kaufvertrag', 'vertrag', 'unterschrift', 'rechtlich', 'absicherung'],
      response: '📜 KAUFVERTRAG - Alles geregelt!\n\n✅ Wir erstellen:\n• Ordnungsgemäßen Kaufvertrag\n• Alle wichtigen Punkte enthalten\n• Rechtlich einwandfrei\n• Beide Seiten abgesichert\n\n📋 Inhalt:\n• Fahrzeugdaten\n• Verkäufer & Käufer\n• Kaufpreis\n• Zustand\n• Gewährleistungsausschluss\n• Übergabezeitpunkt\n\n🔒 Ihre Sicherheit:\n• Keine Haftung nach Übergabe\n• Klare Regelungen\n• Professionell & seriös\n\nAlles transparent & rechtssicher!'
    },

    finanzierung: {
      keywords: ['finanzierung', 'kredit', 'leasing', 'rate', 'bank', 'ablösung', 'restschuld'],
      response: '🏦 AUTO MIT FINANZIERUNG VERKAUFEN\n\n✅ Ja, das geht!\n\n📋 So funktioniert es:\n1. Sie nennen uns die Restschuld\n2. Wir kontaktieren Ihre Bank\n3. Wir lösen die Finanzierung ab\n4. Restbetrag wird verrechnet\n\n💰 Beispiel:\n• Unser Angebot: 10.000€\n• Restschuld: 4.000€\n• Sie erhalten: 6.000€\n\n📞 Benötigt:\n• Kontakt zu Ihrer Bank\n• Restschuldnachweis\n• Fahrzeugbrief (oft bei Bank)\n\n→ Sprechen Sie uns einfach darauf an!'
    },

    // Datenschutz
    datenschutz: {
      keywords: ['daten', 'datenschutz', 'privat', 'sicher', 'weitergabe', 'information'],
      response: '🔒 DATENSCHUTZ & SICHERHEIT\n\n✅ Ihre Daten sind sicher:\n• Vertrauliche Behandlung\n• Nur für Verkaufsabwicklung\n• KEINE Weitergabe an Dritte\n• DSGVO-konform\n\n❌ Wir geben NICHTS weiter an:\n• Werbepartner\n• Drittanbieter\n• Andere Händler\n\n📧 Keine Spam-Mails\n📞 Keine lästigen Anrufe\n\nIhre Privatsphäre ist uns wichtig!'
    },

    // Kontakt
    kontakt: {
      keywords: ['kontakt', 'telefon', 'anruf', 'email', 'erreichen', 'nummer', 'mail', 'frage'],
      response: '📞 SO ERREICHEN SIE UNS\n\n☎️ Telefon:\n0176 30339020\n📅 Mo-Sa: 8:00 - 20:00 Uhr\n📅 So: Nach Vereinbarung\n\n💬 Kontaktformular:\n→ Auf unserer Website\n→ Antwort innerhalb 24h\n\n📧 E-Mail:\n→ Über Kontaktseite\n\n✅ Wir helfen gerne bei:\n• Fragen zur Bewertung\n• Terminvereinbarung\n• Spezifischen Anliegen\n• Beratung\n\nZögern Sie nicht - wir sind für Sie da!'
    },

    // Marken
    marke: {
      keywords: ['bmw', 'mercedes', 'audi', 'vw', 'volkswagen', 'opel', 'ford', 'skoda', 'seat', 'toyota', 'renault', 'peugeot', 'citroen', 'fiat', 'porsche', 'mazda', 'honda', 'nissan', 'hyundai', 'kia', 'volvo', 'mini', 'jeep'],
      response: '🚗 ALLE AUTOMARKEN!\n\nWir kaufen JEDE Marke:\n✅ Deutsche: BMW, Mercedes, Audi, VW, Opel, Porsche...\n✅ Französisch: Renault, Peugeot, Citroen...\n✅ Japanisch: Toyota, Honda, Mazda, Nissan...\n✅ Koreanisch: Hyundai, Kia...\n✅ Amerikanisch: Ford, Jeep, Chevrolet...\n✅ Italienisch: Fiat, Alfa Romeo...\n✅ Alle anderen Marken\n\n💰 Faire Preise für alle!\n\nStarten Sie jetzt die kostenlose Bewertung für Ihre Marke!'
    }
  };

  const findResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Durchsuche Wissensdatenbank
    for (const [key, data] of Object.entries(knowledgeBase)) {
      if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return data.response;
      }
    }

    // Spezielle Muster für Auto-Wert-Anfragen
    if (lowerMessage.match(/wert|preis|wieviel|wie viel|kosten|euro|€|verkaufspreis|autowert/)) {
      return '💰 AUTO-WERT ERMITTELN\n\nUm den genauen Wert Ihres Autos zu erfahren:\n\n👉 Nutzen Sie unsere kostenlose 2-Minuten-Bewertung!\n\nSie brauchen nur:\n• Marke & Modell\n• Baujahr\n• Kilometerstand\n• Grober Zustand\n\n✅ Sofortiges Ergebnis\n✅ 100% kostenlos\n✅ Unverbindlich\n\n→ Klicken Sie unten auf "Jetzt bewerten"!';
    }

    // Verkaufen
    if (lowerMessage.match(/verkauf|verkaufen|loswerden|abgeben|hergeben|will verkaufen/)) {
      return '✅ AUTO VERKAUFEN - In 3 Schritten!\n\n1️⃣ BEWERTEN (2 Min.)\n→ Online-Formular ausfüllen\n\n2️⃣ ANGEBOT (24h)\n→ Faires Angebot erhalten\n\n3️⃣ ABHOLUNG (2-5 Tage)\n→ Wir holen ab & zahlen sofort\n\n🚗 VORTEIL: Sie fahren nirgendwo hin!\n\nStarten Sie jetzt die Bewertung! ⬇️';
    }

    // Begrüßung
    if (lowerMessage.match(/hallo|hi|hey|guten tag|moin|servus|grüß|guten morgen|guten abend/)) {
      return 'Hallo! 👋 Schön, dass Sie da sind!\n\nIch bin Ihr persönlicher Auto-Ankauf-Assistent und helfe Ihnen gerne!\n\n🔍 Häufige Fragen:\n• "Wie viel ist mein Auto wert?"\n• "Wie funktioniert der Ablauf?"\n• "Holen Sie auch ab?"\n• "Welche Dokumente brauche ich?"\n\nEinfach Ihre Frage eingeben! 💬';
    }

    // Dank
    if (lowerMessage.match(/danke|dankeschön|thanks|merci|vielen dank/)) {
      return 'Sehr gerne! 😊\n\nGibt es noch etwas, wobei ich helfen kann?\n\nOder starten Sie direkt:\n👉 Kostenlose Auto-Bewertung unten! ⬇️';
    }

    // Unsicherheit
    if (lowerMessage.match(/weiss nicht|weiß nicht|unsicher|hilfe|unklar/)) {
      return '😊 Kein Problem, ich helfe Ihnen!\n\nAm einfachsten:\n→ Starten Sie die kostenlose Bewertung!\n\nDauert nur 2 Minuten und Sie sehen sofort, was Ihr Auto wert ist!\n\n💡 Oder fragen Sie mich:\n• Wie funktioniert der Prozess?\n• Was kostet mich das?\n• Welche Dokumente brauche ich?\n• Kaufen Sie auch defekte Autos?\n\nIch bin für Sie da! 👍';
    }

    // Ja/Nein Antworten
    if (lowerMessage.match(/^(ja|nein|ok|okay|gut|super|genau|richtig)$/)) {
      return '👍 Verstanden!\n\nWie kann ich Ihnen weiterhelfen?\n\n💡 Vorschläge:\n• Auto bewerten lassen\n• Mehr über den Ablauf erfahren\n• Dokumente-Info\n• Direkt Kontakt aufnehmen\n\nEinfach schreiben oder Button klicken!';
    }

    // Fallback mit erweiterten Vorschlägen
    return '🤔 Entschuldigung, das habe ich nicht verstanden.\n\n💡 Ich kann helfen bei:\n\n🚗 AUTO-BEWERTUNG\n• Fahrzeugwert ermitteln\n• Kostenlose Einschätzung\n\n📋 VERKAUFSPROZESS\n• Wie läuft es ab?\n• Welche Dokumente?\n• Abholung & Zahlung\n\n❓ SPEZIELLE FRAGEN\n• Defekte/beschädigte Autos\n• Ohne TÜV\n• Mit Finanzierung\n\n📞 ODER: Direkt anrufen\n0176 30339020\n\nStellen Sie mir eine Frage! 💬';
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInputValue('');

    setTimeout(() => {
      const botResponse = findResponse(userMessage);
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 600);
  };

  const handleQuickQuestion = (question) => {
    setMessages(prev => [...prev, { type: 'user', text: question }]);
    
    setTimeout(() => {
      const botResponse = findResponse(question);
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 600);
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat öffnen"
      >
        <svg className="chatbot-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        {!isOpen && <span className="chatbot-pulse"></span>}
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </div>
            <div>
              <h3 className="chatbot-title">Auto-Ankauf Support</h3>
              <p className="chatbot-subtitle">Wir antworten sofort</p>
            </div>
          </div>
          <button 
            className="chatbot-close"
            onClick={() => setIsOpen(false)}
            aria-label="Chat schließen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div key={index} className={`chatbot-message ${message.type}`}>
              <div className="chatbot-message-content">
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="chatbot-quick-questions">
            <p className="quick-questions-title">💡 Beliebte Fragen:</p>
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                className="chatbot-quick-btn"
                onClick={() => handleQuickQuestion(question)}
              >
                {question}
              </button>
            ))}
          </div>
        )}

        <form className="chatbot-input-form" onSubmit={handleSend}>
          <input
            type="text"
            className="chatbot-input"
            placeholder="Schreiben Sie Ihre Frage..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="chatbot-send-btn" aria-label="Nachricht senden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>

        <div className="chatbot-footer">
          <Link to="/bewertung" className="chatbot-footer-btn" onClick={() => setIsOpen(false)}>
            🚗 Jetzt bewerten
          </Link>
          <Link to="/kontakt" className="chatbot-footer-link" onClick={() => setIsOpen(false)}>
            Kontakt
          </Link>
          <span>•</span>
          <a href="tel:017630339020" className="chatbot-footer-link">
            📞 0176 30339020
          </a>
        </div>
      </div>
    </>
  );
}

export default Chatbot;
