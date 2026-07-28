import React, { useState, useRef, useEffect } from 'react';
import { Search, LayoutGrid, Heart, ShoppingBag, User, X, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Navbar: React.FC = () => {
  const {
    products,
    cartTotalCount,
    cartDiscountedTotal,
    wishlist,
    user,
    searchQuery,
    setSearchQuery,
    isCatalogOpen,
    setIsCatalogOpen,
    setIsCartOpen,
    setIsAuthOpen,
    setSelectedProduct,
    setSelectedCategory,
    setCurrentView,
    currentView
  } = useShop();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = searchQuery.trim() === ''
    ? []
    : products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectProduct = (product: any) => {
    setSelectedProduct(product);
    setIsSearchFocused(false);
    setSearchQuery('');
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedCategory(null);
    setSearchQuery('');
    setCurrentView('home');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 py-3 shadow-xs">
      <div className="max-w-[1280px] mx-auto px-4 flex items-center gap-4 md:gap-6">
        {/* Brand Logo */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 group"
          onClick={handleLogoClick}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-uzum-purple to-[#5C00D2] rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Sparkles size={22} className="text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-extrabold text-uzum-purple tracking-tight">uzum</span>
            <span className="text-xs font-semibold text-uzum-dark -mt-0.5">market</span>
          </div>
        </a>

        {/* Catalog Button */}
        <button
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            isCatalogOpen
              ? 'bg-uzum-purple text-white'
              : 'bg-uzum-purple-light text-uzum-purple hover:bg-uzum-purple hover:text-white'
          }`}
          onClick={() => setIsCatalogOpen(prev => !prev)}
        >
          {isCatalogOpen ? <X size={20} /> : <LayoutGrid size={20} />}
          <span className="hidden sm:inline">Katalog</span>
        </button>

        {/* Search Bar */}
        <div className="flex-1 relative" ref={searchRef}>
          <div className={`flex items-center border-2 rounded-lg bg-gray-50 overflow-hidden transition-all ${
            isSearchFocused ? 'border-uzum-purple bg-white ring-3 ring-uzum-purple/15' : 'border-uzum-purple-light'
          }`}>
            <input
              type="text"
              placeholder="Mahsulotlar va turkumlar bo'yicha qidiruv..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="flex-1 px-3.5 py-2 text-sm text-uzum-dark outline-none bg-transparent"
            />
            {searchQuery && (
              <button 
                className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors" 
                onClick={() => setSearchQuery('')}
              >
                <X size={16} />
              </button>
            )}
            <button 
              className="bg-uzum-purple-light text-uzum-purple hover:bg-uzum-purple hover:text-white px-4 py-2.5 transition-colors" 
              aria-label="Qidirish"
            >
              <Search size={18} />
            </button>
          </div>

          {/* Search Dropdown */}
          {isSearchFocused && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-fade">
              <div className="px-4 py-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100">
                Taklif etilgan mahsulotlar:
              </div>
              {filteredSuggestions.map((prod) => (
                <div
                  key={prod.id}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleSelectProduct(prod)}
                >
                  <img src={prod.image} alt={prod.title} className="w-10 h-10 object-cover rounded-md" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-uzum-dark">{prod.title}</span>
                    <span className="text-xs font-bold text-uzum-purple">{prod.price.toLocaleString('uz-UZ')} so'm</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* User Auth */}
          <button
            className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-uzum-purple transition-colors"
            onClick={() => setIsAuthOpen(true)}
          >
            <User size={22} />
            <span className="text-xs font-medium hidden sm:inline">
              {user ? user.name : 'Kirish'}
            </span>
          </button>

          {/* Wishlist */}
          <button 
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              currentView === 'wishlist' ? 'text-uzum-purple font-semibold' : 'text-gray-600 hover:text-uzum-purple'
            }`}
            onClick={() => setCurrentView('wishlist')}
          >
            <div className="relative">
              <Heart size={22} fill={currentView === 'wishlist' ? '#7000FF' : 'none'} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-uzum-red text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </div>
            <span className="text-xs font-medium hidden sm:inline">Saralanganlar</span>
          </button>

          {/* Cart Opener */}
          <button
            className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-uzum-purple transition-colors"
            onClick={() => setIsCartOpen(true)}
          >
            <div className="relative">
              <ShoppingBag size={22} />
              {cartTotalCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-uzum-purple text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartTotalCount}
                </span>
              )}
            </div>
            <span className="text-xs font-medium hidden sm:inline">
              {cartDiscountedTotal > 0
                ? `${cartDiscountedTotal.toLocaleString('uz-UZ')} so'm`
                : 'Savat'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
