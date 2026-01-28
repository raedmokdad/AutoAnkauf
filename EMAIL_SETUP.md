# E-Mail-Versand Setup - Was wird benötigt?

## Aktueller Status

Das System verwendet PHP's `mail()` Funktion, die **nicht auf allen Servern funktioniert**.

## Option 1: PHP `mail()` Funktion (aktuell verwendet)

### Was wird benötigt:

**Auf dem Server:**
- PHP muss installiert sein
- `mail()` Funktion muss aktiviert sein
- SMTP-Server muss konfiguriert sein (meist über `php.ini`)

**Problem:**
- Auf vielen Shared-Hosting-Servern funktioniert `mail()` nicht zuverlässig
- E-Mails landen oft im Spam
- Keine Anhänge möglich
- Keine Fehlerbehandlung

### Prüfen ob `mail()` funktioniert:

```php
<?php
if (function_exists('mail')) {
    echo "mail() Funktion ist verfügbar";
} else {
    echo "mail() Funktion ist NICHT verfügbar";
}
?>
```

---

## Option 2: PHPMailer (EMPFOHLEN für Produktion)

### Vorteile:
✅ Funktioniert auf fast allen Servern
✅ SMTP-Authentifizierung möglich
✅ Anhänge möglich
✅ Bessere Fehlerbehandlung
✅ Weniger Spam-Probleme

### Installation:

1. **PHPMailer herunterladen:**
   ```bash
   composer require phpmailer/phpmailer
   ```
   Oder manuell: https://github.com/PHPMailer/PHPMailer

2. **SMTP-Zugangsdaten benötigt:**
   - SMTP-Server (z.B. smtp.gmail.com, smtp.1und1.de)
   - SMTP-Port (meist 587 oder 465)
   - Benutzername (E-Mail-Adresse)
   - Passwort (oder App-Passwort bei Gmail)

### Beispiel-Konfiguration:

**Gmail:**
- SMTP-Server: `smtp.gmail.com`
- Port: `587` (TLS) oder `465` (SSL)
- Benutzername: Ihre Gmail-Adresse
- Passwort: App-Passwort (nicht normales Passwort!)

**1&1 / IONOS:**
- SMTP-Server: `smtp.ionos.de`
- Port: `587`
- Benutzername: Ihre E-Mail-Adresse
- Passwort: Ihr E-Mail-Passwort

**Andere Provider:**
- Meist in den E-Mail-Einstellungen zu finden

---

## Option 3: E-Mail-Service (Einfachste Lösung)

### Services wie:
- **SendGrid** (kostenlos bis 100 E-Mails/Tag)
- **Mailgun** (kostenlos bis 5.000 E-Mails/Monat)
- **Amazon SES** (sehr günstig)
- **Postmark** (für Transaktions-E-Mails)

### Vorteile:
✅ Sehr einfach zu integrieren
✅ Hohe Zustellrate
✅ Keine Server-Konfiguration nötig
✅ Analytics & Tracking
✅ Automatisches Spam-Management

### Nachteil:
- Meist kostenpflichtig (aber sehr günstig)
- Abhängigkeit von externem Service

---

## Option 4: Form-Services (No-Code Lösung)

### Services wie:
- **Formspree** (kostenlos bis 50 Submissions/Monat)
- **Getform** (kostenlos bis 50 Submissions/Monat)
- **Web3Forms** (kostenlos)

### Vorteile:
✅ Kein Backend nötig
✅ Sehr einfach
✅ Automatischer Spam-Schutz

### Nachteil:
- Externe Abhängigkeit
- Begrenzte Anpassungsmöglichkeiten

---

## Empfehlung für Ihr Projekt

### Für lokales Testen:
- **Mailtrap.io** verwenden (kostenlos)
- Simuliert E-Mail-Versand
- Zeigt alle E-Mails im Browser

### Für Produktion:

**Option A: PHPMailer mit SMTP** (empfohlen)
- Funktioniert zuverlässig
- Nutzt Ihre bestehende E-Mail-Adresse
- Keine zusätzlichen Kosten

**Option B: E-Mail-Service** (einfachste Lösung)
- SendGrid oder Mailgun
- Sehr zuverlässig
- Geringe Kosten

---

## Nächste Schritte

Welche Option möchten Sie verwenden?

1. **PHPMailer einrichten** - Ich kann das Backend anpassen
2. **E-Mail-Service integrieren** - Ich kann SendGrid/Mailgun einrichten
3. **Form-Service verwenden** - Ich kann Formspree integrieren
4. **Aktuelles System testen** - Prüfen ob `mail()` auf Ihrem Server funktioniert
