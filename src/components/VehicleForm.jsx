import React, { useState, useEffect } from 'react';
import SummaryModal from './SummaryModal';
import vehicleData from '../data/vehicleData.json';
import vehicleOptions from '../data/vehicleOptions.json';
import { mergeWithSavedData, saveFormData } from '../utils/formSync';
import './VehicleForm.css';

function VehicleForm({ buttonText = 'Jetzt Angebot erhalten', pageTitle = 'Gib deine Fahrzeugdaten ein und erfahre, was dein Auto wert ist.', initialData = {} }) {
  // 1. Datenvorbereitung und Helper
  const mergedData = mergeWithSavedData(initialData);
  const makes = vehicleData.makes || [];
  const { fuelTypes, transmissionTypes, features } = vehicleOptions;

  const getInitialModels = (makeId) => {
    if (!makeId) return [];
    const make = makes.find(m => m.id === parseInt(makeId));
    return make?.models || [];
  };

  const getInitialGenerations = (makeId, modelId) => {
    if (!makeId || !modelId) return [];
    const make = makes.find(m => m.id === parseInt(makeId));
    const model = make?.models?.find(m => m.id === parseInt(modelId));
    return model?.generations || [];
  };

  const getInitialSeries = (makeId, modelId) => {
    if (!makeId || !modelId) return [];
    const make = makes.find(m => m.id === parseInt(makeId));
    const model = make?.models?.find(m => m.id === parseInt(modelId));
    return model?.series || [];
  };

  const getInitialYears = (makeId, modelId) => {
    if (!makeId || !modelId) return [];
    const make = makes.find(m => m.id === parseInt(makeId));
    const model = make?.models?.find(m => m.id === parseInt(modelId));
    
    if (model?.generations?.length > 0) {
      const allYears = new Set();
      model.generations.forEach(gen => {
        if (gen.yearBegin && gen.yearEnd) {
          for (let y = gen.yearBegin; y <= gen.yearEnd; y++) {
            allYears.add(y);
          }
        }
      });
      return Array.from(allYears).sort((a, b) => b - a);
    }
    return [];
  };
  
  // 2. State Initialisierung
  const [formData, setFormData] = useState({
    makeId: mergedData.makeId || '',
    modelId: mergedData.modelId || '',
    generationId: mergedData.generationId || '',
    serieId: mergedData.serieId || '',
    fuelId: mergedData.fuelId || '',
    transmissionId: mergedData.transmissionId || '',
    year: mergedData.year || '',
    mileage: mergedData.mileage || '',
    condition: mergedData.condition || '',
    location: mergedData.location || '',
    accidentDamage: mergedData.accidentDamage || '',
    selectedFeatures: mergedData.selectedFeatures || [],
    email: mergedData.email || '',
    phone: mergedData.phone || '',
    price: '',
    images: mergedData.images || [],
    acceptedPrivacy: mergedData.acceptedPrivacy || false
  });

  const [availableModels, setAvailableModels] = useState(() => getInitialModels(mergedData.makeId));
  const [availableGenerations, setAvailableGenerations] = useState(() => getInitialGenerations(mergedData.makeId, mergedData.modelId));
  const [availableSeries, setAvailableSeries] = useState(() => getInitialSeries(mergedData.makeId, mergedData.modelId));
  const [availableYears, setAvailableYears] = useState(() => getInitialYears(mergedData.makeId, mergedData.modelId));
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Alte useEffects entfernt (Logik jetzt in useState Init und handleChange)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Erstelle neue Formulardaten
    let newFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    };

    // Abhängigkeiten behandeln und State bereinigen
    if (name === 'makeId') {
      const selectedMake = makes.find(m => m.id === parseInt(value));
      setAvailableModels(selectedMake?.models || []);
      setAvailableGenerations([]);
      setAvailableSeries([]);
      setAvailableYears([]);
      
      // Reset abhängige Felder
      newFormData.modelId = '';
      newFormData.generationId = '';
      newFormData.serieId = '';
      newFormData.year = '';
    }

    if (name === 'modelId') {
      const selectedModel = availableModels.find(m => m.id === parseInt(value));
      if (selectedModel) {
        setAvailableGenerations(selectedModel.generations || []);
        setAvailableSeries(selectedModel.series || []);
        
        // Jahre laden (Logik aus useEffect kopiert/angepasst)
        if (selectedModel.generations?.length > 0) {
          const allYears = new Set();
          selectedModel.generations.forEach(gen => {
            if (gen.yearBegin && gen.yearEnd) {
              for (let y = gen.yearBegin; y <= gen.yearEnd; y++) {
                allYears.add(y);
              }
            }
          });
          setAvailableYears(Array.from(allYears).sort((a, b) => b - a));
        } else {
          setAvailableYears([]);
        }
      } else {
        setAvailableGenerations([]);
        setAvailableSeries([]);
        setAvailableYears([]);
      }
      
      // Reset abhängige Felder
      newFormData.generationId = '';
      newFormData.serieId = '';
      newFormData.year = '';
    }

    setFormData(newFormData);
    
    // Automatisch speichern (jetzt mit bereinigten Daten!)
    saveFormData(newFormData);
  };

  const handleFeatureChange = (featureId) => {
    setFormData(prev => {
      const currentFeatures = prev.selectedFeatures || [];
      let newFeatures;
      
      if (currentFeatures.includes(featureId)) {
        newFeatures = currentFeatures.filter(id => id !== featureId);
      } else {
        newFeatures = [...currentFeatures, featureId];
      }
      
      const newData = { ...prev, selectedFeatures: newFeatures };
      saveFormData(newData);
      return newData;
    });
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...formData.images];
        newImages[index] = {
          file: file,
          preview: reader.result
        };
        setFormData(prev => {
          const newData = {
            ...prev,
            images: newImages
          };
          saveFormData(newData);
          return newData;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('makeId', formData.makeId);
      formDataToSend.append('modelId', formData.modelId);
      formDataToSend.append('generationId', formData.generationId);
      formDataToSend.append('serieId', formData.serieId);
      formDataToSend.append('fuelId', formData.fuelId);
      formDataToSend.append('transmissionId', formData.transmissionId);
      formDataToSend.append('year', formData.year);
      formDataToSend.append('mileage', formData.mileage);
      formDataToSend.append('condition', formData.condition);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('accidentDamage', formData.accidentDamage);
      formDataToSend.append('features', JSON.stringify(formData.selectedFeatures));
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('price', formData.price);
      
      // Helper für Base64 zu Blob Konvertierung
      const dataURLtoBlob = (dataurl) => {
        try {
          const arr = dataurl.split(',');
          const mime = arr[0].match(/:(.*?);/)[1];
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new Blob([u8arr], { type: mime });
        } catch (e) {
          console.error('Fehler bei Bild-Konvertierung:', e);
          return null;
        }
      };

      // Füge Bilder hinzu
      formData.images.forEach((image, index) => {
        if (image) {
          if (image.file) {
            formDataToSend.append(`image${index + 1}`, image.file);
          } else if (image.preview) {
            // Wiederhergestelltes Bild aus localStorage
            const blob = dataURLtoBlob(image.preview);
            if (blob) {
              formDataToSend.append(`image${index + 1}`, blob, `image_${index + 1}.jpg`);
            }
          }
        }
      });

      const response = await fetch('/backend/submit.php', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Vielen Dank! Ihr Angebot wurde erfolgreich übermittelt. Wir melden uns innerhalb von 24 Stunden bei Ihnen.');
        // Reset Formular
        setFormData({
          makeId: '',
          modelId: '',
          generationId: '',
          serieId: '',
          fuelId: '',
          transmissionId: '',
          year: '',
          mileage: '',
          condition: '',
          location: '',
          accidentDamage: '',
          selectedFeatures: [],
          email: '',
          phone: '',
          price: '',
          images: [],
          acceptedPrivacy: false
        });
        setShowModal(false);
      } else {
        alert('Fehler beim Senden: ' + (result.message || 'Unbekannter Fehler'));
      }
    } catch (error) {
      console.error('Fehler:', error);
      alert('Fehler beim Senden der Anfrage. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedMake = makes.find(m => m.id === parseInt(formData.makeId));
  const selectedModel = availableModels.find(m => m.id === parseInt(formData.modelId));
  const selectedGeneration = availableGenerations.find(g => g.id === parseInt(formData.generationId));
  const selectedSerie = availableSeries.find(s => s.id === parseInt(formData.serieId));
  const selectedFuel = fuelTypes.find(f => f.id === formData.fuelId);
  const selectedTransmission = transmissionTypes.find(t => t.id === formData.transmissionId);

  return (
    <div className="vehicle-form-container">
      <form onSubmit={handleSubmit} className="vehicle-form">
        {/* Fahrzeugdetails */}
        <section className="form-section">
          <h2 style={{ marginBottom: '1.5rem' }}>{pageTitle}</h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="makeId">Automarke *</label>
              <select
                id="makeId"
                name="makeId"
                value={formData.makeId}
                onChange={handleChange}
                required
              >
                <option value="">Bitte wählen</option>
                {makes.map(make => (
                  <option key={make.id} value={make.id}>
                    {make.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="modelId">Modell *</label>
              <select
                id="modelId"
                name="modelId"
                value={formData.modelId}
                onChange={handleChange}
                required
                disabled={!formData.makeId}
              >
                <option value="">Bitte zuerst Marke wählen</option>
                {availableModels.map(model => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="generationId">Generation</label>
              <select
                id="generationId"
                name="generationId"
                value={formData.generationId}
                onChange={handleChange}
                disabled={!formData.modelId}
              >
                <option value="">Bitte wählen (optional)</option>
                {availableGenerations.map(gen => (
                  <option key={gen.id} value={gen.id}>
                    {gen.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="serieId">Karosserieform *</label>
              <select
                id="serieId"
                name="serieId"
                value={formData.serieId}
                onChange={handleChange}
                required
                disabled={!formData.modelId}
              >
                <option value="">Bitte wählen</option>
                {availableSeries.map(serie => (
                  <option key={serie.id} value={serie.id}>
                    {serie.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="fuelId">Kraftstoff *</label>
              <select
                id="fuelId"
                name="fuelId"
                value={formData.fuelId}
                onChange={handleChange}
                required
              >
                <option value="">Bitte wählen</option>
                {fuelTypes.map(fuel => (
                  <option key={fuel.id} value={fuel.id}>
                    {fuel.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="transmissionId">Getriebe *</label>
              <select
                id="transmissionId"
                name="transmissionId"
                value={formData.transmissionId}
                onChange={handleChange}
                required
              >
                <option value="">Bitte wählen</option>
                {transmissionTypes.map(transmission => (
                  <option key={transmission.id} value={transmission.id}>
                    {transmission.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="year">Erstzulassung *</label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                disabled={!formData.generationId || availableYears.length === 0}
              >
                <option value="">
                  {formData.generationId && availableYears.length === 0
                    ? 'Keine Daten verfügbar'
                    : 'Bitte wählen'}
                </option>
                {availableYears.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="mileage">Kilometerstand *</label>
              <select
                id="mileage"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                required
              >
                <option value="">Bitte wählen</option>
                <option value="0-30000">Bis 30.000 km</option>
                <option value="30001-60000">30.001 - 60.000 km</option>
                <option value="60001-100000">60.001 - 100.000 km</option>
                <option value="100001-150000">100.001 - 150.000 km</option>
                <option value="150001-plus">Über 150.000 km</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location">Standort *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="z.B. Berlin, 10115"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="condition">Fahrzeugzustand *</label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                required
              >
                <option value="">Bitte wählen</option>
                <option value="excellent">Sehr gut (neuwertig)</option>
                <option value="good">Gut (gepflegt)</option>
                <option value="fair">Befriedigend (Gebrauchsspuren)</option>
                <option value="poor">Ausreichend (Reparaturbedarf)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="accidentDamage">Unfallschaden *</label>
              <select
                id="accidentDamage"
                name="accidentDamage"
                value={formData.accidentDamage}
                onChange={handleChange}
                required
              >
                <option value="">Bitte wählen</option>
                <option value="none">Kein Unfallschaden</option>
                <option value="minor">Kleiner Schaden (repariert)</option>
                <option value="major">Größerer Schaden</option>
                <option value="total">Totalschaden</option>
              </select>
            </div>
          </div>
        </section>

        {/* Ausstattung */}
        <section className="form-section">
          <h2>Ausstattung</h2>
          <div className="features-grid">
            {features && features.map(feature => (
              <label key={feature.id} className="feature-checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.selectedFeatures?.includes(feature.id)}
                  onChange={() => handleFeatureChange(feature.id)}
                />
                <span>{feature.name}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Fahrzeugbilder */}
        <section className="form-section">
          <h2>Fotos hochladen (optional) – sie helfen uns bei der Bewertung.</h2>
          
          <div className="image-upload-container">
            {[0, 1, 2].map(index => (
              <div key={index} className="image-upload-group">
                <label htmlFor={`image${index}`} className="image-upload-label">
                  {formData.images[index]?.preview ? (
                    <img
                      src={formData.images[index].preview}
                      alt={`Vorschau ${index + 1}`}
                      className="image-preview"
                    />
                  ) : (
                    <>
                      <span className="upload-icon">📷</span>
                      <span className="upload-text">Foto {index + 1}</span>
                    </>
                  )}
                  <input
                    type="file"
                    id={`image${index}`}
                    accept="image/*"
                    className="image-input"
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  {formData.images[index]?.file && (
                    <span className="file-name">
                      {formData.images[index].file.name}
                    </span>
                  )}
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* Kontaktdaten für dein Ergebnis */}
        <section className="form-section">
          <h2>Kontaktdaten für dein Ergebnis</h2>
          <div style={{ textAlign: 'left', marginLeft: 0, paddingLeft: 0, marginBottom: '1.5rem', fontSize: '1.0rem', lineHeight: '1.4', display: 'block'}}>
            Wir nutzen deine Kontaktdaten nur, um dir das Ergebnis der Wertermittlung zu senden und bei Rückfragen Kontakt aufzunehmen. Deine Daten werden nicht weitergegeben.
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="email">E-Mail Adresse *</label>
              <div className="input-wrapper">
                <span className="input-icon">✉</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="max@mustermann.de"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefonnummer *</label>
              <div className="input-wrapper">
                <span className="input-icon">📞</span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+49 172 123456789"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="price">Preisvorstellung *</label>
              <div className="input-wrapper">
                <span className="input-icon">€</span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="1024.86"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>
        </section>

        <div className="privacy-checkbox-group">
          <label className="privacy-checkbox-label">
            <input
              type="checkbox"
              name="acceptedPrivacy"
              checked={formData.acceptedPrivacy}
              onChange={handleChange}
              required
            />
            <span>Ich akzeptiere die <a href="/datenschutz" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a> *</span>
          </label>
        </div>

        <button
          type="submit"
          className="submit-btn submit-btn-green"
          disabled={isSubmitting || !formData.acceptedPrivacy}
        >
          {isSubmitting ? 'Wird gesendet...' : buttonText}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="btn-icon">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </form>

      {showModal && (
        <SummaryModal
          formData={formData}
          selectedMake={selectedMake}
          selectedModel={selectedModel}
          selectedGeneration={selectedGeneration}
          selectedSerie={selectedSerie}
          selectedFuel={selectedFuel}
          selectedTransmission={selectedTransmission}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}

export default VehicleForm;

