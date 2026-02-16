import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, Shield, Loader2, ExternalLink } from 'lucide-react';
import { Toast } from '../components/ui/Toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyingDidit, setIsVerifyingDidit] = useState(false);
  const [verificationUrl, setVerificationUrl] = useState(null);
  const [popupBlocked, setPopupBlocked] = useState(false);
  const pollingIntervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
  const showToast = (message, type = 'success') => setToast({ isVisible: true, message, type });
  const hideToast = () => setToast(prev => ({ ...prev, isVisible: false }));

  // Limpiar intervalos al desmontar
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const startDiditVerification = async (accessToken) => {
    try {
      // 1. Verificar si ya está verificado
      const statusRes = await fetch(`${API_BASE_URL}/verification/status`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (statusRes.ok) {
        const statusResult = await statusRes.json();
        if (statusResult.data?.isVerified) {
          navigate('/verificacion-didit?status=Approved');
          return;
        }
      }

      setIsVerifyingDidit(true);
      setVerificationUrl(null);
      setPopupBlocked(false);
      sessionStorage.setItem('diditVerificationSource', 'login');

      // 2. Iniciar verificación Didit
      const response = await fetch(`${API_BASE_URL}/verification/start`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'No se pudo iniciar la verificación');
      }

      const result = await response.json();
      if (!result.success || !result.data?.verificationUrl) {
        throw new Error(result.message || 'Error al iniciar verificación');
      }

      const url = result.data.verificationUrl;
      setVerificationUrl(url);

      // 3. Abrir Didit en popup
      const diditWindow = window.open(url, 'didit-verification', 'width=600,height=800,scrollbars=yes,resizable=yes');

      if (!diditWindow || diditWindow.closed || typeof diditWindow.closed === 'undefined') {
        setPopupBlocked(true);
      }

      // 4. Polling del estado
      const pollStatus = () => {
        pollingIntervalRef.current = setInterval(async () => {
          try {
            const res = await fetch(`${API_BASE_URL}/verification/status`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            if (!res.ok) return;
            const data = await res.json();
            if (data.data?.isVerified) {
              if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              navigate('/verificacion-didit?status=Approved');
            }
          } catch (_) {}
        }, 3000);
      };

      pollStatus();

      // Timeout 10 minutos
      timeoutRef.current = setTimeout(() => {
        if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
        navigate('/verificacion-didit?status=Declined');
      }, 600000);
    } catch (error) {
      showToast(error.message || 'Error en verificación', 'error');
      navigate('/verificacion-didit?status=Declined');
    } finally {
      setIsVerifyingDidit(false);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();

    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'El correo es requerido';
    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Credenciales inválidas');
      }

      const data = await response.json();

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('userId', data.user.userId);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('tokenTimestamp', Date.now().toString());
      localStorage.setItem('expiresIn', (data.expiresIn || 900).toString());

      showToast('¡Inicio de sesión exitoso!', 'success');
      setIsLoading(false);

      // Iniciar verificación Didit en auto
      await startDiditVerification(data.accessToken);
    } catch (error) {
      showToast(error.message || 'Error al iniciar sesión', 'error');
      setIsLoading(false);
    }
  };

  // Vista de verificación Didit en progreso
  if (isVerifyingDidit) {
    return (
      <section className="relative min-h-screen py-20 px-6 overflow-hidden bg-gradient-to-b from-white via-primary/5 to-white flex items-center justify-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }} />
        </div>
        <div className="container mx-auto max-w-md relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl" />
            <div className="relative p-8 md:p-12 flex flex-col items-center text-center space-y-6">
              <motion.img src="/poolChillicon.png" alt="Pool & Chill" className="w-20 h-20 object-contain" />
              <div className="relative w-24 h-24">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="w-full h-full border-4 border-primary border-t-transparent rounded-full" />
                <Shield className="w-12 h-12 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Verificación de identidad</h2>
                <p className="text-gray-600">
                  {popupBlocked && verificationUrl
                    ? 'Abre la ventana de Didit usando el botón de abajo'
                    : 'Completa el proceso en la ventana de Didit que se abrió'}
                </p>
              </div>
              {popupBlocked && verificationUrl && (
                <motion.a
                  href={verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-lg transition-colors"
                >
                  <Shield className="w-5 h-5" />
                  Abrir verificación Didit
                  <ExternalLink className="w-5 h-5" />
                </motion.a>
              )}
              {verificationUrl && !popupBlocked && (
                <a href={verificationUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-2">
                  ¿No se abrió? Haz clic aquí
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                Esperando confirmación...
              </div>
            </div>
          </motion.div>
        </div>
        <Toast message={toast.message} type={toast.type} isVisible={toast.isVisible} onClose={hideToast} />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen py-20 px-6 overflow-hidden bg-gradient-to-b from-white via-primary/5 to-white flex items-center justify-center">
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

          <div className="relative p-8 md:p-12 space-y-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <motion.img
                src="/poolChillicon.png"
                alt="Pool & Chill"
                className="w-20 h-20 object-contain"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
              />
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Iniciar sesión</h2>
                <p className="text-gray-600 mt-2">Ingresa tus credenciales para continuar</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, email: e.target.value }));
                    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                  }}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    errors.email ? 'border-red-400' : 'border-gray-200'
                  } focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white`}
                  placeholder="tu@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                  <Lock className="w-4 h-4 text-primary" />
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, password: e.target.value }));
                      if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      errors.password ? 'border-red-400' : 'border-gray-200'
                    } focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white pr-12`}
                    placeholder="Tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div className="text-right">
                <Link
                  to="/forgot-password"
                  state={{ from: '/login' }}
                  className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar sesión'
                )}
              </motion.button>
            </form>

          </div>
        </motion.div>
      </div>

      <Toast message={toast.message} type={toast.type} isVisible={toast.isVisible} onClose={hideToast} />
    </section>
  );
}
