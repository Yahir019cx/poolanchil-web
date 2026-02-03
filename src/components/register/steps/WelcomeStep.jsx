import { motion } from "motion/react";
import { Home, ChevronRight } from "lucide-react";

export const WelcomeStep = ({ nextStep }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="text-center space-y-6 py-12"
  >
    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
      <Home className="w-12 h-12 text-primary" />
    </div>
    <h2 className="text-3xl md:text-4xl font-bold text-secondary">
      Bienvenido a Pool & Chill
    </h2>

    <div className="space-y-3">
      <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
        Regístrate con tus datos personales y confirma tu correo.
      </p>

      <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Luego agrega la información de tu propiedad y publícala para empezar a
        recibir visibilidad en Pool & Chill.
      </p>
    </div>
    <motion.button
      onClick={nextStep}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
    >
      Continuar
      <ChevronRight className="w-5 h-5" />
    </motion.button>
  </motion.div>
);
