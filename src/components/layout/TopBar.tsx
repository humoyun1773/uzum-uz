import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Globe, ChevronDown, PackageCheck, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import type { Language } from '../../i18n/translations';

export const TopBar: React.FC = () => {
  const { selectedCity, setIsLocationOpen, language, setLanguage, t } = useShop();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  const currentLangObj = languages.find(l => l.code === language) || languages[0];

  return (
    <div className="bg-[#F2F4F7] border-b border-gray-200 text-xs text-gray-600 py-1.5 hidden sm:block relative z-40">
      <div className="max-w-[1280px] mx-auto px-4 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button 
            className="inline-flex items-center gap-1 text-gray-700 hover:text-uzum-purple transition-colors font-normal"
            onClick={() => setIsLocationOpen(true)}
          >
            <MapPin size={14} className="text-uzum-purple" />
            <span>{t('topbar.city')} <strong className="font-semibold">{selectedCity.name}</strong></span>
          </button>
          
          <div className="w-px h-3.5 bg-gray-300"></div>

          <span className="inline-flex items-center gap-1 text-gray-600">
            <PackageCheck size={14} />
            {t('topbar.pickups')} ({selectedCity.deliveryDays})
          </span>
        </div>

        {/* Center */}
        <div className="hidden md:flex items-center text-gray-800 text-[12.5px]">
          <span>{t('topbar.delivery_guarantee')}</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <a href="#sell" className="text-uzum-purple font-semibold hover:underline">{t('topbar.sell')}</a>
          <a href="#faq" className="hover:text-uzum-purple transition-colors">{t('topbar.faq')}</a>
          <a href="#orders" className="hover:text-uzum-purple transition-colors">{t('topbar.orders')}</a>
          
          <div className="w-px h-3.5 bg-gray-300"></div>

          {/* Multi-Language Switcher Dropdown */}
          <div className="relative z-50" ref={langRef}>
            <button 
              className="flex items-center gap-1.5 font-semibold text-gray-700 hover:text-uzum-purple transition-colors px-2.5 py-1 rounded-lg hover:bg-gray-200/60 border border-transparent hover:border-gray-300/60"
              onClick={() => setIsLangDropdownOpen(prev => !prev)}
            >
              <Globe size={14} className="text-uzum-purple shrink-0" />
              <span className="text-sm">{currentLangObj.flag}</span>
              <span>{currentLangObj.label}</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180 text-uzum-purple' : 'text-gray-400'}`} />
            </button>

            {isLangDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 bg-white rounded-xl shadow-2xl border border-gray-200 py-1.5 w-40 z-50 animate-fade">
                <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-1">
                  Tilni tanlang
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold transition-colors ${
                      language === lang.code
                        ? 'bg-uzum-purple-light text-uzum-purple font-bold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangDropdownOpen(false);
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </span>
                    {language === lang.code && <Check size={15} className="text-uzum-purple font-bold" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
