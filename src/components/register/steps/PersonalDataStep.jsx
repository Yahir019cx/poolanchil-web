import { motion } from "motion/react";
import { User, Mail, Lock, Calendar, Phone, MapPin, Eye, EyeOff } from "lucide-react";
import { DataPicker } from "../DataPicker";
import { ESTADOS_MEXICO } from "../constants/states";

export const PersonalDataStep = ({
  formData,
  setFormData,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  errors,
}) => {
  const handleNameInput = (e, field) => {
    const value = e.target.value;
    // Solo permitir letras, espacios y acentos
    const filtered = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, "");
    setFormData({ ...formData, [field]: filtered });
  };

  const handlePhoneInput = (e) => {
    const value = e.target.value;
    // Solo permitir números
    const filtered = value.replace(/\D/g, "").slice(0, 10);
    setFormData({ ...formData, phoneNumber: filtered });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Datos Personales
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
            <User className="w-4 h-4 text-primary" />
            Nombre
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleNameInput(e, "firstName")}
            className={`w-full px-4 py-3 rounded-lg border-2 ${
              errors.firstName ? "border-red-400" : "border-gray-200"
            } focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white`}
            placeholder=" "
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
            <User className="w-4 h-4 text-primary" />
            Apellido
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleNameInput(e, "lastName")}
            className={`w-full px-4 py-3 rounded-lg border-2 ${
              errors.lastName ? "border-red-400" : "border-gray-200"
            } focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white`}
            placeholder=" "
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
          <Mail className="w-4 h-4 text-primary" />
          Correo electrónico
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full px-4 py-3 rounded-lg border-2 ${
            errors.email ? "border-red-400" : "border-gray-200"
          } focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white`}
          placeholder=" "
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
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className={`w-full px-4 py-3 rounded-lg border-2 ${
              errors.password ? "border-red-400" : "border-gray-200"
            } focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white pr-12`}
            placeholder=" "
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
          <Lock className="w-4 h-4 text-primary" />
          Confirmar Contraseña
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className={`w-full px-4 py-3 rounded-lg border-2 ${
              errors.confirmPassword ? "border-red-400" : "border-gray-200"
            } focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white pr-12`}
            placeholder=" "
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            Fecha de nacimiento
          </label>
          <DataPicker
            value={formData.dateOfBirth}
            onChange={(date) =>
              setFormData(prev => ({
                ...prev,
                dateOfBirth: date
              }))
            }
          />

          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
            <User className="w-4 h-4 text-primary" />
            Género
          </label>
          <select
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            className={`w-full px-4 py-3 rounded-lg border-2 ${
              errors.gender ? "border-red-400" : "border-gray-200"
            } focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white`}
          >
            <option value="">Selecciona</option>
            <option value="1">Hombre</option>
            <option value="2">Mujer</option>
            <option value="3">Prefiero no decirlo / Otro</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
            <Phone className="w-4 h-4 text-primary" />
            Teléfono (10 dígitos)
          </label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={handlePhoneInput}
            className={`w-full px-4 py-3 rounded-lg border-2 ${
              errors.phoneNumber ? "border-red-400" : "border-gray-200"
            } focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white`}
            placeholder=" "
            maxLength="10"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            Estado
          </label>
          <select
            value={formData.estado}
            onChange={(e) =>
              setFormData({ ...formData, estado: e.target.value })
            }
            className={`w-full px-4 py-3 rounded-lg border-2 ${
              errors.estado ? "border-red-400" : "border-gray-200"
            } focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white`}
          >
            <option value="">Selecciona un estado</option>
            {ESTADOS_MEXICO.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
          {errors.estado && (
            <p className="text-red-500 text-sm">{errors.estado}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
