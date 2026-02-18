import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Home, Shield } from 'lucide-react';

export default function VerificacionDidit() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status'); // 'Approved' | 'Declined' | etc.
  const isDeclined = status?.toLowerCase() === 'declined' || status?.toLowerCase() === 'rejected';

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

      <div className="container mx-auto max-w-lg relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl" />

          <div className="relative p-8 md:p-12 flex flex-col items-center text-center space-y-8">
            {/* Logo */}
            <motion.img
              src="/poolChillicon.png"
              alt="Pool & Chill"
              className="w-20 h-20 object-contain"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
            />

            {/* Ícono de estado - Identidad */}
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
                className={`absolute inset-0 rounded-full blur-xl ${
                  isDeclined ? 'bg-amber-100' : 'bg-emerald-100'
                }`}
              />
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {isDeclined ? (
                  <XCircle className="w-20 h-20 text-amber-600 relative z-10" strokeWidth={2} />
                ) : (
                  <CheckCircle2 className="w-20 h-20 text-emerald-600 relative z-10" strokeWidth={2} />
                )}
              </motion.div>
            </motion.div>

            {/* Bloque 1: Resultado de identidad */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className={`text-2xl md:text-3xl font-bold ${
                  isDeclined ? 'text-amber-800' : 'text-emerald-800'
                }`}
              >
                {isDeclined
                  ? 'Tu identidad fue declinada'
                  : '¡Tu identidad fue verificada!'}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="text-gray-600 text-base md:text-lg"
              >
                {isDeclined
                  ? 'No pudimos validar tu identidad en este momento. Si consideras que es un error, contáctanos.'
                  : 'Hemos verificado tu identidad correctamente. ¡Gracias por tu colaboración!'}
              </motion.p>
            </div>

            {/* Separador visual */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="w-16 h-0.5 bg-primary/30 rounded-full"
            />

            {/* Bloque 2: Verificación de propiedad */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.65 }}
              className="flex flex-col items-center space-y-3"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Tu propiedad será verificada
                </h2>
                <p className="text-base md:text-lg text-gray-600 max-w-sm leading-relaxed">
                  Uno de nuestros asesores revisará la información de tu propiedad y te notificaremos cuando esté lista para publicarse.
                </p>
              </div>
            </motion.div>

            {/* Botón volver */}
            <motion.a
              href="/"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.75 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Home className="w-5 h-5" />
              Volver al inicio
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
