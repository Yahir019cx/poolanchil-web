import { useState } from 'react';
import { Languages, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLang = i18n.language === 'es' ? 'ES' : 'EN';

  const languages = [
    { code: 'ES', langCode: 'es', name: t('language.spanish'), flag: '🇪🇸' },
    { code: 'EN', langCode: 'en', name: t('language.english'), flag: '🇺🇸' },
  ];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Botón principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2.5 text-gray-700 hover:text-primary transition-colors hover:bg-gray-50 rounded-lg"
      >
        <Languages className="w-5 h-5 lg:w-6 lg:h-6" />
        <span className="hidden lg:inline text-lg font-medium">{currentLang}</span>
        <ChevronDown className={`hidden lg:block w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop para cerrar al hacer click afuera */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-20">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.langCode)}
                className={`w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                  currentLang === lang.code ? 'text-primary bg-primary/5' : 'text-gray-700'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="text-base font-medium">{lang.name}</span>
                {currentLang === lang.code && (
                  <span className="ml-auto text-primary">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}