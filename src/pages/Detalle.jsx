import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Heart,
  ChevronLeft,
  ChevronRight,
  Star,
  Users,
  BedDouble,
  Bath,
  DoorOpen,
  MapPin,
  Wifi,
  Tv,
  UtensilsCrossed,
  Wind,
  Car,
  Flame,
  Volume2,
  Shirt,
  Clock,
  Ban,
  Dog,
  Music,
  Cigarette,
  PartyPopper,
  Baby,
  Calendar,
} from "lucide-react";

const images = [
  "/invitacion/aerea_atardecer.jpeg",
  "/invitacion/vista_noche.jpeg",
  "/invitacion/vista_largo.jpeg",
  "/invitacion/vista_aerea.jpeg",
  "/invitacion/ceremonia_vista.jpeg",
  "/invitacion/espejo_alberca.jpeg",
  "/invitacion/alberca.jpeg",
  "/invitacion/ceremonia_vista2.jpeg",
  "/invitacion/vista_generald.jpeg",
  "/invitacion/vista_generald2.jpeg",
];

const amenities = [
  { label: "Alberca agua termal", icon: Flame },
  { label: "Jacuzzi", icon: Bath },
  { label: "Terraza 100 personas", icon: Users },
  { label: "Cocina equipada", icon: UtensilsCrossed },
  { label: "Asador", icon: Flame },
  { label: "Fogatero", icon: Flame },
  { label: "Temazcal", icon: Star },
  { label: "Cancha deportiva", icon: MapPin },
  { label: "Estacionamiento", icon: Car },
];


const rules = [
  { icon: Clock, text: "Horario 12:00 pm a 12:00 am" },
  { icon: Users, text: "Capacidad máxima 100 personas" },
  { icon: Car, text: "Estacionamiento 15 vehículos" },
];


export default function Detalle() {
  const navigate = useNavigate();

  const [fav, setFav] = useState(false);
  const [showFavChip, setShowFavChip] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Google Maps
  const mapRef = useRef(null);

  const space = {
    name: "QUINTA 3 GARCIA",
    location: "Cerca de Valladolid",
    price: 8500,
    rating: 5,
    guests: 100,
    bedrooms: 3,
    beds: 5,
    bathrooms: 2,
    description:
    "Renta de terraza y alberca con agua termal. Ideal para fiestas y eventos. Cuenta con alberca 12x7 con jacuzzi, terraza para 100 personas, cocina equipada, asador, fogatero, temazcal, cancha deportiva, amplio jardín y estacionamiento interno. Excelente ubicación a unos pasos de Valladolid.",
    coordinates: { 
    lat: 22.026215, 
    lng: -102.3295232 
  },

  };

  // Carousel
  const next = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % images.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  // Fav chip
  const toggleFav = () => {
    const newFav = !fav;
    setFav(newFav);
    if (newFav) {
      setShowFavChip(true);
      setTimeout(() => setShowFavChip(false), 2000);
    }
  };

  // Google Maps init
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey || !mapRef.current) return;

    const createMap = () => {
      const position = {
        lat: space.coordinates.lat,
        lng: space.coordinates.lng,
      };

      const newMap = new window.google.maps.Map(mapRef.current, {
        center: position,
        zoom: 14,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      new window.google.maps.Marker({
        position,
        map: newMap,
        title: space.name,
      });
    };

    if (!window.google) {
      const existing = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existing) {
        existing.addEventListener("load", createMap);
        return;
      }
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = createMap;
      document.head.appendChild(script);
    } else {
      createMap();
    }
  }, []);

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-light/50 to-white pb-10">
      {/* Favorites chip */}
      <AnimatePresence>
        {showFavChip && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-6 left-1/2 z-50 bg-secondary text-white px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium"
          >
            <Heart className="w-4 h-4 fill-red-400 text-red-400" />
            Se agrego a favoritos
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Card */}
      <div className="max-w-4xl mx-auto px-4 pt-6 md:pt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
        >
          {/* Carousel */}
          <div className="relative w-full h-[280px] md:h-[450px] overflow-hidden bg-gray-200">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img
                key={index}
                src={images[index]}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
                alt={`Imagen ${index + 1}`}
              />
            </AnimatePresence>

            {/* Gradient overlay top */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

            {/* Back button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/invitacion")}
              className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-white transition-colors z-10"
            >
              <ArrowLeft className="w-5 h-5 text-secondary" />
            </motion.button>

            {/* Fav button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleFav}
              className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-white transition-colors z-10"
            >
              <motion.div
                animate={fav ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  className={`w-5 h-5 transition-colors duration-300 ${
                    fav
                      ? "fill-red-500 text-red-500"
                      : "text-gray-500 fill-transparent"
                  }`}
                />
              </motion.div>
            </motion.button>

            {/* Carousel arrows */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white p-2 rounded-full shadow-md transition-all z-10"
            >
              <ChevronLeft className="w-5 h-5 text-secondary" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white p-2 rounded-full shadow-md transition-all z-10"
            >
              <ChevronRight className="w-5 h-5 text-secondary" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-6 bg-white"
                      : "w-2 bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10 space-y-8">
            {/* Title & Rating */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-dark">
                    {space.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-1.5 text-gray-500">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm">{space.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-full shrink-0">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-dark text-sm">
                    {space.rating}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Property Details */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              {[
                {
                  icon: Users,
                  value: space.guests,
                  label: "Huespedes",
                },
                {
                  icon: DoorOpen,
                  value: space.bedrooms,
                  label: "Habitaciones",
                },
                { icon: BedDouble, value: space.beds, label: "Camas" },
                { icon: Bath, value: space.bathrooms, label: "Baños" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-light/50 border border-primary/10"
                >
                  <div className="p-2 rounded-xl bg-primary/10">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-dark">{item.value}</p>
                    <p className="text-xs text-gray-500">{item.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <h3 className="text-lg font-bold text-dark mb-3">
                Acerca de este espacio
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {space.description}
              </p>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-bold text-dark mb-4">
                Amenidades de la cabaña
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {amenities.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-primary/15 bg-white hover:bg-light/30 hover:border-primary/30 transition-all duration-200"
                  >
                    <item.icon className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-medium text-gray-700">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Check-in / Check-out */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.43 }}
            >
              <h3 className="text-lg font-bold text-dark mb-4">
                Horarios
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative p-5 rounded-2xl border border-primary/15 bg-light/30 flex flex-col items-center text-center">
                  <div className="p-2 rounded-xl bg-primary/10 mb-2">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-dark mb-1">Check-in</span>
                  <p className="text-xl font-bold text-primary">12:00 PM</p>
                </div>
                <div className="relative p-5 rounded-2xl border border-secondary/15 bg-secondary/5 flex flex-col items-center text-center">
                  <div className="p-2 rounded-xl bg-secondary/10 mb-2">
                    <Clock className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="text-sm font-semibold text-dark mb-1">Check-out</span>
                  <p className="text-xl font-bold text-secondary">12:00 AM</p>
                </div>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Rules */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <h3 className="text-lg font-bold text-dark mb-4">
                Reglas del espacio
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {rules.map((rule, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 + i * 0.05 }}
                    className="flex items-center gap-3 py-2"
                  >
                    <div className="p-2 rounded-lg bg-secondary/10 shrink-0">
                      <rule.icon className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-sm text-gray-600">{rule.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-dark">
                  Donde vas a estar
                </h3>
              </div>
              <div
                ref={mapRef}
                className="w-full h-72 md:h-96 rounded-2xl border border-gray-200 overflow-hidden bg-gray-100"
              />
              <p className="text-xs text-gray-400 mt-2">
                La ubicación marca el lugar exacto del evento.
              </p>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Price & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="p-6 rounded-2xl bg-light/40 border border-primary/10"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Precio desde*</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold text-dark">
                      ${space.price.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium text-gray-400">MXN</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 text-sm text-primary font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Sujeto a disposición</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-primary hover:bg-secondary text-white px-10 py-4 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-base"
                >
                  Reservar ahora
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
