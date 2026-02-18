import { motion } from "motion/react";
import { useState } from "react";
import {
  CheckCircle2,
  MapPin,
  Home,
  DollarSign,
  FileText,
  Image as ImageIcon,
  Shield,
  Clock,
  Droplet,
  Tent,
  AlertCircle
} from "lucide-react";
import TermsModal from "../../ui/TermsModal";
import PrivacyModal from "../../ui/PrivacyModal";

export const PreviewStep = ({ formData, handleSubmit, isLoading, isINEVerified = false }) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const canSubmit = acceptedTerms && acceptedPrivacy;
  // Obtener tipos de espacio seleccionados
  const propertyTypeLabels = {
    pool: { label: "Alberca", icon: Droplet },
    cabin: { label: "Cabaña", icon: Home },
    camping: { label: "Camping", icon: Tent }
  };

  const selectedTypes = formData.propertyTypes.map(type => propertyTypeLabels[type]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Vista Previa del Registro
        </h2>
        <p className="text-gray-600">
          Revisa que toda la información sea correcta antes de enviar
        </p>
      </div>

      {/* Chip de aviso */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 flex items-start gap-3 mb-6">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-semibold mb-1">Antes de enviar</p>
          <p>Verifica que todos los datos sean correctos. Una vez enviado, tu propiedad entrará en proceso de revisión.</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Tipo de propiedad */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border-2 border-gray-200 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Home className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-gray-900">Tipo de Espacio</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {selectedTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <div
                  key={index}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-lg flex items-center gap-2 font-medium"
                >
                  <Icon className="w-4 h-4" />
                  {type.label}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Información básica */}
        {formData.propertyName && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border-2 border-gray-200 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900">Información Básica</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Nombre del lugar</p>
                <p className="font-medium text-gray-900">{formData.propertyName}</p>
              </div>
              {formData.description && (
                <div>
                  <p className="text-sm text-gray-500">Descripción</p>
                  <p className="text-gray-700 text-sm">{formData.description}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                {formData.checkIn && (
                  <div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" /> Check-In
                    </p>
                    <p className="font-medium text-gray-900">{formData.checkIn}</p>
                  </div>
                )}
                {formData.checkOut && (
                  <div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" /> Check-Out
                    </p>
                    <p className="font-medium text-gray-900">{formData.checkOut}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Ubicación */}
        {formData.street && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border-2 border-gray-200 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900">¿Dónde vas a estar?</h3>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">
                {formData.street} {formData.number}
              </p>
              <p className="text-gray-700">
                {formData.municipality}, {formData.state} - CP {formData.zipCode}
              </p>
            </div>
          </motion.div>
        )}

        {/* Precio */}
        {(formData.priceWeekday || formData.priceWeekend) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border-2 border-gray-200 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900">Precio y detalles</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {formData.priceWeekday && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Lunes - Jueves</p>
                  <p className="text-2xl font-bold text-primary">${formData.priceWeekday}</p>
                  <p className="text-xs text-gray-500">por día</p>
                </div>
              )}
              {formData.priceWeekend && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Viernes - Domingo</p>
                  <p className="text-2xl font-bold text-primary">${formData.priceWeekend}</p>
                  <p className="text-xs text-gray-500">por día</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Reglas */}
        {formData.rules.length > 0 && formData.rules[0] !== '' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl border-2 border-gray-200 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900">Reglas del espacio</h3>
            </div>
            <ul className="space-y-2">
              {formData.rules.filter(rule => rule.trim() !== '').map((rule, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="text-primary mt-1">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Fotos */}
        {formData.photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl border-2 border-gray-200 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900">
                Fotos ({formData.photos.length})
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {formData.photos.map((photo, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Verificación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className={`rounded-xl border-2 p-6 ${isINEVerified ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Shield className={`w-5 h-5 ${isINEVerified ? 'text-green-600' : 'text-amber-600'}`} />
            <h3 className={`text-lg font-semibold ${isINEVerified ? 'text-green-900' : 'text-amber-900'}`}>
              Verificación de Identidad
            </h3>
          </div>
          <p className={`text-sm ${isINEVerified ? 'text-green-700' : 'text-amber-700'}`}>
            {isINEVerified
              ? '✓ Tu identidad ha sido verificada correctamente con Didit'
              : '○ Identidad no verificada. Tu propiedad no será aprobada hasta que completes la verificación. Se te enviará un correo para completarla.'}
          </p>
        </motion.div>
      </div>

      {/* Aceptación de términos y envío */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 pt-8 border-t border-gray-200 space-y-4"
      >
        {/* Checkbox términos y condiciones */}
        <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
          acceptedTerms ? 'border-primary bg-primary/5' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
        }`}>
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-0.5 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/20 accent-[#3CA2A2] shrink-0"
          />
          <span className="text-sm text-gray-700">
            He leído y acepto los{' '}
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); setShowTerms(true); }}
              className="text-primary font-semibold hover:underline"
            >
              Términos y Condiciones
            </button>
          </span>
        </label>

        {/* Checkbox aviso de privacidad */}
        <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
          acceptedPrivacy ? 'border-primary bg-primary/5' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
        }`}>
          <input
            type="checkbox"
            checked={acceptedPrivacy}
            onChange={(e) => setAcceptedPrivacy(e.target.checked)}
            className="mt-0.5 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/20 accent-[#3CA2A2] shrink-0"
          />
          <span className="text-sm text-gray-700">
            He leído y acepto el{' '}
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); setShowPrivacy(true); }}
              className="text-primary font-semibold hover:underline"
            >
              Aviso de Privacidad
            </button>
          </span>
        </label>

        <motion.button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit || isLoading}
          whileHover={{ scale: !canSubmit || isLoading ? 1 : 1.02 }}
          whileTap={{ scale: !canSubmit || isLoading ? 1 : 0.98 }}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              Subiendo imágenes y enviando...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-6 h-6" />
              Enviar Registro
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Modales */}
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </motion.div>
  );
};
