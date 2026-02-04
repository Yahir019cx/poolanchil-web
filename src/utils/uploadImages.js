import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Sube una imagen a Firebase Storage
 * @param {File} file - Archivo de imagen
 * @param {string} folder - Carpeta donde se guardará (ej: 'properties', 'profiles')
 * @param {string} userId - ID del usuario (opcional, para organizar por usuario)
 * @returns {Promise<string>} URL de descarga de la imagen
 */
export const uploadImage = async (file, folder = 'properties', userId = null) => {
  try {
    // Generar nombre único para el archivo
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split('.').pop();
    const fileName = `${timestamp}_${randomString}.${extension}`;

    // Crear referencia al storage
    const path = userId
      ? `${folder}/${userId}/${fileName}`
      : `${folder}/${fileName}`;

    const storageRef = ref(storage, path);

    // Subir archivo
    console.log(`⬆️  Subiendo imagen: ${fileName}`);
    const snapshot = await uploadBytes(storageRef, file);

    // Obtener URL de descarga
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log(`✅ Imagen subida: ${downloadURL}`);

    return downloadURL;
  } catch (error) {
    console.error('❌ Error al subir imagen:', error);
    throw new Error(`Error al subir imagen: ${error.message}`);
  }
};

/**
 * Sube múltiples imágenes a Firebase Storage
 * @param {File[]} files - Array de archivos de imagen
 * @param {string} folder - Carpeta donde se guardará
 * @param {string} userId - ID del usuario (opcional)
 * @param {Function} onProgress - Callback para reportar progreso (opcional)
 * @returns {Promise<string[]>} Array de URLs de descarga
 */
export const uploadMultipleImages = async (files, folder = 'properties', userId = null, onProgress = null) => {
  try {
    const totalFiles = files.length;
    const urls = [];

    for (let i = 0; i < totalFiles; i++) {
      const file = files[i];

      // Reportar progreso
      if (onProgress) {
        onProgress({
          current: i + 1,
          total: totalFiles,
          percentage: Math.round(((i + 1) / totalFiles) * 100),
          fileName: file.name
        });
      }

      // Subir imagen
      const url = await uploadImage(file, folder, userId);
      urls.push(url);
    }

    console.log(`✅ Todas las imágenes subidas: ${urls.length} archivos`);
    return urls;
  } catch (error) {
    console.error('❌ Error al subir múltiples imágenes:', error);
    throw new Error(`Error al subir imágenes: ${error.message}`);
  }
};

/**
 * Valida que un archivo sea una imagen válida
 * @param {File} file - Archivo a validar
 * @param {number} maxSizeMB - Tamaño máximo en MB (default: 5)
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateImageFile = (file, maxSizeMB = 5) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  if (!validTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `Formato no válido. Solo se permiten: JPG, PNG, WebP`
    };
  }

  if (file.size > maxSizeBytes) {
    return {
      isValid: false,
      error: `El archivo es muy grande. Máximo ${maxSizeMB}MB`
    };
  }

  return { isValid: true, error: null };
};
