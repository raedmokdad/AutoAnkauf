# Installationsanleitung für neuen Rechner

## Was muss installiert werden?

### 1. Node.js installieren
- **Download:** https://nodejs.org/
- **Version:** 18 oder höher (empfohlen: LTS Version)
- Nach der Installation im Terminal prüfen:
  ```bash
  node --version
  npm --version
  ```

### 2. Projekt auf neuen Rechner kopieren
- Den gesamten Projektordner `AutohandelSeite` kopieren
- Per USB-Stick, Cloud-Speicher oder Git übertragen

### 3. In den Projektordner navigieren
**Wichtig:** Sie müssen sich im Hauptverzeichnis des Projekts befinden!

**Windows (PowerShell):**
```powershell
cd C:\Pfad\zum\AutohandelSeite
```

**Oder im Windows Explorer:**
1. Öffnen Sie den Projektordner `AutohandelSeite` im Windows Explorer
2. Rechtsklick im Ordner → "PowerShell hier öffnen" oder "Terminal hier öffnen"

**Prüfen ob Sie im richtigen Ordner sind:**
```bash
# Sollte die Datei "package.json" anzeigen:
dir package.json

# Oder in PowerShell:
ls package.json
```

Wenn Sie `package.json` sehen, sind Sie im richtigen Ordner! ✅

### 4. Abhängigkeiten installieren
Jetzt im Terminal/PowerShell ausführen:
```bash
npm install
```
Dies installiert automatisch alle benötigten Pakete (React, Vite, etc.)

### 5. CSV-Dateien konvertieren (falls noch nicht geschehen)
```bash
npm run convert-csv
```

### 6. Entwicklungsserver starten
```bash
npm run dev
```
Die Website läuft dann auf `http://localhost:5173` (oder einem anderen Port, der in der Konsole angezeigt wird)

## Zusammenfassung - Schnellstart

```bash
# 1. Node.js installieren (von nodejs.org)

# 2. Projektordner öffnen im Terminal
#    Windows: Rechtsklick im Ordner → "Terminal hier öffnen"
#    Oder: cd C:\Pfad\zum\AutohandelSeite

# 3. Prüfen ob Sie im richtigen Ordner sind:
dir package.json  # Sollte die Datei anzeigen

# 4. Abhängigkeiten installieren
npm install

# 5. CSV konvertieren (optional)
npm run convert-csv

# 6. Server starten
npm run dev
```

## Was wird automatisch installiert?

- **React** - Frontend Framework
- **Vite** - Entwicklungsserver und Build-Tool
- **React Router** - für Navigation
- **React Helmet** - für SEO
- **Nodemailer** - für E-Mail-Funktionalität

Alle diese Pakete werden automatisch durch `npm install` installiert.

## Probleme?

- **"npm: command not found"** → Node.js ist nicht installiert oder nicht im PATH
- **"EACCES" Fehler** → Administratorrechte benötigt oder npm Cache löschen
- **Port bereits belegt** → Vite wählt automatisch einen anderen Port

