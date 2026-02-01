import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Chatbot.css';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hallo! 👋 Ich bin dein Auto-Ankauf-Assistent von AutoHD.\n\nIch helfe dir gerne bei:\n• 🚗 Kostenlose Fahrzeugbewertung\n• 💰 Faire Preisermittlung\n• 🚚 Kostenlose Abholung & Abmeldung\n• 📋 Fragen zu Dokumenten & Ablauf\n\nWie kann ich dir helfen?'
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
      response: '🏢 AutoHD - AutoAnkauf Rheinberg\n\n👨‍💼 Inhaber: Hussein Hajj Sleiman\n📍 Sauerfeldstraße 4, 47495 Rheinberg\n🌍 Service: Rheinberg & Umkreis 100 km\n⭐ Persönlicher Service direkt vom Inhaber\n💎 Faire Preise & transparente Abwicklung\n\nDein zuverlässiger Partner für den Autoankauf in Rheinberg und am gesamten Niederrhein!'
    },
    
    // Verkaufsprozess (4 Schritte)
    prozess: {
      keywords: ['prozess', 'ablauf', 'wie funktioniert', 'schritte', 'vorgang', 'wie läuft', 'verkaufsablauf'],
      response: '✅ 1 . 2 . 3 Dein Geld ist da! Das sind die Schritte:\n\n1️⃣ KOSTENLOSE FAHRZEUGBEWERTUNG\nFülle das Formular in wenigen Minuten aus oder ruf uns an. Wir melden uns zeitnah mit einem fairen Kaufangebot.\n\n2️⃣ TERMIN AN DEINEM WUNSCHORT\nWir vereinbaren einen Termin und schauen uns dein Auto an – bei dir oder bei uns in Rheinberg.\n\n3️⃣ VERKAUF & SOFORTIGE AUSZAHLUNG\nTransparenter Verkauf mit Kaufvertrag. Auszahlung sofort – bar oder per Überweisung.\n\n4️⃣ ABHOLUNG & ABMELDUNG – KOSTENFREI\nAuf Wunsch holen wir dein Auto kostenlos ab (Umkreis 100 km) und kümmern uns um die Abmeldung.\n\nKeine Inserate • Kein Hin- und her • Einfach verkaufen. Fertig.'
    },

    // Bewertung & Preis
    bewertung: {
      keywords: ['bewert', 'schätz', 'einschätz', 'berechnen', 'ermittel', 'preis ermittlung'],
      response: '📊 KOSTENLOSE AUTOBEWERTUNG\n\n✓ Schnell: Wenige Minuten\n✓ Unverbindlich: Ohne Kaufzwang\n✓ Kostenlos: Kompletter Service kostenfrei\n✓ Fair: Marktgerechte Preise\n\n🔍 Wir berücksichtigen:\n• Marke, Modell & Baujahr\n• Kilometerstand\n• Fahrzeugzustand\n• Ausstattung & Sonderausstattung\n• Scheckheftpflege\n• Aktuelle Nachfrage\n\n👉 Jetzt starten: Klick unten auf "Jetzt bewerten"!'
    },

    preisfaktoren: {
      keywords: ['preis berechnung', 'preisfaktoren', 'was beeinflusst', 'preis zusammensetzung', 'bewertungsfaktoren'],
      response: '💰 PREISERMITTLUNG - Diese Faktoren beeinflussen den Preis:\n\n📋 Hauptfaktoren:\n• Alter des Fahrzeugs\n• Kilometerstand\n• Zustand (innen & außen)\n• Scheckheftpflege\n• Ausstattung\n• Aktuelle Marktnachfrage\n• Eventuelle Schäden oder Mängel\n\n⭐ Wertsteigernd:\n• Hochwertige Sonderausstattung (Ledersitze, Schiebedach)\n• Scheckheftgepflegt\n• Unfallfrei\n• Gepflegter Zustand\n\n📉 Wertmindernd:\n• Unfallschäden\n• Hoher Kilometerstand\n• Fehlende Wartungsnachweise\n• Technische Mängel\n\nFaire Bewertung basierend auf aktuellen Marktdaten!'
    },

    // Abholung & Transport
    abholung: {
      keywords: ['abhol', 'komm', 'bring', 'transport', 'liefern', 'hinfahren', 'zu mir', 'vor ort'],
      response: '🚚 KOSTENLOSE ABHOLUNG & ABTRANSPORT!\n\n✅ Unser Service:\n• Wir kommen zu dir (im Umkreis 100 km)\n• 100% kostenlos - keine Anfahrtskosten\n• Flexibler Wunschtermin\n• Auch am Wochenende möglich\n• Nicht verkehrstüchtige Autos werden ebenso kostenfrei abtransportiert\n\n📍 Service-Gebiet:\n• Rheinberg & Umgebung\n• Moers, Wesel, Dinslaken, Duisburg\n• Gesamter Niederrhein\n• Umkreis 100 km rund um Rheinberg\n\n⏱️ Ablauf:\n• Termin vereinbaren\n• Wir kommen zu dir\n• Besichtigung vor Ort\n• Sofortige Auszahlung\n\nMaximale Bequemlichkeit für dich!'
    },

    standort: {
      keywords: ['standort', 'adresse', 'wo seid', 'stadt', 'rheinberg', 'nähe', 'region', 'filiale'],
      response: '📍 AutoHD - AutoAnkauf Rheinberg\n\n🏢 Unser Standort:\nSauerfeldstraße 4\n47495 Rheinberg\n\n🌍 Service-Gebiet:\n• Rheinberg & Umkreis 100 km\n• Moers, Wesel, Dinslaken\n• Duisburg & Umgebung\n• Gesamter Niederrhein\n\n🚚 Kostenlose Abholung:\nIm Umkreis von 100 km rund um Rheinberg holen wir dein Auto kostenlos ab!\n\n✅ Du kannst auch zu uns kommen:\nTermin vereinbaren und direkt zu uns nach Rheinberg kommen.\n\nFester Standort = Persönlicher Ansprechpartner!'
    },

    // Kosten
    kosten: {
      keywords: ['kostenlos', 'gratis', 'umsonst', 'gebühr', 'bezahl', 'kosten', 'geld ausgeben', 'teuer'],
      response: '💯 ALLES 100% KOSTENLOS!\n\n✅ Kostenfrei für dich:\n• Kostenlose Autobewertung\n• Unverbindliches Angebot\n• Besichtigung vor Ort\n• Abholung (Umkreis 100 km)\n• Abtransport (auch nicht verkehrstüchtig)\n• Abmeldung bei der Zulassungsstelle\n• Alle Abmeldegebühren\n• Kaufvertrag & Formalitäten\n\n❌ KEINE:\n• Versteckten Kosten\n• Bearbeitungsgebühren\n• Abholkosten\n• Sonstige Gebühren\n\nDu zahlst NICHTS - wir zahlen DICH! 💰'
    },

    // Dokumente & Unterlagen
    dokumente: {
      keywords: ['dokument', 'papier', 'brief', 'schein', 'unterlagen', 'brauche', 'benötig', 'mitbring', 'papiere'],
      response: '📋 BENÖTIGTE UNTERLAGEN\n\n📱 Für Bewertung:\n→ Nur Fahrzeugdaten (keine Dokumente nötig!)\n\n📄 Bei Verkauf/Übergabe:\n✅ Pflicht:\n• Fahrzeugbrief (Zulassungsbescheinigung Teil II)\n• Fahrzeugschein (Zulassungsbescheinigung Teil I)\n• Alle Fahrzeugschlüssel\n• Gültiger Personalausweis oder Reisepass\n\n📖 Wenn vorhanden (hilfreich):\n• Serviceheft\n• Nachweise der letzten Hauptuntersuchung (HU)\n• Rechnungen/Belege zu Reparaturen\n\n💡 Fehlt ein Dokument? Sprich uns an – wir finden oft eine Lösung!'
    },

    // Zeit & Dauer
    zeit: {
      keywords: ['dauer', 'schnell', 'lange', 'zeit', 'wann', 'termin', 'wartezeit', 'wie lange'],
      response: '⚡ ZEITÜBERSICHT - Schnell & unkompliziert!\n\n1️⃣ Bewertung:\n→ Wenige Minuten Formular ausfüllen\n→ Zeitnahe Rückmeldung (meist innerhalb 24h)\n\n2️⃣ Termin:\n→ Wir finden schnell einen passenden Termin\n→ Auch nach Feierabend & am Wochenende möglich\n\n3️⃣ Besichtigung vor Ort:\n→ Ca. 30-45 Minuten\n→ Wir kommen zu dir oder du zu uns\n\n4️⃣ Auszahlung:\n→ SOFORT nach Vertragsunterzeichnung!\n→ Bar oder per Überweisung (meist 24h)\n\nSchnelligkeit ist uns wichtig - deine Zeit ist wertvoll!'
    },

    // Zahlung & Auszahlung
    zahlung: {
      keywords: ['zahlung', 'auszahl', 'geld', 'bezahl', 'überweis', 'bar', 'wann geld', 'bekomme geld'],
      response: '💰 SOFORT-AUSZAHLUNG!\n\n✅ Nach Vertragsunterzeichnung:\n→ Sofortige Auszahlung\n→ Keine Wartezeit\n\n💵 Zahlungsmethoden:\n• BAR vor Ort\n• Banküberweisung (meist 24h auf deinem Konto)\n• Sofortüberweisung möglich\n\n🔒 Sicher & Zuverlässig:\n• Schriftlicher Kaufvertrag\n• Transparente Abwicklung\n• Keine versteckten Abzüge\n• Fester Ansprechpartner\n\nDu bekommst den vereinbarten Preis - zu 100%!'
    },

    // Fahrzeugzustände
    zustand: {
      keywords: ['defekt', 'kaputt', 'schaden', 'unfall', 'zustand', 'mängel', 'problem', 'motor', 'getriebe'],
      response: '🔧 WIR KAUFEN ALLE FAHRZEUGTYPEN!\n\n✅ Auch bei:\n• ⚙️ Motorschaden\n• 🔩 Getriebeschaden\n• 💥 Unfallschäden / Totalschaden\n• 🚫 Ohne TÜV\n• 🚗 Hoher Laufleistung\n• 📋 Ohne Zulassung\n• 🏚️ Nicht mehr fahrbereite Autos\n• 🚚 Defektautos\n• 🌍 Export-Fahrzeuge\n\n💡 Wichtig:\n→ Bitte Zustand ehrlich angeben!\n→ Wir bewerten fair - auch mit Mängeln\n→ Kostenloser Abtransport (auch nicht verkehrstüchtig)\n\nJedes Fahrzeug hat seinen Wert - auch deins!'
    },

    tuev: {
      keywords: ['tüv', 'tuv', 'hu', 'au', 'hauptuntersuchung', 'abgasuntersuchung', 'plakette'],
      response: '🚫 AUTO OHNE TÜV VERKAUFEN?\n\n✅ Ja, absolut! Wir kaufen auch:\n• Ohne gültigen TÜV\n• Abgelaufene Hauptuntersuchung\n• Durchgefallen bei Prüfung\n\n💡 Ablauf:\n• Zustand ehrlich bei Bewertung angeben\n• Wir erstellen dir ein passendes Angebot\n• Der Ankauf läuft genauso ab\n• Du musst keine teure HU durchführen lassen\n\n📞 Ruf uns an oder nutze die Online-Bewertung!\n\nSelbst ohne TÜV kaufen wir dein Auto - fair & unkompliziert!'
    },

    // Formalitäten
    abmeldung: {
      keywords: ['abmeld', 'ummeld', 'zulassung', 'kennzeichen', 'stilllegung', 'formalitäten'],
      response: '📋 ABMELDUNG & FORMALITÄTEN\n\n✅ WIR kümmern uns um:\n• Fahrzeug-Abmeldung bei der Zulassungsstelle\n• Alle Abmeldegebühren übernehmen wir\n• Ummeldung auf uns\n• Alle Formalitäten\n\n❌ DU musst NICHTS tun!\n\n📄 Wir erstellen:\n• Ordnungsgemäßen Kaufvertrag\n• Übergabeprotokoll\n• Alle nötigen Unterlagen\n\n🔒 Rechtlich sicher:\n• Du bist ab Übergabe raus\n• Keine Haftung mehr\n• Kein Gang zur Zulassungsstelle\n• Kein Papierkram, kein Stress\n\nEntspannt verkaufen - wir regeln alles!'
    },

    kaufvertrag: {
      keywords: ['kaufvertrag', 'vertrag', 'unterschrift', 'rechtlich', 'absicherung'],
      response: '📜 KAUFVERTRAG - Transparent & rechtssicher!\n\n✅ Wir erstellen:\n• Schriftlichen Kaufvertrag\n• Alle wichtigen Punkte enthalten\n• Rechtlich einwandfrei\n• Beide Seiten abgesichert\n\n📋 Inhalt:\n• Fahrzeugdaten\n• Verkäufer & Käufer\n• Kaufpreis\n• Fahrzeugzustand\n• Gewährleistungsausschluss\n• Übergabezeitpunkt\n\n🔒 Deine Sicherheit:\n• Keine Haftung nach Übergabe\n• Klare Regelungen\n• Professionell & seriös\n• Fester Ansprechpartner\n\nAlles transparent & rechtssicher!'
    },

    finanzierung: {
      keywords: ['finanzierung', 'kredit', 'leasing', 'rate', 'bank', 'ablösung', 'restschuld'],
      response: '🏦 AUTO MIT FINANZIERUNG VERKAUFEN\n\n✅ Ja, wir kaufen auch finanzierte Fahrzeuge!\n\n📋 So funktioniert es:\n1. Wir kümmern uns um die Ablösung\n2. Wickeln alles direkt mit deiner Bank ab\n3. Nach Abzug der Restschuld wird der Restbetrag an dich ausgezahlt\n\n💰 Beispiel:\n• Unser Angebot: 10.000€\n• Restschuld: 4.000€\n• Du erhältst: 6.000€\n\n📞 Benötigt:\n• Unterlagen deiner Finanzierungsbank\n• Restschuldnachweis\n• Fahrzeugbrief (oft bei der Bank)\n\n✅ Dieser Service ist für dich kostenlos!\n\n→ Sprich uns einfach darauf an!'
    },

    // Datenschutz
    datenschutz: {
      keywords: ['daten', 'datenschutz', 'privat', 'sicher', 'weitergabe', 'information'],
      response: '🔒 DATENSCHUTZ & SICHERHEIT\n\n✅ Ihre Daten sind sicher:\n• Vertrauliche Behandlung\n• Nur für Verkaufsabwicklung\n• KEINE Weitergabe an Dritte\n• DSGVO-konform\n\n❌ Wir geben NICHTS weiter an:\n• Werbepartner\n• Drittanbieter\n• Andere Händler\n\n📧 Keine Spam-Mails\n📞 Keine lästigen Anrufe\n\nIhre Privatsphäre ist uns wichtig!'
    },

    // Kontakt
    kontakt: {
      keywords: ['kontakt', 'telefon', 'anruf', 'email', 'erreichen', 'nummer', 'mail', 'frage', 'whatsapp'],
      response: '📞 SO ERREICHST DU UNS\n\n☎️ Telefon:\n0176 30339020\n📅 Mo–Fr: 9–18 Uhr\n📅 Auch samstags erreichbar\n\n📧 E-Mail:\ninfo@autohd.de\n\n💬 WhatsApp:\n0176 30339020\n\n📍 Adresse:\nAutoHD - AutoAnkauf Rheinberg\nSauerfeldstraße 4\n47495 Rheinberg\n\n✅ Wir helfen gerne bei:\n• Fragen zur Bewertung\n• Terminvereinbarung\n• Beratung\n• Spezifischen Anliegen\n\nDirekt vom Inhaber - persönlich & kompetent!'
    },

    // Marken & Fahrzeugtypen
    marke: {
      keywords: ['bmw', 'mercedes', 'audi', 'vw', 'volkswagen', 'opel', 'ford', 'skoda', 'seat', 'toyota', 'renault', 'peugeot', 'citroen', 'fiat', 'porsche', 'mazda', 'honda', 'nissan', 'hyundai', 'kia', 'volvo', 'mini', 'jeep', 'transporter', 'kleinbus'],
      response: '🚗 ALLE FAHRZEUGTYPEN!\n\nWir kaufen viele Fahrzeugtypen an:\n✅ Pkw aller Marken\n✅ SUV\n✅ Transporter\n✅ Kleinbusse\n\n🔧 Auch mit:\n• Unfallschaden\n• Hoher Laufleistung\n• Motorschaden/Getriebeschaden\n• Ohne TÜV\n\n💰 Faire Angebote für alle!\n\nSprich uns einfach an – wir sagen dir schnell, was möglich ist!\n\nJetzt kostenlose Bewertung starten!'
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
