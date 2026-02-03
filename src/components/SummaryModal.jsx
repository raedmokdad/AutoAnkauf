import React from 'react';
import vehicleOptions from '../data/vehicleOptions.json';
import './SummaryModal.css';

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Zusammenfassung</h2>
        <div className="summary-content">
          <div className="summary-row">
            <strong>Marke:</strong>
            <span>{selectedMake?.name || 'Nicht gewählt'}</span>
          </div>
          <div className="summary-row">
            <strong>Modell:</strong>
            <span>{selectedModel?.name || 'Nicht gewählt'}</span>
          </div>
          {selectedGeneration && (
            <div className="summary-row">
              <strong>Generation:</strong>
              <span>{selectedGeneration.name}</span>
            </div>
          )}
          <div className="summary-row">
            <strong>Karosserieform:</strong>
            <span>{selectedSerie?.name || 'Nicht gewählt'}</span>
          </div>
          <div className="summary-row">
            <strong>Kraftstoff:</strong>
            <span>{selectedFuel?.name || 'Nicht gewählt'}</span>
          </div>
          <div className="summary-row">
            <strong>Getriebe:</strong>
            <span>{selectedTransmission?.name || 'Nicht gewählt'}</span>
          </div>
          <div className="summary-row">
            <strong>Erstzulassung:</strong>
            <span>{formData.year || 'Nicht gewählt'}</span>
          </div>
          <div className="summary-row">
            <strong>Kilometerstand:</strong>
            <span>{formData.mileage || 'Nicht gewählt'}</span>
          </div>
          {selectedFeaturesList.length > 0 && (
            <div className="summary-row" style={{ alignItems: 'flex-start' }}>
              <strong>Ausstattung:</strong>
              <span style={{ textAlign: 'right', maxWidth: '60%' }}>
                {selectedFeaturesList.map(f => f.name).join(', ')}
              </span>
            </div>
          )}
          <div className="summary-row">
            <strong>E-Mail:</strong>
            <span>{formData.email}</span>
          </div>
          <div className="summary-row">
            <strong>Telefon:</strong>
            <span>{formData.phone}</span>
          </div>
          <div className="summary-row">
            <strong>Preisvorstellung:</strong>
            <span>{formData.price} €</span>
          </div>
          {formData.images.filter(img => img).length > 0 && (
            <div className="summary-row">
              <strong>Bilder:</strong>
              <span>{formData.images.filter(img => img).length} hochgeladen</span>
            </div>
          )}
        </div>
        <div className="modal-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Zurück
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Wird gesendet...' : 'Angebot anfordern'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SummaryModal;

