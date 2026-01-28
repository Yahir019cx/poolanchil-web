import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  WelcomeStep,
  PersonalDataStep,
  PropertyTypeStep,
  LocationStep,
  BasicInfoStep,
  AmenitiesStep,
  RulesStep,
  PhotosStep,
  INEStep,
  PaymentStep,
  PreviewStep
} from '../components/register/RegisterSteps';

export default function Register() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    // Datos personales
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
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
    rentType: '',
    maxHours: '',
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

  // Validaciones
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length === 10;
  };

  const validateName = (name) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    return regex.test(name);
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es requerido';
      else if (!validateName(formData.firstName)) newErrors.firstName = 'El nombre solo puede contener letras';

      if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
      else if (!validateName(formData.lastName)) newErrors.lastName = 'El apellido solo puede contener letras';

      if (!formData.email.trim()) newErrors.email = 'El correo es requerido';
      else if (!validateEmail(formData.email)) newErrors.email = 'Ingresa un correo válido';

      if (!formData.password) newErrors.password = 'La contraseña es requerida';
      else if (formData.password.length < 8) newErrors.password = 'La contraseña debe tener al menos 8 caracteres';

      if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirma tu contraseña';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';

      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'El teléfono es requerido';
      else if (!validatePhone(formData.phoneNumber)) newErrors.phoneNumber = 'El teléfono debe tener 10 dígitos';

      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'La fecha de nacimiento es requerida';
      if (!formData.gender) newErrors.gender = 'Selecciona tu género';
      if (!formData.estado) newErrors.estado = 'Selecciona tu estado';
    }

    if (step === 2) {
      if (formData.propertyTypes.length === 0) {
        newErrors.propertyTypes = 'Selecciona al menos un tipo de espacio';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (currentStep === 0 || validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
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
    if (formData.rules.length > 1) {
      setFormData(prev => ({
        ...prev,
        rules: prev.rules.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = () => {
    // Construir el JSON final
    const finalData = {
      user: {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        dateOfBirth: formData.dateOfBirth,
        gender: parseInt(formData.gender),
        phoneNumber: formData.phoneNumber,
        estado: formData.estado
      },
      properties: {
        espacio: formData.propertyTypes,
        nombre: formData.propertyName,
        descripcion: formData.description
      },
      direccion: {
        calle: formData.street,
        numero: formData.number,
        cp: formData.zipCode,
        estado: formData.state,
        municipio: formData.municipality,
        coordenadas: formData.coordinates
      },
      informacionBasica: {
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        tipoRenta: formData.rentType,
        horasMaximas: formData.maxHours,
        precioEntresemana: formData.priceWeekday,
        precioFinDeSemana: formData.priceWeekend
      },
      amenidades: {
        ...(formData.propertyTypes.includes('pool') && { alberca: formData.poolAmenities }),
        ...(formData.propertyTypes.includes('cabin') && { cabana: formData.cabinAmenities }),
        ...(formData.propertyTypes.includes('camping') && { camping: formData.campingAmenities })
      },
      reglas: formData.rules.filter(rule => rule.trim() !== ''),
      cuentaPago: {
        nombre: formData.accountName,
        numero: formData.accountNumber,
        banco: formData.bankName
      }
    };

    console.log('Datos del formulario:', finalData);
    alert('Formulario enviado! Revisa la consola para ver los datos.');
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 0:
        return <WelcomeStep nextStep={nextStep} />;

      case 1:
        return (
          <PersonalDataStep
            formData={formData}
            setFormData={setFormData}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            errors={errors}
            validateEmail={validateEmail}
            validatePhone={validatePhone}
            validateName={validateName}
          />
        );

      case 2:
        return (
          <PropertyTypeStep
            formData={formData}
            handlePropertyTypeToggle={handlePropertyTypeToggle}
            errors={errors}
          />
        );

      case 3:
        return <LocationStep formData={formData} setFormData={setFormData} />;

      case 4:
        return <BasicInfoStep formData={formData} setFormData={setFormData} />;

      case 5:
        return <AmenitiesStep formData={formData} setFormData={setFormData} />;

      case 6:
        return (
          <RulesStep
            formData={formData}
            addRule={addRule}
            updateRule={updateRule}
            removeRule={removeRule}
          />
        );

      case 7:
        return (
          <PhotosStep
            formData={formData}
            handleFileUpload={handleFileUpload}
            removeFile={removeFile}
          />
        );

      case 8:
        return (
          <INEStep
            formData={formData}
            handleFileUpload={handleFileUpload}
            removeFile={removeFile}
          />
        );

      case 9:
        return <PaymentStep formData={formData} setFormData={setFormData} />;

      case 10:
        return <PreviewStep formData={formData} handleSubmit={handleSubmit} />;

      default:
        return null;
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

                {currentStep < steps.length - 1 && (
                  <motion.button
                    onClick={nextStep}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  >
                    Siguiente
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
