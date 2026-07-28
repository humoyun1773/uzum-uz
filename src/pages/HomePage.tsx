import React from 'react';
import { useShop } from '../context/ShopContext';
import { HeroSlider } from '../components/ui/HeroSlider';
import { ServiceBar } from '../components/ui/ServiceBar';
import { ProductCard } from '../components/ui/ProductCard';
import { Flame, Sparkles, Filter, RefreshCcw } from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    t
  } = useShop();

  // Filtering logic
  let displayedProducts = products;

  if (selectedCategory === 'hot') {
    displayedProducts = products.filter(p => p.badge === 'Aksiya' || p.badge === 'Top sotuv');
  } else if (selectedCategory) {
    displayedProducts = products.filter(p => p.category === selectedCategory);
  }

  if (searchQuery.trim() !== '') {
    displayedProducts = displayedProducts.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.seller.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const isFiltered = selectedCategory !== null || searchQuery.trim() !== '';

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
  };

  return (
    <main className="pb-10">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Render Banner Slider & Service Bar only when not actively searching/filtering */}
        {!isFiltered && (
          <>
            <HeroSlider />
            <ServiceBar />
          </>
        )}

        {/* Section Header */}
        <div className="flex items-center justify-between mb-5 pt-2">
          <div className="flex items-center gap-2.5">
            {selectedCategory === 'hot' ? (
              <>
                <Flame size={24} className="text-uzum-red shrink-0" />
                <h2 className="text-xl md:text-2xl font-extrabold text-uzum-dark">{t('section.hot_deals')}</h2>
              </>
            ) : isFiltered ? (
              <>
                <Filter size={24} className="text-uzum-purple shrink-0" />
                <h2 className="text-xl md:text-2xl font-extrabold text-uzum-dark">
                  {selectedCategory ? `${selectedCategory}` : t('section.search_results')}: {displayedProducts.length} ta tovar
                </h2>
              </>
            ) : (
              <>
                <Sparkles size={24} className="text-uzum-purple shrink-0" />
                <h2 className="text-xl md:text-2xl font-extrabold text-uzum-dark">{t('section.popular')}</h2>
              </>
            )}
          </div>

          {isFiltered && (
            <button 
              className="inline-flex items-center gap-1.5 bg-uzum-purple-light text-uzum-purple hover:bg-uzum-purple hover:text-white px-3.5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all"
              onClick={handleResetFilters}
            >
              <RefreshCcw size={16} />
              <span>{t('section.reset_filters')}</span>
            </button>
          )}
        </div>

        {/* Product Grid */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-5 bg-white rounded-xl border border-gray-200 animate-fade">
            <h3 className="text-xl font-bold text-uzum-dark mb-2">{t('section.no_results')}</h3>
            <p className="text-sm text-gray-500 mb-4">{t('section.no_results_sub')}</p>
            <button 
              className="inline-flex items-center gap-1.5 bg-uzum-purple text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-uzum-purple-hover transition-colors"
              onClick={handleResetFilters}
            >
              {t('section.reset_filters')}
            </button>
          </div>
        )}
      </div>
    </main>
  );
};
