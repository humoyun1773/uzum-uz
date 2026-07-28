import React, { useState, useEffect } from 'react';
import { BANNERS } from '../../data/mockData';
import { useShop } from '../../context/ShopContext';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

export const HeroSlider: React.FC = () => {
  const { t } = useShop();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
  };

  const activeBanner = BANNERS[currentIndex];

  return (
    <div className="relative rounded-2xl overflow-hidden my-5 mb-8 shadow-md">
      <div 
        className="flex flex-col md:flex-row items-center justify-between min-h-[340px] p-6 md:p-14 text-white relative animate-fade"
        style={{ background: activeBanner.bgColor }}
      >
        <div className="max-w-[550px] z-10 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            <ShieldCheck size={14} />
            {activeBanner.badge}
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold leading-tight mb-3 tracking-tight">
            {activeBanner.title}
          </h1>
          <p className="text-sm md:text-base opacity-95 mb-6">
            {activeBanner.subtitle}
          </p>
          
          <button className="bg-uzum-yellow text-uzum-dark font-bold text-sm md:text-base px-8 py-3.5 rounded-lg hover:bg-uzum-yellow-hover hover:-translate-y-0.5 transition-all shadow-md">
            {t('banner.see_more')}
          </button>
        </div>

        <div className="hidden md:block w-[380px] h-[280px] rounded-xl overflow-hidden shadow-2xl">
          <img src={activeBanner.image} alt={activeBanner.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Arrows */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-uzum-dark flex items-center justify-center shadow-lg hover:bg-white hover:text-uzum-purple hover:scale-110 transition-all z-20"
        onClick={handlePrev}
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-uzum-dark flex items-center justify-center shadow-lg hover:bg-white hover:text-uzum-purple hover:scale-110 transition-all z-20"
        onClick={handleNext}
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            className={`h-2.5 rounded-full transition-all ${
              idx === currentIndex ? 'w-7 bg-white' : 'w-2.5 bg-white/50'
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};
