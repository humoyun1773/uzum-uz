import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CITIES } from '../../data/mockData';
import { X, MapPin, Check } from 'lucide-react';

export const LocationModal: React.FC = () => {
  const { isLocationOpen, setIsLocationOpen, selectedCity, setSelectedCity } = useShop();

  if (!isLocationOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/55 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade" onClick={() => setIsLocationOpen(false)}>
      <div className="bg-white rounded-2xl w-[500px] max-w-full p-8 relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors" onClick={() => setIsLocationOpen(false)}>
          <X size={22} />
        </button>

        <div className="text-center mb-6">
          <MapPin size={28} className="text-uzum-purple mx-auto mb-2" />
          <h2 className="text-xl font-bold text-uzum-dark mb-1">Shaharni tanlang</h2>
          <p className="text-xs text-gray-500">Yetkazib berish muddati va topshirish punktlari siz tanlagan shaharga qarab ko'rsatiladi</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {CITIES.map((city) => (
            <button
              key={city.id}
              className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                city.id === selectedCity.id
                  ? 'border-uzum-purple bg-uzum-purple-light'
                  : 'border-gray-200 bg-gray-50 hover:border-uzum-purple hover:bg-uzum-purple-light/50'
              }`}
              onClick={() => {
                setSelectedCity(city);
                setIsLocationOpen(false);
              }}
            >
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-uzum-dark">{city.name}</span>
                <span className="text-[11px] text-gray-500">{city.deliveryDays} yetkazish</span>
              </div>
              {city.id === selectedCity.id && <Check size={18} className="text-uzum-purple" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
