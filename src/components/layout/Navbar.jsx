import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export default function Navbar() {
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const menuItems = [
    { key: 'home', label: t('nav.home') },
    { key: 'about', label: t('nav.about') },
    { key: 'contact', label: t('nav.contact') },
    { key: 'download', label: t('nav.download') }
  ];
  const poolChillLogo = '/images/poolChillLogo.png';

  const routes = {
    'home': '/',
    'about': '/nosotros',
    'contact': '/contacto',
    'download': '/descargar'
  };

  const handleNavigation = (itemKey) => {
    setActiveItem(itemKey);
    navigate(routes[itemKey]);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="w-full px-6 md:px-12 lg:px-20 py-0">
        <div className="flex items-center justify-between md:justify-between">
          {/* Mobile Menu Button - Left */}
          <div className="md:hidden flex items-center gap-3">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo - Centered on mobile, left on desktop */}
          <div className="flex items-center flex-shrink-0 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <img 
              src={poolChillLogo} 
              alt="Pool & Chill" 
              className="h-10 md:h-14 lg:h-16 w-auto cursor-pointer"
              onClick={() => handleNavigation('home')}
            />
          </div>

          {/* Mobile Language Switcher - Right */}
          <div className="md:hidden flex items-center">
            <LanguageSwitcher />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-end flex-1 gap-6 lg:gap-16 ml-8">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavigation(item.key)}
                className="relative py-2 text-base lg:text-xl font-medium text-gray-700 hover:text-primary transition-colors whitespace-nowrap"
              >
                {item.label}
                {activeItem === item.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-in slide-in-from-left duration-300" />
                )}
              </button>
            ))}
            {/* Language Switcher */}           
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavigation(item.key)}
                  className={`text-left py-2 text-base font-medium transition-colors ${
                    activeItem === item.key ? 'text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}