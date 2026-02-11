import React from 'react';
import vehicleOptions from '../data/vehicleOptions.json';
import { X } from 'lucide-react';

function SummaryModal({
  formData,
  selectedMake,
  selectedModel,
  selectedGeneration,
  selectedSerie,
  selectedFuel,
  selectedTransmission,
  onClose,
  onConfirm,
  isSubmitting
}) {
  const { features } = vehicleOptions;
  const selectedFeaturesList = features.filter(f => formData.selectedFeatures?.includes(f.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-dark-lighter w-full max-w-2xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">Zusammenfassung prüfen</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4 text-gray-300">
          <SummaryRow label="Marke" value={selectedMake?.name} />
          <SummaryRow label="Modell" value={selectedModel?.name} />
          {selectedGeneration && <SummaryRow label="Generation" value={selectedGeneration.name} />}
          <SummaryRow label="Karosserieform" value={selectedSerie?.name} />
          <SummaryRow label="Kraftstoff" value={selectedFuel?.name} />
          <SummaryRow label="Getriebe" value={selectedTransmission?.name} />
          <SummaryRow label="Erstzulassung" value={formData.year} />
          <SummaryRow label="Kilometerstand" value={formData.mileage} />
          
          {formData.condition && (
            <SummaryRow label="Zustand" value={
              formData.condition === 'excellent' ? 'Sehr gut' :
              formData.condition === 'good' ? 'Gut' :
              formData.condition === 'fair' ? 'Befriedigend' : 'Ausreichend'
            } />
          )}
          
          <SummaryRow label="Standort" value={formData.location} />
          
          {selectedFeaturesList.length > 0 && (
            <div className="flex flex-col gap-1 py-2 border-b border-white/5">
              <span className="font-semibold text-white">Ausstattung</span>
              <div className="flex flex-wrap gap-2">
                {selectedFeaturesList.map(f => (
                  <span key={f.id} className="px-2 py-1 bg-white/5 rounded text-sm border border-white/10">
                    {f.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <SummaryRow label="E-Mail" value={formData.email} />
          <SummaryRow label="Telefon" value={formData.phone} />
          <SummaryRow label="Preisvorstellung" value={`${formData.price} €`} />
          
          <SummaryRow label="Bilder" value={`${formData.images.filter(img => img).length} hochgeladen`} />
        </div>

        <div className="p-6 bg-dark border-t border-white/10 flex justify-end gap-4">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 py-2 rounded-lg hover:bg-white/10 transition-colors text-white disabled:opacity-50"
          >
            Korrigieren
          </button>
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="px-6 py-2 bg-primary hover:bg-primary-hover rounded-lg text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Senden...
              </>
            ) : (
              'Absenden'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
      <span className="font-medium text-gray-400">{label}</span>
      <span className="font-semibold text-white text-right">{value}</span>
    </div>
  );
}

export default SummaryModal;
