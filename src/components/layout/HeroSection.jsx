import { Button } from '../ui/Button';
import { useTranslation, Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const heroImage = '/images/pool-hero-section-ball.jpg';

  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center">
      {/* Preload hero image for better LCP */}
      <link rel="preload" as="image" href={heroImage} />

      {/* Pool water background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`
        }}
      />
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full flex items-center justify-center md:justify-start pt-12 md:pt-16 lg:pt-20">
        <div className="max-w-3xl space-y-6 md:space-y-8 lg:space-y-10 -mt-40 md:-mt-52 lg:-mt-64 xl:-mt-72 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl lg:text-1xl xl:text-[7rem] font-black text-white leading-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]">
            <span className="block">
              {t('hero.title_pool')}
            </span>
            <span className="flex items-center justify-center md:justify-start gap-3 md:gap-4">
              <span className="text-primary drop-shadow-[0_0_40px_rgba(60,162,162,0.8)]">{t('hero.title_and')}</span>
              <span className="bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent">
                {t('hero.title_chill')}
              </span>
            </span>
          </h1>
          
          <p className="text-xl md:text-3xl lg:text-4xl xl:text-4xl font-light text-white tracking-wider">
            <Trans
              i18nKey="hero.subtitle"
              components={{
                1: <span className="font-black drop-shadow-[0_6px_20px_rgba(200,200,200,0.9)]" />,
                3: <span className="font-black drop-shadow-[0_6px_20px_rgba(200,200,200,0.9)]" />
              }}
            />
          </p>

          <div className="pt-1 flex justify-center md:justify-start">
            <Button
              onClick={() => navigate('/descargar')}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 text-sm md:text-base lg:text-base font-bold rounded-xl shadow-xl hover:shadow-primary/40 hover:scale-105 transition-all duration-300 hover:-translate-y-1"
            >
              {t('hero.button')}
            </Button>
          </div>
        </div>
      </div>

      {/* Wave shape at bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none -mb-1">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,128L80,138.7C160,149,320,171,480,160C640,149,800,107,960,101.3C1120,96,1280,128,1360,144L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}