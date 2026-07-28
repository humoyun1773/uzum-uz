import React, { useState } from 'react';
import { CATEGORIES } from '../../data/mockData';
import { useShop } from '../../context/ShopContext';
import { ChevronRight, ChevronDown, X, Smartphone, Tv, Shirt, Footprints, Watch, Sparkles, Home, Dumbbell, Car } from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone size={20} />,
  Tv: <Tv size={20} />,
  Shirt: <Shirt size={20} />,
  Footprints: <Footprints size={20} />,
  Watch: <Watch size={20} />,
  Sparkles: <Sparkles size={20} />,
  Home: <Home size={20} />,
  Dumbbell: <Dumbbell size={20} />,
  Car: <Car size={20} />
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
      className="fixed inset-0 top-0 md:top-[110px] bg-black/50 backdrop-blur-xs z-50 flex justify-center animate-fade"
      onClick={() => setIsCatalogOpen(false)}
    >
      <div 
        className="max-w-[1280px] w-full bg-white md:rounded-b-xl shadow-2xl flex flex-col md:flex-row h-full md:h-[520px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Header (Only visible on mobile screens) */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden bg-white">
          <h2 className="text-lg font-extrabold text-uzum-dark">{t('navbar.catalog')}</h2>
          <button 
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"
            onClick={() => setIsCatalogOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Left Sidebar (Desktop) / Accordion List (Mobile) */}
        <div className="w-full md:w-80 bg-gray-50 border-r border-gray-200 py-2 md:py-3 overflow-y-auto flex-1 md:flex-initial">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="border-b border-gray-100 md:border-none">
              <button
                className={`w-full flex items-center justify-between px-5 py-3.5 md:py-3 text-sm transition-colors ${
                  cat.id === activeCatId
                    ? 'bg-white text-uzum-purple font-semibold shadow-xs'
                    : 'text-gray-700 hover:bg-white hover:text-uzum-purple'
                }`}
                onMouseEnter={() => setActiveCatId(cat.id)}
                onClick={() => {
                  setActiveCatId(cat.id);
                  setExpandedMobileCatId(expandedMobileCatId === cat.id ? null : cat.id);
                }}
              >
                <div className="flex items-center gap-3">
                  <span>{ICON_MAP[cat.icon]}</span>
                  <span>{getCategoryTranslation(cat.id, cat.name)}</span>
                </div>
                
                <div className="hidden md:block">
                  <ChevronRight size={16} className={cat.id === activeCatId ? 'text-uzum-purple' : 'text-gray-400'} />
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
                      className="w-full text-left text-xs font-medium text-gray-700 hover:text-uzum-purple py-1 flex items-center justify-between"
                      onClick={() => handleCategorySelect(cat.name)}
                    >
                      <span>{sub}</span>
                      <span className="text-uzum-purple font-bold">&rarr;</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Content Grid (Desktop only) */}
        <div className="hidden md:block flex-1 p-8 overflow-y-auto">
          <h3 className="text-xl font-bold text-uzum-dark pb-3 mb-6 border-b-2 border-uzum-purple-light">
            {getCategoryTranslation(currentCategory.id, currentCategory.name)}
          </h3>
          
          <div className="grid grid-cols-3 gap-4">
            {currentCategory.subcategories.map((sub, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-uzum-purple hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between min-h-[90px]"
                onClick={() => handleCategorySelect(currentCategory.name)}
              >
                <span className="text-sm font-semibold text-uzum-dark">{sub}</span>
                <span className="text-xs font-medium text-uzum-purple mt-2">Barchasini ko'rish &rarr;</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
