import { motion } from 'framer-motion';

const bubbles = [
  { size: 18, x: '10%',  delay: 0,   duration: 7  },
  { size: 10, x: '22%',  delay: 1.5, duration: 9  },
  { size: 24, x: '38%',  delay: 0.8, duration: 8  },
  { size: 12, x: '52%',  delay: 2.2, duration: 6  },
  { size: 20, x: '65%',  delay: 0.3, duration: 10 },
  { size: 8,  x: '78%',  delay: 1.1, duration: 7  },
  { size: 16, x: '88%',  delay: 2.8, duration: 9  },
  { size: 14, x: '5%',   delay: 3.5, duration: 8  },
  { size: 22, x: '45%',  delay: 1.8, duration: 11 },
  { size: 9,  x: '92%',  delay: 0.6, duration: 6  },
];

export default function Maintenance() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-white">

      {/* Bubbles */}
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            background: 'rgba(60, 162, 162, 0.18)',
            border: '1.5px solid rgba(60, 162, 162, 0.35)',
          }}
          animate={{ y: [0, -(600 + b.size * 10)], opacity: [0, 0.8, 0] }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: 'easeIn',
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-8 py-12 max-w-sm w-full mx-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Icon */}
        <motion.img
          src="/poolChillicon.png"
          alt="PoolChill"
          className="w-32 mb-10 drop-shadow-md"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        {/* Title */}
        <motion.h1
          className="text-3xl font-bold mb-3 tracking-tight"
          style={{ color: '#063940' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          Sitio en mantenimiento
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base leading-relaxed mb-8"
          style={{ color: '#3CA2A2' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          Estamos mejorando la experiencia para ti.
          <br />
          Volvemos muy pronto.
        </motion.p>

        {/* Divider */}
        <motion.div
          className="w-12 h-0.5 rounded-full mb-8"
          style={{ background: '#3CA2A2', opacity: 0.4 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        />

        {/* Status dot */}
        <motion.div
          className="flex items-center gap-2 text-sm"
          style={{ color: '#215A6D' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
        >
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ background: '#3CA2A2' }}
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          Trabajando en ello...
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.p
        className="absolute bottom-5 text-xs z-10"
        style={{ color: '#3CA2A2', opacity: 0.5 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
      >
        © {new Date().getFullYear()} PoolChill
      </motion.p>
    </div>
  );
}
