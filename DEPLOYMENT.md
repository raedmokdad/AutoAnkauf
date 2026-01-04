# 🚀 Deployment auf Vercel

## Voraussetzungen
- GitHub Account
- Vercel Account (kostenlos mit GitHub anmelden)

## Deployment-Schritte

### 1️⃣ Code zu GitHub pushen
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2️⃣ Vercel Account erstellen
1. Gehe zu https://vercel.com
2. Klicke auf "Sign Up"
3. Wähle "Continue with GitHub"

### 3️⃣ Projekt importieren
1. Nach dem Login klicke auf "Add New Project"
2. Wähle dein GitHub Repository: `raedmokdad/AutoAnkauf`
3. Klicke auf "Import"

### 4️⃣ Umgebungsvariablen setzen
**WICHTIG:** Füge diese Environment Variables hinzu:

- `EMAIL_USER` = `Arzautomobileservice@gmail.com`
- `EMAIL_PASSWORD` = [Dein Gmail App-Passwort]

**Gmail App-Passwort erstellen:**
1. Gehe zu https://myaccount.google.com/security
2. Aktiviere "2-Faktor-Authentifizierung"
3. Gehe zu "App-Passwörter"
4. Wähle "Mail" und "Sonstiges Gerät"
5. Kopiere das generierte Passwort (16 Zeichen)

### 5️⃣ Deploy
1. Klicke auf "Deploy"
2. Warte 2-3 Minuten
3. Fertig! 🎉

## 🌐 Deine URLs

Nach dem Deployment bekommst du:
- **Production:** `https://auto-ankauf.vercel.app` (oder ähnlich)
- **Vorschau:** Bei jedem Commit eine neue Preview-URL

## 🔄 Automatische Updates

Jedes Mal wenn du zu GitHub pushst, deployt Vercel automatisch:
- `main` Branch → Production
- Andere Branches → Preview

## ⚙️ Wichtige Dateien

- `vercel.json` - Vercel Konfiguration
- `api/submit.js` - Serverless Function für Kontaktformular
- `package.json` - Dependencies (inkl. nodemailer)

## 💡 Troubleshooting

**Problem:** Email wird nicht gesendet
- Prüfe ob `EMAIL_USER` und `EMAIL_PASSWORD` richtig gesetzt sind
- Prüfe ob Gmail App-Passwort korrekt ist
- Schaue in Vercel Logs: Deployment → Functions → Logs

**Problem:** 404 Error
- Prüfe ob `vercel.json` korrekt ist
- Prüfe ob Build erfolgreich war

## 📞 Support

Bei Problemen: Vercel Logs anschauen oder mich fragen! 😊

