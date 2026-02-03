import React, { useState, useEffect } from 'react';
import SummaryModal from './SummaryModal';
import vehicleData from '../data/vehicleData.json';
import vehicleOptions from '../data/vehicleOptions.json';
import './VehicleForm.css';

function VehicleForm({ buttonText = 'Jetzt Angebot erhalten', pageTitle = 'Gib deine Fahrzeugdaten ein und erfahre, was dein Auto wert ist.', initialData = {} }) {
  const [formData, setFormData] = useState({
    makeId: initialData.makeId || '',
    modelId: initialData.modelId || '',
    generationId: '',
    serieId: '',
    fuelId: '',
    transmissionId: '',
    year: initialData.year || '',
    mileage: initialData.mileage || '',
    selectedFeatures: [],
    email: initialData.email || '',
    phone: initialData.phone || '',
    price: '',
    images: [],
    acceptedPrivacy: initialData.acceptedPrivacy || false
  });

  const [availableModels, setAvailableModels] = useState([]);
  const [availableGenerations, setAvailableGenerations] = useState([]);
  const [availableSeries, setAvailableSeries] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lade Marken und Optionen
  const makes = vehicleData.makes || [];
  const { fuelTypes, transmissionTypes, features } = vehicleOptions;

  // Initialisiere verfügbare Modelle wenn initialData vorhanden ist
  useEffect(() => {
    if (initialData.makeId) {
      const selectedMake = makes.find(m => m.id === parseInt(initialData.makeId));
      if (selectedMake) {
        setAvailableModels(selectedMake.models || []);
        
        // Wenn auch modelId vorhanden ist, lade Generationen und Serien
        if (initialData.modelId) {
          const selectedModel = selectedMake.models.find(m => m.id === parseInt(initialData.modelId));
          if (selectedModel) {
            setAvailableGenerations(selectedModel.generations || []);
            setAvailableSeries(selectedModel.series || []);
            
            // Lade verfügbare Jahre
            if (selectedModel.generations.length > 0) {
              const allYears = new Set();
              selectedModel.generations.forEach(gen => {
                if (gen.yearBegin && gen.yearEnd) {
                  for (let y = gen.yearEnd; y >= gen.yearBegin; y--) {
                    allYears.add(y);
                  }
                }
              });
              setAvailableYears(Array.from(allYears).sort((a, b) => b - a));
            }
          }
        }
      }
    }
  }, [initialData, makes]);

  // Wenn Marke gewählt wird
  useEffect(() => {
    if (formData.makeId) {
      const selectedMake = makes.find(m => m.id === parseInt(formData.makeId));
      if (selectedMake) {
        setAvailableModels(selectedMake.models || []);
      }
      // Reset abhängige Felder
      setFormData(prev => ({
        ...prev,
        modelId: '',
        generationId: '',
        serieId: '',
        year: ''
      }));
    } else {
      setAvailableModels([]);
    }
  }, [formData.makeId]);

  // Wenn Modell gewählt wird
  useEffect(() => {
    if (formData.modelId && availableModels.length > 0) {
      const selectedModel = availableModels.find(m => m.id === parseInt(formData.modelId));
      if (selectedModel) {
        setAvailableGenerations(selectedModel.generations || []);
        setAvailableSeries(selectedModel.series || []);
      }
      setFormData(prev => ({
        ...prev,
        generationId: '',
        serieId: '',
        year: ''
      }));
    } else {
      setAvailableGenerations([]);
      setAvailableSeries([]);
    }
  }, [formData.modelId, availableModels]);

  // Wenn Generation gewählt wird
  useEffect(() => {
    if (formData.generationId && availableGenerations.length > 0) {
      const selectedGen = availableGenerations.find(
        g => g.id === parseInt(formData.generationId)
      );
      if (selectedGen && selectedGen.yearBegin && selectedGen.yearEnd) {
        const years = [];
        for (let year = selectedGen.yearEnd; year >= selectedGen.yearBegin; year--) {
          years.push(year);
        }
        setAvailableYears(years);
      } else {
        setAvailableYears([]);
      }
    } else {
      setAvailableYears([]);
    }
  }, [formData.generationId, availableGenerations]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFeatureChange = (featureId) => {
    setFormData(prev => {
      const currentFeatures = prev.selectedFeatures || [];
      if (currentFeatures.includes(featureId)) {
        return {
          ...prev,
          selectedFeatures: currentFeatures.filter(id => id !== featureId)
        };
      } else {
        return {
          ...prev,
          selectedFeatures: [...currentFeatures, featureId]
        };
      }
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
        setFormData(prev => ({
          ...prev,
          images: newImages
        }));
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
      formDataToSend.append('features', JSON.stringify(formData.selectedFeatures));
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('price', formData.price);
      
      // Füge Bilder hinzu
      formData.images.forEach((image, index) => {
        if (image && image.file) {
          formDataToSend.append(`image${index + 1}`, image.file);
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

