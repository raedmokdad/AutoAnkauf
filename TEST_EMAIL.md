# E-Mail-Test Anleitung

## Option 1: Test über Browser (empfohlen)

1. **PHP-Server starten** (falls noch nicht gestartet):
   ```bash
   cd backend
   php -S localhost:8000
   ```
   Oder wenn Sie XAMPP/WAMP verwenden, stellen Sie sicher, dass Apache läuft.

2. **Test-Script aufrufen**:
   - Öffnen Sie: `http://localhost:8000/test_email.php`
   - Oder: `http://localhost/backend/test_email.php` (wenn Sie XAMPP/WAMP verwenden)

3. **E-Mail-Adresse anpassen**:
   - Öffnen Sie `backend/test_email.php`
   - Ändern Sie Zeile 15: `$_POST['email'] = 'IHRE-TEST-EMAIL@example.com';`
   - Speichern und Seite neu laden

4. **E-Mails prüfen**:
   - Mitarbeiter-E-Mail: `Arzautomobileservice@gmail.com`
   - Kunden-E-Mail: Die E-Mail, die Sie in Zeile 15 eingegeben haben

## Option 2: Test über das Formular

1. **Entwicklungsserver starten**:
   ```bash
   npm run dev
   ```

2. **Website öffnen**:
   - Öffnen Sie: `http://localhost:3000/bewertung`

3. **Formular ausfüllen**:
   - Marke: z.B. BMW
   - Modell: z.B. 320d
   - Jahr: z.B. 2018
   - Kilometerstand: z.B. 60.001 - 100.000 km
   - Zustand: z.B. Gut (gepflegt)
   - E-Mail: Ihre Test-E-Mail-Adresse
   - Telefon: z.B. 0176 12345678

4. **Absenden** und E-Mails prüfen

## Option 3: Test mit cURL (für Entwickler)

```bash
curl -X POST http://localhost:8000/backend/bewertung.php \
  -d "makeId=5" \
  -d "makeName=BMW" \
  -d "modelId=123" \
  -d "modelName=320d" \
  -d "year=2018" \
  -d "mileage=60001-100000" \
  -d "condition=good" \
  -d "email=test@example.com" \
  -d "phone=017612345678"
```

## Wichtige Hinweise

⚠️ **E-Mail-Versand funktioniert nur, wenn:**
- PHP `mail()` Funktion konfiguriert ist
- Auf lokalem Server: SMTP-Server konfiguriert sein muss
- Auf Produktionsserver: E-Mail-Versand sollte funktionieren

📧 **Für lokales Testen ohne SMTP:**
- Verwenden Sie Mailtrap.io oder ähnliche Dienste
- Oder testen Sie direkt auf dem Produktionsserver

## Troubleshooting

**Problem: E-Mails kommen nicht an**
- Prüfen Sie Spam-Ordner
- Prüfen Sie PHP-Error-Log
- Stellen Sie sicher, dass `mail()` Funktion aktiviert ist: `php -m | grep mail`
- Für lokales Testen: SMTP konfigurieren oder Mailtrap verwenden

**Problem: HTML wird als Text angezeigt**
- Prüfen Sie, ob `Content-Type: text/html` gesetzt ist
- Moderne E-Mail-Clients sollten HTML automatisch rendern
