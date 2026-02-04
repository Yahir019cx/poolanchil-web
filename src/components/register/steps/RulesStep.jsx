import { motion, AnimatePresence } from "motion/react";
import { FileText, Plus, Trash2, AlertCircle } from "lucide-react";

export const RulesStep = ({ formData, addRule, updateRule, removeRule }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Reglas del Establecimiento
      </h2>
      <p className="text-gray-600 mb-6">
        Define las reglas que los huéspedes deben seguir durante su estancia
      </p>

      {/* Chip de aviso */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 flex items-start gap-3 mb-6">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-semibold mb-1">Recomendaciones</p>
          <p>
            Sé claro y específico. Incluye reglas sobre mascotas, fumar, horarios de silencio, etc.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {formData.rules.map((rule, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex gap-3 items-start"
            >
              <div className="flex-1">
                <div className="relative">
                  <FileText className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={rule}
                    onChange={(e) => updateRule(index, e.target.value)}
                    placeholder={`Regla ${index + 1} (ej: No se permiten mascotas)`}
                    className="w-full pl-11 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
                  />
                </div>
              </div>

              {formData.rules.length > 1 && (
                <motion.button
                  type="button"
                  onClick={() => removeRule(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-lg border-2 border-red-200 text-red-600 hover:bg-red-50 transition-all duration-300"
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={addRule}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary text-gray-600 hover:text-primary transition-all duration-300 flex items-center justify-center gap-2 font-medium"
        >
          <Plus className="w-5 h-5" />
          Agregar nueva regla
        </motion.button>
      </div>

      {/* Ejemplos sugeridos */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm font-semibold text-gray-700 mb-2">
          Ejemplos de reglas:
        </p>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>No se permiten mascotas</li>
          <li>No fumar dentro de las instalaciones</li>
          <li>Respetar el horario de silencio (10 PM - 8 AM)</li>
          <li>Capacidad máxima: 10 personas</li>
        </ul>
      </div>
    </motion.div>
  );
};
