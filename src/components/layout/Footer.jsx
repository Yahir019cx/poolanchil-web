import { Facebook, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function Footer() {
  const { t } = useTranslation();
  const poolChillLogo = '/images/poolChillLogo.png';
  
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
              <Link
                to="/terminos"
                className="hover:opacity-70 transition-opacity font-medium text-center"
              >
                {t('footer.terms')}
              </Link>
              <Link
                to="/privacidad"
                className="hover:opacity-70 transition-opacity font-medium text-center"
              >
                {t('footer.privacy')}
              </Link>
              
              {/* Social Media Icons */}
              <div className="flex gap-4 mt-2 justify-center items-center">
                <a 
                  href="https://www.facebook.com/profile.php?id=61587532944296&sk=about"  
                  className="w-10 h-10 rounded-full bg-[#3CA2A2]/10 hover:bg-[#3CA2A2]/20 flex items-center justify-center transition-colors"
                  aria-label={t('footer.facebook_label')}
                  target='_blank'
                >
                  <Facebook className="w-5 h-5 text-[#3CA2A2]" />
                </a>
                <a 
                  href="https://www.instagram.com/pool_andchill?igsh=MWIzZ2pleTk4ZGN1Yw==" 
                  className="w-10 h-10 rounded-full bg-[#3CA2A2]/10 hover:bg-[#3CA2A2]/20 flex items-center justify-center transition-colors"
                  aria-label={t('footer.instagram_label')}
                  target='_blank'
                >
                  <Instagram className="w-5 h-5 text-[#3CA2A2]" />
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

    </footer>
  );
}