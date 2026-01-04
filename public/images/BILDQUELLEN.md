# 📸 Bildquellen & Lizenzen

## Verwendete Stock-Fotos (Unsplash)

Alle Bilder sind von **Unsplash.com** und unter der **Unsplash-Lizenz** frei nutzbar (auch kommerziell).

### Hero-Images Hauptseiten:

1. **HomePage** (`https://images.unsplash.com/photo-1552519507-da3b142c6e3d`)
   - Beschreibung: Moderne Autos in Showroom
   - Keywords: Auto, Showroom, modern, Verkauf

2. **Bewertung** (`https://images.unsplash.com/photo-1580273916550-e323be2ae537`)
   - Beschreibung: Auto-Dashboard und Innenraum
   - Keywords: Auto bewerten, Dashboard, Innenraum

3. **Ankauf** (`https://images.unsplash.com/photo-1619642751034-765dfdf7c58e`)
   - Beschreibung: Handschlag, Autoübergabe
   - Keywords: Autoankauf, Verkauf, Übergabe

4. **Über Uns** (`https://images.unsplash.com/photo-1486262715619-67b85e0b08d3`)
   - Beschreibung: Professionelles Büro-Setting
   - Keywords: Unternehmen, Büro, professionell

5. **FAQ** (`https://images.unsplash.com/photo-1450101499163-c8848c66ca85`)
   - Beschreibung: Business-Meeting, Beratung
   - Keywords: Fragen, Beratung, Hilfe

6. **Kontakt** (`https://images.unsplash.com/photo-1423666639041-f56000c27a9a`)
   - Beschreibung: Smartphone, Kommunikation
   - Keywords: Kontakt, Telefon, Kommunikation

### Hero-Images ContentPages (Marken & Ratgeber):

7. **ContentPage** (allgemein) (`https://images.unsplash.com/photo-1492144534655-ae79c964c9d7`)
   - Beschreibung: Sportauto auf Straße
   - Keywords: Auto, Fahrzeug, Straße, modern

---

## SEO-Optimierung

Alle Bilder sind optimiert mit:
- ✅ **Kompression**: `?w=1920&q=80` Parameter
- ✅ **Responsive**: Automatisches Cropping via `&fit=crop`
- ✅ **Format**: WebP wird automatisch von Unsplash ausgeliefert
- ✅ **Ladezeit**: Background-Images mit CSS, kein <img>-Tag
- ✅ **Alt-Texte**: In Komponenten implementiert

---

## Eigene Bilder ersetzen

Um eigene Bilder zu verwenden:

1. Bilder in `/public/images/heroes/` hochladen
2. CSS-Dateien anpassen:
   ```css
   background: 
     linear-gradient(...),
     url('/images/heroes/eigenes-bild.jpg') center/cover no-repeat;
   ```

### Empfohlene Bildgrößen:
- **Breite**: 1920px
- **Höhe**: 800-1200px
- **Format**: WebP oder JPG
- **Dateigröße**: Max. 150 KB (komprimiert)
- **Kompression**: https://tinypng.com oder https://squoosh.app

---

## Lizenz

**Unsplash-Lizenz**: https://unsplash.com/license
- ✅ Kostenlose Nutzung
- ✅ Kommerzielle Nutzung erlaubt
- ✅ Keine Namensnennung erforderlich (aber empfohlen)
- ✅ Keine Erlaubnis erforderlich

