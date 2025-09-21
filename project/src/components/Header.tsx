import React, { useState } from 'react';
import { Menu, X, Star, Globe, Settings } from 'lucide-react';
import { useLanguage, languages } from '../contexts/LanguageContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { currentLanguage, setLanguage, t } = useLanguage();
  const isRTL = currentLanguage.direction === 'rtl';

  const navItems = [
    { key: 'home', label: t('nav.home') },
    { key: 'about', label: t('nav.about') },
    { key: 'join', label: t('nav.join') },
    { key: 'myths', label: t('nav.myths') },
    { key: 'news', label: t('nav.news') },
    { key: 'advocacy', label: isRTL ? 'לומדים להסביר' : 'Learn to Advocate', comingSoon: true },
  ];

  // Check if user is admin (you can modify this logic as needed)
  const isAdmin = localStorage.getItem('ian_admin_access') === 'true';
  
  if (isAdmin) {
    navItems.push({ key: 'admin', label: isRTL ? 'ניהול' : 'Admin', icon: Settings });
  }

  return (
    <header className="bg-white shadow-lg border-b-2 border-blue-600 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo - Always on the start side */}
          <div 
            className="flex items-center cursor-pointer shrink-0"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-blue-600 p-2 rounded-lg me-3 shrink-0">
              <Star className="h-6 w-6 text-white" fill="currentColor" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-blue-800 leading-tight">
                {isRTL ? 'מערך ההסברה' : 'IAN Roblox'}
              </h1>
              <p className="text-xs text-blue-600 leading-tight">
                {isRTL ? 'רובלוקס ישראל' : 'Israeli Advocacy'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => !item.comingSoon && onNavigate(item.key)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap flex items-center gap-2 relative ${
                  currentPage === item.key
                    ? 'bg-blue-600 text-white'
                    : item.comingSoon
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-700 hover:bg-blue-50'
                }`}
                disabled={item.comingSoon}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.label}
                {item.comingSoon && (
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                    {isRTL ? 'בקרוב' : 'Soon'}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu - Always on the end side */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse shrink-0">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="Switch language"
              >
                <Globe className="h-4 w-4 shrink-0" />
                <span className="text-sm font-medium hidden sm:inline">{currentLanguage.name}</span>
              </button>
              
              {isLanguageOpen && (
                <div className="absolute end-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang);
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full text-start px-4 py-2 text-sm hover:bg-blue-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                        currentLanguage.code === lang.code ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-100">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    if (!item.comingSoon) {
                      onNavigate(item.key);
                      setIsMenuOpen(false);
                    }
                  }}
                  className={`text-start px-4 py-3 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                    currentPage === item.key
                      ? 'bg-blue-600 text-white'
                      : item.comingSoon
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-blue-700 hover:bg-blue-50'
                  }`}
                  disabled={item.comingSoon}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                  {item.comingSoon && (
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full me-auto">
                      {isRTL ? 'בקרוב' : 'Soon'}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;