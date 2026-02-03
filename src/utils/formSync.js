// Formular-Synchronisation über localStorage
const FORM_STORAGE_KEY = 'autoankauf_form_data';

// Felder, die synchronisiert werden sollen
const SYNC_FIELDS = [
  'makeId',
  'modelId',
  'year',
  'mileage',
  'condition',
  'location',
  'email',
  'phone'
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
        dataToSave[field] = newData[field];
      }
    });

    const merged = { ...currentData, ...dataToSave };
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(merged));
  } catch (error) {
    console.error('Fehler beim Speichern der Sync-Daten:', error);
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
