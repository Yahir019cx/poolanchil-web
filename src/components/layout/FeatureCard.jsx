import { Button } from '../ui/Button';
import { Sparkles } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export function FeatureCard() {
  const { t } = useTranslation();
  const featureImage = '/images/CardFeature.jpg';
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[3rem] shadow-xl border border-[#3CA2A2]/20 overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="h-40 md:h-96 relative overflow-hidden">
              <img
                src={featureImage}
                alt={t('feature.alt_text')}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 bg-[#3CA2A2] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 animate-pulse">
                <Sparkles className="w-4 h-4" />
                {t('feature.badge')}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col justify-center items-center text-center">
              <h3 className="text-lg sm:text-xl md:text-3xl font-bold text-gray-900 mb-4 animate-in slide-in-from-bottom duration-500">
                {t('feature.title')}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-2 animate-in slide-in-from-bottom duration-700">
                {t('feature.description')}
              </p>
              <p className="text-sm sm:text-base text-gray-600 mb-8 animate-in slide-in-from-bottom duration-900">
                <Trans
                  i18nKey="feature.highlight"
                  components={{
                    0: <span className="font-semibold text-[#3CA2A2]" />
                  }}
                />
              </p>
              <Button
                onClick={() => navigate('/contacto')}
                className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base shadow-md hover:shadow-lg hover:scale-105 transition-all animate-in slide-in-from-bottom duration-1000"
              >
                {t('feature.button')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}