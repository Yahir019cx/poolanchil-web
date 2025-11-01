import { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export function CircleCard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  // track if viewport is xs (below Tailwind's `sm` breakpoint: 640px)
  const [isXs, setIsXs] = useState(false);
  const poolChillLogo = '/images/poolChillLogo.png';
  const Mockup = '/images/iphone.png';

  useEffect(() => {
    if (!isExpanded) return;

    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded]);

  // media-query watcher: hide component on xs screens
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 639px)');
    const handler = (e) => setIsXs(e.matches);
    // set initial
    setIsXs(mq.matches);
    // add listener
    if (mq.addEventListener) {
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
    // fallback for older browsers
    mq.addListener && mq.addListener(handler);
    return () => mq.removeListener && mq.removeListener(handler);
  }, []);

  return (
    // if xs, don't render (disappear on small screens)
    isXs ? null : (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="relative">
        {/* Initial Circle State */}
        <div
          className={`transition-all duration-700 ease-in-out ${
            isExpanded ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
          }`}
        >
          {/* Text above circle */}
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              {t('circle.title_line1')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                {t('circle.title_line2')}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 font-medium">
              <Trans
                i18nKey="circle.subtitle"
                components={{
                  0: <span className="text-primary font-semibold" />
                }}
              />
            </p>
          </div>

          {/* Glowing Circle with Logo */}
          <button
            onClick={() => setIsExpanded(true)}
            className="relative group cursor-pointer"
          >
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full bg-primary blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
            
            {/* Circle */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full bg-white border-4 border-primary flex items-center justify-center group-hover:border-secondary transition-all duration-300 shadow-2xl group-hover:shadow-primary/50">
              <img
                src={poolChillLogo}
                alt={t('circle.logo_alt')}
                loading="lazy"
                decoding="async"
                className="w-40 h-40 md:w-52 md:h-52 object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </button>
        </div>

        {/* Expanded Card State */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out ${
            isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
          }`}
        >
          <div className="relative">
            {/* Card glow - MÁS TENUE */}
            <div className="absolute inset-0 rounded-3xl bg-primary blur-3xl opacity-15" />
            
            {/* Card content - Carta más pequeña */}
            <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-visible w-[700px] h-[360px]">
              <div className="grid grid-cols-[1.3fr_0.7fr] items-center h-full relative p-10 gap-4">
                {/* Text content - Columna izquierda, más desplazado a la derecha */}
                <div className="space-y-5 z-10 pl-16">
                  <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary leading-tight">
                    {t('circle.card_title')}
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed font-medium">
                    {t('circle.card_description')}
                  </p>
                  <button
                    onClick={() => navigate('/contacto')}
                    className="bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/50 font-semibold px-7 py-3 rounded-lg transition-all duration-300 text-sm shadow-lg"
                  >
                    {t('circle.card_button')}
                  </button>
                </div>

                {/* Mockup image - Columna derecha, saliendo de la carta */}
                <div className="relative z-20 flex justify-end items-center">
                  <div className="absolute right-0 transform translate-x-24 rotate-12 hover:rotate-6 transition-transform duration-300">
                    <img
                      src={Mockup}
                      alt={t('circle.app_alt')}
                      loading="lazy"
                      decoding="async"
                      className="object-contain drop-shadow-2xl w-64 h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    )
  );
}