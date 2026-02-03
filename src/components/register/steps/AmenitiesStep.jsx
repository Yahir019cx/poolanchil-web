import { motion } from "motion/react";
import { Droplet, Home, Tent, Users, Thermometer, Bath, Bed } from "lucide-react";
import { SpinnerInput } from "../shared/SpinnerInput";
import { poolFeatures, cabinFeatures, campingFeatures } from "../constants/amenities";

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
              icon={Users}
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
