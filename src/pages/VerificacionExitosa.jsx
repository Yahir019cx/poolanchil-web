import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, AlertCircle, Smartphone } from 'lucide-react';

export default function VerificacionExitosa() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get('status');
  const message = searchParams.get('message');
  const verificationSessionId = searchParams.get('verificationSessionId');
  const isError = status === 'error';

  // Si la verificación Didit vino desde Login, redirigir a VerificacionDidit
  useEffect(() => {
    if (verificationSessionId && sessionStorage.getItem('diditVerificationSource') === 'login') {
      sessionStorage.removeItem('diditVerificationSource');
      const diditStatus = status === 'Approved' ? 'Approved' : 'Declined';
      navigate(`/verificacion-didit?status=${diditStatus}`, { replace: true });
    }
  }, [verificationSessionId, status, navigate]);

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

          <div className="relative p-8 md:p-12 flex flex-col items-center text-center space-y-6">
            {/* Logo */}
            <motion.img
              src="/poolChillicon.png"
              alt="Pool & Chill"
              className="w-20 h-20 object-contain"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
            />

            {/* Ícono de estado */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              className="relative"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={`absolute inset-0 ${isError ? 'bg-red-100' : 'bg-green/20'} rounded-full blur-xl`}
              />
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {isError ? (
                  <AlertCircle className="w-16 h-16 text-red-500 relative z-10" strokeWidth={2} />
                ) : (
                  <CheckCircle2 className="w-16 h-16 text-green relative z-10" strokeWidth={2} />
                )}
              </motion.div>
            </motion.div>

            {/* Título */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-gray-900"
            >
              {isError ? 'Error en la verificación' : '¡Verificación exitosa!'}
            </motion.h1>

            {/* Mensaje */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="text-base md:text-lg text-gray-600 max-w-sm leading-relaxed"
            >
              {isError
                ? (message || 'Ocurrió un error al verificar tu cuenta. Intenta de nuevo.')
                : 'Tu cuenta ha sido verificada correctamente. Ya puedes regresar a la app de Pool & Chill e iniciar sesión.'}
            </motion.p>

            {/* Botón ir a la app */}
            {!isError && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {}}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Smartphone className="w-5 h-5" />
                Abrir la app
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
