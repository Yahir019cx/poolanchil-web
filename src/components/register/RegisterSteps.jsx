import React from "react";
import { motion } from "motion/react";
import {
  User,
  Mail,
  Lock,
  Calendar,
  Phone,
  MapPin,
  Home,
  Droplet,
  Tent,
  ChevronRight,
  Check,
  Upload,
  X,
  DollarSign,
  Clock,
  FileText,
  CreditCard,
  Eye,
  EyeOff,
  Minus,
  Plus,
  Building2,
  Thermometer,
  Users,
  Bed,
  Bath,
  Ruler,
  TreePine,
  Wifi,
  Tv,
  ChefHat,
  WashingMachine,
  Refrigerator,
  Wind,
  ParkingCircle,
  Armchair,
  Utensils,
  Flame,
  Volume2,
  Umbrella,
  Table2,
  ShoppingBag,
  Sun,
  Lightbulb,
  AlertCircle,
  Waves,
  Shirt,
  LifeBuoy,
} from "lucide-react";

// Estados de México
export const ESTADOS_MEXICO = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de México",
  "Coahuila",
  "Colima",
  "Durango",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "México",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
];

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

// Paso 1: Datos Personales CON VALIDACIONES
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
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) =>
              setFormData({ ...formData, dateOfBirth: e.target.value })
            }
            className={`w-full px-4 py-3 rounded-lg border-2 ${
              errors.dateOfBirth ? "border-red-400" : "border-gray-200"
            } focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white`}
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

// Paso 2: ¿Qué ofreces?
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

// Componente Spinner para contadores
const SpinnerInput = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  icon: Icon,
}) => (
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
        onChange={(e) =>
          onChange(Math.min(max, Math.max(min, parseInt(e.target.value) || 0)))
        }
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
export const LocationStep = ({ formData, setFormData }) => {
  const mapRef = React.useRef(null);
  const [map, setMap] = React.useState(null);
  const [marker, setMarker] = React.useState(null);
  const [isLoadingCoordinates, setIsLoadingCoordinates] = React.useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = React.useState(false);

  // Inicializar Google Maps
  React.useEffect(() => {
    const initMap = async () => {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

      if (!apiKey || !mapRef.current) return;

      // Cargar el script de Google Maps
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = () => {
          createMap();
        };
      } else {
        createMap();
      }
    };

    const createMap = () => {
      // Coordenadas iniciales (Centro de México)
      const initialPosition = {
        lat: formData.coordinates.lat ? parseFloat(formData.coordinates.lat) : 19.4326,
        lng: formData.coordinates.lng ? parseFloat(formData.coordinates.lng) : -99.1332
      };

      const newMap = new window.google.maps.Map(mapRef.current, {
        center: initialPosition,
        zoom: 15,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
      });

      const newMarker = new window.google.maps.Marker({
        position: initialPosition,
        map: newMap,
        draggable: true,
        title: 'Arrastra para ajustar la ubicación'
      });

      // Función para geocodificación inversa (coordenadas -> dirección)
      const reverseGeocode = async (lat, lng) => {
        const geocoder = new window.google.maps.Geocoder();
        setIsLoadingCoordinates(true);

        try {
          const result = await geocoder.geocode({ location: { lat, lng } });

          if (result.results && result.results[0]) {
            const addressComponents = result.results[0].address_components;

            // Extraer componentes de dirección
            let street = '';
            let number = '';
            let state = '';
            let municipality = '';
            let zipCode = '';

            addressComponents.forEach(component => {
              const types = component.types;

              if (types.includes('route')) {
                street = component.long_name;
              } else if (types.includes('street_number')) {
                number = component.long_name;
              } else if (types.includes('administrative_area_level_1')) {
                state = component.long_name;
              } else if (types.includes('locality') || types.includes('administrative_area_level_2')) {
                municipality = component.long_name;
              } else if (types.includes('postal_code')) {
                zipCode = component.long_name;
              }
            });

            // Actualizar formData con la dirección y coordenadas
            setFormData(prev => ({
              ...prev,
              street: street || prev.street,
              number: number || prev.number,
              state: state || prev.state,
              municipality: municipality || prev.municipality,
              zipCode: zipCode || prev.zipCode,
              coordinates: { lat: lat.toString(), lng: lng.toString() }
            }));
          }
        } catch (error) {
          console.error('Error en geocodificación inversa:', error);
          // Si falla, al menos actualizar las coordenadas
          setFormData(prev => ({
            ...prev,
            coordinates: { lat: lat.toString(), lng: lng.toString() }
          }));
        } finally {
          setIsLoadingCoordinates(false);
        }
      };

      // Actualizar coordenadas y dirección cuando el usuario mueva el marcador arrastrándolo
      newMarker.addListener('dragend', (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        reverseGeocode(lat, lng);
      });

      // Permitir hacer clic en el mapa para colocar el pin y actualizar dirección
      newMap.addListener('click', (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        // Mover el marcador a la nueva posición
        newMarker.setPosition({ lat, lng });

        // Actualizar coordenadas y hacer geocodificación inversa
        reverseGeocode(lat, lng);
      });

      setMap(newMap);
      setMarker(newMarker);
    };

    initMap();
  }, []);

  // Geocodificar dirección cuando cambie
  React.useEffect(() => {
    const geocodeAddress = async () => {
      if (!window.google || !map) return;

      const fullAddress = [
        formData.street,
        formData.number,
        formData.municipality,
        formData.state,
        formData.zipCode,
        'México'
      ]
        .filter(Boolean)
        .join(', ');

      if (!fullAddress || fullAddress === ', México') return;

      setIsLoadingCoordinates(true);

      const geocoder = new window.google.maps.Geocoder();

      try {
        const result = await geocoder.geocode({ address: fullAddress });

        if (result.results && result.results[0]) {
          const location = result.results[0].geometry.location;
          const lat = location.lat();
          const lng = location.lng();

          // Actualizar mapa y marcador
          map.setCenter({ lat, lng });
          marker.setPosition({ lat, lng });

          // Actualizar coordenadas en el formulario (ocultas del usuario)
          setFormData({
            ...formData,
            coordinates: { lat: lat.toString(), lng: lng.toString() }
          });
        }
      } catch (error) {
        console.error('Error geocodificando dirección:', error);
      } finally {
        setIsLoadingCoordinates(false);
      }
    };

    // Debounce para evitar muchas llamadas a la API
    const timeoutId = setTimeout(geocodeAddress, 1000);
    return () => clearTimeout(timeoutId);
  }, [formData.street, formData.number, formData.municipality, formData.state, formData.zipCode, map, marker]);

  // Detectar ubicación actual del usuario
  const detectCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Tu navegador no soporta geolocalización');
      return;
    }

    setIsDetectingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        if (map && marker) {
          // Centrar el mapa en la ubicación actual
          map.setCenter({ lat, lng });
          marker.setPosition({ lat, lng });

          // Hacer geocodificación inversa para obtener la dirección
          const geocoder = new window.google.maps.Geocoder();

          try {
            const result = await geocoder.geocode({ location: { lat, lng } });

            if (result.results && result.results[0]) {
              const addressComponents = result.results[0].address_components;

              let street = '';
              let number = '';
              let state = '';
              let municipality = '';
              let zipCode = '';

              addressComponents.forEach(component => {
                const types = component.types;

                if (types.includes('route')) {
                  street = component.long_name;
                } else if (types.includes('street_number')) {
                  number = component.long_name;
                } else if (types.includes('administrative_area_level_1')) {
                  state = component.long_name;
                } else if (types.includes('locality') || types.includes('administrative_area_level_2')) {
                  municipality = component.long_name;
                } else if (types.includes('postal_code')) {
                  zipCode = component.long_name;
                }
              });

              setFormData({
                ...formData,
                street: street || formData.street,
                number: number || formData.number,
                state: state || formData.state,
                municipality: municipality || formData.municipality,
                zipCode: zipCode || formData.zipCode,
                coordinates: { lat: lat.toString(), lng: lng.toString() }
              });
            }
          } catch (error) {
            console.error('Error en geocodificación inversa:', error);
            // Si falla, al menos actualizar las coordenadas
            setFormData({
              ...formData,
              coordinates: { lat: lat.toString(), lng: lng.toString() }
            });
          }
        }

        setIsDetectingLocation(false);
      },
      (error) => {
        console.error('Error obteniendo ubicación:', error);
        alert('No se pudo obtener tu ubicación. Por favor, verifica los permisos del navegador.');
        setIsDetectingLocation(false);
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Ubicación
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            Calle
          </label>
          <input
            type="text"
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
            placeholder="123"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            Estado
          </label>
          <select
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
          >
            <option value="">Selecciona un estado</option>
            {ESTADOS_MEXICO.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            Municipio
          </label>
          <input
            type="text"
            value={formData.municipality}
            onChange={(e) =>
              setFormData({ ...formData, municipality: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
            placeholder="Aguascalientes"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
          <MapPin className="w-4 h-4 text-primary" />
          Código Postal
        </label>
        <input
          type="text"
          value={formData.zipCode}
          onChange={(e) =>
            setFormData({ ...formData, zipCode: e.target.value })
          }
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
          placeholder="20000"
        />
      </div>

      {/* Mapa de Google Maps */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            Ubicación en el mapa
          </label>
          <motion.button
            type="button"
            onClick={detectCurrentLocation}
            disabled={isDetectingLocation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isDetectingLocation ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Detectando...</span>
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4" />
                <span>Usar mi ubicación</span>
              </>
            )}
          </motion.button>
        </div>
        <div
          ref={mapRef}
          className="w-full h-96 rounded-lg border-2 border-gray-200 overflow-hidden bg-gray-100"
        />
        {isLoadingCoordinates && (
          <div className="flex items-center gap-2 text-sm text-primary">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span>Buscando ubicación...</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Paso 4: Información Básica
export const BasicInfoStep = ({ formData, setFormData }) => {
  // Determinar el tipo de renta basado en los tipos de propiedad seleccionados
  const hasPool = formData.propertyTypes.includes("pool");
  const hasCabin = formData.propertyTypes.includes("cabin");
  const hasCamping = formData.propertyTypes.includes("camping");

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
          <input
            type="time"
            value={formData.checkIn}
            onChange={(e) =>
              setFormData({ ...formData, checkIn: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
            <Clock className="w-4 h-4 text-primary" />
            Check-Out
          </label>
          <input
            type="time"
            value={formData.checkOut}
            onChange={(e) =>
              setFormData({ ...formData, checkOut: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
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

// Continuará en el siguiente archivo debido a la longitud...
// Paso 5: Amenidades
export const AmenitiesStep = ({ formData, setFormData }) => {
  const hasPool = formData.propertyTypes.includes("pool");
  const hasCabin = formData.propertyTypes.includes("cabin");
  const hasCamping = formData.propertyTypes.includes("camping");

  const toggleFeature = (type, feature) => {
    const amenityKey = `${type}Amenities`;
    const currentFeatures = formData[amenityKey].features;
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((f) => f !== feature)
      : [...currentFeatures, feature];

    setFormData({
      ...formData,
      [amenityKey]: {
        ...formData[amenityKey],
        features: newFeatures,
      },
    });
  };

  const poolFeatures = [
    { value: "camastros", label: "Camastros", icon: Armchair },
    { value: "sombrillas", label: "Sombrillas", icon: Umbrella },
    { value: "mesas", label: "Mesas", icon: Table2 },
    { value: "asador", label: "Asador", icon: Flame },
    { value: "regaderas", label: "Regaderas", icon: Waves },
    { value: "vestidores", label: "Vestidores", icon: Shirt },
    { value: "banos", label: "Baños", icon: Bath },
    { value: "palapa", label: "Palapa / Sombra", icon: Sun },
    { value: "hielera", label: "Hielera", icon: ShoppingBag },
    { value: "bocina", label: "Bocina(s)", icon: Volume2 },
    { value: "refrigerador", label: "Refrigerador", icon: Refrigerator },
    { value: "barra", label: "Barra", icon: Table2 },
    { value: "flotadores", label: "Flotadores", icon: LifeBuoy },
    { value: "sillas", label: "Sillas", icon: Armchair },
    { value: "estacionamiento", label: "Estacionamiento", icon: ParkingCircle },
    { value: "toallas", label: "Toallas", icon: Shirt },
  ];

  const cabinFeatures = [
    { value: "wifi", label: "WiFi", icon: Wifi },
    { value: "tv", label: "TV", icon: Tv },
    { value: "cocina", label: "Cocina", icon: ChefHat },
    { value: "lavadora", label: "Lavadora", icon: WashingMachine },
    { value: "refrigerador", label: "Refrigerador", icon: Refrigerator },
    { value: "ac", label: "A/C", icon: Wind },
    { value: "estacionamiento", label: "Estacionamiento", icon: ParkingCircle },
    { value: "sillones", label: "Sillones", icon: Armchair },
    { value: "microondas", label: "Microondas", icon: ChefHat },
    { value: "comedor", label: "Comedor", icon: Table2 },
    { value: "utensilios", label: "Utensilios de cocina", icon: Utensils },
    { value: "chimenea", label: "Chimenea", icon: Flame },
    { value: "bocina", label: "Bocina(s)", icon: Volume2 },
    { value: "toallas", label: "Toallas", icon: Shirt },
  ];

  const campingFeatures = [
    { value: "palapa", label: "Palapa / Sombra", icon: Sun },
    { value: "hielera", label: "Hielera", icon: ShoppingBag },
    { value: "bocina", label: "Bocina(s)", icon: Volume2 },
    { value: "estacionamiento", label: "Estacionamiento", icon: ParkingCircle },
    { value: "fogatero", label: "Fogatero", icon: Flame },
    { value: "lena", label: "Leña", icon: TreePine },
    { value: "mesas", label: "Mesas", icon: Table2 },
    { value: "asador", label: "Asador", icon: Flame },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Configuración de Amenidades
      </h2>

      {/* Alberca */}
      {hasPool && (
        <div className="space-y-6 p-6 bg-primary/5 rounded-xl border-2 border-primary/20">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Droplet className="w-6 h-6 text-gray-900" />
            Alberca
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SpinnerInput
              label="No. de personas"
              value={formData.poolAmenities.maxPeople}
              onChange={(val) =>
                setFormData({
                  ...formData,
                  poolAmenities: { ...formData.poolAmenities, maxPeople: val },
                })
              }
              icon={Users}
              max={50}
            />

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <Thermometer className="w-4 h-4 text-primary" />
                Rango de temperatura
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={formData.poolAmenities.tempMin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      poolAmenities: {
                        ...formData.poolAmenities,
                        tempMin: parseInt(e.target.value) || 20,
                      },
                    })
                  }
                  className="w-20 text-center px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
                  min="15"
                  max="40"
                />
                <span className="text-gray-600">°C -</span>
                <input
                  type="number"
                  value={formData.poolAmenities.tempMax}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      poolAmenities: {
                        ...formData.poolAmenities,
                        tempMax: parseInt(e.target.value) || 25,
                      },
                    })
                  }
                  className="w-20 text-center px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-white"
                  min="15"
                  max="40"
                />
                <span className="text-gray-600">°C</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-gray-700 font-medium text-sm mb-3 block">
              Amenidades
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {poolFeatures.map((feature) => {
                const selected = formData.poolAmenities.features.includes(
                  feature.value,
                );
                return (
                  <motion.button
                    key={feature.value}
                    type="button"
                    onClick={() => toggleFeature("pool", feature.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      flex items-center justify-center gap-2 px-3 py-3 rounded-lg border-2 transition-all duration-300 shadow-sm
                      ${
                        selected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-gray-200 bg-white text-gray-600 hover:border-primary/50"
                      }
                    `}
                  >
                    <feature.icon className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium text-xs">{feature.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Cabaña */}
      {hasCabin && (
        <div className="space-y-6 p-6 bg-primary/5 rounded-xl border-2 border-primary/20">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Home className="w-6 h-6 text-gray-900" />
            Cabaña
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <SpinnerInput
              label="No. de huéspedes"
              value={formData.cabinAmenities.maxGuests}
              onChange={(val) =>
                setFormData({
                  ...formData,
                  cabinAmenities: {
                    ...formData.cabinAmenities,
                    maxGuests: val,
                  },
                })
              }
              icon={Users}
              max={30}
            />
            <SpinnerInput
              label="Recámaras"
              value={formData.cabinAmenities.bedrooms}
              onChange={(val) =>
                setFormData({
                  ...formData,
                  cabinAmenities: { ...formData.cabinAmenities, bedrooms: val },
                })
              }
              icon={Home}
              max={10}
            />
            <SpinnerInput
              label="Camas individuales"
              value={formData.cabinAmenities.singleBeds}
              onChange={(val) =>
                setFormData({
                  ...formData,
                  cabinAmenities: {
                    ...formData.cabinAmenities,
                    singleBeds: val,
                  },
                })
              }
              icon={Bed}
              max={20}
            />
            <SpinnerInput
              label="Camas matrimoniales"
              value={formData.cabinAmenities.doubleBeds}
              onChange={(val) =>
                setFormData({
                  ...formData,
                  cabinAmenities: {
                    ...formData.cabinAmenities,
                    doubleBeds: val,
                  },
                })
              }
              icon={Bed}
              max={10}
            />
            <SpinnerInput
              label="Baños completos"
              value={formData.cabinAmenities.fullBathrooms}
              onChange={(val) =>
                setFormData({
                  ...formData,
                  cabinAmenities: {
                    ...formData.cabinAmenities,
                    fullBathrooms: val,
                  },
                })
              }
              icon={Bath}
              max={10}
            />
            <SpinnerInput
              label="Medios baños"
              value={formData.cabinAmenities.halfBathrooms}
              onChange={(val) =>
                setFormData({
                  ...formData,
                  cabinAmenities: {
                    ...formData.cabinAmenities,
                    halfBathrooms: val,
                  },
                })
              }
              icon={Bath}
              max={10}
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium text-sm mb-3 block">
              Amenidades
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {cabinFeatures.map((feature) => {
                const selected = formData.cabinAmenities.features.includes(
                  feature.value,
                );
                return (
                  <motion.button
                    key={feature.value}
                    type="button"
                    onClick={() => toggleFeature("cabin", feature.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      flex items-center justify-center gap-2 px-3 py-3 rounded-lg border-2 transition-all duration-300 shadow-sm
                      ${
                        selected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-gray-200 bg-white text-gray-600 hover:border-primary/50"
                      }
                    `}
                  >
                    <feature.icon className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium text-xs">{feature.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Camping */}
      {hasCamping && (
        <div className="space-y-6 p-6  bg-primary/5 rounded-xl border-2 border-primary/20">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Tent className="w-6 h-6 text-green-600" />
            Camping
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SpinnerInput
              label="No. de personas"
              value={formData.campingAmenities.maxPeople}
              onChange={(val) =>
                setFormData({
                  ...formData,
                  campingAmenities: {
                    ...formData.campingAmenities,
                    maxPeople: val,
                  },
                })
              }
              icon={Users}
              max={50}
            />
            <SpinnerInput
              label="m² de espacio"
              value={formData.campingAmenities.squareMeters}
              onChange={(val) =>
                setFormData({
                  ...formData,
                  campingAmenities: {
                    ...formData.campingAmenities,
                    squareMeters: val,
                  },
                })
              }
              icon={Ruler}
              max={1000}
            />
            <SpinnerInput
              label="Casas de campaña aprox."
              value={formData.campingAmenities.tents}
              onChange={(val) =>
                setFormData({
                  ...formData,
                  campingAmenities: {
                    ...formData.campingAmenities,
                    tents: val,
                  },
                })
              }
              icon={Tent}
              max={20}
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium text-sm mb-3 block">
              Amenidades
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {campingFeatures.map((feature) => {
                const selected = formData.campingAmenities.features.includes(
                  feature.value,
                );
                return (
                  <motion.button
                    key={feature.value}
                    type="button"
                    onClick={() => toggleFeature("camping", feature.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      flex items-center justify-center gap-2 px-3 py-3 rounded-lg border-2 transition-all duration-300 shadow-sm
                      ${
                        selected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-gray-200 bg-white text-gray-600 hover:border-primary/50"
                      }
                    `}
                  >
                    <feature.icon className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium text-xs">{feature.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Continuará con los pasos restantes en otro mensaje debido a la longitud del código...

// Por ahora exporto placeholders para los pasos restantes
export const RulesStep = ({ formData, addRule, updateRule, removeRule }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <h2 className="text-2xl font-bold mb-6">
      Reglas del Establecimiento (en desarrollo)
    </h2>
    <p className="text-gray-600">
      Este paso se completará en el siguiente mensaje...
    </p>
  </motion.div>
);

export const PhotosStep = ({ formData, handleFileUpload, removeFile }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <h2 className="text-2xl font-bold mb-6">Fotos (en desarrollo)</h2>
    <p className="text-gray-600">
      Este paso se completará en el siguiente mensaje...
    </p>
  </motion.div>
);

export const INEStep = ({ formData, handleFileUpload, removeFile }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <h2 className="text-2xl font-bold mb-6">
      Verificación INE (en desarrollo)
    </h2>
    <p className="text-gray-600">
      Este paso se completará en el siguiente mensaje...
    </p>
  </motion.div>
);

export const PaymentStep = ({ formData, setFormData }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <h2 className="text-2xl font-bold mb-6">Cuenta de Pago (en desarrollo)</h2>
    <p className="text-gray-600">
      Este paso se completará en el siguiente mensaje...
    </p>
  </motion.div>
);

export const PreviewStep = ({ formData, handleSubmit }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <h2 className="text-2xl font-bold mb-6">Vista Previa (en desarrollo)</h2>
    <p className="text-gray-600">
      Este paso se completará en el siguiente mensaje...
    </p>
  </motion.div>
);
