import { motion } from "framer-motion";
import { Rocket, Search, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-white via-gray-50/30 to-white mb-1">
      {/* Animated water ripple background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3CA2A2] rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3CA2A2] rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Coming Soon Animated Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#3CA2A2]/10 to-[#3CA2A2]/5 border border-[#3CA2A2]/30 backdrop-blur-sm">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-2 h-2 rounded-full bg-[#3CA2A2]"
            />
            <span className="text-sm text-gray-700">{t('about.comingSoon')}</span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-gray-900 mb-8 bg-gradient-to-r from-gray-900 via-[#3CA2A2] to-gray-900 bg-clip-text text-transparent">
            {t('about.title1')}
            <br />
            {t('about.title2')}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Floating Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16 mb-20">
          {[
            {
              icon: <Rocket className="w-7 h-7" />,
              title: t('about.cards.launch.title'),
              description: t('about.cards.launch.description'),
              delay: 0
            },
            {
              icon: <Search className="w-7 h-7" />,
              title: t('about.cards.search.title'),
              description: t('about.cards.search.description'),
              delay: 0.2
            },
            {
              icon: <Shield className="w-7 h-7" />,
              title: t('about.cards.reserve.title'),
              description: t('about.cards.reserve.description'),
              delay: 0.4
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: card.delay }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#3CA2A2]/20 to-[#3CA2A2]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="text-[#3CA2A2] mb-5 group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <h3 className="text-gray-900 mb-2 font-semibold text-base sm:text-lg md:text-xl">{card.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <p className="text-lg text-gray-500 mb-6">{t('about.developedBy')}</p>
          
          <div className="flex justify-center items-center">
            <svg viewBox="0 0 190 48" className="w-auto" style={{ height: '78px' }}>
              <style>
                {`.teal { fill: #3CA2A2; } .dark { fill: #333333; }`}
              </style>
              <g transform="translate(18, 0)">
                <path className="teal" d="M8 12 L14 12 L24 28 L18 28 L8 12 Z M26 12 L32 12 L32 36 L26 36 L26 12 Z"/>
                <text x="38" y="24" fontSize="14" fontFamily="'Segoe UI', sans-serif">
                  <tspan className="teal">Nex</tspan><tspan className="dark">DevCode</tspan>
                </text>
                <text x="38" y="34" className="dark" fontSize="6" letterSpacing="1" fontFamily="'Segoe UI', sans-serif">
                  SOFTWARE DEVELOPMENT
                </text>
              </g>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}