/**
 * Utilidad para descifrar payloads encriptados con AES-256-GCM + scrypt
 * Compatible con el backend que usa scryptSync(key, salt, 32)
 */
import { scrypt } from 'scrypt-js';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;
const SALT = 'pool-and-chill-salt';

/**
 * Descifra un payload encriptado por el backend con AES-256-GCM + scrypt
 * @param {string} encryptedData - String base64url con [16 IV] + [16 AuthTag] + [encrypted]
 * @returns {Promise<Object>} - Objeto JSON descifrado
 */
export async function decryptPayload(encryptedData) {
  const encoder = new TextEncoder();

  // 1. Derivar key con scrypt (mismos params que backend: N=32768, r=8, p=1, dkLen=32)
  const passwordBytes = encoder.encode(ENCRYPTION_KEY);
  const saltBytes = encoder.encode(SALT);
  const derivedKey = await scrypt(passwordBytes, saltBytes, 16384, 8, 1, 32);

  // 2. Decodificar base64url a Uint8Array
  const base64 = encryptedData.replace(/-/g, '+').replace(/_/g, '/');
  const combined = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

  // 3. Separar IV (16 bytes), AuthTag (16 bytes), Encrypted data
  const iv = combined.slice(0, 16);
  const authTag = combined.slice(16, 32);
  const encrypted = combined.slice(32);

  // 4. Concatenar encrypted + authTag (Web Crypto espera el tag al final del ciphertext)
  const ciphertext = new Uint8Array(encrypted.length + authTag.length);
  ciphertext.set(encrypted, 0);
  ciphertext.set(authTag, encrypted.length);

  // 5. Importar key y descifrar con AES-GCM
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    derivedKey,
    'AES-GCM',
    false,
    ['decrypt']
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv, tagLength: 128 },
    cryptoKey,
    ciphertext
  );

  return JSON.parse(new TextDecoder().decode(decrypted));
}

// --- Funciones legacy (PBKDF2) usadas por Contact page ---

async function getPbkdf2KeyMaterial(password) {
  const enc = new TextEncoder();
  return window.crypto.subtle.importKey(
    'raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveBits', 'deriveKey']
  );
}

async function getPbkdf2Key(keyMaterial, salt) {
  return window.crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
}

/**
 * Cifra un objeto usando AES-GCM con PBKDF2 (usado por Contact page)
 */
export async function encryptData(data) {
  const jsonString = JSON.stringify(data);
  const enc = new TextEncoder();
  const encodedData = enc.encode(jsonString);

  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const keyMaterial = await getPbkdf2KeyMaterial(ENCRYPTION_KEY);
  const key = await getPbkdf2Key(keyMaterial, salt);

  const encryptedData = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encodedData
  );

  const encryptedArray = new Uint8Array(encryptedData);
  const resultArray = new Uint8Array(salt.length + iv.length + encryptedArray.length);
  resultArray.set(salt, 0);
  resultArray.set(iv, salt.length);
  resultArray.set(encryptedArray, salt.length + iv.length);

  return btoa(String.fromCharCode(...resultArray));
}
