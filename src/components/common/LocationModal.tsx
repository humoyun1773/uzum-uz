import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CITIES } from '../../data/mockData';
import { X, MapPin, Check } from 'lucide-react';
import './LocationModal.css';

export const LocationModal: React.FC = () => {
  const { isLocationOpen, setIsLocationOpen, selectedCity, setSelectedCity } = useShop();

  if (!isLocationOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsLocationOpen(false)}>
      <div className="location-modal-card animate-fade" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={() => setIsLocationOpen(false)}>
          <X size={22} />
        </button>

        <div className="location-modal-header">
          <MapPin size={24} className="pin-icon" />
          <h2>Shaharni tanlang</h2>
          <p>Yetkazib berish muddati va topshirish punktlari siz tanlagan shaharga qarab ko'rsatiladi</p>
        </div>

        <div className="cities-grid">
          {CITIES.map((city) => (
            <button
              key={city.id}
              className={`city-btn ${city.id === selectedCity.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedCity(city);
                setIsLocationOpen(false);
              }}
            >
              <div className="city-btn-info">
                <span className="city-name">{city.name}</span>
                <span className="city-delivery">{city.deliveryDays} yetkazish</span>
              </div>
              {city.id === selectedCity.id && <Check size={18} className="city-check-icon" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
