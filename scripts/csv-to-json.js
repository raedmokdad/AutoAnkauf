import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CSV Parser
function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = parseCSVLine(lines[0]);
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index]?.replace(/^'|'$/g, '') || '';
        });
        data.push(obj);
    }
    return data;
}

function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === "'" && !inQuotes) {
            inQuotes = true;
        } else if (char === "'" && inQuotes) {
            inQuotes = false;
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);
    return result;
}

// Marken-Mapping (basierend auf bekannten IDs)
const makeNames = {
    1: 'AC', 2: 'Acura', 3: 'Alfa Romeo', 4: 'Alpine', 5: 'AM General',
    6: 'Ariel', 7: 'Asia Motors', 8: 'Asia', 9: 'Aston Martin', 10: 'Audi',
    11: 'Austin', 12: 'Autobianchi', 13: 'BAW', 14: 'BAIC', 15: 'Bentley',
    16: 'Bertone', 17: 'Bitter', 18: 'BMW', 19: 'Borgward', 20: 'Bristol',
    21: 'Brilliance', 22: 'Bristol', 23: 'Bugatti', 24: 'Buick', 25: 'BYD',
    26: 'Cadillac', 27: 'Caterham', 28: 'Chery', 29: 'Chevrolet', 30: 'Chrysler',
    31: 'Citroen', 32: 'Cupra', 33: 'Dacia', 34: 'Daewoo', 35: 'Daihatsu',
    36: 'Daimler', 37: 'DeLorean', 38: 'Dodge', 39: 'Ferrari', 40: 'Fiat',
    41: 'Ford', 42: 'Genesis', 43: 'GMC', 44: 'Great Wall', 45: 'Honda',
    46: 'Hummer', 47: 'Hyundai', 48: 'Infiniti', 49: 'Isuzu', 50: 'IVECO',
    51: 'Jaguar', 52: 'Jeep', 53: 'Kia', 54: 'Koenigsegg', 55: 'Lamborghini',
    56: 'Lancia', 57: 'Land Rover', 58: 'Lexus', 59: 'Lincoln', 60: 'Lotus',
    61: 'Maserati', 62: 'Maybach', 63: 'Mazda', 64: 'McLaren', 65: 'Mercedes-Benz',
    66: 'Mercury', 67: 'MG', 68: 'Mini', 69: 'Mitsubishi', 70: 'Moskwitsch',
    71: 'Nissan', 72: 'Opel', 73: 'Peugeot', 74: 'Piaggio', 75: 'Polestar',
    76: 'Pontiac', 77: 'Porsche', 78: 'RAM', 79: 'Rambler', 80: 'Renault',
    81: 'Rezvani', 82: 'Rolls-Royce', 83: 'Rover', 84: 'Saab', 85: 'Samsung',
    86: 'Saturn', 87: 'SEAT', 88: 'Skoda', 89: 'Smart', 90: 'Subaru',
    91: 'Suzuki', 92: 'Tatra', 93: 'Tesla', 94: 'Toyota', 95: 'Trabant',
    96: 'Vauxhall', 97: 'VAZ (Lada)', 98: 'Volkswagen', 99: 'Volvo', 100: 'Wartburg'
};

// Hauptfunktion
function convertCSVToJSON() {
    console.log('Lade CSV-Dateien...');
    
    // Lade CSV-Dateien
    const modelsCSV = fs.readFileSync(path.join(__dirname, '../car_model.csv'), 'utf-8');
    const seriesCSV = fs.readFileSync(path.join(__dirname, '../car_serie.csv'), 'utf-8');
    const generationsCSV = fs.readFileSync(path.join(__dirname, '../car_generation.csv'), 'utf-8');
    
    console.log('Parse CSV-Dateien...');
    const models = parseCSV(modelsCSV);
    const series = parseCSV(seriesCSV);
    const generations = parseCSV(generationsCSV);
    
    console.log(`Gefunden: ${models.length} Modelle, ${series.length} Serien, ${generations.length} Generationen`);
    
    // Erstelle Datenstruktur
    const makesMap = new Map();
    
    // 1. Erstelle Marken-Liste
    models.forEach(model => {
        const makeId = parseInt(model.id_car_make);
        if (!makesMap.has(makeId)) {
            makesMap.set(makeId, {
                id: makeId,
                name: makeNames[makeId] || `Marke ${makeId}`,
                models: []
            });
        }
    });
    
    // 2. Gruppiere Modelle nach Marken
    models.forEach(model => {
        const makeId = parseInt(model.id_car_make);
        const modelId = parseInt(model.id_car_model);
        const make = makesMap.get(makeId);
        
        if (make) {
            make.models.push({
                id: modelId,
                name: model.name,
                series: [],
                generations: []
            });
        }
    });
    
    // 3. Füge Generationen zu Modellen hinzu
    generations.forEach(gen => {
        const modelId = parseInt(gen.id_car_model);
        const genId = parseInt(gen.id_car_generation);
        
        for (const [makeId, make] of makesMap) {
            const model = make.models.find(m => m.id === modelId);
            if (model) {
                model.generations.push({
                    id: genId,
                    name: gen.name,
                    yearBegin: gen.year_begin ? parseInt(gen.year_begin) : null,
                    yearEnd: gen.year_end ? parseInt(gen.year_end) : null
                });
            }
        }
    });
    
    // 4. Füge Serien (Karosserieformen) zu Modellen hinzu
    series.forEach(serie => {
        const modelId = parseInt(serie.id_car_model);
        const genId = parseInt(serie.id_car_generation);
        
        for (const [makeId, make] of makesMap) {
            const model = make.models.find(m => m.id === modelId);
            if (model) {
                // Prüfe ob Serie bereits existiert
                const existingSerie = model.series.find(s => s.name === serie.name);
                if (!existingSerie) {
                    model.series.push({
                        id: parseInt(serie.id_car_serie),
                        generationId: genId,
                        name: serie.name
                    });
                }
            }
        }
    });
    
    // 5. Konvertiere Map zu Array und sortiere
    const makesArray = Array.from(makesMap.values())
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(make => ({
            ...make,
            models: make.models.sort((a, b) => a.name.localeCompare(b.name))
        }));
    
    // 6. Erstelle finale Struktur
    const vehicleData = {
        makes: makesArray,
        lastUpdated: new Date().toISOString()
    };
    
    // 7. Speichere JSON
    const outputPath = path.join(__dirname, '../src/data/vehicleData.json');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(vehicleData, null, 2), 'utf-8');
    
    console.log(`✅ JSON-Datei erstellt: ${outputPath}`);
    console.log(`📊 ${makesArray.length} Marken verarbeitet`);
    
    // Statistiken
    let totalModels = 0;
    let totalSeries = 0;
    let totalGenerations = 0;
    makesArray.forEach(make => {
        totalModels += make.models.length;
        make.models.forEach(model => {
            totalSeries += model.series.length;
            totalGenerations += model.generations.length;
        });
    });
    
    console.log(`📈 Statistiken:`);
    console.log(`   - Modelle: ${totalModels}`);
    console.log(`   - Serien: ${totalSeries}`);
    console.log(`   - Generationen: ${totalGenerations}`);
}

// Ausführen
try {
    convertCSVToJSON();
} catch (error) {
    console.error('Fehler:', error);
    process.exit(1);
}

