# Datenbank-Setup für Angebotsverwaltung

## Aktueller Status

**❌ Angebote werden aktuell NICHT gespeichert**
- Nur E-Mail-Versand
- Keine Übersicht über Angebote
- Keine Historie
- Daten gehen verloren bei gelöschten E-Mails

## Lösung: Datenbank implementieren

### Schritt 1: Datenbank erstellen

1. MySQL/MariaDB installieren (falls nicht vorhanden)
2. Datenbank erstellen:
   ```bash
   mysql -u root -p < backend/database.sql
   ```
   Oder manuell in phpMyAdmin die Datei `backend/database.sql` importieren

### Schritt 2: Backend-Dateien anpassen

**Option A: Mit Datenbank (empfohlen)**
- Verwende `bewertung_with_db.php` statt `bewertung.php`
- Passe Datenbank-Zugangsdaten an (Zeilen 12-15)

**Option B: Ohne Datenbank (aktuell)**
- Weiterhin `bewertung.php` verwenden
- Nur E-Mail-Versand, keine Speicherung

### Schritt 3: Angebot erstellen

Nach der Bewertung kann der Mitarbeiter ein Angebot erstellen:

**Manuell:**
- Link generieren mit URL-Parametern (siehe `ANGEBOT_LINK_GENERATOR.md`)

**Mit Datenbank:**
- POST-Request an `create_angebot.php` senden
- Erhält automatisch einen Link zurück

### Schritt 4: Admin-Panel (optional)

Für die Zukunft könnte ein Admin-Panel erstellt werden:
- Übersicht aller Bewertungen
- Status-Verwaltung (pending, completed, etc.)
- Angebote erstellen und verwalten
- Statistiken

## Datenbank-Struktur

### Tabelle: `bewertungen`
Speichert alle Bewertungsanfragen:
- Fahrzeugdetails
- Kontaktdaten
- Status (pending, in_progress, completed, cancelled)
- Zeitstempel

### Tabelle: `angebote`
Speichert alle erstellten Angebote:
- Verknüpfung zur Bewertung
- Preis
- Link zum Angebot
- Status (sent, viewed, accepted, rejected, expired)
- Ablaufdatum

### Tabelle: `verkaufsangebote`
Speichert Verkaufsangebote von AnkaufPage:
- Ähnlich wie bewertungen
- Zusätzlich Preisvorstellung

## Vorteile der Datenbank-Lösung

✅ **Übersicht**: Alle Angebote an einem Ort
✅ **Suche**: Nach Kunde, Fahrzeug, Datum suchen
✅ **Historie**: Alle Anfragen bleiben erhalten
✅ **Statistiken**: Erfolgsrate, durchschnittliche Preise, etc.
✅ **Tracking**: Sehen, ob Angebot geöffnet wurde
✅ **Automatisierung**: Link-Generierung, E-Mail-Versand

## Nächste Schritte

1. **Datenbank einrichten** (siehe Schritt 1)
2. **Backend anpassen** (siehe Schritt 2)
3. **Frontend anpassen**: `BewertungPage.jsx` auf `bewertung_with_db.php` umstellen
4. **Admin-Panel erstellen** (optional, für später)

## Beispiel: Angebot erstellen (mit Datenbank)

```javascript
// Frontend-Code (später implementieren)
const createOffer = async (bewertungId, price) => {
  const response = await fetch('/backend/create_angebot.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      bewertung_id: bewertungId,
      price: price,
      expires_days: 30
    })
  });
  
  const result = await response.json();
  if (result.success) {
    // Link an Kunden senden
    console.log('Angebotslink:', result.link);
  }
};
```
