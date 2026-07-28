import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Home, LayoutGrid, Heart, ShoppingBag, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    isCatalogOpen,
    setIsCatalogOpen,
    setIsCartOpen,
    setIsAuthOpen,
    cartTotalCount,
    wishlist,
    user,
    t
  } = useShop();

  const handleHomeClick = () => {
    setIsCatalogOpen(false);
    setCurrentView('home');
  };

  const handleCatalogClick = () => {
    setIsCatalogOpen(prev => !prev);
  };

  const handleWishlistClick = () => {
    setIsCatalogOpen(false);
    setCurrentView('wishlist');
  };

  const handleCartClick = () => {
    setIsCatalogOpen(false);
    setIsCartOpen(true);
  };

  const handleProfileClick = () => {
    setIsCatalogOpen(false);
    setIsAuthOpen(true);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-3 z-40 md:hidden shadow-lg">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium transition-colors ${
            currentView === 'home' && !isCatalogOpen ? 'text-uzum-purple font-bold' : 'text-gray-500'
          }`}
          onClick={handleHomeClick}
        >
          <Home size={20} />
          <span>Bosh sahifa</span>
        </button>

        {/* Catalog */}
        <button
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium transition-colors ${
            isCatalogOpen ? 'text-uzum-purple font-bold' : 'text-gray-500'
          }`}
          onClick={handleCatalogClick}
        >
          <LayoutGrid size={20} />
          <span>{t('navbar.catalog')}</span>
        </button>

        {/* Wishlist */}
        <button
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium transition-colors relative ${
            currentView === 'wishlist' ? 'text-uzum-purple font-bold' : 'text-gray-500'
          }`}
          onClick={handleWishlistClick}
        >
          <div className="relative">
            <Heart size={20} fill={currentView === 'wishlist' ? '#7000FF' : 'none'} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-uzum-red text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <span>{t('navbar.wishlist')}</span>
        </button>

        {/* Cart */}
        <button
          className="flex flex-col items-center gap-0.5 text-[11px] font-medium text-gray-500 transition-colors relative"
          onClick={handleCartClick}
        >
          <div className="relative">
            <ShoppingBag size={20} />
            {cartTotalCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-uzum-purple text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                {cartTotalCount}
              </span>
            )}
          </div>
          <span>{t('navbar.cart')}</span>
        </button>

        {/* Profile */}
        <button
          className="flex flex-col items-center gap-0.5 text-[11px] font-medium text-gray-500 transition-colors"
          onClick={handleProfileClick}
        >
          <User size={20} />
          <span className="truncate max-w-[50px]">{user ? user.name : t('navbar.login')}</span>
        </button>
      </div>
    </nav>
  );
};
