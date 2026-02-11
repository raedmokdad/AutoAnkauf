# 🔐 reCAPTCHA Setup-Anleitung

Die Formulare auf deiner Website sind jetzt mit Google reCAPTCHA v2 geschützt. Um den Schutz zu aktivieren, musst du deine persönlichen reCAPTCHA-Schlüssel konfigurieren.

## ✅ Was wurde implementiert?

- ✨ **VehicleForm.jsx**: reCAPTCHA-Widget wurde hinzugefügt
- 🔒 **submit.php**: Backend-Verifizierung implementiert
- ⚙️ **config.php**: Konfigurationsmöglichkeit vorbereitet

## 📋 Schritt 1: reCAPTCHA-Schlüssel erhalten

1. Gehe zu: **https://www.google.com/recaptcha/admin**

2. Melde dich mit deinem Google-Konto an

3. Klicke auf **"+ Registrieren"** oder **"Submit"**

4. Fülle das Formular aus:
   - **Label**: `ARZ Automobile Website` (oder ein Name deiner Wahl)
   - **reCAPTCHA-Typ**: Wähle **reCAPTCHA v2** → **"Ich bin kein Roboter"-Checkbox**
   - **Domains**: 
     - `localhost` (für lokale Tests)
     - `autoankauf-deutschland.de` (deine Produktions-Domain)
     - `www.autoankauf-deutschland.de` (mit www)
   - **Inhaber**: Deine E-Mail-Adresse
   - Akzeptiere die Nutzungsbedingungen

5. Klicke auf **"Senden"**

6. Du erhältst nun zwei Schlüssel:
   - 🔑 **Site Key** (Öffentlich - für Frontend)
   - 🔒 **Secret Key** (Geheim - für Backend)

## 🛠️ Schritt 2: Site Key konfigurieren (Frontend)

Öffne die Datei: **`src/components/VehicleForm.jsx`**

Suche nach dieser Zeile (ca. Zeile 631):
```jsx
sitekey="DEIN_SITE_KEY_HIER_EINFUEGEN"
```

Ersetze `DEIN_SITE_KEY_HIER_EINFUEGEN` mit deinem **Site Key**:
```jsx
sitekey="6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

**Beispiel:**
```jsx
<ReCAPTCHA
  ref={recaptchaRef}
  sitekey="6LcK8zEqAAAAAHh9aB5xYzP9JN..."
  onChange={handleCaptchaChange}
  onExpired={() => setCaptchaToken(null)}
/>
```

## 🔐 Schritt 3: Secret Key konfigurieren (Backend)

Öffne die Datei: **`backend/config.php`**

Suche nach dieser Zeile:
```php
define('RECAPTCHA_SECRET_KEY', 'DEIN_SECRET_KEY_HIER_EINFUEGEN');
```

Ersetze `DEIN_SECRET_KEY_HIER_EINFUEGEN` mit deinem **Secret Key**:
```php
define('RECAPTCHA_SECRET_KEY', '6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
```

**⚠️ WICHTIG:** Der Secret Key ist vertraulich! Teile ihn niemals öffentlich oder commite ihn nicht in ein öffentliches Git-Repository!

## 🧪 Schritt 4: Testen

### Lokaler Test:

1. Starte deinen Dev-Server:
   ```bash
   npm run dev
   ```

2. Öffne die Website im Browser: `http://localhost:5173/ankauf`

3. Fülle das Formular aus und überprüfe:
   - ✅ reCAPTCHA-Checkbox erscheint über dem Submit-Button
   - ✅ Submit-Button ist erst aktiviert, wenn reCAPTCHA gelöst wurde
   - ✅ Formular wird erfolgreich versendet

### Produktionstest:

Nach dem Deployment auf deinem Server:

1. Besuche: `https://autoankauf-deutschland.de/ankauf`
2. Teste das Formular wie oben beschrieben

## 🔍 Fehlerbehebung

### Problem: "reCAPTCHA-Token fehlt"
**Lösung:** Site Key in VehicleForm.jsx nicht korrekt eingefügt

### Problem: "reCAPTCHA-Verifizierung ungültig"
**Lösung:** 
- Secret Key in config.php prüfen
- Domain in Google reCAPTCHA Admin Console korrekt eingetragen?
- Richtige reCAPTCHA-Version (v2) ausgewählt?

### Problem: reCAPTCHA wird nicht angezeigt
**Lösung:** 
- Browser-Cache leeren und Seite neu laden
- Npm-Paket korrekt installiert? (`npm install react-google-recaptcha`)
- JavaScript-Fehler in der Browser-Konsole prüfen

### Problem: "Invalid domain for site key"
**Lösung:** Domain in Google reCAPTCHA Admin Console unter "Domains" hinzufügen

## 📊 reCAPTCHA Analytics

Du kannst in der Google reCAPTCHA Admin Console Statistiken einsehen:
- Anzahl der Verifizierungen
- Erfolgs-/Fehlerquote
- Verdächtige Aktivitäten

### Zugriff auf Analytics:
1. Gehe zu: https://www.google.com/recaptcha/admin
2. Wähle deine registrierte Website
3. Klicke auf "Analytics"

## 🎨 Darstellung anpassen (Optional)

### Theme ändern:
In `VehicleForm.jsx` kannst du das Theme anpassen:
```jsx
<ReCAPTCHA
  ref={recaptchaRef}
  sitekey="..."
  onChange={handleCaptchaChange}
  theme="dark"  // oder "light" (Standard)
/>
```

### Größe ändern:
```jsx
<ReCAPTCHA
  ref={recaptchaRef}
  sitekey="..."
  onChange={handleCaptchaChange}
  size="compact"  // oder "normal" (Standard)
/>
```

## 📝 Welche Formulare sind geschützt?

✅ **Ankauf-Formular** (`/ankauf`)
✅ **Bewertung Komplett-Formular** (`/bewertung-komplett`)

Beide Formulare nutzen die gleiche `VehicleForm` Komponente, daher sind automatisch beide geschützt.

## 🔗 Weitere Ressourcen

- **Google reCAPTCHA Admin**: https://www.google.com/recaptcha/admin
- **reCAPTCHA Dokumentation**: https://developers.google.com/recaptcha/docs/display
- **React-reCAPTCHA Docs**: https://www.npmjs.com/package/react-google-recaptcha

## ✅ Checkliste

- [ ] Bei Google reCAPTCHA registriert
- [ ] Site Key und Secret Key erhalten
- [ ] Site Key in `src/components/VehicleForm.jsx` eingefügt
- [ ] Secret Key in `backend/config.php` eingefügt
- [ ] Lokal getestet
- [ ] Auf Produktionsserver deployed
- [ ] Produktionstest durchgeführt

---

**Bei Fragen oder Problemen:** Überprüfe zuerst die Fehlermeldungen in der Browser-Konsole (F12) und im PHP-Error-Log auf dem Server.
