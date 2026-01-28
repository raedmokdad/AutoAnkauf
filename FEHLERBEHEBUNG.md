# Fehlerbehebung - E-Mail-Test

## Problem: Backend nicht erreichbar

Wenn Sie den Fehler "Failed to fetch" oder "Network Error" erhalten, liegt es daran, dass Vite den `/backend/` Pfad nicht weiterleitet.

### Lösung 1: PHP-Server starten (empfohlen)

1. **Neues Terminal öffnen** und PHP-Server starten:
   ```bash
   cd backend
   php -S localhost:8000
   ```

2. **Vite-Proxy ist bereits konfiguriert** - sollte jetzt funktionieren!

### Lösung 2: Direkter Test ohne Vite

1. **PHP-Server starten**:
   ```bash
   cd backend
   php -S localhost:8000
   ```

2. **Test-Script direkt aufrufen**:
   - Öffnen Sie: `http://localhost:8000/test_email.php`
   - Bearbeiten Sie die E-Mail-Adresse in `test_email.php` Zeile 16

### Lösung 3: CORS-Problem beheben

Falls Sie CORS-Fehler sehen, stellen Sie sicher, dass in `bewertung.php` die Header korrekt gesetzt sind:
```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
```

## Häufige Fehler

### 1. "Failed to fetch" / "Network Error"
- **Ursache**: PHP-Server läuft nicht oder falscher Port
- **Lösung**: PHP-Server auf Port 8000 starten

### 2. "Ungültige E-Mail-Adresse"
- **Ursache**: E-Mail-Format ist falsch
- **Lösung**: Gültige E-Mail-Adresse eingeben (z.B. test@example.com)

### 3. E-Mails kommen nicht an
- **Ursache**: PHP `mail()` Funktion nicht konfiguriert
- **Lösung**: 
  - Auf lokalem Server: SMTP konfigurieren oder Mailtrap verwenden
  - Auf Produktionsserver: Sollte funktionieren

### 4. HTML wird als Text angezeigt
- **Ursache**: Content-Type nicht korrekt
- **Lösung**: Bereits behoben - sollte jetzt HTML rendern

## Test-Schritte

1. ✅ PHP-Server starten: `php -S localhost:8000` (im backend-Ordner)
2. ✅ Vite-Server läuft: `npm run dev` (sollte bereits laufen)
3. ✅ Formular öffnen: `http://localhost:3000/bewertung`
4. ✅ Formular ausfüllen und absenden
5. ✅ E-Mails prüfen

## Debugging

**Browser-Konsole öffnen** (F12) und prüfen:
- Network-Tab: Sieht man den Request zu `/backend/bewertung.php`?
- Console-Tab: Gibt es JavaScript-Fehler?

**PHP-Errors prüfen**:
- PHP-Server zeigt Fehler direkt im Terminal
- Oder `error_log` Datei prüfen
