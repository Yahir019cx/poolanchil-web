import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Toast } from '../components/ui/Toast';
import {
  WelcomeStep,
  PersonalDataStep,
  EmailVerificationStep,
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

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const STORAGE_KEY = 'poolandchill_onboarding';

// Guardar formData en sessionStorage (excluyendo File objects)
const saveFormToStorage = (data, step) => {
  try {
    const toSave = { ...data, photos: [], ineFiles: [] };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      formData: toSave,
      currentStep: step,
      timestamp: Date.now()
    }));
  } catch (e) {
    // Error silencioso - sessionStorage no disponible
  }
};

const loadFormFromStorage = () => {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    // Expirar después de 2 horas
    if (Date.now() - parsed.timestamp > 2 * 60 * 60 * 1000) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch (e) {
    sessionStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

const clearFormStorage = () => {
  sessionStorage.removeItem(STORAGE_KEY);
};

export default function Register() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasExchangedSession = useRef(false);

  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success' // 'success' | 'error' | 'warning'
  });

  // Función para mostrar notificación
  const showToast = (message, type = 'success') => {
    setToast({
      isVisible: true,
      message,
      type
    });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

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
    whatsappConsent: false,

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
    'Verificación de email',
    '¿Qué ofreces?',
    'Ubicación',
    'Información básica',
    'Amenidades',
    'Reglas',
    'Verificación INE',
    'Fotos',
    'Vista previa'
  ];

  // Auto-guardar en sessionStorage después de verificación de email
  useEffect(() => {
    if (currentStep >= 3) {
      saveFormToStorage(formData, currentStep);
    }
  }, [formData, currentStep]);

  // Auto-login después de verificación de email + callback de Didit
  useEffect(() => {
    const handleSearchParams = async () => {
      const sessionToken = searchParams.get('session');
      const errorStatus = searchParams.get('status');
      const errorMessage = searchParams.get('message');
      const verificationSessionId = searchParams.get('verificationSessionId');

      // Caso: Retorno de Didit
      if (verificationSessionId) {
        setIsLoading(true);
        try {
          // Restaurar datos del formulario desde sessionStorage
          const saved = loadFormFromStorage();
          if (saved) {
            setFormData(prev => ({ ...prev, ...saved.formData, photos: [], ineFiles: [] }));
          }

          // Verificar estado con backend
          const accessToken = localStorage.getItem('accessToken');
          if (accessToken && errorStatus === 'Approved') {
            const response = await fetch(`${API_BASE_URL}/verification/status`, {
              headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            const result = await response.json();

            if (result.data?.isVerified) {
              setCurrentStep(9); // Ir a Fotos (siguiente paso después de INE)
              showToast('¡Verificación de identidad completada!', 'success');
            } else {
              setCurrentStep(8); // Volver a INE step para reintentar
              showToast('Verificación en proceso. Espera un momento.', 'warning');
            }
          } else {
            // Didit retornó con estado no aprobado
            const savedFallback = loadFormFromStorage();
            setCurrentStep(savedFallback?.currentStep || 8);
            if (errorStatus && errorStatus !== 'Approved') {
              showToast('La verificación no fue aprobada. Intenta de nuevo.', 'error');
            }
          }

          setSearchParams({});
        } catch (error) {
          const saved = loadFormFromStorage();
          setCurrentStep(saved?.currentStep || 8);
          setSearchParams({});
        } finally {
          setIsLoading(false);
        }
        return;
      }

      // Caso de error (email verification)
      if (errorStatus === 'error') {
        showToast(errorMessage || 'Error al verificar el email', 'error');
        setSearchParams({});
        setCurrentStep(0);
        return;
      }

      // Caso exitoso - intercambiar session token
      if (sessionToken && !hasExchangedSession.current) {
        hasExchangedSession.current = true;
        setIsLoading(true);

        try {
          const response = await fetch(`${API_BASE_URL}/auth/exchange-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionToken }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al intercambiar sesión');
          }

          const data = await response.json();

          // Guardar tokens en localStorage
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          localStorage.setItem('userId', data.user.userId);

          // Limpiar la URL
          setSearchParams({});

          // Posicionar en paso 3 (PropertyTypeStep)
          setCurrentStep(3);
        } catch (error) {
          showToast(error.message || 'Error al iniciar sesión. Intenta de nuevo.', 'error');
          setCurrentStep(0);
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleSearchParams();
  }, [searchParams, setSearchParams]);

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
      if (!formData.whatsappConsent) newErrors.whatsappConsent = 'Debes aceptar el consentimiento para continuar';
    }

    if (step === 3) {
      if (formData.propertyTypes.length === 0) {
        newErrors.propertyTypes = 'Selecciona al menos un tipo de espacio';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = async () => {
    // Paso 1: Enviar POST /auth/register
    if (currentStep === 1) {
      if (!validateStep(currentStep)) return;

      setIsLoading(true);

      try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: `+52${formData.phoneNumber}`, // Formato internacional México
            password: formData.password,
            dateOfBirth: formData.dateOfBirth,
            gender: parseInt(formData.gender),
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Error al registrar usuario');
        }

        // Registro exitoso → avanzar al paso 2 (EmailVerificationStep)
        setCurrentStep(2);
      } catch (error) {
        showToast(error.message || 'Error al registrar. Intenta de nuevo.', 'error');
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Otros pasos: validación y avance normal
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

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const accessToken = localStorage.getItem('accessToken');
      const userId = localStorage.getItem('userId');

      if (!accessToken || !userId) {
        throw new Error('No se encontró sesión activa. Por favor, inicia sesión.');
      }

      // 1. Subir imágenes a Firebase Storage
      const { uploadMultipleImages } = await import('../utils/uploadImages');

      const imageUrls = await uploadMultipleImages(
        formData.photos,
        'properties',
        userId
      );

      // 2. Construir el JSON en el formato esperado por el backend
      const propertyData = {
        services: {
          hasPool: formData.propertyTypes.includes('pool'),
          hasCabin: formData.propertyTypes.includes('cabin'),
          hasCamping: formData.propertyTypes.includes('camping')
        },
        location: {
          street: formData.street,
          exteriorNumber: formData.number,
          interiorNumber: formData.interiorNumber || null,
          neighborhood: formData.municipality,
          zipCode: formData.zipCode,
          stateId: 1, // TODO: Mapear estado a stateId
          cityId: 1, // TODO: Mapear municipio a cityId
          latitude: parseFloat(formData.coordinates.lat) || 0,
          longitude: parseFloat(formData.coordinates.lng) || 0,
          googlePlaceId: formData.googlePlaceId || null,
          formattedAddress: `${formData.street} ${formData.number}, ${formData.municipality}, ${formData.state}`
        },
        basicInfo: {
          propertyName: formData.propertyName,
          description: formData.description,
          ...(formData.propertyTypes.includes('pool') && {
            pool: {
              checkInTime: formData.checkIn,
              checkOutTime: formData.checkOut,
              maxHours: parseInt(formData.maxHours) || 12,
              minHours: 4,
              priceWeekday: parseFloat(formData.priceWeekday),
              priceWeekend: parseFloat(formData.priceWeekend)
            }
          }),
          ...(formData.propertyTypes.includes('cabin') && {
            cabin: {
              checkInTime: formData.checkIn,
              checkOutTime: formData.checkOut,
              minNights: 1,
              priceWeekday: parseFloat(formData.priceWeekday),
              priceWeekend: parseFloat(formData.priceWeekend)
            }
          }),
          ...(formData.propertyTypes.includes('camping') && {
            camping: {
              checkInTime: formData.checkIn,
              checkOutTime: formData.checkOut,
              minNights: 1,
              priceWeekday: parseFloat(formData.priceWeekday),
              priceWeekend: parseFloat(formData.priceWeekend)
            }
          })
        },
        amenities: {
          ...(formData.propertyTypes.includes('pool') && {
            pool: {
              maxPersons: parseInt(formData.poolAmenities.maxPeople) || 0,
              temperatureMin: parseInt(formData.poolAmenities.tempMin) || 20,
              temperatureMax: parseInt(formData.poolAmenities.tempMax) || 28,
              items: formData.poolAmenities.features?.map((f, i) => ({
                amenityId: f.id || i + 1,
                quantity: f.quantity || 1
              })) || []
            }
          }),
          ...(formData.propertyTypes.includes('cabin') && {
            cabin: {
              maxGuests: parseInt(formData.cabinAmenities.maxGuests) || 0,
              bedrooms: parseInt(formData.cabinAmenities.bedrooms) || 0,
              singleBeds: parseInt(formData.cabinAmenities.singleBeds) || 0,
              doubleBeds: parseInt(formData.cabinAmenities.doubleBeds) || 0,
              fullBathrooms: parseInt(formData.cabinAmenities.fullBathrooms) || 0,
              halfBathrooms: parseInt(formData.cabinAmenities.halfBathrooms) || 0,
              items: formData.cabinAmenities.features?.map((f, i) => ({
                amenityId: f.id || i + 1,
                quantity: f.quantity || 1
              })) || []
            }
          }),
          ...(formData.propertyTypes.includes('camping') && {
            camping: {
              maxPersons: parseInt(formData.campingAmenities.maxPeople) || 0,
              areaSquareMeters: parseInt(formData.campingAmenities.squareMeters) || 0,
              approxTents: parseInt(formData.campingAmenities.tents) || 0,
              items: formData.campingAmenities.features?.map((f, i) => ({
                amenityId: f.id || i + 1,
                quantity: f.quantity || 1
              })) || []
            }
          })
        },
        rules: formData.rules
          .filter(rule => rule.trim() !== '')
          .map((rule, index) => ({
            text: rule,
            order: index + 1
          })),
        images: imageUrls.map((url, index) => ({
          url: url,
          isPrimary: index === 0,
          order: index + 1
        }))
      };

      // 3. Enviar al backend
      const response = await fetch(`${API_BASE_URL}/properties`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(propertyData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear la propiedad');
      }

      await response.json();

      // 4. Limpiar datos guardados y mostrar éxito
      clearFormStorage();
      showToast('¡Propiedad registrada exitosamente! Será revisada por nuestro equipo.', 'success');

      // Esperar 2 segundos antes de redirigir para que el usuario vea la notificación
      setTimeout(() => {
        navigate('/'); // O la ruta que corresponda
      }, 2000);

    } catch (error) {
      showToast(error.message || 'Error al enviar el registro. Por favor, intenta de nuevo.', 'error');
    } finally {
      setIsLoading(false);
    }
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
        return <EmailVerificationStep email={formData.email} />;

      case 3:
        return (
          <PropertyTypeStep
            formData={formData}
            handlePropertyTypeToggle={handlePropertyTypeToggle}
            errors={errors}
          />
        );

      case 4:
        return <LocationStep formData={formData} setFormData={setFormData} />;

      case 5:
        return <BasicInfoStep formData={formData} setFormData={setFormData} />;

      case 6:
        return <AmenitiesStep formData={formData} setFormData={setFormData} />;

      case 7:
        return (
          <RulesStep
            formData={formData}
            addRule={addRule}
            updateRule={updateRule}
            removeRule={removeRule}
          />
        );

      case 8:
        return (
          <INEStep
            onComplete={nextStep}
          />
        );

      case 9:
        return (
          <PhotosStep
            formData={formData}
            handleFileUpload={handleFileUpload}
            removeFile={removeFile}
          />
        );

      case 10:
        return <PreviewStep formData={formData} handleSubmit={handleSubmit} isLoading={isLoading} />;

      default:
        return null;
    }
  };

  // Loading durante intercambio de sesión
  if (isLoading && searchParams.get('session')) {
    return (
      <>
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />
        <section className="relative min-h-screen py-20 px-6 overflow-hidden bg-gradient-to-b from-white via-primary/5 to-white mb-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xl font-semibold text-gray-700">Verificando tu cuenta...</p>
            <p className="text-gray-500">Por favor espera un momento</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

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
            {currentStep > 0 && currentStep !== 2 && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <motion.button
                  onClick={prevStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:border-primary hover:text-primary transition-all duration-300 flex items-center gap-2"
                  disabled={isLoading}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Anterior
                </motion.button>

                {currentStep < steps.length - 1 && (
                  <motion.button
                    onClick={nextStep}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Cargando...
                      </>
                    ) : (
                      <>
                        Siguiente
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
}
