# Ionos Deployment Anleitung für autohd.de

## Schritt 1: FTP-Zugangsdaten bei Ionos finden

### Wo finde ich meine FTP-Zugangsdaten?

1. **Login bei Ionos:**
   - Gehe zu: https://www.ionos.de
   - Klicke oben rechts auf "Login"
   - Melde dich mit deinen Zugangsdaten an

2. **Hosting-Verwaltung öffnen:**
   - Im Kundenbereich: Klicke auf "Verträge" oder "Produkte"
   - Wähle dein "Webhosting-Paket" oder "Hosting" aus
   - Oder navigiere zu: **Hosting & Domains** → **Webhosting**

3. **FTP-Zugangsdaten anzeigen:**
   - Suche nach "FTP-Zugang" oder "FTP-Verwaltung"
   - Oder gehe zu: **Verwaltung** → **FTP-Zugang**
   - Hier findest du:
     * **FTP-Server/Host:** z.B. `autohd.de` oder `ftp.autohd.de`
     * **Benutzername:** Deine FTP-Benutzer-ID
     * **Passwort:** Falls vergessen, kannst du es hier zurücksetzen

## Schritt 2: FileZilla installieren (kostenloser FTP-Client)

1. Download: https://filezilla-project.org/download.php
2. Installiere FileZilla Client (NICHT Server!)

## Schritt 3: Mit Ionos verbinden

### FileZilla Einstellungen:

- **Host:** `ftp.autohd.de` (oder deine FTP-Adresse)
- **Benutzername:** Dein FTP-Benutzername von Ionos
- **Passwort:** Dein FTP-Passwort
- **Port:** `21` (Standard)

Klicke auf "Verbinden" (Quickconnect)

## Schritt 4: Dateien hochladen

### Was hochladen?

#### A) Website-Dateien (aus dem `dist` Ordner):

**WICHTIG:** Lade ALLE Dateien aus dem `dist` Ordner hoch!

Zielverzeichnis bei Ionos (meist eins davon):
- `/`
- `/html`
- `/public_html`
- `/htdocs`

**Dateien:**
```
dist/
├── index.html
├── .htaccess (wichtig für React Router!)
├── robots.txt
├── sitemap.xml
└── assets/
    ├── index-*.css
    └── index-*.js
```

#### B) Backend PHP-Dateien:

Lade den `backend` Ordner zusätzlich hoch:
```
backend/
├── bewertung.php
├── submit.php
└── test_email.php
```

**Zielpfad:** In dasselbe Verzeichnis wie die Website

#### C) Optional: Images-Ordner

Falls du den `public/images` Ordner hast:
```
images/
└── (alle Bilder)
```

### FileZilla Upload-Vorgang:

1. **Links:** Dein lokaler Computer → Navigiere zu `dist` Ordner
2. **Rechts:** Ionos Server → Navigiere zum Zielverzeichnis (`/` oder `/html`)
3. **Markiere alle Dateien** im `dist` Ordner (links)
4. **Rechtsklick → Upload** oder per Drag & Drop nach rechts ziehen
5. **Warte** bis alle Dateien hochgeladen sind

## Schritt 5: Domain konfigurieren

### Domain auf richtiges Verzeichnis zeigen:

1. **Im Ionos Kundenbereich:**
   - Gehe zu **Domains & SSL** → **Domains**
   - Wähle `autohd.de` aus
   
2. **Zielverzeichnis setzen:**
   - Klicke auf "Verwalten" oder "Einstellungen"
   - Suche "Zielverzeichnis" oder "Document Root"
   - Stelle sicher, dass es auf das richtige Verzeichnis zeigt (wo du die Dateien hochgeladen hast)
   - Meist ist das `/` oder `/html`

3. **SSL-Zertifikat aktivieren:**
   - Falls noch nicht aktiv, aktiviere ein kostenloses SSL-Zertifikat
   - Dadurch wird deine Seite über `https://autohd.de` erreichbar

## Schritt 6: PHP-Konfiguration für E-Mail (Backend)

### E-Mail-Versand bei Ionos:

Ionos unterstützt `mail()` Funktion direkt. Prüfe in deiner `backend/submit.php`:

```php
// Stelle sicher, dass deine E-Mail-Adresse korrekt ist
$to = "deine-email@autohd.de";  // Ändere zu deiner echten E-Mail
```

### Falls E-Mail nicht funktioniert:

1. Im Ionos Kundenbereich: **E-Mail** → **E-Mail-Adressen**
2. Erstelle eine E-Mail wie `kontakt@autohd.de`
3. Verwende diese als Absender in deinen PHP-Dateien

## Schritt 7: Testen

### Nach dem Upload teste:

1. **Website:** https://autohd.de
2. **Alle Seiten durchklicken** (Navigation testen)
3. **Formular testen:** Bewertungsformular ausfüllen und absenden
4. **Prüfe E-Mail-Empfang**

### Häufige Probleme:

**Problem:** 404-Fehler bei Unterseiten (z.B. `/ankauf`)
- **Lösung:** Stelle sicher, dass `.htaccess` hochgeladen wurde

**Problem:** Bilder werden nicht angezeigt
- **Lösung:** Prüfe, ob der `assets` Ordner vollständig hochgeladen wurde

**Problem:** PHP-Fehler
- **Lösung:** Prüfe PHP-Version bei Ionos (sollte PHP 7.4+ sein)

## Schritt 8: Updates in Zukunft

### Bei Änderungen:

1. Lokal Änderungen machen
2. `npm run build` ausführen
3. **NUR geänderte Dateien** per FTP hochladen
4. Cache im Browser leeren und testen

## Backup

**Wichtig:** Sichere regelmäßig:
- Deinen lokalen Code (dieser Ordner)
- Die Dateien auf dem Server (per FTP herunterladen)

---

## Schnell-Checkliste

- [ ] Ionos Login erfolgreich
- [ ] FTP-Zugangsdaten gefunden
- [ ] FileZilla installiert und verbunden
- [ ] Alle Dateien aus `dist` hochgeladen
- [ ] `.htaccess` Datei hochgeladen
- [ ] `backend` Ordner hochgeladen
- [ ] Domain autohd.de auf richtiges Verzeichnis konfiguriert
- [ ] SSL-Zertifikat aktiviert
- [ ] Website unter https://autohd.de erreichbar
- [ ] Navigation funktioniert (alle Seiten)
- [ ] Formular getestet

---

## Support

**Ionos Kundenservice:**
- Telefon: 0721 / 960 9596
- Chat: Im Kundenbereich verfügbar
- Hilfe-Center: https://www.ionos.de/hilfe

**Häufige Fragen:**
- "Wo finde ich meine FTP-Zugangsdaten?"
- "Wie aktiviere ich SSL für meine Domain?"
- "Welches PHP-Version habe ich?"
