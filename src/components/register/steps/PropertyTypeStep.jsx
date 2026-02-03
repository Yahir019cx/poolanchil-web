import { motion } from "motion/react";
import { Droplet, Home, Tent, Check, AlertCircle } from "lucide-react";

export const PropertyTypeStep = ({
  formData,
  handlePropertyTypeToggle,
  errors,
}) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      ¿Qué ofreces?
    </h2>
    <p className="text-gray-600 mb-6">
      Selecciona uno o más tipos de espacio (puedes combinarlos)
    </p>

    {errors.propertyTypes && (
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-3 mb-4">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-red-800">{errors.propertyTypes}</p>
      </div>
    )}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { value: "pool", label: "Alberca", icon: Droplet},
        { value: "cabin", label: "Cabaña", icon: Home },
        { value: "camping", label: "Camping", icon: Tent},
      ].map((type) => {
        const selected = formData.propertyTypes.includes(type.value);
        return (
          <motion.button
            key={type.value}
            type="button"
            onClick={() => handlePropertyTypeToggle(type.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative p-6 rounded-xl border-2 transition-all duration-300 shadow-lg
              ${
                selected
                  ? "border-primary bg-primary/10 shadow-primary/20"
                  : "border-gray-200 bg-white hover:border-primary/50"
              }
            `}
          >
            <div className="text-center space-y-3">
              <div className="text-5xl">{type.emoji}</div>
              <type.icon
                className={`w-8 h-8 mx-auto ${selected ? "text-primary" : "text-gray-400"}`}
              />
              <span
                className={`block text-lg font-semibold ${selected ? "text-primary" : "text-gray-700"}`}
              >
                {type.label}
              </span>
            </div>
            {selected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
              >
                <Check className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  </motion.div>
);
