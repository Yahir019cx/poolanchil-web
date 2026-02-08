import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export default function ComingSoonSection() {
  const poolChillLogo = '/images/poolChillLogo.png';
  const appStoreIcon = '/images/app-store-icon.svg'; // O usa una URL de CDN
  const playStoreIcon = '/images/play-store-icon.svg'; // O usa una URL de CDN
  const { t } = useTranslation();

  // Estado para el contador regresivo
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Calcular tiempo restante hasta febrero 2026
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2026-02-28T00:00:00');
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animación de burbujas flotantes
  const bubbles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15,
  }));

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#E8F5F5] via-white to-[#F0F9F9]" >

      {/* Burbujas flotantes animadas */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-br from-[#3CA2A2]/20 to-transparent backdrop-blur-sm border border-white/30"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            bottom: '-10%',
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 0.6, 0],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Contenido principal */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 sm:pt-32 pb-20">
        {/* Título principal con gradiente */}
        <motion.h1
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl mb-2 sm:mb-4 bg-gradient-to-r from-[#2B8080] via-[#3CA2A2] to-[#2B8080] bg-clip-text text-transparent leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          {t('download.title')}
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-600 mb-2 sm:mb-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          {t('download.subtitle')}
        </motion.p>

        {/* Mockup de ícono de app */}
        <motion.div
          className="w-36 h-32 sm:w-40 sm:h-36 md:w-64 md:h-56 lg:w-72 lg:h-64 mx-auto mb-0 mt-2 sm:mt-4 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <img
            src={poolChillLogo}
            alt="Pool&Chill App Icon"
            className="w-36 h-32 sm:w-40 sm:h-36 md:w-64 md:h-56 lg:w-72 lg:h-64 object-contain"
          />
        </motion.div>

        {/* Contador Regresivo */}
        <motion.div
          className="mb-8 -mt-6 sm:-mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
        >
          <h3 className="text-lg md:text-xl text-gray-600 mb-4 font-medium">
            {t('download.launchCountdown')}
          </h3>

          <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6">
            {/* Días */}
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative bg-white/40 backdrop-blur-lg rounded-2xl p-3 sm:p-4 md:p-6 shadow-xl border border-white/60 min-w-[70px] sm:min-w-[90px] md:min-w-[110px]">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3CA2A2]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <motion.div
                    className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-br from-[#2B8080] to-[#3CA2A2] bg-clip-text text-transparent"
                    key={timeLeft.days}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {String(timeLeft.days).padStart(2, '0')}
                  </motion.div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-500 mt-1 font-medium">
                    {t('download.days')}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Separador animado */}
            <motion.div
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3CA2A2]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              :
            </motion.div>

            {/* Horas */}
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative bg-white/40 backdrop-blur-lg rounded-2xl p-3 sm:p-4 md:p-6 shadow-xl border border-white/60 min-w-[70px] sm:min-w-[90px] md:min-w-[110px]">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3CA2A2]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <motion.div
                    className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-br from-[#2B8080] to-[#3CA2A2] bg-clip-text text-transparent"
                    key={timeLeft.hours}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {String(timeLeft.hours).padStart(2, '0')}
                  </motion.div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-500 mt-1 font-medium">
                    {t('download.hours')}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Separador animado */}
            <motion.div
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3CA2A2]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            >
              :
            </motion.div>

            {/* Minutos */}
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative bg-white/40 backdrop-blur-lg rounded-2xl p-3 sm:p-4 md:p-6 shadow-xl border border-white/60 min-w-[70px] sm:min-w-[90px] md:min-w-[110px]">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3CA2A2]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <motion.div
                    className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-br from-[#2B8080] to-[#3CA2A2] bg-clip-text text-transparent"
                    key={timeLeft.minutes}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </motion.div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-500 mt-1 font-medium">
                    {t('download.minutes')}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Separador animado */}
            <motion.div
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3CA2A2]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            >
              :
            </motion.div>

            {/* Segundos */}
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative bg-white/40 backdrop-blur-lg rounded-2xl p-3 sm:p-4 md:p-6 shadow-xl border border-white/60 min-w-[70px] sm:min-w-[90px] md:min-w-[110px]">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3CA2A2]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <motion.div
                    className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-br from-[#2B8080] to-[#3CA2A2] bg-clip-text text-transparent"
                    key={timeLeft.seconds}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </motion.div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-500 mt-1 font-medium">
                    {t('download.seconds')}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Botones de plataforma */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 -mt-3 mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        >
          {/* Botón App Store */}
          <motion.button
            className="group relative px-8 py-4 rounded-2xl bg-white/30 backdrop-blur-md border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-300 min-w-[280px]"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#3CA2A2]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center gap-3">
              {/* SVG del ícono de Apple */}
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs sm:text-sm text-gray-500">{t('download.availableOn')}</div>
                <div className="text-gray-800 font-semibold">{t('download.appStore')}</div>
              </div>
            </div>
          </motion.button>

          {/* Botón Google Play */}
          <motion.button
            className="group relative px-8 py-4 rounded-2xl bg-white/30 backdrop-blur-md border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-300 min-w-[280px]"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#3CA2A2]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center gap-3">
              {/* SVG del ícono de Google Play */}
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs sm:text-sm text-gray-500">{t('download.availableOn')}</div>
                <div className="text-gray-800 font-semibold">{t('download.googlePlay')}</div>
              </div>
            </div>
          </motion.button>
        </motion.div>

        {/* Línea animada / Loading indicator */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-[#3CA2A2]"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-[#3CA2A2]"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-[#3CA2A2]"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />
        </motion.div>

        {/* Texto adicional */}
        <motion.p
          className="text-sm text-gray-500 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
        >
          {t('download.releaseNote')}
        </motion.p>
      </div>

      {/* Reflejo de luz sutil */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#3CA2A2]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
}