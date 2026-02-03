// Exportaciones centralizadas de todos los componentes de pasos
export { WelcomeStep } from './WelcomeStep';
export { PersonalDataStep } from './PersonalDataStep';
export { PropertyTypeStep } from './PropertyTypeStep';
export { LocationStep } from './LocationStep';
export { BasicInfoStep } from './BasicInfoStep';
export { AmenitiesStep } from './AmenitiesStep';

// Los siguientes pasos mantienen su implementación original
// ya que están en desarrollo
export const RulesStep = ({ formData, addRule, updateRule, removeRule }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold mb-6">
      Reglas del Establecimiento (en desarrollo)
    </h2>
    <p className="text-gray-600">
      Este paso se completará próximamente...
    </p>
  </div>
);

export const PhotosStep = ({ formData, handleFileUpload, removeFile }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold mb-6">Fotos (en desarrollo)</h2>
    <p className="text-gray-600">
      Este paso se completará próximamente...
    </p>
  </div>
);

export const INEStep = ({ formData, handleFileUpload, removeFile }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold mb-6">
      Verificación INE (en desarrollo)
    </h2>
    <p className="text-gray-600">
      Este paso se completará próximamente...
    </p>
  </div>
);

export const PaymentStep = ({ formData, setFormData }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold mb-6">Cuenta de Pago (en desarrollo)</h2>
    <p className="text-gray-600">
      Este paso se completará próximamente...
    </p>
  </div>
);

export const PreviewStep = ({ formData, handleSubmit }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold mb-6">Vista Previa (en desarrollo)</h2>
    <p className="text-gray-600">
      Este paso se completará próximamente...
    </p>
  </div>
);
