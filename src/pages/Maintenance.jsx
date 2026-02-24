import { motion } from 'framer-motion';

const waves = [
  { delay: 0, duration: 6 },
  { delay: 1, duration: 7 },
  { delay: 2, duration: 5.5 },
];

export default function Maintenance() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #063940 0%, #215A6D 50%, #3CA2A2 100%)' }}
    >
      {/* Animated wave circles in background */}
      {waves.map((w, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-white/10"
          style={{ width: 300 + i * 200, height: 300 + i * 200 }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.05, 0.15] }}
          transition={{ duration: w.duration, delay: w.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Main card */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-8 py-12 max-w-md w-full mx-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Logo */}
        <motion.img
          src="/poolChillicon.png"
          alt="PoolChill"
          className="w-24 mb-8 drop-shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        {/* Icon */}
        <motion.div
          className="mb-6 text-white/90"
          animate={{ rotate: [0, -8, 8, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-3xl font-bold text-white mb-3 tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Sitio en mantenimiento
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-white/75 text-base leading-relaxed mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Estamos mejorando la experiencia para ti.
          <br />
          Volvemos muy pronto.
        </motion.p>

        {/* Divider */}
        <motion.div
          className="w-16 h-0.5 rounded-full mb-8"
          style={{ background: 'rgba(255,255,255,0.3)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        />

        {/* Status indicator */}
        <motion.div
          className="flex items-center gap-2 text-white/60 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          Trabajando en ello...
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.p
        className="absolute bottom-6 text-white/30 text-xs z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        © {new Date().getFullYear()} PoolChill
      </motion.p>
    </div>
  );
}
