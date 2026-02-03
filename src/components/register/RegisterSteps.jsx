// Re-exportaciones de los componentes de pasos del registro
// Este archivo sirve como punto de entrada principal para mantener compatibilidad

export { DataPicker } from "./DataPicker";

// Exportar constantes
export { ESTADOS_MEXICO } from "./constants/states";

// Exportar componentes compartidos
export { SpinnerInput } from "./shared/SpinnerInput";
export { TimePicker } from "./shared/TimePicker";

// Exportar todos los pasos
export {
  WelcomeStep,
  PersonalDataStep,
  PropertyTypeStep,
  LocationStep,
  BasicInfoStep,
  AmenitiesStep,
  RulesStep,
  PhotosStep,
  INEStep,
  PaymentStep,
  PreviewStep,
} from "./steps";
