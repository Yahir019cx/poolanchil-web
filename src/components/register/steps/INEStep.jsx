import { motion } from "motion/react";
import { Shield, CreditCard, CheckCircle2, AlertCircle, ExternalLink, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const INEStep = ({ onComplete, onVerificationStatusChange, onSkipVerificationChange, verifyLater = false }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationUrl, setVerificationUrl] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(null);
  const [popupBlocked, setPopupBlocked] = useState(false);
  const pollingIntervalRef = useRef(null);
  const timeoutRef = useRef(null);

  // Notificar al padre cuando cambie el estado de verificación
  useEffect(() => {
    onVerificationStatusChange?.(isVerified);
  }, [isVerified, onVerificationStatusChange]);


  // Verificar si ya está verificado al montar
  useEffect(() => {
    const checkExistingVerification = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) return;

      try {
        const response = await fetch(`${API_BASE_URL}/verification/status`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        if (response.ok) {
          const result = await response.json();
          if (result.data?.isVerified) {
            setIsVerified(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 2000);
          }
        }
      } catch (error) {
        // Error silencioso
      }
    };

    checkExistingVerification();
  }, [onComplete]);

  // Limpiar intervalos al desmontar
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startVerification = async () => {
    setIsVerifying(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        throw new Error('No se encontró sesión activa. Por favor, verifica tu email primero para continuar con el registro.');
      }

      // Verificar formato del token
      if (!accessToken.includes('.')) {
        throw new Error('Token inválido. Por favor, vuelve a iniciar sesión.');
      }

      const response = await fetch(`${API_BASE_URL}/verification/start`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 401) {
          throw new Error('Tu sesión expiró. Por favor, vuelve a verificar tu email.');
        }

        throw new Error(errorData.message || `Error ${response.status}: No se pudo iniciar la verificación`);
      }

      const result = await response.json();

      if (result.success) {
        setVerificationUrl(result.data.verificationUrl);

        // Abrir Didit en nueva ventana
        const diditWindow = window.open(
          result.data.verificationUrl,
          'didit-verification',
          'width=600,height=800,scrollbars=yes,resizable=yes'
        );

        // Verificar si la ventana se bloqueó
        if (!diditWindow || diditWindow.closed || typeof diditWindow.closed === 'undefined') {
          setPopupBlocked(true);
          setIsVerifying(true);
          pollStatus();
          return;
        }

        setPopupBlocked(false);

        // Empezar a verificar el estado
        pollStatus();
      } else {
        throw new Error(result.message || 'Error al iniciar verificación');
      }
    } catch (error) {
      setError(error.message);
      setIsVerifying(false);
    }
  };

  const pollStatus = () => {
    const accessToken = localStorage.getItem('accessToken');

    pollingIntervalRef.current = setInterval(async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/verification/status`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        if (!response.ok) {
          return;
        }

        const result = await response.json();

        if (result.data.isVerified) {
          // Usuario verificado
          clearInterval(pollingIntervalRef.current);
          setIsVerifying(false);
          setIsVerified(true);

          // Avanzar automáticamente después de 2 segundos
          setTimeout(() => {
            if (onComplete) {
              onComplete();
            }
          }, 2000);
        }
      } catch (error) {
        // Error silencioso en polling
      }
    }, 3000); // Verificar cada 3 segundos

    // Timeout después de 10 minutos
    timeoutRef.current = setTimeout(() => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
      setIsVerifying(false);
      setError('Tiempo de verificación agotado. Por favor, intenta de nuevo.');
    }, 600000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-8 h-8 text-primary" />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Verificación de Identidad
        </h2>
      </div>

      <p className="text-gray-600 mb-6">
        Para garantizar la seguridad de la comunidad, necesitamos verificar tu identidad usando Didit
      </p>

      {/* Chip de información */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 flex items-start gap-3 mb-6">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-semibold mb-1">¿Qué necesitas?</p>
          <ul className="space-y-1">
            <li>• Tu INE o identificación oficial</li>
            <li>• Cámara para tomar una selfie</li>
            <li>• Proceso seguro y encriptado</li>
            <li>• <strong>Haber verificado tu email previamente</strong></li>
          </ul>
        </div>
      </div>

      {/* Tip para la selfie */}
      <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-4 flex items-start gap-3 mb-6">
        <span className="text-primary font-bold text-sm">Tip:</span>
        <p className="text-sm text-gray-700">
          Quítate gorra o lentes para facilitar la verificación de tu selfie
        </p>
      </div>

      {/* Verificar si hay sesión activa */}
      {!localStorage.getItem('accessToken') && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 flex items-start gap-3 mb-6">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-semibold mb-1">⚠️ No hay sesión activa</p>
            <p>Debes verificar tu email primero para poder continuar con la verificación de identidad.</p>
          </div>
        </div>
      )}

      {/* Estados del proceso */}
      {!isVerifying && !isVerified && !error && (
        <div className="text-center space-y-6 py-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto"
          >
            <CreditCard className="w-12 h-12 text-primary" />
          </motion.div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Verifica tu identidad
            </h3>
            <p className="text-gray-600 mb-6">
              Haz clic en el botón para iniciar el proceso de verificación con Didit
            </p>
          </div>

          <motion.button
            type="button"
            onClick={startVerification}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            <Shield className="w-5 h-5" />
            Iniciar Verificación con Didit
            <ExternalLink className="w-4 h-4" />
          </motion.button>

          <label className="flex items-center justify-center gap-3 mt-6 cursor-pointer group">
            <input
              type="checkbox"
              checked={verifyLater}
              onChange={(e) => onSkipVerificationChange?.(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/20 accent-[#3CA2A2]"
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-900">
              Verificar en otro momento
            </span>
          </label>

          {verifyLater && (
            <div className="mt-6 bg-amber-50 border-2 border-amber-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-semibold mb-1">Importante</p>
                <p>Tu propiedad <strong>no será aprobada</strong> hasta que completes la verificación de identidad. Podrás verificar más adelante desde tu cuenta.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Estado: Verificando */}
      {isVerifying && !isVerified && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-6 py-8"
        >
          {/* Alerta de ventana bloqueada */}
          {popupBlocked && verificationUrl && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-amber-50 border-2 border-amber-400 rounded-xl p-6 mb-6"
            >
              <AlertCircle className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-amber-900 mb-2">
                Ventana Emergente Bloqueada
              </h3>
              <p className="text-sm text-amber-800 mb-4">
                Tu navegador bloqueó la ventana de verificación. Haz clic en el botón de abajo para abrirla manualmente.
              </p>
              <motion.a
                href={verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-lg transition-colors"
              >
                <Shield className="w-5 h-5" />
                Abrir Verificación de Didit
                <ExternalLink className="w-5 h-5" />
              </motion.a>
              <p className="text-xs text-amber-700 mt-3">
                Tip: Permite ventanas emergentes en tu navegador para evitar este paso
              </p>
            </motion.div>
          )}

          <div className="relative w-24 h-24 mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-full h-full border-4 border-primary border-t-transparent rounded-full"
            />
            <Shield className="w-12 h-12 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Verificación en proceso...
            </h3>
            <p className="text-gray-600 mb-4">
              {popupBlocked
                ? "Abre la ventana de Didit usando el botón de arriba"
                : "Completa el proceso en la ventana de Didit que se abrió"
              }
            </p>
          </div>

          {!popupBlocked && verificationUrl && (
            <div className="bg-gray-50 rounded-lg p-4 inline-block">
              <p className="text-sm text-gray-600 mb-2">
                ¿No se abrió la ventana?
              </p>
              <a
                href={verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline flex items-center gap-2 justify-center"
              >
                Haz clic aquí para abrir Didit
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Esperando confirmación...
          </div>

          <label className="flex items-center justify-center gap-3 mt-6 cursor-pointer group">
            <input
              type="checkbox"
              checked={verifyLater}
              onChange={(e) => onSkipVerificationChange?.(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/20 accent-[#3CA2A2]"
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-900">
              Verificar en otro momento
            </span>
          </label>

          {verifyLater && (
            <div className="mt-6 bg-amber-50 border-2 border-amber-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-semibold mb-1">Importante</p>
                <p>Tu propiedad <strong>no será aprobada</strong> hasta que completes la verificación de identidad. Podrás verificar más adelante desde tu cuenta.</p>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Estado: Verificado */}
      {isVerified && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 py-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto"
          >
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </motion.div>

          <div>
            <h3 className="text-xl font-semibold text-green-600 mb-2">
              ¡Verificación Exitosa!
            </h3>
            <p className="text-gray-600">
              Tu identidad ha sido verificada correctamente
            </p>
          </div>

          <div className="text-sm text-gray-500">
            Avanzando al siguiente paso...
          </div>
        </motion.div>
      )}

      {/* Estado: Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-50 border-2 border-red-200 rounded-lg p-6 space-y-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-1">
                Error en la verificación
              </h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>

          <motion.button
            type="button"
            onClick={startVerification}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Shield className="w-5 h-5" />
            Intentar de nuevo
          </motion.button>

          <label className="flex items-center gap-3 mt-4 cursor-pointer group">
            <input
              type="checkbox"
              checked={verifyLater}
              onChange={(e) => onSkipVerificationChange?.(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/20 accent-[#3CA2A2]"
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-900">
              Verificar en otro momento
            </span>
          </label>

          {verifyLater && (
            <div className="mt-4 bg-amber-50 border-2 border-amber-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-semibold mb-1">Importante</p>
                <p>Tu propiedad <strong>no será aprobada</strong> hasta que completes la verificación de identidad. Podrás verificar más adelante desde tu cuenta.</p>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Información de seguridad */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">
          Tu información está segura
        </h4>
        <p className="text-xs text-gray-600">
          Usamos Didit, una plataforma líder en verificación de identidad. Tu información
          está protegida con encriptación de grado militar y cumple con las regulaciones
          de protección de datos.
        </p>
      </div>
    </motion.div>
  );
};
