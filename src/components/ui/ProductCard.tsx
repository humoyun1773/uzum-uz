import React from 'react';
import type { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { Heart, Star, ShoppingBag, Plus, Minus, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    cart,
    addToCart,
    updateQuantity,
    toggleWishlist,
    isWishlisted,
    setSelectedProduct,
    t
  } = useShop();

  const isFavorite = isWishlisted(product.id);
  const cartItem = cart.find((item) => item.product.id === product.id);

  const getBadgeClass = (badge?: string) => {
    switch (badge) {
      case 'Aksiya': return 'bg-uzum-red text-white shadow-xs';
      case 'Top sotuv': return 'bg-uzum-purple text-white shadow-xs';
      case 'Katta sotuv': return 'bg-uzum-yellow text-uzum-dark font-extrabold shadow-xs';
      case 'Yangi': return 'bg-uzum-green text-white shadow-xs';
      default: return 'bg-uzum-purple text-white shadow-xs';
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200/90 hover:border-uzum-purple/30 hover:shadow-xl hover:shadow-uzum-purple/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group">
      {/* Image Container */}
      <div 
        className="relative w-full pt-[100%] bg-gray-50/80 overflow-hidden cursor-pointer"
        onClick={() => setSelectedProduct(product)}
      >
        <img 
          src={product.image} 
          alt={product.title} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out" 
          loading="lazy" 
        />

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold z-10 ${getBadgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}

        {/* Favorite Heart */}
        <button
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all shadow-xs"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Saralanganlarga qo'shish"
        >
          <Heart size={17} fill={isFavorite ? '#F93C00' : 'none'} color={isFavorite ? '#F93C00' : '#6B7280'} />
        </button>

        {/* Guarantee Tag */}
        {product.isGuaranteed && (
          <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
            <ShieldCheck size={12} className="text-emerald-400" />
            <span>{t('product.guarantee')}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          {/* Title */}
          <h3 
            className="text-[13.5px] font-normal text-uzum-dark line-clamp-2 h-9 leading-snug cursor-pointer group-hover:text-uzum-purple transition-colors mb-1.5"
            onClick={() => setSelectedProduct(product)}
          >
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs mb-2">
            <Star size={13} className="text-amber-400 fill-amber-400" />
            <span className="font-bold text-gray-700">{product.rating}</span>
            <span className="text-gray-400">({product.reviewsCount} {t('product.reviews')})</span>
          </div>

          {/* Nasiya Tag */}
          <div className="mb-2.5">
            <span className="bg-uzum-yellow text-uzum-dark text-[11px] font-extrabold px-2 py-0.5 rounded-md inline-block shadow-2xs">
              {product.monthlyPayment.toLocaleString('uz-UZ')} {t('product.monthly')}
            </span>
          </div>
        </div>

        {/* Footer / Price */}
        <div className="flex items-end justify-between gap-2 mt-1">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-[11px] text-gray-400 line-through leading-none mb-0.5">
                {product.oldPrice.toLocaleString('uz-UZ')} so'm
              </span>
            )}
            <span className="text-base font-extrabold text-uzum-dark">
              {product.price.toLocaleString('uz-UZ')} so'm
            </span>
          </div>

          {/* Cart Control */}
          {cartItem ? (
            <div className="flex items-center bg-uzum-purple-light rounded-full p-0.5 shadow-xs">
              <button
                className="w-7 h-7 rounded-full flex items-center justify-center text-uzum-purple hover:bg-uzum-purple hover:text-white transition-colors"
                onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
              >
                <Minus size={14} />
              </button>
              <span className="text-xs font-bold text-uzum-purple min-w-5 text-center">{cartItem.quantity}</span>
              <button
                className="w-7 h-7 rounded-full flex items-center justify-center text-uzum-purple hover:bg-uzum-purple hover:text-white transition-colors"
                onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              className="w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-700 flex items-center justify-center hover:bg-uzum-purple hover:border-uzum-purple hover:text-white hover:scale-105 active:scale-95 transition-all shadow-xs"
              onClick={() => addToCart(product)}
              aria-label="Savatga qo'shish"
            >
              <ShoppingBag size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
