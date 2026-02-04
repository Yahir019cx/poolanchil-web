import { motion } from "motion/react";
import { Mail, Clock, RefreshCw } from "lucide-react";

export const EmailVerificationStep = ({ email }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 text-center py-8"
    >
      {/* Icono animado */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="flex justify-center"
      >
        <div className="relative">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="w-12 h-12 text-primary" />
          </div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-primary/20 rounded-full"
          />
        </div>
      </motion.div>

      {/* Título */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
        ¡Revisa tu correo!
      </h2>

      {/* Descripción */}
      <div className="space-y-3 text-gray-600">
        <p className="text-lg">
          Te enviamos un correo de verificación a:
        </p>
        <p className="text-xl font-semibold text-primary">
          {email}
        </p>
        <p>
          Haz click en el enlace del correo para verificar tu cuenta y continuar con el registro.
        </p>
      </div>

      {/* Instrucciones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-3"
      >
        <div className="flex items-start gap-3 text-left">
          <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">El enlace expira en 15 minutos</p>
            <p>Si no recibes el correo, revisa tu carpeta de spam.</p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-left">
          <RefreshCw className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">¿No te llegó el correo?</p>
            <p>Puedes solicitar un nuevo correo desde la página de inicio de sesión.</p>
          </div>
        </div>
      </motion.div>

      {/* Animación de espera */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-sm text-gray-500 mt-6"
      >
        Esperando verificación...
      </motion.div>
    </motion.div>
  );
};
