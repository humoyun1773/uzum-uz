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
    setSelectedProduct
  } = useShop();

  const isFavorite = isWishlisted(product.id);
  const cartItem = cart.find((item) => item.product.id === product.id);

  const getBadgeClass = (badge?: string) => {
    switch (badge) {
      case 'Aksiya': return 'bg-uzum-red text-white';
      case 'Top sotuv': return 'bg-uzum-purple text-white';
      case 'Katta sotuv': return 'bg-uzum-yellow text-uzum-dark';
      case 'Yangi': return 'bg-uzum-green text-white';
      default: return 'bg-uzum-purple text-white';
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-transparent hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between h-full group">
      {/* Image Container */}
      <div 
        className="relative w-full pt-[100%] bg-gray-50 overflow-hidden cursor-pointer"
        onClick={() => setSelectedProduct(product)}
      >
        <img 
          src={product.image} 
          alt={product.title} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          loading="lazy" 
        />

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[11px] font-bold shadow-xs z-10 ${getBadgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}

        {/* Favorite */}
        <button
          className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-xs"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Saralanganlarga qo'shish"
        >
          <Heart size={18} fill={isFavorite ? '#F93C00' : 'none'} color={isFavorite ? '#F93C00' : '#6B7280'} />
        </button>

        {/* Guarantee */}
        {product.isGuaranteed && (
          <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-1.5 py-0.5 rounded flex items-center gap-1">
            <ShieldCheck size={12} />
            <span>Kafolat</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-3 flex flex-col flex-1 justify-between">
        <div>
          {/* Title */}
          <h3 
            className="text-[13.5px] font-normal text-uzum-dark line-clamp-2 h-9 leading-tight cursor-pointer hover:text-uzum-purple transition-colors mb-1.5"
            onClick={() => setSelectedProduct(product)}
          >
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs mb-2">
            <Star size={14} className="text-uzum-yellow fill-uzum-yellow" />
            <span className="font-semibold text-gray-700">{product.rating}</span>
            <span className="text-gray-400">({product.reviewsCount} sharh)</span>
          </div>

          {/* Nasiya Tag */}
          <div className="mb-2.5">
            <span className="bg-uzum-yellow text-uzum-dark text-[11px] font-bold px-1.5 py-0.5 rounded">
              {product.monthlyPayment.toLocaleString('uz-UZ')} so'm/oy
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
            <span className="text-base font-bold text-uzum-dark">
              {product.price.toLocaleString('uz-UZ')} so'm
            </span>
          </div>

          {/* Cart Control */}
          {cartItem ? (
            <div className="flex items-center bg-uzum-purple-light rounded-full p-0.5">
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
              className="w-9 h-9 rounded-full border border-gray-300 bg-white text-gray-700 flex items-center justify-center hover:bg-uzum-purple hover:border-uzum-purple hover:text-white hover:scale-105 transition-all"
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
