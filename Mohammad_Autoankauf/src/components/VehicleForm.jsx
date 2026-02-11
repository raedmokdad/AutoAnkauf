import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, ClipboardCheck, Camera, User, Check, ChevronRight, ChevronLeft, Upload } from 'lucide-react';
import SummaryModal from './SummaryModal';
import vehicleData from '../data/vehicleData.json';
import vehicleOptions from '../data/vehicleOptions.json';
import { mergeWithSavedData, saveFormData } from '../utils/formSync';

// Steps definition
const STEPS = [
  { id: 1, title: 'Fahrzeug', icon: Car },
  { id: 2, title: 'Details', icon: ClipboardCheck },
  { id: 3, title: 'Bilder', icon: Camera },
  { id: 4, title: 'Kontakt', icon: User },
];

function VehicleForm({ buttonText = 'Angebot anfordern', pageTitle = 'Fahrzeugbewertung', initialData = {}, formType = 'general' }) {
  // --- LOGIC START (Copied & Adapted) ---
  const mergedData = mergeWithSavedData(initialData);
  const makes = vehicleData.makes || [];
  const { fuelTypes, transmissionTypes, features } = vehicleOptions;

  // Helper functions for options
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

  // State
  const [currentStep, setCurrentStep] = useState(1);
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

  // Handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    };

    if (name === 'makeId') {
      const selectedMake = makes.find(m => m.id === parseInt(value));
      setAvailableModels(selectedMake?.models || []);
      setAvailableGenerations([]);
      setAvailableSeries([]);
      setAvailableYears([]);
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
      newFormData.generationId = '';
      newFormData.serieId = '';
      newFormData.year = '';
    }

    setFormData(newFormData);
    saveFormData(newFormData);
  };

  const handleFeatureChange = (featureId) => {
    setFormData(prev => {
      const currentFeatures = prev.selectedFeatures || [];
      const newFeatures = currentFeatures.includes(featureId)
        ? currentFeatures.filter(id => id !== featureId)
        : [...currentFeatures, featureId];
      
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
        newImages[index] = { file: file, preview: reader.result };
        setFormData(prev => {
          const newData = { ...prev, images: newImages };
          saveFormData(newData);
          return newData;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => setCurrentStep(p => Math.min(p + 1, STEPS.length));
  const prevStep = () => setCurrentStep(p => Math.max(p - 1, 1));

  const isStepValid = (step) => {
    // Basic validation per step
    if (step === 1) return formData.makeId && formData.modelId && formData.year && formData.serieId;
    if (step === 2) return formData.mileage && formData.condition && formData.location && formData.accidentDamage;
    if (step === 3) return true; // Images/Features optional
    if (step === 4) return formData.email && formData.phone && formData.price && formData.acceptedPrivacy;
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'selectedFeatures') formDataToSend.append('features', JSON.stringify(value));
        else if (key === 'images') {
           value.forEach((img, idx) => {
             if (img?.file) formDataToSend.append(`image${idx + 1}`, img.file);
             else if (img?.preview) {
               // Base64 logic omitted for brevity but should be here if localStorage restore is needed
               // For now assuming file object is present or we skip.
               // Re-adding the base64 conversion helper if needed.
             }
           });
        }
        else formDataToSend.append(key, value);
      });
      formDataToSend.append('formType', formType);

       // Re-implementing Base64 to Blob for restored images
       const dataURLtoBlob = (dataurl) => {
        try {
          const arr = dataurl.split(',');
          const mime = arr[0].match(/:(.*?);/)[1];
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) u8arr[n] = bstr.charCodeAt(n);
          return new Blob([u8arr], { type: mime });
        } catch (e) { return null; }
      };

      formData.images.forEach((image, index) => {
        if (image && !image.file && image.preview) {
           const blob = dataURLtoBlob(image.preview);
           if (blob) formDataToSend.append(`image${index + 1}`, blob, `image_${index + 1}.jpg`);
        }
      });


      const response = await fetch('/backend/submit.php', { method: 'POST', body: formDataToSend });
      const result = await response.json();
      
      if (result.success) {
        alert('Anfrage erfolgreich gesendet!');
        setFormData({ ...initialData, images: [], selectedFeatures: [] });
        setShowModal(false);
        setCurrentStep(1);
      } else {
        alert('Fehler: ' + (result.message || 'Unbekannter Fehler'));
      }
    } catch (error) {
      console.error(error);
      alert('Sendefehler.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // UI Components
  const SelectField = ({ label, name, options, disabled, value, required = true }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-400 mb-1">{label} {required && '*'}</label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className="w-full bg-dark-lighter border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none disabled:opacity-50 transition-all"
      >
        <option value="">Bitte wählen</option>
        {options.map(o => (
          <option key={o.id || o} value={o.id || o}>{o.name || o}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Stepper */}
      <div className="flex justify-between mb-8 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -z-10 rounded-full" />
        <div className="absolute top-1/2 left-0 h-1 bg-primary -z-10 rounded-full transition-all duration-500"
             style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }} />
        
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep >= step.id;
          const isCurrent = currentStep === step.id;
          
          return (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive ? 'bg-primary text-white shadow-[0_0_15px_rgba(255,77,0,0.5)]' : 'bg-dark-lighter text-gray-500 border border-white/10'
                } ${isCurrent ? 'scale-110 ring-4 ring-primary/20' : ''}`}
              >
                <Icon size={20} />
              </div>
              <span className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-gray-500'}`}>{step.title}</span>
            </div>
          );
        })}
      </div>

      {/* Form Content */}
      <div className="bg-dark-lighter p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl min-h-[500px] relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Fahrzeugdaten</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <SelectField label="Marke" name="makeId" value={formData.makeId} options={makes} />
                  <SelectField label="Modell" name="modelId" value={formData.modelId} options={availableModels} disabled={!formData.makeId} />
                  <SelectField label="Generation" name="generationId" value={formData.generationId} options={availableGenerations} disabled={!formData.modelId} required={false} />
                  <SelectField label="Karosserieform" name="serieId" value={formData.serieId} options={availableSeries} disabled={!formData.modelId} />
                  <SelectField label="Kraftstoff" name="fuelId" value={formData.fuelId} options={fuelTypes} />
                  <SelectField label="Getriebe" name="transmissionId" value={formData.transmissionId} options={transmissionTypes} />
                  <SelectField label="Erstzulassung" name="year" value={formData.year} options={availableYears} disabled={!formData.generationId && availableYears.length === 0} />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Zustand & Details</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <SelectField label="Kilometerstand" name="mileage" value={formData.mileage} options={[
                    {id: '0-30000', name: 'Bis 30.000 km'},
                    {id: '30001-60000', name: '30.001 - 60.000 km'},
                    {id: '60001-100000', name: '60.001 - 100.000 km'},
                    {id: '100001-150000', name: '100.001 - 150.000 km'},
                    {id: '150001-plus', name: 'Über 150.000 km'}
                  ]} />
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Standort *</label>
                    <input 
                      type="text" name="location" value={formData.location} onChange={handleChange} 
                      className="w-full bg-dark-lighter border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                      placeholder="PLZ oder Ort"
                    />
                  </div>
                  <SelectField label="Zustand" name="condition" value={formData.condition} options={[
                    {id: 'excellent', name: 'Sehr gut (neuwertig)'},
                    {id: 'good', name: 'Gut (gepflegt)'},
                    {id: 'fair', name: 'Befriedigend'},
                    {id: 'poor', name: 'Reparaturbedarf'}
                  ]} />
                  <SelectField label="Unfallschaden" name="accidentDamage" value={formData.accidentDamage} options={[
                    {id: 'none', name: 'Kein Unfallschaden'},
                    {id: 'minor', name: 'Kleiner Schaden (repariert)'},
                    {id: 'major', name: 'Größerer Schaden'},
                    {id: 'total', name: 'Totalschaden'}
                  ]} />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Ausstattung & Bilder</h2>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-white mb-4">Wichtige Ausstattung</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {features.map(f => (
                      <label key={f.id} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                        formData.selectedFeatures.includes(f.id) 
                          ? 'bg-primary/10 border-primary text-primary' 
                          : 'bg-dark border-white/5 text-gray-400 hover:bg-white/5'
                      }`}>
                        <input 
                          type="checkbox" 
                          className="hidden"
                          checked={formData.selectedFeatures.includes(f.id)}
                          onChange={() => handleFeatureChange(f.id)}
                        />
                        <span className="mr-2">{formData.selectedFeatures.includes(f.id) && <Check size={16} />}</span>
                        <span className="text-sm">{f.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Bilder hochladen (Optional)</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[0, 1, 2].map((idx) => (
                      <label key={idx} className="aspect-square rounded-xl border-2 border-dashed border-white/20 hover:border-primary flex flex-col items-center justify-center cursor-pointer bg-white/5 hover:bg-white/10 transition-all overflow-hidden relative group">
                        {formData.images[idx]?.preview ? (
                          <>
                            <img src={formData.images[idx].preview} className="w-full h-full object-cover" alt="Preview" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <span className="text-white text-xs">Ändern</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <Upload className="mb-2 text-gray-400 group-hover:text-primary transition-colors" />
                            <span className="text-xs text-gray-500">Bild {idx+1}</span>
                          </>
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, idx)} />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Kontaktdaten</h2>
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg mb-6">
                  <p className="text-primary-hover text-sm">
                    Fast geschafft! Gib deine Kontaktdaten ein, damit wir dir dein Bewertungsergebnis zusenden können.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">E-Mail *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required 
                      className="w-full bg-dark-lighter border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Telefon *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required 
                      className="w-full bg-dark-lighter border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Preisvorstellung (€) *</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required 
                      className="w-full bg-dark-lighter border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" name="acceptedPrivacy" checked={formData.acceptedPrivacy} onChange={handleChange} className="w-5 h-5 rounded border-gray-600 text-primary focus:ring-primary bg-dark" />
                    <span className="text-sm text-gray-400">
                      Ich akzeptiere die <a href="#" className="text-primary underline">Datenschutzerklärung</a>.
                    </span>
                  </label>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-between">
        <button 
          onClick={prevStep} 
          disabled={currentStep === 1}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
            currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <ChevronLeft size={20} /> Zurück
        </button>

        {currentStep < 4 ? (
          <button 
            onClick={nextStep}
            disabled={!isStepValid(currentStep)}
            className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed rounded-full text-white font-bold shadow-lg shadow-primary/25 transition-all"
          >
            Weiter <ChevronRight size={20} />
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            disabled={!isStepValid(4)}
            className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-full text-white font-bold shadow-lg shadow-green-600/25 transition-all"
          >
            {buttonText} <Check size={20} />
          </button>
        )}
      </div>

      {showModal && (
        <SummaryModal
          formData={formData}
          selectedMake={makes.find(m => m.id === parseInt(formData.makeId))}
          selectedModel={availableModels.find(m => m.id === parseInt(formData.modelId))}
          selectedGeneration={availableGenerations.find(g => g.id === parseInt(formData.generationId))}
          selectedSerie={availableSeries.find(s => s.id === parseInt(formData.serieId))}
          selectedFuel={fuelTypes.find(f => f.id === formData.fuelId)}
          selectedTransmission={transmissionTypes.find(t => t.id === formData.transmissionId)}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}

export default VehicleForm;
