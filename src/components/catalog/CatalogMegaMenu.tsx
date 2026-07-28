import React, { useState } from 'react';
import { CATEGORIES } from '../../data/mockData';
import { useShop } from '../../context/ShopContext';
import { ChevronRight, ChevronDown, X, ArrowRight, Smartphone, Tv, Shirt, Footprints, Watch, Sparkles, Home, Dumbbell, Car } from 'lucide-react';

const ICON_MAP: Record<string, { icon: React.ReactNode; bg: string; text: string }> = {
  Smartphone: { icon: <Smartphone size={18} />, bg: 'bg-purple-100', text: 'text-uzum-purple' },
  Tv: { icon: <Tv size={18} />, bg: 'bg-blue-100', text: 'text-blue-600' },
  Shirt: { icon: <Shirt size={18} />, bg: 'bg-rose-100', text: 'text-rose-600' },
  Footprints: { icon: <Footprints size={18} />, bg: 'bg-amber-100', text: 'text-amber-600' },
  Watch: { icon: <Watch size={18} />, bg: 'bg-indigo-100', text: 'text-indigo-600' },
  Sparkles: { icon: <Sparkles size={18} />, bg: 'bg-pink-100', text: 'text-pink-600' },
  Home: { icon: <Home size={18} />, bg: 'bg-emerald-100', text: 'text-emerald-600' },
  Dumbbell: { icon: <Dumbbell size={18} />, bg: 'bg-orange-100', text: 'text-orange-600' },
  Car: { icon: <Car size={18} />, bg: 'bg-sky-100', text: 'text-sky-600' }
};

export const CatalogMegaMenu: React.FC = () => {
  const { isCatalogOpen, setIsCatalogOpen, setSelectedCategory, t } = useShop();
  const [activeCatId, setActiveCatId] = useState<string>(CATEGORIES[0].id);
  const [expandedMobileCatId, setExpandedMobileCatId] = useState<string | null>(null);

  if (!isCatalogOpen) return null;

  const currentCategory = CATEGORIES.find(c => c.id === activeCatId) || CATEGORIES[0];

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsCatalogOpen(false);
  };

  const getCategoryTranslation = (catId: string, defaultName: string) => {
    return t(`cat.${catId}`) !== `cat.${catId}` ? t(`cat.${catId}`) : defaultName;
  };

  return (
    <div 
      className="fixed inset-0 top-0 md:top-[110px] bg-black/55 backdrop-blur-xs z-50 flex justify-center animate-fade"
      onClick={() => setIsCatalogOpen(false)}
    >
      <div 
        className="max-w-[1280px] w-full bg-white md:rounded-b-2xl shadow-2xl flex flex-col md:flex-row h-full md:h-[540px] overflow-hidden border-t border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-uzum-purple-light text-uzum-purple flex items-center justify-center font-bold">
              <Sparkles size={18} />
            </div>
            <h2 className="text-lg font-extrabold text-uzum-dark">{t('navbar.catalog')}</h2>
          </div>
          <button 
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
            onClick={() => setIsCatalogOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Left Sidebar (Desktop) / Accordion List (Mobile) */}
        <div className="w-full md:w-80 bg-gray-50/70 border-r border-gray-200/80 py-2 md:py-3 overflow-y-auto flex-1 md:flex-initial">
          {CATEGORIES.map((cat) => {
            const iconObj = ICON_MAP[cat.icon] || ICON_MAP['Smartphone'];
            const isActive = cat.id === activeCatId;

            return (
              <div key={cat.id} className="border-b border-gray-100 md:border-none">
                <button
                  className={`w-full flex items-center justify-between px-5 py-3 md:py-2.5 text-sm transition-all relative ${
                    isActive
                      ? 'bg-white text-uzum-purple font-bold shadow-xs'
                      : 'text-gray-700 hover:bg-white hover:text-uzum-purple'
                  }`}
                  onMouseEnter={() => setActiveCatId(cat.id)}
                  onClick={() => {
                    setActiveCatId(cat.id);
                    setExpandedMobileCatId(expandedMobileCatId === cat.id ? null : cat.id);
                  }}
                >
                  {/* Left Purple Indicator Bar */}
                  {isActive && (
                    <div className="hidden md:block absolute left-0 top-0 bottom-0 w-1 bg-uzum-purple rounded-r"></div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${iconObj.bg} ${iconObj.text} flex items-center justify-center shrink-0 shadow-2xs`}>
                      {iconObj.icon}
                    </div>
                    <span>{getCategoryTranslation(cat.id, cat.name)}</span>
                  </div>
                  
                  <div className="hidden md:block">
                    <ChevronRight size={16} className={isActive ? 'text-uzum-purple' : 'text-gray-400'} />
                  </div>
                  <div className="md:hidden">
                    <ChevronDown size={16} className={`transition-transform ${expandedMobileCatId === cat.id ? 'rotate-180 text-uzum-purple' : 'text-gray-400'}`} />
                  </div>
                </button>

                {/* Mobile Subcategories Accordion */}
                {expandedMobileCatId === cat.id && (
                  <div className="md:hidden bg-white px-6 py-3 space-y-2.5 animate-fade">
                    {cat.subcategories.map((sub, idx) => (
                      <button
                        key={idx}
                        className="w-full text-left text-xs font-medium text-gray-700 hover:text-uzum-purple py-1 flex items-center justify-between group"
                        onClick={() => handleCategorySelect(cat.name)}
                      >
                        <span>{sub}</span>
                        <ArrowRight size={14} className="text-uzum-purple opacity-70 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Content Pane (Desktop) */}
        <div className="hidden md:block flex-1 p-8 overflow-y-auto bg-white">
          <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-uzum-purple-light">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-extrabold text-uzum-dark tracking-tight">
                {getCategoryTranslation(currentCategory.id, currentCategory.name)}
              </h3>
              <span className="text-xs font-bold bg-uzum-purple-light text-uzum-purple px-3 py-1 rounded-full">
                {currentCategory.subcategories.length} turkumlar
              </span>
            </div>

            <button 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-uzum-purple hover:underline"
              onClick={() => handleCategorySelect(currentCategory.name)}
            >
              <span>Barchasini ko'rish</span>
              <ArrowRight size={14} />
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {currentCategory.subcategories.map((sub, idx) => (
              <div
                key={idx}
                className="group bg-gray-50/80 border border-gray-200/90 rounded-xl p-4 cursor-pointer hover:border-uzum-purple hover:bg-white hover:shadow-xl hover:shadow-uzum-purple/10 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between min-h-[96px]"
                onClick={() => handleCategorySelect(currentCategory.name)}
              >
                <span className="text-sm font-bold text-uzum-dark group-hover:text-uzum-purple transition-colors">{sub}</span>
                
                <div className="flex items-center justify-between mt-3 text-xs font-semibold text-uzum-purple opacity-80 group-hover:opacity-100">
                  <span>Tovar ko'rish</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
