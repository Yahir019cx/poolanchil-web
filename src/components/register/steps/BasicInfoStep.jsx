import { motion } from "motion/react";
import { Home, FileText, Clock, DollarSign } from "lucide-react";
import { TimePicker } from "../shared/TimePicker";

export const BasicInfoStep = ({ formData, setFormData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Información Básica
      </h2>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
          <Home className="w-4 h-4 text-primary" />
          Nombre del lugar
        </label>
        <input
          type="text"
          value={formData.propertyName}
          onChange={(e) =>
            setFormData({ ...formData, propertyName: e.target.value })
          }
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
          placeholder="Villa Paraíso"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
          <FileText className="w-4 h-4 text-primary" />
          Descripción
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={4}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white resize-none"
          placeholder="Describe tu espacio, amenidades, y lo que hace especial tu lugar..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
            <Clock className="w-4 h-4 text-primary" />
            Check-In
          </label>
          <TimePicker
            value={formData.checkIn}
            onChange={(time) =>
              setFormData({ ...formData, checkIn: time })
            }
            label="Hora de Check-In"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
            <Clock className="w-4 h-4 text-primary" />
            Check-Out
          </label>
          <TimePicker
            value={formData.checkOut}
            onChange={(time) =>
              setFormData({ ...formData, checkOut: time })
            }
            label="Hora de Check-Out"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
            <DollarSign className="w-4 h-4 text-primary" />
            Precio Lunes-Jueves
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              value={formData.priceWeekday}
              onChange={(e) =>
                setFormData({ ...formData, priceWeekday: e.target.value })
              }
              className="w-full pl-8 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
              placeholder="500"
              min="0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
            <DollarSign className="w-4 h-4 text-primary" />
            Precio Viernes-Domingo
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              value={formData.priceWeekend}
              onChange={(e) =>
                setFormData({ ...formData, priceWeekend: e.target.value })
              }
              className="w-full pl-8 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
              placeholder="800"
              min="0"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
