import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User, Mail, Lock, Calendar, Phone, MapPin, Home, Droplet, Tent,
  ChevronLeft, ChevronRight, Check, Upload, X, DollarSign,
  Clock, FileText, Image as ImageIcon, CreditCard, Eye, EyeOff
} from 'lucide-react';

export default function Register() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = bienvenida
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Datos personales
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    estado: '',

    // Tipo de espacio (array)
    propertyTypes: [],

    // Ubicación
    street: '',
    number: '',
    zipCode: '',
    state: '',
    municipality: '',
    coordinates: { lat: '', lng: '' },

    // Información básica
    propertyName: '',
    description: '',
    checkIn: '',
    checkOut: '',
    rentType: '', // 'day', 'hours'
    priceWeekday: '',
    priceWeekend: '',

    // Amenidades por tipo
    poolAmenities: {
      maxPeople: 0,
      tempMin: 20,
      tempMax: 25,
      features: []
    },
    cabinAmenities: {
      maxGuests: 0,
      bedrooms: 0,
      singleBeds: 0,
      doubleBeds: 0,
      fullBathrooms: 0,
      halfBathrooms: 0,
      features: []
    },
    campingAmenities: {
      maxPeople: 0,
      squareMeters: 0,
      tents: 0,
      features: []
    },

    // Reglas
    rules: [''],

    // Fotos
    photos: [],

    // INE
    ineFiles: [],

    // Cuenta de pago
    accountName: '',
    accountNumber: '',
    bankName: ''
  });

  const steps = [
    'Bienvenida',
    'Datos personales',
    '¿Qué ofreces?',
    'Ubicación',
    'Información básica',
    'Amenidades',
    'Reglas',
    'Fotos',
    'Verificación INE',
    'Cuenta de pago',
    'Vista previa'
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePropertyTypeToggle = (type) => {
    setFormData(prev => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type]
    }));
  };

  const handleFileUpload = (files, fieldName) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isUnder5MB = file.size <= 5 * 1024 * 1024;
      return isImage && isUnder5MB;
    });

    setFormData(prev => ({
      ...prev,
      [fieldName]: [...prev[fieldName], ...validFiles].slice(0, fieldName === 'photos' ? 10 : 2)
    }));
  };

  const removeFile = (index, fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== index)
    }));
  };

  const addRule = () => {
    setFormData(prev => ({
      ...prev,
      rules: [...prev.rules, '']
    }));
  };

  const updateRule = (index, value) => {
    setFormData(prev => ({
      ...prev,
      rules: prev.rules.map((rule, i) => i === index ? value : rule)
    }));
  };

  const removeRule = (index) => {
    setFormData(prev => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index)
    }));
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 0:
        return (
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

      case 1:
        return (
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
                  placeholder="Nombre"
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
                  placeholder="Apellido"
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
                placeholder="Ingresa un correco electronico"
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
                  placeholder="Ingresa tu contraseña"
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
                  placeholder=" "
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
                  placeholder=" "
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
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

      // Continuará en el siguiente mensaje debido a la longitud...

      default:
        return (
          <div className="text-center py-12 text-gray-600">
            <p>Paso {currentStep} en desarrollo...</p>
          </div>
        );
    }
  };

  return (
    <section className="relative min-h-screen py-20 px-6 overflow-hidden bg-gradient-to-b from-white via-primary/5 to-white mb-1">
      {/* Animated water wave background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '7s', animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10 mt-16">
        {/* Progress Bar */}
        {currentStep > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Paso {currentStep} de {steps.length - 1}</span>
              <span className="text-sm font-semibold text-primary">{Math.round((currentStep / (steps.length - 1)) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary/80"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Glassmorphic background */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl" />

          <div className="relative p-8 md:p-12">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep > 0 && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <motion.button
                  onClick={prevStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:border-primary hover:text-primary transition-all duration-300 flex items-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Anterior
                </motion.button>

                <motion.button
                  onClick={nextStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  {currentStep === steps.length - 1 ? 'Enviar' : 'Siguiente'}
                  {currentStep < steps.length - 1 && <ChevronRight className="w-5 h-5" />}
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
