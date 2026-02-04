import { motion, AnimatePresence } from "motion/react";
import { Camera, Upload, X, AlertCircle, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

export const PhotosStep = ({ formData, handleFileUpload, removeFile }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files, "photos");
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files, "photos");
    }
  };

  const getFileSize = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <Camera className="w-8 h-8 text-primary" />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Fotos del Lugar
        </h2>
      </div>

      <p className="text-gray-600 mb-6">
        Sube imágenes de tu espacio para mostrar a los huéspedes
      </p>

      {/* Chip de aviso */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 flex items-start gap-3 mb-6">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-semibold mb-1">Requisitos de las imágenes</p>
          <ul className="space-y-1">
            <li>• Formato: JPG, PNG o WebP</li>
            <li>• Tamaño máximo: 5 MB por imagen</li>
            <li>• Cantidad máxima: 10 fotos</li>
          </ul>
        </div>
      </div>

      {/* Dropzone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
          dragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-primary/50 bg-white"
        }`}
      >
        <input
          type="file"
          id="photo-upload"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="text-center space-y-4">
          <motion.div
            animate={{
              scale: dragActive ? 1.1 : 1,
            }}
            className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto"
          >
            <Upload className="w-8 h-8 text-primary" />
          </motion.div>

          <div>
            <p className="text-lg font-semibold text-gray-700 mb-1">
              Arrastra tus fotos aquí
            </p>
            <p className="text-sm text-gray-500">
              o{" "}
              <label
                htmlFor="photo-upload"
                className="text-primary font-medium cursor-pointer hover:underline"
              >
                haz clic para seleccionar
              </label>
            </p>
          </div>

          <p className="text-xs text-gray-400">
            {formData.photos.length} de 10 fotos subidas
          </p>
        </div>
      </div>

      {/* Vista previa de fotos en horizontal */}
      {formData.photos.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Fotos subidas ({formData.photos.length})
          </h3>

          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4">
              <AnimatePresence mode="popLayout">
                {formData.photos.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="relative flex-shrink-0 group"
                  >
                    <div className="w-64 h-48 rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Overlay con información */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex flex-col items-center justify-center text-white p-3">
                      <ImageIcon className="w-8 h-8 mb-2" />
                      <p className="text-sm font-medium truncate w-full text-center">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-300">
                        {getFileSize(file.size)}
                      </p>
                      <p className="text-xs text-gray-300 uppercase">
                        {file.type.split("/")[1]}
                      </p>
                    </div>

                    {/* Botón de eliminar */}
                    <motion.button
                      type="button"
                      onClick={() => removeFile(index, "photos")}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>

                    {/* Número de foto */}
                    <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      #{index + 1}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje cuando no hay fotos */}
      {formData.photos.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <Camera className="w-16 h-16 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Aún no has subido ninguna foto</p>
        </motion.div>
      )}
    </motion.div>
  );
};
