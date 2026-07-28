import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Trash2, Plus, Minus, Tag, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import './CartDrawer.css';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    promoCode,
    promoDiscount,
    promoError,
    applyPromoCode,
    cartTotalCount,
    cartSubtotal,
    cartDiscountedTotal,
    selectedCity
  } = useShop();

  const [inputCode, setInputCode] = useState('');
  const [isOrderedSuccess, setIsOrderedSuccess] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    applyPromoCode(inputCode);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsOrderedSuccess(true);
    setTimeout(() => {
      clearCart();
      setIsOrderedSuccess(false);
      setIsCartOpen(false);
    }, 2800);
  };

  return (
    <div className="cart-backdrop" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer animate-slide" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag size={22} className="cart-header-icon" />
            <h2>Savat</h2>
            <span className="cart-badge-count">{cartTotalCount} ta mahsulot</span>
          </div>
          <button className="cart-close-btn" onClick={() => setIsCartOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        {isOrderedSuccess ? (
          <div className="order-success-view animate-fade">
            <CheckCircle2 size={64} className="success-icon" />
            <h3>Buyurtma muvaffaqiyatli rasmiylashtirildi!</h3>
            <p>Buyurtma raqami: <strong>#UZ-{Math.floor(100000 + Math.random() * 900000)}</strong></p>
            <p className="success-sub">Yetkazib berish muddati: <strong>{selectedCity.name}</strong> ({selectedCity.deliveryDays})</p>
          </div>
        ) : cart.length === 0 ? (
          <div className="empty-cart-view">
            <ShoppingBag size={64} className="empty-icon" />
            <h3>Savatda hozircha hech narsa yo'q</h3>
            <p>Bosh sahifadagi mahsulotlardan birini tanlang yoki qidiruvdan foydalaning</p>
            <button className="browse-btn" onClick={() => setIsCartOpen(false)}>
              Xarid qilishni boshlash
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="cart-items-list">
              {cart.map((item, idx) => (
                <div key={idx} className="cart-item-row">
                  <img src={item.product.image} alt={item.product.title} className="cart-item-img" />
                  
                  <div className="cart-item-info">
                    <h4 className="cart-item-title">{item.product.title}</h4>
                    <p className="cart-item-seller">Sotuvchi: {item.product.seller}</p>
                    
                    <div className="cart-item-price-row">
                      <span className="cart-item-price">
                        {(item.product.price * item.quantity).toLocaleString('uz-UZ')} so'm
                      </span>
                    </div>

                    <div className="cart-item-actions">
                      <div className="cart-quantity-selector">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-val">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.product.id)}
                        title="O'chirish"
                      >
                        <Trash2 size={16} />
                        <span>O'chirish</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer & Checkout */}
            <div className="cart-footer-panel">
              {/* Promo Code Form */}
              <form className="promo-form" onSubmit={handleApplyPromo}>
                <div className="promo-input-wrapper">
                  <Tag size={16} className="promo-icon" />
                  <input
                    type="text"
                    placeholder="Promokod kiritish (masalan: UZUM2026)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                  />
                  <button type="submit" className="promo-submit-btn">
                    Qo'llash
                  </button>
                </div>
                {promoCode && (
                  <div className="promo-success-tag">
                    <CheckCircle2 size={14} />
                    Promokod <strong>{promoCode}</strong> qo'llandi! (-15% chegirma)
                  </div>
                )}
                {promoError && <p className="promo-error-msg">{promoError}</p>}
              </form>

              {/* Price Calculations */}
              <div className="price-summary-box">
                <div className="summary-row">
                  <span>Mahsulotlar ({cartTotalCount} ta):</span>
                  <span>{cartSubtotal.toLocaleString('uz-UZ')} so'm</span>
                </div>

                <div className="summary-row">
                  <span>Yetkazib berish ({selectedCity.name}):</span>
                  <span className="free-tag">Bepul</span>
                </div>

                {promoDiscount > 0 && (
                  <div className="summary-row promo-discount-row">
                    <span>Promokod bo'yicha chegirma:</span>
                    <span>-{(cartSubtotal * promoDiscount).toLocaleString('uz-UZ')} so'm</span>
                  </div>
                )}

                <div className="summary-row total-row">
                  <span>Jami to'lov:</span>
                  <span className="total-price">{cartDiscountedTotal.toLocaleString('uz-UZ')} so'm</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button className="checkout-btn" onClick={handleCheckout}>
                <span>Rasmiylashtirishga o'tish</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
