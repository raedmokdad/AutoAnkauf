# Schneller Test - Schritt für Schritt

## ⚠️ WICHTIG: Zwei Server müssen laufen!

### Schritt 1: PHP-Server starten

**Neues Terminal öffnen** (PowerShell oder CMD):

```bash
cd c:\Users\r.mokdad\OneDrive\Raed\Firma\AutohandelSeite\backend
php -S localhost:8000
```

Sie sollten sehen:
```
PHP 8.x.x Development Server (http://localhost:8000) started
```

**Dieses Terminal offen lassen!**

### Schritt 2: Vite-Server prüfen

**Prüfen Sie, ob Vite läuft:**
- Sollte bereits laufen auf `http://localhost:3000`
- Falls nicht: `npm run dev` im Hauptverzeichnis

### Schritt 3: Testen

1. **Browser öffnen**: `http://localhost:3000/bewertung`
2. **Browser-Konsole öffnen**: Drücken Sie `F12`
3. **Formular ausfüllen**:
   - Marke: BMW
   - Modell: 320d
   - Jahr: 2018
   - Kilometerstand: 60.001 - 100.000 km
   - Zustand: Gut (gepflegt)
   - E-Mail: Ihre Test-E-Mail
   - Telefon: 0176 12345678
4. **Absenden**
5. **Konsole prüfen**: Sehen Sie Fehler? Was steht dort?

### Schritt 4: Direkter PHP-Test (Alternative)

Falls der Proxy nicht funktioniert:

1. **PHP-Server muss laufen** (Schritt 1)
2. **Direkt testen**: `http://localhost:8000/test_email.php`
3. **E-Mail in test_email.php ändern** (Zeile 16)

## Häufige Probleme

### Problem: "Failed to fetch"
- ✅ **Lösung**: PHP-Server läuft nicht → Schritt 1 ausführen

### Problem: "404 Not Found"
- ✅ **Lösung**: PHP-Server läuft im falschen Verzeichnis → `cd backend` dann `php -S localhost:8000`

### Problem: "CORS Error"
- ✅ **Lösung**: Bereits behoben in bewertung.php

### Problem: "PHP nicht gefunden"
- ✅ **Lösung**: PHP installieren oder zu PATH hinzufügen
- Oder: XAMPP/WAMP verwenden

## Debug-Informationen

**In der Browser-Konsole (F12) sollten Sie sehen:**
- `Response: {"success":true,"message":"..."}`
- Falls Fehler: Genau diese Meldung kopieren!

**Im PHP-Server-Terminal sollten Sie sehen:**
- `[200]: POST /backend/bewertung.php`
- Falls Fehler: PHP-Fehlermeldung wird angezeigt
