import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle2, AlertCircle, Send, KeyRound } from 'lucide-react';
import { Toast } from '../components/ui/Toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  // Toast
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
  const showToast = (message, type = 'success') => setToast({ isVisible: true, message, type });
  const hideToast = () => setToast(prev => ({ ...prev, isVisible: false }));

  // Si hay token → vista "Restablecer contraseña", si no → vista "Solicitar recuperación"
  return (
    <section className="relative min-h-screen py-20 px-6 overflow-hidden bg-gradient-to-b from-white via-primary/5 to-white flex items-center justify-center">
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute top-10 right-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '5s' }}
        />
        <div
          className="absolute bottom-10 left-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '7s', animationDelay: '2s' }}
        />
      </div>

      <div className="container mx-auto max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl" />

          <div className="relative p-8 md:p-12">
            {token ? (
              <ResetPasswordView token={token} showToast={showToast} navigate={navigate} />
            ) : (
              <RequestResetView showToast={showToast} navigate={navigate} />
            )}
          </div>
        </motion.div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </section>
  );
}

// ─────────────────────────────────────────────
// Vista 1: Solicitar recuperación (sin token)
// ─────────────────────────────────────────────
function RequestResetView({ showToast, navigate }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async () => {
    // Validación
    if (!email.trim()) {
      setError('El correo electrónico es requerido');
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      await response.json();
      setEmailSent(true);
    } catch {
      showToast('Error de conexión. Intenta de nuevo más tarde.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {emailSent ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center text-center space-y-6"
        >
          {/* Logo */}
          <motion.img
            src="/poolChillicon.png"
            alt="Pool & Chill"
            className="w-20 h-20 object-contain"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
          />

          {/* Ícono de éxito */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-green/20 rounded-full blur-xl" />
            <CheckCircle2 className="w-16 h-16 text-primary relative z-10" strokeWidth={2} />
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            ¡Revisa tu correo!
          </h2>

          <p className="text-base md:text-lg text-gray-600 max-w-sm leading-relaxed">
            Si el correo electrónico está registrado, recibirás un enlace para restablecer tu contraseña. Revisa también tu carpeta de spam.
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/registro')}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al inicio de sesión
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Logo y título */}
          <div className="flex flex-col items-center text-center space-y-4">
            <motion.img
              src="/poolChillicon.png"
              alt="Pool & Chill"
              className="w-20 h-20 object-contain"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
            />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
              className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center"
            >
              <Mail className="w-8 h-8 text-primary" />
            </motion.div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                ¿Olvidaste tu contraseña?
              </h2>
              <p className="text-gray-600 mt-2">
                Ingresa tu correo electrónico y te enviaremos un enlace para restablecerla.
              </p>
            </div>
          </div>

          {/* Input email */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
              <Mail className="w-4 h-4 text-primary" />
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className={`w-full px-4 py-3 rounded-lg border-2 ${
                error ? 'border-red-400' : 'border-gray-200'
              } focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white`}
              placeholder="tu@email.com"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          {/* Botón enviar */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Enviar enlace de recuperación
              </>
            )}
          </motion.button>

          {/* Link volver */}
          <button
            onClick={() => navigate('/registro')}
            className="w-full text-center text-sm text-gray-500 hover:text-primary transition-colors"
          >
            ¿Recordaste tu contraseña? <span className="font-semibold">Inicia sesión</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────
// Vista 2: Restablecer contraseña (con token)
// ─────────────────────────────────────────────
function ResetPasswordView({ token, showToast, navigate }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const validatePassword = () => {
    const newErrors = {};

    if (!newPassword) {
      newErrors.newPassword = 'La contraseña es requerida';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!PASSWORD_REGEX.test(newPassword)) {
      newErrors.newPassword = 'Debe incluir al menos 1 mayúscula, 1 minúscula y 1 número';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validatePassword()) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al restablecer la contraseña');
      }

      setResetSuccess(true);
    } catch (error) {
      showToast(error.message || 'Error al restablecer la contraseña', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Indicador visual de fortaleza de contraseña
  const getPasswordStrength = () => {
    if (!newPassword) return { width: '0%', color: 'bg-gray-200', label: '' };
    let score = 0;
    if (newPassword.length >= 8) score++;
    if (/[a-z]/.test(newPassword)) score++;
    if (/[A-Z]/.test(newPassword)) score++;
    if (/\d/.test(newPassword)) score++;
    if (/[^a-zA-Z\d]/.test(newPassword)) score++;

    if (score <= 2) return { width: '33%', color: 'bg-red-400', label: 'Débil' };
    if (score <= 3) return { width: '66%', color: 'bg-amber-400', label: 'Media' };
    return { width: '100%', color: 'bg-green', label: 'Fuerte' };
  };

  const strength = getPasswordStrength();

  return (
    <AnimatePresence mode="wait">
      {resetSuccess ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center text-center space-y-6"
        >
          {/* Logo */}
          <motion.img
            src="/poolChillicon.png"
            alt="Pool & Chill"
            className="w-20 h-20 object-contain"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
          />

          {/* Ícono de éxito */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-green/20 rounded-full blur-xl" />
            <CheckCircle2 className="w-16 h-16 text-primary relative z-10" strokeWidth={2} />
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            ¡Contraseña restablecida!
          </h2>

          <p className="text-base md:text-lg text-gray-600 max-w-sm leading-relaxed">
            Tu contraseña ha sido actualizada correctamente. Ya puedes iniciar sesión con tu nueva contraseña.
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/registro')}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Ir al inicio de sesión
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Logo y título */}
          <div className="flex flex-col items-center text-center space-y-4">
            <motion.img
              src="/poolChillicon.png"
              alt="Pool & Chill"
              className="w-20 h-20 object-contain"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
            />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
              className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center"
            >
              <KeyRound className="w-8 h-8 text-primary" />
            </motion.div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Nueva contraseña
              </h2>
              <p className="text-gray-600 mt-2">
                Crea una contraseña segura para tu cuenta.
              </p>
            </div>
          </div>

          {/* Input nueva contraseña */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <Lock className="w-4 h-4 text-primary" />
                Nueva contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (errors.newPassword) setErrors(prev => ({ ...prev, newPassword: '' }));
                  }}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    errors.newPassword ? 'border-red-400' : 'border-gray-200'
                  } focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white pr-12`}
                  placeholder="Mínimo 8 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}

              {/* Barra de fortaleza */}
              {newPassword && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-1"
                >
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${strength.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: strength.width }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Seguridad: <span className="font-medium">{strength.label}</span>
                  </p>
                </motion.div>
              )}
            </div>

            {/* Input confirmar contraseña */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <Lock className="w-4 h-4 text-primary" />
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    errors.confirmPassword ? 'border-red-400' : 'border-gray-200'
                  } focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white pr-12`}
                  placeholder="Repite tu contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Requisitos de contraseña */}
          <div className="bg-gray-50 rounded-lg p-3 space-y-1.5">
            <p className="text-xs font-medium text-gray-500 mb-2">Requisitos:</p>
            <RequirementItem met={newPassword.length >= 8} text="Mínimo 8 caracteres" />
            <RequirementItem met={/[A-Z]/.test(newPassword)} text="Al menos 1 letra mayúscula" />
            <RequirementItem met={/[a-z]/.test(newPassword)} text="Al menos 1 letra minúscula" />
            <RequirementItem met={/\d/.test(newPassword)} text="Al menos 1 número" />
          </div>

          {/* Botón restablecer */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Restableciendo...
              </>
            ) : (
              <>
                <KeyRound className="w-5 h-5" />
                Restablecer contraseña
              </>
            )}
          </motion.button>

          {/* Link volver */}
          <button
            onClick={() => navigate('/registro')}
            className="w-full text-center text-sm text-gray-500 hover:text-primary transition-colors"
          >
            ¿Recordaste tu contraseña? <span className="font-semibold">Inicia sesión</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────
// Componente auxiliar: indicador de requisito
// ─────────────────────────────────────────────
function RequirementItem({ met, text }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
        met ? 'bg-primary' : 'bg-gray-300'
      }`}>
        {met && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-2.5 h-2.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </motion.svg>
        )}
      </div>
      <span className={`text-xs transition-colors duration-300 ${met ? 'text-gray-700' : 'text-gray-400'}`}>
        {text}
      </span>
    </div>
  );
}
