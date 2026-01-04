# Autohandel Website

Professionelle React-basierte Website zum Verkauf von Autos.

## 🚀 Installation

### 1. Node.js installieren
Stelle sicher, dass Node.js (v18 oder höher) installiert ist:
```bash
node --version
```

### 2. Abhängigkeiten installieren
```bash
npm install
```

### 3. CSV-Dateien in JSON konvertieren
```bash
npm run convert-csv
```
Dies erstellt `src/data/vehicleData.json` aus den CSV-Dateien.

### 4. Entwicklungsserver starten
```bash
npm run dev
```
Die App läuft dann auf `http://localhost:3000`

## ⚙️ Konfiguration

### E-Mail-Backend
In `backend/submit.php` die E-Mail-Adresse anpassen:
```php
$toEmail = 'deine-email@example.com'; // ⚠️ HIER ÄNDERN!
```

## 📦 Build für Produktion

```bash
npm run build
```
Dies erstellt einen optimierten Build im `dist`-Ordner.

## 🌐 Deployment

### Option 1: Netlify/Vercel (empfohlen für Frontend)
1. Build erstellen: `npm run build`
2. `dist`-Ordner auf Netlify/Vercel hochladen
3. Backend-Ordner separat auf Server mit PHP hochladen

### Option 2: Standard Webhosting
1. Build erstellen: `npm run build`
2. Inhalt von `dist` auf Server hochladen
3. `backend`-Ordner auf Server hochladen
4. PHP-Script konfigurieren (E-Mail-Adresse anpassen)

## 📁 Projektstruktur

```
AutohandelSeite/
├── package.json
├── vite.config.js
├── public/
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.jsx
│   ├── index.css
│   ├── components/
│   │   ├── VehicleForm.jsx
│   │   ├── VehicleForm.css
│   │   ├── SummaryModal.jsx
│   │   └── SummaryModal.css
│   └── data/
│       └── vehicleData.json (wird generiert)
├── scripts/
│   └── csv-to-json.js
└── backend/
    └── submit.php
```

## 🔧 Technologien

- **React 18** - Frontend Framework
- **Vite** - Build Tool
- **PHP** - Backend für E-Mail-Versand

## 📝 Nächste Schritte

1. ✅ CSV-Dateien konvertieren: `npm run convert-csv`
2. ✅ E-Mail-Adresse in `backend/submit.php` anpassen
3. ✅ Entwicklung starten: `npm run dev`
4. ✅ Testen und anpassen
5. ✅ Build erstellen: `npm run build`
6. ✅ Auf Server deployen

## ⚠️ Wichtige Hinweise

- Die CSV-Dateien müssen im Hauptverzeichnis liegen (`car_model.csv`, `car_serie.csv`, `car_generation.csv`)
- Für Produktion: PHPMailer für besseren E-Mail-Versand mit Anhängen verwenden
- CORS-Einstellungen im PHP-Script anpassen, falls nötig

