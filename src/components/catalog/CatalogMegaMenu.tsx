import React, { useState } from 'react';
import { CATEGORIES } from '../../data/mockData';
import { useShop } from '../../context/ShopContext';
import { ChevronRight, Smartphone, Tv, Shirt, Footprints, Watch, Sparkles, Home, Dumbbell, Car } from 'lucide-react';

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
  const { isCatalogOpen, setIsCatalogOpen, setSelectedCategory } = useShop();
  const [activeCatId, setActiveCatId] = useState<string>(CATEGORIES[0].id);

  if (!isCatalogOpen) return null;

  const currentCategory = CATEGORIES.find(c => c.id === activeCatId) || CATEGORIES[0];

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsCatalogOpen(false);
  };

  return (
    <div 
      className="fixed inset-0 top-[110px] bg-black/40 backdrop-blur-xs z-40 flex justify-center animate-fade"
      onClick={() => setIsCatalogOpen(false)}
    >
      <div 
        className="max-w-[1280px] w-full bg-white rounded-b-xl shadow-2xl flex h-[520px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Sidebar */}
        <div className="w-80 bg-gray-50 border-r border-gray-200 py-3 overflow-y-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`w-full flex items-center justify-between px-5 py-3 text-sm transition-colors ${
                cat.id === activeCatId
                  ? 'bg-white text-uzum-purple font-semibold shadow-xs'
                  : 'text-gray-700 hover:bg-white hover:text-uzum-purple'
              }`}
              onMouseEnter={() => setActiveCatId(cat.id)}
              onClick={() => handleCategorySelect(cat.name)}
            >
              <div className="flex items-center gap-3">
                <span>{ICON_MAP[cat.icon]}</span>
                <span>{cat.name}</span>
              </div>
              <ChevronRight size={16} className={cat.id === activeCatId ? 'text-uzum-purple' : 'text-gray-400'} />
            </button>
          ))}
        </div>

        {/* Right Content Grid */}
        <div className="flex-1 p-8 overflow-y-auto">
          <h3 className="text-xl font-bold text-uzum-dark pb-3 mb-6 border-b-2 border-uzum-purple-light">
            {currentCategory.name}
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
