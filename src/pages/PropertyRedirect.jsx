import { useParams } from "react-router-dom";
import { motion } from "motion/react";

const logo = "/images/poolChillLogo.png";

const STORE_URL_IOS = "https://apps.apple.com/mx/app/poolandchill/id6759678889";
const STORE_URL_ANDROID =
  "https://play.google.com/store/apps/details?id=com.poolandchill.app";

export default function PropertyRedirect() {
  const { id } = useParams();

  const propertyUrl = `https://poolandchill.com.mx/property/${id}`;
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isAndroid = /android/i.test(navigator.userAgent);

  // Intent URL para Android: si la app no está instalada, cae al Play Store
  const androidIntentUrl = `intent://poolandchill.com.mx/property/${id}#Intent;scheme=https;package=com.poolandchill.app;S.browser_fallback_url=${encodeURIComponent(STORE_URL_ANDROID)};end`;

  const handleOpenApp = (e) => {
    e.preventDefault();

    if (isAndroid) {
      // Intent URL maneja todo: abre app o cae a Play Store
      window.location.href = androidIntentUrl;
    } else {
      // iOS: intentar abrir en Safari externo (Universal Links)
      // Si la app no está instalada, la página se queda visible → ir a App Store
      const now = Date.now();
      window.open(propertyUrl, "_blank");

      // Si después de 1.5s la página sigue visible, la app no está instalada
      const checkVisibility = () => {
        if (!document.hidden && Date.now() - now >= 1500) {
          window.location.href = STORE_URL_IOS;
        }
      };
      setTimeout(checkVisibility, 1500);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-[#E8F5F5] via-white to-[#F0F9F9] flex flex-col items-center justify-center px-6 font-['Montserrat',sans-serif] relative overflow-hidden">
      {/* Reflejo de luz decorativo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#3CA2A2]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Contenido */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-sm w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo */}
        <img
          src={logo}
          alt="Pool & Chill"
          className="w-48 md:w-56 mb-6"
        />

        {/* Card */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl border border-white/60 p-8 w-full">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
            <svg
              className="w-7 h-7 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </div>

          <h1 className="text-xl font-bold text-dark mb-2">
            Ver en la app
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Esta propiedad está disponible en Pool&nbsp;&&nbsp;Chill.
            Abre la app para ver todos los detalles.
          </p>

          {/* Botón principal */}
          <motion.a
            href={propertyUrl}
            onClick={handleOpenApp}
            className="block w-full py-3.5 rounded-2xl bg-primary text-white font-semibold text-base shadow-md hover:bg-secondary transition-colors duration-300 text-center"
            whileTap={{ scale: 0.97 }}
          >
            Abrir en Pool & Chill
          </motion.a>

          {/* Separador */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">
              ¿No tienes la app?
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Botones de tiendas */}
          <div className="flex gap-3">
            {/* App Store */}
            <a
              href={STORE_URL_IOS}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-dark text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              App Store
            </a>

            {/* Google Play */}
            <a
              href={STORE_URL_ANDROID}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-dark text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              Google Play
            </a>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          poolandchill.com.mx
        </p>
      </motion.div>
    </div>
  );
}
