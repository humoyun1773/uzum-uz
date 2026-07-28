import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Smartphone, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

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
    <div className="fixed inset-0 bg-black/55 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade" onClick={() => setIsAuthOpen(false)}>
      <div className="bg-white rounded-2xl w-[440px] max-w-full p-8 relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors" onClick={() => setIsAuthOpen(false)}>
          <X size={22} />
        </button>

        {user ? (
          <div className="flex flex-col items-center text-center">
            <div className="w-18 h-18 rounded-full bg-uzum-purple-light flex items-center justify-center mb-4">
              <Sparkles size={32} className="text-uzum-purple" />
            </div>
            <h3 className="text-xl font-bold text-uzum-dark">{user.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{user.phone}</p>
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-uzum-green text-xs font-semibold px-3 py-1 rounded-full mb-6">
              <ShieldCheck size={14} /> Uzum Xaridori (Tasdiqlangan)
            </div>

            <button className="bg-red-100 text-red-600 text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-red-200 transition-colors" onClick={logoutUser}>
              Tizimdan chiqish
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="text-center mb-6">
              <div className="text-3xl font-extrabold text-uzum-purple mb-2">uzum</div>
              <h2 className="text-lg font-bold text-uzum-dark mb-1">
                {step === 'phone' ? "Telefon raqamingizni kiriting" : "Tasdiqlash kodini kiriting"}
              </h2>
              <p className="text-xs text-gray-500">
                {step === 'phone' ? "Buyurtmalarni kuzatish va aksiyalardan xabardor bo'lish uchun" : `${phone} raqamiga SMS yuborildi`}
              </p>
            </div>

            {step === 'phone' ? (
              <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">Ismingiz (ixtiyoriy):</label>
                  <input
                    type="text"
                    placeholder="Masalan: Sardor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-uzum-purple focus:ring-3 focus:ring-uzum-purple/15 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">Telefon raqam:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg pl-3 focus-within:border-uzum-purple focus-within:ring-3 focus-within:ring-uzum-purple/15 transition-all">
                    <Smartphone size={20} className="text-gray-400" />
                    <input
                      type="tel"
                      placeholder="+998 90 123 45 67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="p-3 text-sm outline-none flex-1 bg-transparent"
                    />
                  </div>
                </div>

                <button type="submit" className="bg-uzum-purple text-white p-3.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-uzum-purple-hover transition-colors mt-2">
                  <span>Kodni olish</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            ) : (
              <form onSubmit={handleCodeSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">SMS Kodi (sinov uchun 4 ta raqam):</label>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="1 2 3 4"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    autoFocus
                    className="p-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-uzum-purple focus:ring-3 focus:ring-uzum-purple/15 transition-all text-center tracking-widest font-bold text-lg"
                  />
                </div>

                <button type="submit" className="bg-uzum-purple text-white p-3.5 rounded-lg text-sm font-bold hover:bg-uzum-purple-hover transition-colors">
                  Kirish
                </button>

                <button type="button" className="text-xs text-uzum-purple font-semibold text-center mt-1" onClick={() => setStep('phone')}>
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
