import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Smartphone, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import './AuthModal.css';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, loginUser, user, logoutUser } = useShop();
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('+998 ');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  if (!isAuthOpen) return null;

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 9) {
      setStep('code');
    }
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(phone, name.trim() || 'Xaridor');
    setStep('phone');
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthOpen(false)}>
      <div className="auth-modal-card animate-fade" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={() => setIsAuthOpen(false)}>
          <X size={22} />
        </button>

        {user ? (
          <div className="user-profile-view">
            <div className="user-avatar">
              <Sparkles size={32} color="#7000FF" />
            </div>
            <h3>{user.name}</h3>
            <p className="user-phone-text">{user.phone}</p>
            <div className="user-status-badge">
              <ShieldCheck size={14} /> Uzum Xaridori (Tasdiqlangan)
            </div>

            <button className="logout-btn" onClick={logoutUser}>
              Tizimdan chiqish
            </button>
          </div>
        ) : (
          <div className="auth-form-container">
            <div className="auth-header">
              <div className="auth-logo">uzum</div>
              <h2>{step === 'phone' ? "Telefon raqamingizni kiriting" : "Tasdiqlash kodini kiriting"}</h2>
              <p>{step === 'phone' ? "Buyurtmalarni kuzatish va aksiyalardan xabardor bo'lish uchun" : `${phone} raqamiga SMS yuborildi`}</p>
            </div>

            {step === 'phone' ? (
              <form onSubmit={handlePhoneSubmit} className="auth-form">
                <div className="auth-field">
                  <label>Ismingiz (ixtiyoriy):</label>
                  <input
                    type="text"
                    placeholder="Masalan: Sardor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="auth-field">
                  <label>Telefon raqam:</label>
                  <div className="phone-input-group">
                    <Smartphone size={20} className="field-icon" />
                    <input
                      type="tel"
                      placeholder="+998 90 123 45 67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="auth-submit-btn">
                  <span>Kodni olish</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            ) : (
              <form onSubmit={handleCodeSubmit} className="auth-form">
                <div className="auth-field">
                  <label>SMS Kodi (sinov uchun har qanday 4 xonali raqam):</label>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="1 2 3 4"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                <button type="submit" className="auth-submit-btn">
                  Kirish
                </button>

                <button type="button" className="back-step-btn" onClick={() => setStep('phone')}>
                  &larr; Raqamni o'zgartirish
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
