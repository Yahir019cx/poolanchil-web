import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { User, Phone, Mail, MapPin, Home, Sparkles, Droplet, Tent, UserCheck, Users, Wifi, Tv, ChefHat, WashingMachine, Refrigerator, Wind, Thermometer, ParkingSquare, Armchair, Utensils, Volume2, Umbrella, Table2, Flame, Bath, DoorClosed, Sun, Lightbulb, ShoppingBag, UtensilsCrossed, Upload, X, Image } from 'lucide-react';
import SuccessModal from '../components/ui/SuccessModal';
import { encryptData } from '../utils/encryption';

export default function Contact() {
  const { t } = useTranslation();
  const [role, setRole] = useState('');
  const [propertyType, setPropertyType] = useState(''); // Cambiado a string para un solo valor
  const [amenities, setAmenities] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  // Prevenir entrada de caracteres no permitidos en nombre
  const handleNameInput = (e) => {
    const value = e.target.value;
    // Solo permitir letras, espacios y acentos
    const filtered = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
    setFormValues(prev => ({ ...prev, fullName: filtered }));
    e.target.value = filtered;

    // Validar
    if (!filtered.trim()) {
      setErrors(prev => ({ ...prev, fullName: t('contact.validation.nameRequired') }));
    } else {
      setErrors(prev => ({ ...prev, fullName: '' }));
    }
  };

  // Prevenir entrada de letras en teléfono
  const handlePhoneInput = (e) => {
    const value = e.target.value;
    // Solo permitir números, +, espacios, paréntesis y guiones
    const filtered = value.replace(/[^\d+\s()-]/g, '');
    setFormValues(prev => ({ ...prev, phone: filtered }));
    e.target.value = filtered;

    // Validar
    if (!filtered.trim()) {
      setErrors(prev => ({ ...prev, phone: t('contact.validation.phoneRequired') }));
    } else if (filtered.replace(/[\s()-]/g, '').length < 10) {
      setErrors(prev => ({ ...prev, phone: t('contact.validation.phoneMinLength') }));
    } else {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  // Validar email
  const handleEmailInput = (e) => {
    const value = e.target.value;
    setFormValues(prev => ({ ...prev, email: value }));

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) {
      setErrors(prev => ({ ...prev, email: t('contact.validation.emailRequired') }));
    } else if (!emailRegex.test(value)) {
      setErrors(prev => ({ ...prev, email: t('contact.validation.emailInvalid') }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  // Manejar archivos
  const handleFileUpload = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isUnder5MB = file.size <= 5 * 1024 * 1024; // 5MB
      return isImage && isUnder5MB;
    });

    setUploadedFiles(prev => [...prev, ...validFiles].slice(0, 10)); // Máximo 10 archivos
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Verificar si el formulario es válido
  const isFormValid = () => {
    const baseValid = (
      formValues.fullName.trim() !== '' &&
      formValues.email.trim() !== '' &&
      formValues.phone.trim() !== '' &&
      !errors.fullName &&
      !errors.email &&
      !errors.phone &&
      role !== ''
    );

    // Si es anfitrión, validar que tenga al menos una foto
    if (role === 'host') {
      return baseValid && uploadedFiles.length > 0;
    }

    return baseValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que el formulario sea válido antes de enviar
    if (!isFormValid()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Construir el payload según el rol
      const payload = {
        nombre: formValues.fullName,
        correo: formValues.email,
        telefono: formValues.phone,
        rol: role === 'guest' ? 'huésped' : 'anfitrión'
      };

      if (role === 'host') {
        payload.tipoEspacio = [propertyType]; // Debe ser un array
        payload.amenidades = amenities;
        payload.nombreLugar = document.getElementById('placeName').value;
        payload.direccion = document.getElementById('address').value;
        payload.descripcion = document.getElementById('hostDescription').value;
      } else if (role === 'guest') {
        payload.mensaje = document.getElementById('guestIdeas').value;
      }

      // Cifrar el payload
      const encryptedPayload = await encryptData(payload);

      // Crear FormData para enviar tanto el JSON como los archivos
      const formData = new FormData();
      formData.append('data', encryptedPayload);

      // Agregar las fotos al FormData (solo si es anfitrión)
      if (role === 'host' && uploadedFiles.length > 0) {
        uploadedFiles.forEach((file) => {
          formData.append('fotos', file);
        });
      }

      // Enviar al backend usando FormData
      const response = await fetch(`${import.meta.env.VITE_API_URL}/web/contact`, {
        method: 'POST',
        // NO incluir Content-Type header - el navegador lo establecerá automáticamente con el boundary correcto
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error en la respuesta del servidor');
      }

      // Éxito - Mostrar modal
      setShowSuccessModal(true);

      // Limpiar formulario
      setFormValues({ fullName: '', email: '', phone: '' });
      setRole('');
      setPropertyType('');
      setAmenities([]);
      setUploadedFiles([]);

      if (role === 'host') {
        document.getElementById('placeName').value = '';
        document.getElementById('address').value = '';
        document.getElementById('hostDescription').value = '';
      } else if (role === 'guest') {
        document.getElementById('guestIdeas').value = '';
      }

    } catch (error) {
      setSubmitStatus('error');

      // Ocultar mensaje de error después de 5 segundos
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
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

      <div className="container mx-auto max-w-3xl relative z-10 mt-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-gray-900 mb-4 pb-2 bg-gradient-to-r from-gray-900 via-[#3CA2A2] to-gray-900 bg-clip-text text-transparent leading-tight">
            {t('contact.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Glassmorphic background */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl" />

          <div className="relative p-8 md:p-12 space-y-6">
            {/* Full Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-2"
            >
              <label htmlFor="fullName" className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <User className="w-4 h-4 text-primary" />
                {t('contact.fullName')}
              </label>
              <input
                id="fullName"
                type="text"
                value={formValues.fullName}
                placeholder="Tu nombre"
                onInput={handleNameInput}
                className={`w-full px-4 py-3 rounded-lg border-2 ${errors.fullName
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                    : 'border-gray-200 focus:border-primary focus:ring-primary/10'
                  } focus:ring-4 outline-none transition-all duration-300 shadow-sm hover:shadow-md bg-white`}
              />
              {errors.fullName && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.fullName}
                </motion.p>
              )}
            </motion.div>

            {/* Phone Number */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-2"
            >
              <label htmlFor="phone" className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <Phone className="w-4 h-4 text-primary" />
                {t('contact.phone')}
              </label>
              <input
                id="phone"
                type="tel"
                value={formValues.phone}
                placeholder="+52 123 456 7890"
                onInput={handlePhoneInput}
                className={`w-full px-4 py-3 rounded-lg border-2 ${errors.phone
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                    : 'border-gray-200 focus:border-primary focus:ring-primary/10'
                  } focus:ring-4 outline-none transition-all duration-300 shadow-sm hover:shadow-md bg-white`}
              />
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.phone}
                </motion.p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-2"
            >
              <label htmlFor="email" className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <Mail className="w-4 h-4 text-primary" />
                {t('contact.email')}
              </label>
              <input
                id="email"
                type="email"
                value={formValues.email}
                placeholder="tu@email.com"
                onInput={handleEmailInput}
                className={`w-full px-4 py-3 rounded-lg border-2 ${errors.email
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                    : 'border-gray-200 focus:border-primary focus:ring-primary/10'
                  } focus:ring-4 outline-none transition-all duration-300 shadow-sm hover:shadow-md bg-white`}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Role Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-3"
            >
              <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                {t('contact.role')}
              </label>

              <div className="flex gap-4 flex-wrap">
                {/* Huésped Button */}
                <motion.button
                  type="button"
                  onClick={() => setRole('guest')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex-1 min-w-[140px] flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 transition-all duration-300 shadow-sm
                    ${role === 'guest'
                      ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/20'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-primary/50 hover:shadow-md'
                    }
                  `}
                >
                  <UserCheck className="w-5 h-5" />
                  <span className="font-semibold">{t('contact.guest')}</span>
                </motion.button>

                {/* Anfitrión Button */}
                <motion.button
                  type="button"
                  onClick={() => setRole('host')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex-1 min-w-[140px] flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 transition-all duration-300 shadow-sm
                    ${role === 'host'
                      ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/20'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-primary/50 hover:shadow-md'
                    }
                  `}
                >
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">{t('contact.host')}</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Guest Section */}
            {role === 'guest' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 pt-4"
              >
                <div className="space-y-2">
                  <label htmlFor="guestIdeas" className="text-gray-700 font-medium text-sm">
                    {t('contact.guestIdeasLabel')}
                  </label>
                  <textarea
                    id="guestIdeas"
                    placeholder={t('contact.guestIdeasPlaceholder')}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md resize-none bg-white"
                  />
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  {t('contact.guestNote')}
                </p>
              </motion.div>
            )}

            {/* Host Section */}
            {role === 'host' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 pt-4"
              >
                {/* Property Type Radio Buttons */}
                <div className="space-y-3">
                  <label className="text-gray-700 font-medium text-sm">{t('contact.propertyType')}</label>
                  <div className="flex gap-4 flex-wrap">
                    {[
                      { value: 'cabaña', label: t('contact.types.cabin'), icon: Home },
                      { value: 'alberca', label: t('contact.types.pool'), icon: Droplet },
                      { value: 'camping', label: t('contact.types.camping'), icon: Tent }
                    ].map((option) => {
                      const selected = propertyType === option.value;
                      return (
                        <motion.button
                          key={option.value}
                          type="button"
                          onClick={() => setPropertyType(option.value)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-pressed={selected}
                          className={`
                            flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all duration-300 shadow-sm
                            ${selected
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-gray-200 bg-white text-gray-600 hover:border-primary/50'
                            }
                          `}
                        >
                          <option.icon className="w-4 h-4" />
                          <span className="font-medium">{option.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Amenities Section */}
                {propertyType && (
                  <div className="space-y-3">
                    <label className="text-gray-700 font-medium text-sm">{t('contact.amenities')}</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {(() => {
                        // Definir amenidades por tipo de espacio
                        const amenitiesByType = {
                          'cabaña': [
                            { value: 'wifi', label: 'WiFi', icon: Wifi },
                            { value: 'tv', label: 'TV', icon: Tv },
                            { value: 'cocina', label: t('contact.amenitiesList.kitchen'), icon: ChefHat },
                            { value: 'lavadora', label: t('contact.amenitiesList.washer'), icon: WashingMachine },
                            { value: 'refrigerador', label: t('contact.amenitiesList.fridge'), icon: Refrigerator },
                            { value: 'aire', label: t('contact.amenitiesList.ac'), icon: Wind },
                            { value: 'calefaccion', label: t('contact.amenitiesList.heating'), icon: Thermometer },
                            { value: 'estacionamiento', label: t('contact.amenitiesList.parking'), icon: ParkingSquare },
                            { value: 'sala', label: t('contact.amenitiesList.livingRoom'), icon: Armchair },
                            { value: 'comedor', label: t('contact.amenitiesList.diningRoom'), icon: Utensils },
                            { value: 'chimenea', label: t('contact.amenitiesList.fireplace'), icon: Flame },
                            { value: 'utensilios', label: t('contact.amenitiesList.utensils'), icon: UtensilsCrossed }
                          ],
                          'alberca': [
                            { value: 'camastros', label: t('contact.amenitiesList.sunbeds'), icon: Armchair },
                            { value: 'sombrillas', label: t('contact.amenitiesList.umbrellas'), icon: Umbrella },
                            { value: 'mesas', label: t('contact.amenitiesList.tables'), icon: Table2 },
                            { value: 'bocina', label: t('contact.amenitiesList.speaker'), icon: Volume2 },
                            { value: 'asador', label: t('contact.amenitiesList.grill'), icon: UtensilsCrossed },
                            { value: 'regaderas', label: t('contact.amenitiesList.showers'), icon: Bath },
                            { value: 'vestidores', label: t('contact.amenitiesList.changingRooms'), icon: DoorClosed },
                            { value: 'palapa', label: t('contact.amenitiesList.palapa'), icon: Sun },
                            { value: 'hieleras', label: t('contact.amenitiesList.coolers'), icon: ShoppingBag }
                          ],
                          'camping': [
                            { value: 'areaTiendas', label: t('contact.amenitiesList.tentArea'), icon: Tent },
                            { value: 'areaTechada', label: t('contact.amenitiesList.coveredArea'), icon: Home },
                            { value: 'fogata', label: t('contact.amenitiesList.bonfire'), icon: Sparkles },
                            { value: 'banosPortatiles', label: t('contact.amenitiesList.portableToilets'), icon: DoorClosed },
                            { value: 'mesas', label: t('contact.amenitiesList.tables'), icon: Table2 },
                            { value: 'electricidad', label: t('contact.amenitiesList.electricity'), icon: Lightbulb },
                            { value: 'iluminacion', label: t('contact.amenitiesList.lighting'), icon: Lightbulb },
                            { value: 'estacionamiento', label: t('contact.amenitiesList.parking'), icon: ParkingSquare }
                          ]
                        };

                        // Obtener amenidades del tipo seleccionado
                        const availableAmenities = amenitiesByType[propertyType] || [];

                        return availableAmenities.map((amenity) => {
                          const selected = amenities.includes(amenity.value);
                          return (
                            <motion.button
                              key={amenity.value}
                              type="button"
                              onClick={() => setAmenities(prev => selected ? prev.filter(v => v !== amenity.value) : [...prev, amenity.value])}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              aria-pressed={selected}
                              className={`
                                flex items-center justify-center gap-2 px-3 py-3 rounded-lg border-2 transition-all duration-300 shadow-sm min-h-[48px]
                                ${selected
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'border-gray-200 bg-white text-gray-600 hover:border-primary/50'
                                }
                              `}
                            >
                              <amenity.icon className="w-4 h-4 flex-shrink-0" />
                              <span className="font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis">{amenity.label}</span>
                            </motion.button>
                          );
                        });
                      })()}
                    </div>
                  </div>
                )}

                {/* Place Name */}
                <div className="space-y-2">
                  <label htmlFor="placeName" className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                    <Home className="w-4 h-4 text-primary" />
                    {t('contact.placeName')}
                  </label>
                  <input
                    id="placeName"
                    type="text"
                    placeholder={t('contact.placeNamePlaceholder')}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md bg-white"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label htmlFor="address" className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    {t('contact.address')}
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder={t('contact.addressPlaceholder')}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md bg-white"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label htmlFor="hostDescription" className="text-gray-700 font-medium text-sm">
                    {t('contact.hostDescriptionLabel')}
                  </label>
                  <textarea
                    id="hostDescription"
                    placeholder={t('contact.hostDescriptionPlaceholder')}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md resize-none bg-white"
                  />
                </div>

                {/* File Upload Area */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium text-sm">
                    {t('contact.uploadPhotos')}
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                      relative border-2 border-dashed rounded-lg p-8 transition-all duration-300
                      ${isDragging
                        ? 'border-primary bg-primary/5 scale-105'
                        : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'
                      }
                    `}
                  >
                    <input
                      type="file"
                      id="fileUpload"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center text-center space-y-3">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Upload className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">
                          {t('contact.uploadTitle')}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {t('contact.uploadSubtitle')}
                        </p>
                      </div>
                      <p className="text-xs text-gray-400">
                        {t('contact.uploadLimit')}
                      </p>
                    </div>
                  </div>

                  {/* Preview de archivos subidos */}
                  {uploadedFiles.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                      {uploadedFiles.map((file, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="relative group"
                        >
                          <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {file.name}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  {t('contact.hostNote')}
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            {role && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="pt-6"
              >
                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isFormValid()}
                  whileHover={!isSubmitting && isFormValid() ? { scale: 1.02, boxShadow: '0 0 30px rgba(60, 162, 162, 0.4)' } : {}}
                  whileTap={!isSubmitting && isFormValid() ? { scale: 0.98 } : {}}
                  className={`w-full py-4 rounded-lg font-semibold shadow-lg transition-all duration-300 ${isSubmitting || !isFormValid()
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary to-primary/80 text-white hover:shadow-xl'
                    }`}
                >
                  {isSubmitting ? 'Enviando...' : t('contact.send')}
                </motion.button>

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-lg bg-red-50 border-2 border-red-200 text-red-700 text-center font-medium"
                  >
                    ❌ Error al enviar el formulario
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center text-sm text-gray-500 mt-8"
        >
          {t('contact.bottomNote')}
        </motion.p>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={t('contact.successModal.title')}
        message={t('contact.successModal.message')}
        buttonText={t('contact.successModal.button')}
      />
    </section>
  );
}