// Formular-Synchronisation über localStorage
const FORM_STORAGE_KEY = 'autoankauf_form_data';

// Felder, die synchronisiert werden sollen
const SYNC_FIELDS = [
  'makeId',
  'modelId',
  'generationId',
  'serieId',
  'fuelId',
  'transmissionId',
  'year',
  'mileage',
  'condition',
  'accidentDamage',
  'selectedFeatures',
  'location',
  'email',
  'phone',
  'images'
];

/**
 * Lädt die gespeicherten Formulardaten
 */
export const getFormData = () => {
  try {
    const data = localStorage.getItem(FORM_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Fehler beim Laden der Sync-Daten:', error);
    return {};
  }
};

/**
 * Speichert ausgewählte Felder der Formulardaten
 */
export const saveFormData = (newData) => {
  try {
    const currentData = getFormData();
    const dataToSave = {};
    
    SYNC_FIELDS.forEach(field => {
      if (newData[field] !== undefined) {
        // Spezialbehandlung für Bilder: Nur Preview speichern, da File-Objekt nicht serialisierbar
        if (field === 'images' && Array.isArray(newData[field])) {
          dataToSave[field] = newData[field].map(img => ({
            preview: img.preview
            // file wird weggelassen
          }));
        } else {
          dataToSave[field] = newData[field];
        }
      }
    });

    const merged = { ...currentData, ...dataToSave };
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(merged));
  } catch (error) {
    // Bei QuotaExceededError (Speicher voll) Bilder weglassen und Rest speichern
    if (error.name === 'QuotaExceededError' || error.message.includes('quota')) {
      console.warn('LocalStorage voll - speichere ohne Bilder');
      try {
        const dataWithoutImages = { ...newData };
        delete dataWithoutImages.images;
        
        // Rekursiver Aufruf ohne Images, aber Vorsicht vor Endlosschleife -> Manuelle Speicherung
        const currentData = getFormData();
        const dataToSave = {};
        SYNC_FIELDS.filter(f => f !== 'images').forEach(field => {
             if (dataWithoutImages[field] !== undefined) {
                 dataToSave[field] = dataWithoutImages[field];
             }
        });
        const merged = { ...currentData, ...dataToSave };
        localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(merged));
      } catch (retryError) {
        console.error('Fehler beim Speichern (Retry):', retryError);
      }
    } else {
      console.error('Fehler beim Speichern der Sync-Daten:', error);
    }
  }
};

/**
 * Kombiniert initiale Daten (z.B. aus Navigation) mit gespeicherten Daten
 * Initiale Daten haben Vorrang, wenn sie existieren
 */
export const mergeWithSavedData = (initialData = {}) => {
  const savedData = getFormData();
  return { ...savedData, ...initialData };
};
