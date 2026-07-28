import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CITIES } from '../data/mockData';
import { 
  ArrowLeft, Truck, CreditCard, ShieldCheck, 
  CheckCircle2, Building2, User, Phone, Check, Sparkles 
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartTotalCount,
    cartSubtotal,
    cartDiscountedTotal,
    clearCart,
    setCurrentView,
    selectedCity,
    setSelectedCity,
    user
  } = useShop();

  const [deliveryType, setDeliveryType] = useState<'pickup' | 'courier'>('pickup');
  const [address, setAddress] = useState('Amir Temur ko\'chasi, 42-uy');
  const [pickupPoint, setPickupPoint] = useState('Uzum Topshirish punkti: Markaziy filial');
  const [recipientName, setRecipientName] = useState(user?.name || 'Sardorbek Rahimov');
  const [recipientPhone, setRecipientPhone] = useState(user?.phone || '+998 90 123 45 67');
  const [paymentMethod, setPaymentMethod] = useState<'nasiya' | 'card' | 'cash'>('nasiya');

  // Success Confirmation State
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    deliveryDate: string;
    totalAmount: number;
  } | null>(null);

  const deliveryFee = deliveryType === 'courier' ? 15000 : 0;
  const finalPayableTotal = cartDiscountedTotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder = {
      orderId: `UZ-${Math.floor(100000 + Math.random() * 900000)}`,
      deliveryDate: `${selectedCity.deliveryDays} ichida (Ertaga 12:00 gacha)`,
      totalAmount: finalPayableTotal
    };

    setConfirmedOrder(newOrder);
    clearCart();
  };

  if (confirmedOrder) {
    return (
      <main className="pb-16 pt-8 animate-fade">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-xl">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} className="text-uzum-green" />
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-uzum-dark mb-2">
              Rahmat! Buyurtmangiz rasmiylashtirildi
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Buyurtmangiz raqami: <strong className="text-uzum-purple text-base">#{confirmedOrder.orderId}</strong>
            </p>

            {/* Receipt Details Box */}
            <div className="bg-gray-50 rounded-xl p-5 text-left mb-8 space-y-3 text-xs md:text-sm text-gray-700 border border-gray-200">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Yetkazib berish vaqti:</span>
                <strong className="text-uzum-dark">{confirmedOrder.deliveryDate}</strong>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Qabul qiluvchi:</span>
                <strong className="text-uzum-dark">{recipientName} ({recipientPhone})</strong>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Manzil:</span>
                <strong className="text-uzum-dark">{selectedCity.name}, {deliveryType === 'pickup' ? pickupPoint : address}</strong>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">To'lov usuli:</span>
                <strong className="text-uzum-purple">
                  {paymentMethod === 'nasiya' ? 'Uzum Nasiya (Bo\'lib to\'lash)' : paymentMethod === 'card' ? 'Humo / Uzcard kartasi' : 'Naqd pul / Terminal'}
                </strong>
              </div>

              <div className="flex justify-between pt-1 text-base font-extrabold text-uzum-dark">
                <span>Jami to'lov:</span>
                <span className="text-uzum-purple">{confirmedOrder.totalAmount.toLocaleString('uz-UZ')} so'm</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                className="bg-uzum-purple text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-uzum-purple-hover transition-colors shadow-md"
                onClick={() => {
                  setConfirmedOrder(null);
                  setCurrentView('home');
                }}
              >
                Bosh sahifaga qaytish
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="pb-16 pt-8 animate-fade">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xs">
            <h2 className="text-xl font-bold text-uzum-dark mb-2">Savatda tovarlar yo'q</h2>
            <p className="text-sm text-gray-500 mb-6">Rasmiylashtirish uchun savatingizga mahsulot qo'shing</p>
            <button
              className="bg-uzum-purple text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-uzum-purple-hover transition-colors"
              onClick={() => setCurrentView('home')}
            >
              Bosh sahifaga qaytish
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pb-16 pt-4 animate-fade">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Navigation */}
        <button
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-uzum-purple transition-colors mb-4"
          onClick={() => setCurrentView('home')}
        >
          <ArrowLeft size={16} />
          <span>Xarid qilishda davom etish</span>
        </button>

        <h1 className="text-2xl md:text-3xl font-extrabold text-uzum-dark mb-6">
          Buyurtmani rasmiylashtirish
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Fields (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Delivery Location */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                <div className="w-8 h-8 rounded-full bg-uzum-purple-light text-uzum-purple flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h2 className="text-lg font-bold text-uzum-dark">Yetkazib berish usuli va manzili</h2>
              </div>

              {/* City selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-700">Shahar:</label>
                <div className="grid grid-cols-3 gap-2">
                  {CITIES.slice(0, 6).map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={`p-2.5 rounded-lg border text-xs font-semibold transition-all ${
                        c.id === selectedCity.id
                          ? 'border-uzum-purple bg-uzum-purple-light text-uzum-purple'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedCity(c)}
                    >
                      {c.name} ({c.deliveryDays})
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery mode */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    deliveryType === 'pickup'
                      ? 'border-uzum-purple bg-uzum-purple-light/50 ring-2 ring-uzum-purple/20'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                  onClick={() => setDeliveryType('pickup')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Building2 size={20} className="text-uzum-purple" />
                    {deliveryType === 'pickup' && <Check size={18} className="text-uzum-purple font-bold" />}
                  </div>
                  <span className="text-sm font-bold text-uzum-dark">Topshirish punktiga</span>
                  <span className="text-xs text-uzum-green font-semibold mt-0.5">Bepul yetkazish</span>
                </button>

                <button
                  type="button"
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    deliveryType === 'courier'
                      ? 'border-uzum-purple bg-uzum-purple-light/50 ring-2 ring-uzum-purple/20'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                  onClick={() => setDeliveryType('courier')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Truck size={20} className="text-uzum-purple" />
                    {deliveryType === 'courier' && <Check size={18} className="text-uzum-purple font-bold" />}
                  </div>
                  <span className="text-sm font-bold text-uzum-dark">Kuryer orqali eshikgacha</span>
                  <span className="text-xs text-gray-500 mt-0.5">+15 000 so'm</span>
                </button>
              </div>

              {deliveryType === 'pickup' ? (
                <div className="flex flex-col gap-1.5 pt-2">
                  <label className="text-xs font-semibold text-gray-700">Topshirish punkti:</label>
                  <select
                    value={pickupPoint}
                    onChange={(e) => setPickupPoint(e.target.value)}
                    className="p-3 border border-gray-300 rounded-xl text-sm outline-none bg-white focus:border-uzum-purple"
                  >
                    <option value="Uzum Topshirish punkti: Markaziy filial">Uzum Topshirish punkti: Markaziy filial</option>
                    <option value="Uzum Topshirish punkti: Chilonzor 5-mavze">Uzum Topshirish punkti: Chilonzor 5-mavze</option>
                    <option value="Uzum Topshirish punkti: Yunusobod 12-mavze">Uzum Topshirish punkti: Yunusobod 12-mavze</option>
                  </select>
                </div>
              ) : (
                <div className="flex flex-col gap-1.5 pt-2">
                  <label className="text-xs font-semibold text-gray-700">Eshikgacha yetkazish manzili:</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    placeholder="Ko'cha, uy, xonadon raqami"
                    className="p-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-uzum-purple"
                  />
                </div>
              )}
            </div>

            {/* Step 2: Recipient Details */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                <div className="w-8 h-8 rounded-full bg-uzum-purple-light text-uzum-purple flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h2 className="text-lg font-bold text-uzum-dark">Qabul qiluvchi ma'lumotlari</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">Ism va Familiya:</label>
                  <div className="flex items-center border border-gray-300 rounded-xl px-3 bg-white">
                    <User size={18} className="text-gray-400" />
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      required
                      className="p-3 text-sm outline-none flex-1"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">Telefon raqam:</label>
                  <div className="flex items-center border border-gray-300 rounded-xl px-3 bg-white">
                    <Phone size={18} className="text-gray-400" />
                    <input
                      type="tel"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      required
                      className="p-3 text-sm outline-none flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                <div className="w-8 h-8 rounded-full bg-uzum-purple-light text-uzum-purple flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h2 className="text-lg font-bold text-uzum-dark">To'lov usuli</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  type="button"
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'nasiya'
                      ? 'border-uzum-purple bg-uzum-purple-light/50 ring-2 ring-uzum-purple/20'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('nasiya')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <CreditCard size={20} className="text-uzum-purple" />
                    {paymentMethod === 'nasiya' && <Check size={18} className="text-uzum-purple font-bold" />}
                  </div>
                  <span className="text-sm font-bold text-uzum-dark">Uzum Nasiya</span>
                  <span className="text-xs text-uzum-purple font-semibold mt-0.5">0-0-12 bo'lib to'lash</span>
                </button>

                <button
                  type="button"
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'card'
                      ? 'border-uzum-purple bg-uzum-purple-light/50 ring-2 ring-uzum-purple/20'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Sparkles size={20} className="text-uzum-purple" />
                    {paymentMethod === 'card' && <Check size={18} className="text-uzum-purple font-bold" />}
                  </div>
                  <span className="text-sm font-bold text-uzum-dark">Humo / Uzcard</span>
                  <span className="text-xs text-gray-500 mt-0.5">Bank kartasi orqali</span>
                </button>

                <button
                  type="button"
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'cash'
                      ? 'border-uzum-purple bg-uzum-purple-light/50 ring-2 ring-uzum-purple/20'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('cash')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <ShieldCheck size={20} className="text-uzum-purple" />
                    {paymentMethod === 'cash' && <Check size={18} className="text-uzum-purple font-bold" />}
                  </div>
                  <span className="text-sm font-bold text-uzum-dark">Naqd pul / Terminal</span>
                  <span className="text-xs text-gray-500 mt-0.5">Qabul qilganda to'lash</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar (1 Col) */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md sticky top-24 space-y-4">
              <h2 className="text-lg font-bold text-uzum-dark pb-3 border-b border-gray-100">
                Buyurtmangiz ({cartTotalCount} ta)
              </h2>

              {/* Items Mini List */}
              <div className="max-h-56 overflow-y-auto space-y-3 pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    <img src={item.product.image} alt="" className="w-12 h-12 object-cover rounded-lg border border-gray-200 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-uzum-dark truncate">{item.product.title}</p>
                      <p className="text-gray-400">{item.quantity} ta x {(item.product.price).toLocaleString('uz-UZ')} so'm</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs md:text-sm pt-3 border-t border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Mahsulotlar narxi:</span>
                  <span>{cartSubtotal.toLocaleString('uz-UZ')} so'm</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Yetkazib berish ({selectedCity.name}):</span>
                  <span className={deliveryFee === 0 ? 'text-uzum-green font-semibold' : ''}>
                    {deliveryFee === 0 ? 'Bepul' : `${deliveryFee.toLocaleString('uz-UZ')} so'm`}
                  </span>
                </div>

                <div className="flex justify-between text-lg font-extrabold text-uzum-dark pt-3 border-t border-dashed border-gray-300">
                  <span>Jami to'lov:</span>
                  <span className="text-uzum-purple">{finalPayableTotal.toLocaleString('uz-UZ')} so'm</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-uzum-purple text-white py-4 rounded-xl font-bold text-base hover:bg-uzum-purple-hover transition-all shadow-lg shadow-uzum-purple/20 hover:-translate-y-0.5"
              >
                Buyurtmani tasdiqlash
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};
