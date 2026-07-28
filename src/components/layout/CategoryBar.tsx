import React from 'react';
import { CATEGORIES } from '../../data/mockData';
import { useShop } from '../../context/ShopContext';
import { Flame } from 'lucide-react';

export const CategoryBar: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useShop();

  return (
    <nav className="bg-white border-b border-gray-200 py-2 overflow-x-auto whitespace-nowrap">
      <div className="max-w-[1280px] mx-auto px-4 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <button
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13.5px] font-semibold transition-all shrink-0 ${
            selectedCategory === 'hot'
              ? 'bg-uzum-red text-white'
              : 'text-uzum-red hover:bg-red-50'
          }`}
          onClick={() => setSelectedCategory(selectedCategory === 'hot' ? null : 'hot')}
        >
          <Flame size={16} className={selectedCategory === 'hot' ? 'text-white' : 'text-uzum-red'} />
          <span>Hafta aksiyalari</span>
        </button>

        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`inline-flex items-center px-3.5 py-1.5 rounded-lg text-[13.5px] font-medium transition-all shrink-0 ${
              selectedCategory === cat.name
                ? 'bg-uzum-purple-light text-uzum-purple font-semibold'
                : 'text-gray-600 hover:bg-gray-100 hover:text-uzum-purple'
            }`}
            onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
          >
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
