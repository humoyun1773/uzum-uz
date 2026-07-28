import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Trash2, Plus, Minus, Tag, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    promoCode,
    promoDiscount,
    promoError,
    applyPromoCode,
    cartTotalCount,
    cartSubtotal,
    cartDiscountedTotal,
    selectedCity,
    setCurrentView,
    t
  } = useShop();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    applyPromoCode(inputCode);
  };

  const handleGoToCheckout = () => {
    if (cart.length === 0) return;
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  return (
    <div className="fixed inset-0 bg-black/55 backdrop-blur-xs z-50 flex justify-end" onClick={() => setIsCartOpen(false)}>
      <div className="w-[480px] max-w-full h-full bg-white shadow-2xl flex flex-col animate-slide" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={22} className="text-uzum-purple" />
            <h2 className="text-xl font-bold text-uzum-dark">{t('cart.title')}</h2>
            <span className="text-xs font-semibold bg-uzum-purple-light text-uzum-purple px-2.5 py-0.5 rounded-full">
              {cartTotalCount} {t('cart.items_count')}
            </span>
          </div>
          <button className="text-gray-400 hover:text-uzum-dark transition-colors" onClick={() => setIsCartOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag size={64} className="text-gray-300 mb-4" />
            <h3 className="text-lg font-bold text-uzum-dark mb-2">{t('cart.empty_title')}</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-xs">{t('cart.empty_sub')}</p>
            <button 
              className="bg-uzum-purple text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-uzum-purple-hover transition-colors" 
              onClick={() => {
                setIsCartOpen(false);
                setCurrentView('home');
              }}
            >
              {t('cart.start_shopping')}
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-3.5 pb-4 border-b border-gray-100">
                  <img src={item.product.image} alt={item.product.title} className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-uzum-dark leading-snug line-clamp-2">{item.product.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{t('product.seller')} {item.product.seller}</p>
                    </div>
                    
                    <div className="text-sm font-bold text-uzum-purple mt-1">
                      {(item.product.price * item.quantity).toLocaleString('uz-UZ')} so'm
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button className="w-7 h-7 flex items-center justify-center bg-gray-50 text-gray-700 hover:bg-gray-200" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                          <Minus size={14} />
                        </button>
                        <span className="px-2.5 text-xs font-bold">{item.quantity}</span>
                        <button className="w-7 h-7 flex items-center justify-center bg-gray-50 text-gray-700 hover:bg-gray-200" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                          <Plus size={14} />
                        </button>
                      </div>

                      <button className="flex items-center gap-1 text-red-500 text-xs font-medium hover:opacity-80 transition-opacity" onClick={() => removeFromCart(item.product.id)}>
                        <Trash2 size={16} />
                        <span>{t('cart.delete')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Summary */}
            <div className="p-5 bg-gray-50 border-t border-gray-200 flex flex-col gap-3.5">
              <form className="flex flex-col gap-1.5" onSubmit={handleApplyPromo}>
                <div className="flex items-center border border-gray-300 rounded-lg bg-white pl-2.5 overflow-hidden">
                  <Tag size={16} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('cart.promo_placeholder')}
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="flex-1 px-2.5 py-2 text-xs outline-none"
                  />
                  <button type="submit" className="bg-uzum-purple-light text-uzum-purple hover:bg-uzum-purple hover:text-white px-3.5 py-2 text-xs font-semibold transition-colors">
                    {t('cart.apply')}
                  </button>
                </div>
                {promoCode && (
                  <div className="flex items-center gap-1.5 text-xs text-uzum-green font-medium">
                    <CheckCircle2 size={14} />
                    Promokod <strong>{promoCode}</strong> (-15%)
                  </div>
                )}
                {promoError && <p className="text-xs text-red-500">{promoError}</p>}
              </form>

              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Mahsulotlar ({cartTotalCount} ta):</span>
                  <span>{cartSubtotal.toLocaleString('uz-UZ')} so'm</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Yetkazib berish ({selectedCity.name}):</span>
                  <span className="text-uzum-green font-semibold">{t('cart.delivery_free')}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-uzum-purple font-semibold">
                    <span>Chegirma:</span>
                    <span>-{(cartSubtotal * promoDiscount).toLocaleString('uz-UZ')} so'm</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-extrabold text-uzum-dark pt-2.5 border-t border-dashed border-gray-300">
                  <span>{t('cart.total')}</span>
                  <span className="text-uzum-purple">{cartDiscountedTotal.toLocaleString('uz-UZ')} so'm</span>
                </div>
              </div>

              <button 
                className="w-full bg-uzum-purple text-white py-3.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-uzum-purple-hover transition-all shadow-md" 
                onClick={handleGoToCheckout}
              >
                <span>{t('cart.proceed_checkout')}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
