import React from 'react';
import { Sparkles, QrCode, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6 mt-16">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-gray-100">
          {/* Col 1 */}
          <div>
            <h4 className="text-sm font-bold text-uzum-dark mb-4">Biz haqimizda</h4>
            <ul className="flex flex-col gap-2.5 text-xs md:text-sm text-gray-500">
              <li><a href="#about" className="hover:text-uzum-purple transition-colors">Topshirish punktlari</a></li>
              <li><a href="#jobs" className="hover:text-uzum-purple transition-colors">Vakansiyalar</a></li>
              <li><a href="#press" className="hover:text-uzum-purple transition-colors">Biz haqimizda matbuotda</a></li>
              <li><a href="#sustainability" className="hover:text-uzum-purple transition-colors">Barqaror rivojlanish</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-sm font-bold text-uzum-dark mb-4">Foydalanuvchilarga</h4>
            <ul className="flex flex-col gap-2.5 text-xs md:text-sm text-gray-500">
              <li><a href="#contact" className="hover:text-uzum-purple transition-colors">Biz bilan bog'lanish</a></li>
              <li><a href="#faq" className="hover:text-uzum-purple transition-colors">Savol-javoblar</a></li>
              <li><a href="#returns" className="hover:text-uzum-purple transition-colors">Mahsulotni qaytarish</a></li>
              <li><a href="#guarantee" className="hover:text-uzum-purple transition-colors">Kafolat shartlari</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm font-bold text-uzum-dark mb-4">Tadbirkorlarga</h4>
            <ul className="flex flex-col gap-2.5 text-xs md:text-sm text-gray-500">
              <li><a href="#sell" className="hover:text-uzum-purple transition-colors">Uzum da soting</a></li>
              <li><a href="#seller-cabinet" className="hover:text-uzum-purple transition-colors">Sotuvchi kabinetiga kirish</a></li>
              <li><a href="#fulfillment" className="hover:text-uzum-purple transition-colors">Fulfillment va saqlash</a></li>
              <li><a href="#partner" className="hover:text-uzum-purple transition-colors">Hamkor bo'ling</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-sm font-bold text-uzum-dark mb-4">Ilovani yuklab olish</h4>
            <p className="text-xs text-gray-500 mb-3.5">Kamerangizni QR-kodga qarating va Uzum ilovasini yuklab oling</p>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-uzum-purple-light flex items-center justify-center border border-dashed border-uzum-purple shrink-0">
                <QrCode size={40} className="text-uzum-purple" />
              </div>
              <div className="flex flex-col gap-2">
                <button className="bg-gray-100 text-uzum-dark text-xs font-semibold px-4 py-2 rounded-md hover:bg-uzum-purple hover:text-white transition-colors">App Store</button>
                <button className="bg-gray-100 text-uzum-dark text-xs font-semibold px-4 py-2 rounded-md hover:bg-uzum-purple hover:text-white transition-colors">Google Play</button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 text-xs text-gray-400 gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 font-extrabold text-uzum-purple text-base">
            <div className="w-7 h-7 rounded-md bg-uzum-purple flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span>uzum market</span>
          </div>

          <p>2026 © XK «UZUM MARKET». Barcha huquqlar himoyalangan.</p>

          <div className="flex items-center gap-1.5 text-uzum-green font-medium">
            <ShieldCheck size={16} />
            <span>Xavfsiz to'lov va 100% kafolat</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
