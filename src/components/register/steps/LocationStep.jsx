import React from "react";
import { motion } from "motion/react";
import { MapPin, Building2 } from "lucide-react";
import { ESTADOS_MEXICO } from "../constants/states";

export const LocationStep = ({ formData, setFormData }) => {
  const mapRef = React.useRef(null);
  const [map, setMap] = React.useState(null);
  const [marker, setMarker] = React.useState(null);
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

      // Actualizar solo coordenadas cuando el usuario mueva el marcador
      newMarker.addListener('dragend', (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setFormData(prev => ({
          ...prev,
          coordinates: { lat: lat.toString(), lng: lng.toString() }
        }));
      });

      // Permitir hacer clic en el mapa para colocar el pin
      newMap.addListener('click', (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        newMarker.setPosition({ lat, lng });
        setFormData(prev => ({
          ...prev,
          coordinates: { lat: lat.toString(), lng: lng.toString() }
        }));
      });

      setMap(newMap);
      setMarker(newMarker);
    };

    initMap();
  }, []);

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
        <p className="text-sm font-medium text-primary">
          Arrastra el pin o haz clic en el mapa para indicar la ubicación exacta de tu propiedad.
        </p>
        <div
          ref={mapRef}
          className="w-full h-96 rounded-lg border-2 border-gray-200 overflow-hidden bg-gray-100"
        />
      </div>
    </motion.div>
  );
};
