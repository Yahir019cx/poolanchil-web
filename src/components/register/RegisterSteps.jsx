import { motion } from 'motion/react';
import {
  User, Mail, Lock, Calendar, Phone, MapPin, Home, Droplet, Tent,
  ChevronRight, Check, Upload, X, DollarSign, Clock, FileText,
  CreditCard, Eye, EyeOff, Minus, Plus, Building2, Thermometer, Users,
  Bed, Bath, Ruler, TreePine, Wifi, Tv, ChefHat, WashingMachine,
  Refrigerator, Wind, ParkingCircle, Armchair, Utensils, Flame,
  Volume2, Umbrella, Table2, ShoppingBag, Sun, Lightbulb, AlertCircle
} from 'lucide-react';

// Paso 0: Bienvenida
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
    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-primary to-gray-900 bg-clip-text text-transparent">
      Bienvenido al registro de Pool & Chill
    </h2>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
      Ingresa tus datos personales y verifica tu correo, después llena los datos de tu propiedad para publicarla y sé de los primeros en aparecer en Pool & Chill
    </p>
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

// Paso 1: Datos Personales
export const PersonalDataStep = ({ formData, setFormData, showPassword, setShowPassword }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Datos Personales</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
          <User className="w-4 h-4 text-primary" />
          Nombre
        </label>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
          placeholder="Yahir"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
          <User className="w-4 h-4 text-primary" />
          Apellido
        </label>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
          placeholder="Sanchez"
        />
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
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
        placeholder="pyahirsvds@gmail.com"
      />
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
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white pr-12"
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
          <Calendar className="w-4 h-4 text-primary" />
          Fecha de nacimiento
        </label>
        <input
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
          <User className="w-4 h-4 text-primary" />
          Género
        </label>
        <select
          value={formData.gender}
          onChange={(e) => setFormData({...formData, gender: e.target.value})}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
        >
          <option value="">Selecciona</option>
          <option value="1">Hombre</option>
          <option value="2">Mujer</option>
          <option value="3">Prefiero no decirlo / Otro</option>
        </select>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
          <Phone className="w-4 h-4 text-primary" />
          Teléfono
        </label>
        <input
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
          placeholder="4491025278"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
          <MapPin className="w-4 h-4 text-primary" />
          Estado
        </label>
        <input
          type="text"
          value={formData.estado}
          onChange={(e) => setFormData({...formData, estado: e.target.value})}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
          placeholder="Aguascalientes"
        />
      </div>
    </div>
  </motion.div>
);

// Paso 2: ¿Qué ofreces?
export const PropertyTypeStep = ({ formData, handlePropertyTypeToggle }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">¿Qué ofreces?</h2>
    <p className="text-gray-600 mb-6">Selecciona uno o más tipos de espacio (puedes combinarlos)</p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { value: 'pool', label: 'Alberca', icon: Droplet, emoji: '🏊' },
        { value: 'cabin', label: 'Cabaña', icon: Home, emoji: '🏡' },
        { value: 'camping', label: 'Camping', icon: Tent, emoji: '🏕️' }
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
              ${selected
                ? 'border-primary bg-primary/10 shadow-primary/20'
                : 'border-gray-200 bg-white hover:border-primary/50'
              }
            `}
          >
            <div className="text-center space-y-3">
              <div className="text-5xl">{type.emoji}</div>
              <type.icon className={`w-8 h-8 mx-auto ${selected ? 'text-primary' : 'text-gray-400'}`} />
              <span className={`block text-lg font-semibold ${selected ? 'text-primary' : 'text-gray-700'}`}>
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

// Componente Spinner para contadores
const SpinnerInput = ({ label, value, onChange, min = 0, max = 100, icon: Icon }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
      {Icon && <Icon className="w-4 h-4 text-primary" />}
      {label}
    </label>
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-primary hover:bg-primary/10 transition-all duration-200 flex items-center justify-center"
      >
        <Minus className="w-4 h-4" />
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Math.min(max, Math.max(min, parseInt(e.target.value) || 0)))}
        className="w-20 text-center px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
        min={min}
        max={max}
      />
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-primary hover:bg-primary/10 transition-all duration-200 flex items-center justify-center"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  </div>
);

// Paso 3: Ubicación
export const LocationStep = ({ formData, setFormData }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Ubicación</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
          <MapPin className="w-4 h-4 text-primary" />
          Calle
        </label>
        <input
          type="text"
          value={formData.street}
          onChange={(e) => setFormData({...formData, street: e.target.value})}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
          placeholder="Av. Principal"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
          <Building2 className="w-4 h-4 text-primary" />
          Número
        </label>
        <input
          type="text"
          value={formData.number}
          onChange={(e) => setFormData({...formData, number: e.target.value})}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
          placeholder="123"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
          <MapPin className="w-4 h-4 text-primary" />
          Código Postal
        </label>
        <input
          type="text"
          value={formData.zipCode}
          onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
          placeholder="20000"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
          <MapPin className="w-4 h-4 text-primary" />
          Estado
        </label>
        <input
          type="text"
          value={formData.state}
          onChange={(e) => setFormData({...formData, state: e.target.value})}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
          placeholder="Aguascalientes"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
          <MapPin className="w-4 h-4 text-primary" />
          Municipio
        </label>
        <input
          type="text"
          value={formData.municipality}
          onChange={(e) => setFormData({...formData, municipality: e.target.value})}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
          placeholder="Aguascalientes"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
          <MapPin className="w-4 h-4 text-primary" />
          Latitud
        </label>
        <input
          type="text"
          value={formData.coordinates.lat}
          onChange={(e) => setFormData({...formData, coordinates: {...formData.coordinates, lat: e.target.value}})}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
          placeholder="21.8853"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
          <MapPin className="w-4 h-4 text-primary" />
          Longitud
        </label>
        <input
          type="text"
          value={formData.coordinates.lng}
          onChange={(e) => setFormData({...formData, coordinates: {...formData.coordinates, lng: e.target.value}})}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
          placeholder="-102.2916"
        />
      </div>
    </div>

    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-blue-800">
        Puedes obtener las coordenadas desde Google Maps haciendo clic derecho en la ubicación y seleccionando las coordenadas.
      </p>
    </div>
  </motion.div>
);

// Exportar SpinnerInput para uso en otros componentes
export { SpinnerInput };
