import { useEffect, useRef } from 'react';
import { MapPin, Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const technologies = [
  { name: 'Stripe', icon: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
      <path d="M13.479 9.883c-1.626-.604-2.512-1.067-2.512-1.803 0-.622.511-.977 1.423-.977 1.667 0 3.379.642 4.558 1.22l.666-4.111c-.935-.446-2.847-1.177-5.49-1.177-1.87 0-3.425.489-4.536 1.401-1.155.954-1.757 2.334-1.757 4 0 3.023 1.847 4.312 4.847 5.403 1.936.688 2.579 1.178 2.579 1.934 0 .732-.629 1.155-1.762 1.155-1.403 0-3.716-.689-5.231-1.578l-.674 4.157c1.304.732 3.705 1.488 6.197 1.488 1.976 0 3.624-.467 4.735-1.357 1.245-.977 1.89-2.422 1.89-4.289 0-3.091-1.889-4.38-4.933-5.466h.004z"/>
    </svg>
  )},
  { name: 'Google Maps', icon: MapPin },
  { name: 'Firebase', icon: Flame },
  { name: 'Android', icon: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
      <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.5 11.5 0 0 0-8.94 0L5.65 5.67c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18C2.92 10.82 1 13.97 1 17.6h22c0-3.63-1.92-6.78-5.4-8.12M7.43 15.5c-.46 0-.84-.35-.84-.78s.38-.78.84-.78.84.35.84.78-.38.78-.84.78m9.14 0c-.46 0-.84-.35-.84-.78s.38-.78.84-.78.84.35.84.78-.38.78-.84.78"/>
    </svg>
  )},
  { name: 'iOS', icon: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  )},
  { name: 'NexDevCode', icon: () => (
    <svg viewBox="0 0 190 48" className="w-auto" style={{ height: '48px' }}>
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
  )},
];

export function TechCarousel() {
  const { t } = useTranslation();
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 1;
    let animationId;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // When we reach the midpoint, reset to beginning for seamless loop
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    // Start the animation
    scroll();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Frosted background */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
      
      <div className="relative">
        <h3 className="text-center text-gray-700 mb-8 font-semibold">{t('tech.powered_by')}</h3>
        
        <div 
          ref={scrollRef}
          className="overflow-hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-12 w-max px-6">
            {/* Duplicate items for seamless loop */}
            {[...technologies, ...technologies].map((tech, index) => (
              <div 
                key={index}
                className="flex flex-col items-center gap-3 min-w-[120px]"
              >
                <div className="text-[#3CA2A2] h-12 flex items-center justify-center">
                  {typeof tech.icon === 'function' ? (
                    <tech.icon />
                  ) : (
                    <tech.icon className="w-12 h-12" />
                  )}
                </div>
                <span className="text-sm text-gray-700 font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}