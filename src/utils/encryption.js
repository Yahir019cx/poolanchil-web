/**
 * Utilidad para cifrar y descifrar datos usando AES-GCM
 * Usa Web Crypto API nativa del navegador
 */

// Clave secreta (en producción, deberías obtenerla de variables de entorno)
// IMPORTANTE: Esta clave debe ser la misma en el backend para descifrar
const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'poolandchill-secret-key-2025';

/**
 * Genera una clave de cifrado a partir de un string
 */
async function getKeyMaterial(password) {
  const enc = new TextEncoder();
  return window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
}

/**
 * Deriva una clave criptográfica
 */
async function getKey(keyMaterial, salt) {
  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
}

/**
 * Cifra un objeto usando AES-GCM
 * @param {Object} data - Datos a cifrar
 * @returns {Promise<string>} - Datos cifrados en base64
 */
export async function encryptData(data) {
  try {
    // Convertir objeto a JSON string
    const jsonString = JSON.stringify(data);
    const enc = new TextEncoder();
    const encodedData = enc.encode(jsonString);

    // Generar salt e IV aleatorios
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    // Obtener clave de cifrado
    const keyMaterial = await getKeyMaterial(SECRET_KEY);
    const key = await getKey(keyMaterial, salt);

    // Cifrar datos
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      encodedData
    );

    // Combinar salt + iv + datos cifrados
    const encryptedArray = new Uint8Array(encryptedData);
    const resultArray = new Uint8Array(salt.length + iv.length + encryptedArray.length);
    resultArray.set(salt, 0);
    resultArray.set(iv, salt.length);
    resultArray.set(encryptedArray, salt.length + iv.length);

    // Convertir a base64 para transmisión
    return btoa(String.fromCharCode(...resultArray));
  } catch (error) {
    console.error('Error al cifrar datos:', error);
    throw new Error('Error en el cifrado');
  }
}

/**
 * Descifra datos cifrados con AES-GCM (para uso en backend o testing)
 * @param {string} encryptedBase64 - Datos cifrados en base64
 * @returns {Promise<Object>} - Objeto descifrado
 */
export async function decryptData(encryptedBase64) {
  try {
    // Decodificar de base64
    const encryptedArray = new Uint8Array(
      atob(encryptedBase64)
        .split('')
        .map(char => char.charCodeAt(0))
    );

    // Extraer salt, iv y datos cifrados
    const salt = encryptedArray.slice(0, 16);
    const iv = encryptedArray.slice(16, 28);
    const data = encryptedArray.slice(28);

    // Obtener clave de cifrado
    const keyMaterial = await getKeyMaterial(SECRET_KEY);
    const key = await getKey(keyMaterial, salt);

    // Descifrar datos
    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      data
    );

    // Convertir de bytes a string y parsear JSON
    const dec = new TextDecoder();
    const jsonString = dec.decode(decryptedData);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error al descifrar datos:', error);
    throw new Error('Error en el descifrado');
  }
}
