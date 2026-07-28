import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Star, Heart, ShieldCheck, Truck, ShoppingBag, CheckCircle2, CreditCard } from 'lucide-react';
import './ProductDetailModal.css';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setIsCartOpen,
    selectedCity
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
    <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
      <div className="product-modal-card animate-fade" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={() => setSelectedProduct(null)}>
          <X size={24} />
        </button>

        <div className="product-modal-grid">
          {/* Gallery Column */}
          <div className="modal-gallery-col">
            <div className="main-image-box">
              <img
                src={gallery[activeImageIndex] || selectedProduct.image}
                alt={selectedProduct.title}
                className="main-modal-img"
              />
              <button
                className={`gallery-fav-btn ${isFavorite ? 'active' : ''}`}
                onClick={() => toggleWishlist(selectedProduct.id)}
              >
                <Heart size={20} fill={isFavorite ? '#F93C00' : 'none'} color={isFavorite ? '#F93C00' : '#6B7280'} />
              </button>
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="thumbnails-row">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${idx === activeImageIndex ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info & Actions Column */}
          <div className="modal-info-col">
            <span className="seller-tag">Sotuvchi: <strong>{selectedProduct.seller}</strong></span>
            <h1 className="modal-title">{selectedProduct.title}</h1>

            <div className="modal-rating-row">
              <div className="stars-box">
                <Star size={16} fill="#FFD800" color="#FFD800" />
                <span className="rating-num">{selectedProduct.rating}</span>
                <span className="reviews-text">({selectedProduct.reviewsCount} ta sharh)</span>
              </div>
              <span className="stock-status">Omborda mavjud</span>
            </div>

            {/* Nasiya Installment Banner */}
            <div className="nasiya-calculator-box">
              <div className="nasiya-header">
                <CreditCard size={18} className="nasiya-icon" />
                <span>Uzum Nasiya bilan bo'lib to'lash</span>
              </div>
              <div className="nasiya-months-grid">
                <div className="nasiya-option">
                  <span className="month-label">3 oy</span>
                  <span className="month-price">{Math.round(selectedProduct.price / 3).toLocaleString('uz-UZ')} so'm/oy</span>
                </div>
                <div className="nasiya-option">
                  <span className="month-label">6 oy</span>
                  <span className="month-price">{Math.round(selectedProduct.price / 6).toLocaleString('uz-UZ')} so'm/oy</span>
                </div>
                <div className="nasiya-option active">
                  <span className="month-label">12 oy</span>
                  <span className="month-price">{selectedProduct.monthlyPayment.toLocaleString('uz-UZ')} so'm/oy</span>
                </div>
              </div>
            </div>

            {/* Variant Selectors */}
            {selectedProduct.variants?.colors && (
              <div className="variant-section">
                <span className="variant-label">Rang: <strong>{selectedColor}</strong></span>
                <div className="variant-options">
                  {selectedProduct.variants.colors.map((color) => (
                    <button
                      key={color}
                      className={`variant-chip ${selectedColor === color ? 'active' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedProduct.variants?.storage && (
              <div className="variant-section">
                <span className="variant-label">Xotira hajmi: <strong>{selectedStorage}</strong></span>
                <div className="variant-options">
                  {selectedProduct.variants.storage.map((st) => (
                    <button
                      key={st}
                      className={`variant-chip ${selectedStorage === st ? 'active' : ''}`}
                      onClick={() => setSelectedStorage(st)}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedProduct.variants?.sizes && (
              <div className="variant-section">
                <span className="variant-label">O'lcham: <strong>{selectedSize}</strong></span>
                <div className="variant-options">
                  {selectedProduct.variants.sizes.map((sz) => (
                    <button
                      key={sz}
                      className={`variant-chip ${selectedSize === sz ? 'active' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery Info */}
            <div className="delivery-info-box">
              <div className="delivery-row">
                <Truck size={18} className="delivery-icon" />
                <div>
                  <strong>Yetkazib berish ({selectedCity.name}):</strong> {selectedCity.deliveryDays} bepul topshirish punktiga
                </div>
              </div>
              <div className="delivery-row">
                <ShieldCheck size={18} className="delivery-icon" />
                <div>
                  <strong>Kafolat:</strong> 10 kun ichida qaytarish va almashtirish kafolati
                </div>
              </div>
            </div>

            {/* Price & CTA Buttons */}
            <div className="modal-actions-box">
              <div className="modal-price-display">
                {selectedProduct.oldPrice && (
                  <span className="modal-old-price">{selectedProduct.oldPrice.toLocaleString('uz-UZ')} so'm</span>
                )}
                <span className="modal-current-price">{selectedProduct.price.toLocaleString('uz-UZ')} so'm</span>
              </div>

              <div className="cta-button-group">
                <button
                  className={`modal-add-cart-btn ${isAddedSuccess ? 'success' : ''}`}
                  onClick={handleAddToCart}
                >
                  {isAddedSuccess ? (
                    <>
                      <CheckCircle2 size={18} />
                      Savatga qo'shildi!
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      Savatga qo'shish
                    </>
                  )}
                </button>

                <button className="modal-buy-now-btn" onClick={handleBuyNow}>
                  Bir klikda xarid qilish
                </button>
              </div>
            </div>

            {/* Details Tabs */}
            <div className="details-tabs-container">
              <div className="tabs-header">
                <button
                  className={`tab-btn ${activeTab === 'desc' ? 'active' : ''}`}
                  onClick={() => setActiveTab('desc')}
                >
                  Tavsif
                </button>
                <button
                  className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('specs')}
                >
                  Xususiyatlari
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'desc' ? (
                  <p className="description-text">{selectedProduct.description}</p>
                ) : (
                  <div className="specs-table">
                    {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                      <div key={key} className="spec-row">
                        <span className="spec-key">{key}</span>
                        <span className="spec-val">{val}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
