import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ui/ProductCard';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const {
    products,
    wishlist,
    clearWishlist,
    addAllWishlistToCart,
    setCurrentView,
    t
  } = useShop();

  const favoritedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <main className="pb-16 pt-4 animate-fade">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Navigation Breadcrumb */}
        <button
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-uzum-purple transition-colors mb-4"
          onClick={() => setCurrentView('home')}
        >
          <ArrowLeft size={16} />
          <span>{t('wishlist.back_home')}</span>
        </button>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Heart size={28} className="text-uzum-red fill-uzum-red" />
            <h1 className="text-2xl font-extrabold text-uzum-dark">{t('wishlist.title')}</h1>
            <span className="text-sm font-semibold bg-uzum-purple-light text-uzum-purple px-3 py-1 rounded-full">
              {favoritedProducts.length} ta tovar
            </span>
          </div>

          {favoritedProducts.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                className="inline-flex items-center gap-2 bg-uzum-purple text-white px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold hover:bg-uzum-purple-hover transition-colors shadow-xs"
                onClick={addAllWishlistToCart}
              >
                <ShoppingBag size={18} />
                <span>{t('wishlist.add_all_cart')}</span>
              </button>

              <button
                className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 px-3.5 py-2.5 rounded-lg text-xs md:text-sm font-semibold hover:bg-red-100 transition-colors"
                onClick={clearWishlist}
              >
                <Trash2 size={16} />
                <span>{t('wishlist.clear_all')}</span>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {favoritedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {favoritedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4 bg-white rounded-2xl border border-gray-200 shadow-xs max-w-md mx-auto my-8">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={40} className="text-uzum-red" />
            </div>
            <h2 className="text-xl font-bold text-uzum-dark mb-2">{t('wishlist.empty_title')}</h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              {t('wishlist.empty_sub')}
            </p>
            <button
              className="bg-uzum-purple text-white px-8 py-3.5 rounded-xl text-sm font-bold hover:bg-uzum-purple-hover transition-all shadow-md"
              onClick={() => setCurrentView('home')}
            >
              {t('cart.start_shopping')}
            </button>
          </div>
        )}
      </div>
    </main>
  );
};
