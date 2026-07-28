import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Star, Heart, ShieldCheck, Truck, ShoppingBag, CheckCircle2, CreditCard } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setIsCartOpen,
    selectedCity,
    t
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    selectedProduct?.variants?.colors?.[0]
  );
  const [selectedStorage, setSelectedStorage] = useState<string | undefined>(
    selectedProduct?.variants?.storage?.[0]
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    selectedProduct?.variants?.sizes?.[0]
  );
  const [activeTab, setActiveTab] = useState<'desc' | 'specs'>('desc');
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  if (!selectedProduct) return null;

  const isFavorite = isWishlisted(selectedProduct.id);
  const gallery = selectedProduct.gallery && selectedProduct.gallery.length > 0
    ? selectedProduct.gallery
    : [selectedProduct.image];

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedColor, selectedSize, selectedStorage);
    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedColor, selectedSize, selectedStorage);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 bg-black/55 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade" onClick={() => setSelectedProduct(null)}>
      <div className="bg-white rounded-t-2xl sm:rounded-2xl max-w-4xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto relative shadow-2xl p-4 sm:p-6 md:p-8 pb-24 sm:pb-8" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 hover:text-uzum-dark transition-all z-10"
          onClick={() => setSelectedProduct(null)}
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Gallery Column */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="relative w-full pt-[100%] bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
              <img
                src={gallery[activeImageIndex] || selectedProduct.image}
                alt={selectedProduct.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button
                className="absolute top-3 right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-transform"
                onClick={() => toggleWishlist(selectedProduct.id)}
              >
                <Heart size={18} fill={isFavorite ? '#F93C00' : 'none'} color={isFavorite ? '#F93C00' : '#6B7280'} />
              </button>
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 overflow-hidden p-0.5 bg-white transition-all ${
                      idx === activeImageIndex ? 'border-uzum-purple' : 'border-gray-200'
                    }`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover rounded-md" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Column */}
          <div className="flex flex-col gap-3.5 sm:gap-4">
            <span className="text-xs text-gray-500">{t('product.seller')} <strong className="text-gray-800">{selectedProduct.seller}</strong></span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-uzum-dark leading-snug">{selectedProduct.title}</h1>

            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                <Star size={16} className="text-uzum-yellow fill-uzum-yellow" />
                <span className="font-bold">{selectedProduct.rating}</span>
                <span className="text-gray-400">({selectedProduct.reviewsCount} {t('product.reviews')})</span>
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-uzum-green bg-emerald-50 px-2 py-0.5 rounded-md">
                {t('product.in_stock')}
              </span>
            </div>

            {/* Nasiya Box */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 sm:p-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-800 mb-2.5">
                <CreditCard size={18} />
                <span>{t('product.nasiya_heading')}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white border border-amber-200 rounded-lg p-1.5 text-center">
                  <span className="text-[10px] font-semibold text-gray-500 block">3 oy</span>
                  <span className="text-[11px] sm:text-xs font-bold text-uzum-purple">{Math.round(selectedProduct.price / 3).toLocaleString('uz-UZ')} {t('product.monthly')}</span>
                </div>
                <div className="bg-white border border-amber-200 rounded-lg p-1.5 text-center">
                  <span className="text-[10px] font-semibold text-gray-500 block">6 oy</span>
                  <span className="text-[11px] sm:text-xs font-bold text-uzum-purple">{Math.round(selectedProduct.price / 6).toLocaleString('uz-UZ')} {t('product.monthly')}</span>
                </div>
                <div className="bg-uzum-purple-light border border-uzum-purple rounded-lg p-1.5 text-center">
                  <span className="text-[10px] font-semibold text-gray-500 block">12 oy</span>
                  <span className="text-[11px] sm:text-xs font-bold text-uzum-purple">{selectedProduct.monthlyPayment.toLocaleString('uz-UZ')} {t('product.monthly')}</span>
                </div>
              </div>
            </div>

            {/* Color Variants */}
            {selectedProduct.variants?.colors && (
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-gray-600">{t('product.color')} <strong className="text-gray-900">{selectedColor}</strong></span>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.variants.colors.map((color) => (
                    <button
                      key={color}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        selectedColor === color
                          ? 'border-uzum-purple bg-uzum-purple-light text-uzum-purple font-bold'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-uzum-purple'
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Storage Variants */}
            {selectedProduct.variants?.storage && (
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-gray-600">{t('product.storage')} <strong className="text-gray-900">{selectedStorage}</strong></span>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.variants.storage.map((st) => (
                    <button
                      key={st}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        selectedStorage === st
                          ? 'border-uzum-purple bg-uzum-purple-light text-uzum-purple font-bold'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-uzum-purple'
                      }`}
                      onClick={() => setSelectedStorage(st)}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Variants */}
            {selectedProduct.variants?.sizes && (
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-gray-600">{t('product.size')} <strong className="text-gray-900">{selectedSize}</strong></span>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.variants.sizes.map((sz) => (
                    <button
                      key={sz}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        selectedSize === sz
                          ? 'border-uzum-purple bg-uzum-purple-light text-uzum-purple font-bold'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-uzum-purple'
                      }`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery Info */}
            <div className="bg-gray-50 rounded-xl p-3 flex flex-col gap-2 text-xs text-gray-600">
              <div className="flex items-center gap-2.5">
                <Truck size={18} className="text-uzum-purple shrink-0" />
                <div><strong>{t('product.delivery_info')} ({selectedCity.name}):</strong> {selectedCity.deliveryDays} {t('product.delivery_sub')}</div>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={18} className="text-uzum-purple shrink-0" />
                <div><strong>{t('product.guarantee')}:</strong> 10 kun ichida qaytarish va almashtirish kafolati</div>
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex flex-col gap-3 pt-3 border-t border-gray-200">
              <div className="flex items-baseline gap-3">
                {selectedProduct.oldPrice && (
                  <span className="text-sm text-gray-400 line-through">{selectedProduct.oldPrice.toLocaleString('uz-UZ')} so'm</span>
                )}
                <span className="text-2xl font-extrabold text-uzum-purple">{selectedProduct.price.toLocaleString('uz-UZ')} so'm</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  className={`py-3.5 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    isAddedSuccess
                      ? 'bg-uzum-green text-white'
                      : 'bg-uzum-purple text-white hover:bg-uzum-purple-hover'
                  }`}
                  onClick={handleAddToCart}
                >
                  {isAddedSuccess ? (
                    <>
                      <CheckCircle2 size={18} />
                      {t('product.added_cart')}
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      {t('product.add_cart')}
                    </>
                  )}
                </button>

                <button 
                  className="py-3.5 px-4 rounded-lg font-bold text-sm bg-uzum-yellow text-uzum-dark hover:bg-uzum-yellow-hover transition-colors"
                  onClick={handleBuyNow}
                >
                  {t('product.buy_now')}
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-2">
              <div className="flex gap-5 border-b border-gray-200">
                <button
                  className={`pb-2 text-xs sm:text-sm font-semibold border-b-2 transition-colors -mb-px ${
                    activeTab === 'desc' ? 'text-uzum-purple border-uzum-purple' : 'text-gray-500 border-transparent'
                  }`}
                  onClick={() => setActiveTab('desc')}
                >
                  {t('product.tab_desc')}
                </button>
                <button
                  className={`pb-2 text-xs sm:text-sm font-semibold border-b-2 transition-colors -mb-px ${
                    activeTab === 'specs' ? 'text-uzum-purple border-uzum-purple' : 'text-gray-500 border-transparent'
                  }`}
                  onClick={() => setActiveTab('specs')}
                >
                  {t('product.tab_specs')}
                </button>
              </div>

              <div className="pt-3 text-xs md:text-sm text-gray-600 leading-relaxed">
                {activeTab === 'desc' ? (
                  <p>{selectedProduct.description}</p>
                ) : (
                  <div className="flex flex-col">
                    {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                      <div key={key} className="flex justify-between py-1.5 border-b border-dashed border-gray-200">
                        <span className="text-gray-500">{key}</span>
                        <span className="font-semibold text-uzum-dark">{val}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Mobile Fixed Action Bar (Smarthphones only) */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex items-center justify-between gap-3 z-50 shadow-2xl">
          <div className="flex flex-col">
            <span className="text-[11px] text-gray-400">Jami narxi:</span>
            <span className="text-base font-extrabold text-uzum-purple">{selectedProduct.price.toLocaleString('uz-UZ')} so'm</span>
          </div>

          <div className="flex gap-2">
            <button
              className={`py-2.5 px-3 rounded-lg font-bold text-xs flex items-center gap-1 transition-all ${
                isAddedSuccess
                  ? 'bg-uzum-green text-white'
                  : 'bg-uzum-purple text-white'
              }`}
              onClick={handleAddToCart}
            >
              <ShoppingBag size={16} />
              <span>{isAddedSuccess ? t('product.added_cart') : t('product.add_cart')}</span>
            </button>

            <button 
              className="py-2.5 px-3 rounded-lg font-bold text-xs bg-uzum-yellow text-uzum-dark"
              onClick={handleBuyNow}
            >
              {t('product.buy_now')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
