import React from 'react';
import { useShop } from '../context/ShopContext';
import { HeroSlider } from '../components/ui/HeroSlider';
import { ServiceBar } from '../components/ui/ServiceBar';
import { ProductCard } from '../components/ui/ProductCard';
import { Flame, Sparkles, Filter, RefreshCcw } from 'lucide-react';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
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
    <main className="main-content">
      <div className="container">
        {/* Render Banner Slider & Service Bar only when not actively searching/filtering */}
        {!isFiltered && (
          <>
            <HeroSlider />
            <ServiceBar />
          </>
        )}

        {/* Section Header */}
        <div className="section-header">
          <div className="section-title-box">
            {selectedCategory === 'hot' ? (
              <>
                <Flame size={24} className="section-icon text-red" />
                <h2>Hafta aksiyalari va katta chegirmalar</h2>
              </>
            ) : isFiltered ? (
              <>
                <Filter size={24} className="section-icon text-purple" />
                <h2>
                  {selectedCategory ? `${selectedCategory}` : 'Qidiruv natijalari'}: {displayedProducts.length} ta tovar
                </h2>
              </>
            ) : (
              <>
                <Sparkles size={24} className="section-icon text-purple" />
                <h2>Mashhur tovarlar va tavsiyalar</h2>
              </>
            )}
          </div>

          {isFiltered && (
            <button className="reset-filter-btn" onClick={handleResetFilters}>
              <RefreshCcw size={16} />
              <span>Filtrlarni tozalash</span>
            </button>
          )}
        </div>

        {/* Product Grid */}
        {displayedProducts.length > 0 ? (
          <div className="product-grid">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-results-box animate-fade">
            <h3>Siz izlagan mahsulot topilmadi</h3>
            <p>Iltimos, boshqa kalit so'zlarni kiriting yoki filtrni tozalang</p>
            <button className="reset-filter-btn large" onClick={handleResetFilters}>
              Barcha mahsulotlarni ko'rish
            </button>
          </div>
        )}
      </div>
    </main>
  );
};
