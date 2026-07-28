import React from 'react';
import { Sparkles, QrCode, ShieldCheck } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top-grid">
          {/* Col 1 */}
          <div className="footer-col">
            <h4 className="footer-col-title">Biz haqimizda</h4>
            <ul className="footer-links">
              <li><a href="#about">Topshirish punktlari</a></li>
              <li><a href="#jobs">Vakansiyalar</a></li>
              <li><a href="#press">Biz haqimizda matbuotda</a></li>
              <li><a href="#sustainability">Barqaror rivojlanish</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="footer-col">
            <h4 className="footer-col-title">Foydalanuvchilarga</h4>
            <ul className="footer-links">
              <li><a href="#contact">Biz bilan bog'lanish</a></li>
              <li><a href="#faq">Savol-javoblar</a></li>
              <li><a href="#returns">Mahsulotni qaytarish</a></li>
              <li><a href="#guarantee">Kafolat shartlari</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="footer-col">
            <h4 className="footer-col-title">Tadbirkorlarga</h4>
            <ul className="footer-links">
              <li><a href="#sell">Uzum da soting</a></li>
              <li><a href="#seller-cabinet">Sotuvchi kabinetiga kirish</a></li>
              <li><a href="#fulfillment">Fulfillment va saqlash</a></li>
              <li><a href="#partner">Hamkor bo'ling</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="footer-col app-download-col">
            <h4 className="footer-col-title">Ilovani yuklab olish</h4>
            <p className="app-subtitle">Kamerangizni QR-kodga qarating va Uzum ilovasini yuklab oling</p>
            
            <div className="qr-badge-box">
              <div className="qr-code-dummy">
                <QrCode size={48} color="#7000FF" />
              </div>
              <div className="app-stores-buttons">
                <button className="store-btn">App Store</button>
                <button className="store-btn">Google Play</button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-brand">
            <div className="footer-logo">
              <Sparkles size={18} color="#FFFFFF" />
            </div>
            <span>uzum market</span>
          </div>

          <p className="copyright-text">
            2026 © XK «UZUM MARKET». Barcha huquqlar himoyalangan.
          </p>

          <div className="security-badge">
            <ShieldCheck size={16} />
            <span>Xavfsiz to'lov va 100% kafolat</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
