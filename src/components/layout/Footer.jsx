import { Facebook, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import TermsModal from '../ui/TermsModal';
import PrivacyModal from '../ui/PrivacyModal';

export function Footer() {
  const { t } = useTranslation();
  const poolChillLogo = '/images/poolChillLogo.png';
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  
  return (
    <footer className="bg-white" style={{ boxShadow: '0 -2px 10px -1px rgba(0, 0, 0, 0.08), 0 -1px 4px -1px rgba(0, 0, 0, 0.04)' }}>
      {/* Main Footer Content */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-16 md:px-24 lg:px-32">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8">
            {/* Logo - Right aligned in its column */}
            <div className="flex items-center justify-center md:justify-end md:pr-36 lg:pr-64">
              <img 
                src={poolChillLogo} 
                alt="Pool & Chill" 
                className="h-16 md:h-20 w-auto"
              />
            </div>

            {/* Divider (vertical on desktop) - Thicker */}
            <div className="hidden md:block h-24 w-0.5 bg-[#3CA2A2]" />

            {/* Links and Social Media - Centered */}
            <div className="flex flex-col items-center justify-center gap-3 text-[#3CA2A2] md:pl-32 lg:pl-40">
              <button
                onClick={() => setIsTermsModalOpen(true)}
                className="hover:opacity-70 transition-opacity font-medium text-center"
              >
                {t('footer.terms')}
              </button>
              <button
                onClick={() => setIsPrivacyModalOpen(true)}
                className="hover:opacity-70 transition-opacity font-medium text-center"
              >
                {t('footer.privacy')}
              </button>
              
              {/* Social Media Icons */}
              <div className="flex gap-4 mt-2 justify-center items-center">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#3CA2A2]/10 hover:bg-[#3CA2A2]/20 flex items-center justify-center transition-colors"
                  aria-label={t('footer.facebook_label')}
                >
                  <Facebook className="w-5 h-5 text-[#3CA2A2]" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#3CA2A2]/10 hover:bg-[#3CA2A2]/20 flex items-center justify-center transition-colors"
                  aria-label={t('footer.instagram_label')}
                >
                  <Instagram className="w-5 h-5 text-[#3CA2A2]" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#3CA2A2]/10 hover:bg-[#3CA2A2]/20 flex items-center justify-center transition-colors"
                  aria-label={t('footer.tiktok_label')}
                >
                  <svg className="w-5 h-5 text-[#3CA2A2]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright - Thinner stripe */}
      <div className="bg-[#3CA2A2] py-1">
        <div className="max-w-7xl mx-auto px-16 md:px-24 lg:px-32">
          <p className="text-center text-sm text-white">
            {t('footer.copyright')}
          </p>
        </div>
      </div>

      {/* Modal de Términos y Condiciones */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />

      {/* Modal de Aviso de Privacidad */}
      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </footer>
  );
}