// Exportaciones centralizadas de todos los componentes de pasos
export { WelcomeStep } from './WelcomeStep';
export { PersonalDataStep } from './PersonalDataStep';
export { EmailVerificationStep } from './EmailVerificationStep';
export { PropertyTypeStep } from './PropertyTypeStep';
export { LocationStep } from './LocationStep';
export { BasicInfoStep } from './BasicInfoStep';
export { AmenitiesStep } from './AmenitiesStep';
export { RulesStep } from './RulesStep';
export { PhotosStep } from './PhotosStep';
export { INEStep } from './INEStep';
export { PreviewStep } from './PreviewStep';

// Los siguientes pasos mantienen su implementación original
// ya que están en desarrollo

export const PaymentStep = ({ formData, setFormData }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold mb-6">Cuenta de Pago (en desarrollo)</h2>
    <p className="text-gray-600">
      Este paso se completará próximamente...
    </p>
  </div>
);
