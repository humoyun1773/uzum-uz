import React, { useState } from 'react';
import { MapPin, Globe, ChevronDown, PackageCheck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const TopBar: React.FC = () => {
  const { selectedCity, setIsLocationOpen } = useShop();
  const [language, setLanguage] = useState<'uz' | 'ru'>('uz');

  return (
    <div className="bg-[#F2F4F7] border-b border-gray-200 text-xs text-gray-600 py-1.5 hidden sm:block">
      <div className="max-w-[1280px] mx-auto px-4 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button 
            className="inline-flex items-center gap-1 text-gray-700 hover:text-uzum-purple transition-colors font-normal"
            onClick={() => setIsLocationOpen(true)}
          >
            <MapPin size={14} className="text-uzum-purple" />
            <span>Shahar: <strong className="font-semibold">{selectedCity.name}</strong></span>
          </button>
          
          <div className="w-px h-3.5 bg-gray-300"></div>

          <span className="inline-flex items-center gap-1 text-gray-600">
            <PackageCheck size={14} />
            Topshirish punktlari ({selectedCity.deliveryDays} yetkazish)
          </span>
        </div>

        {/* Center */}
        <div className="hidden md:flex items-center text-gray-800 text-[12.5px]">
          <span>Buyurtmangizni <strong className="font-bold">1 kunda bepul</strong> yetkazib beramiz!</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <a href="#sell" className="text-uzum-purple font-semibold hover:underline">Uzum da soting</a>
          <a href="#faq" className="hover:text-uzum-purple transition-colors">Savol-javoblar</a>
          <a href="#orders" className="hover:text-uzum-purple transition-colors">Buyurtmalarim</a>
          
          <div className="w-px h-3.5 bg-gray-300"></div>

          <button 
            className="flex items-center gap-1 font-medium text-gray-700 hover:text-uzum-purple transition-colors"
            onClick={() => setLanguage(l => l === 'uz' ? 'ru' : 'uz')}
          >
            <Globe size={14} />
            <span>{language === 'uz' ? "O'zbekcha" : 'Русский'}</span>
            <ChevronDown size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};
