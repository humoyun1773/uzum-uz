import React from 'react';
import { Truck, CreditCard, ShieldCheck, RefreshCw } from 'lucide-react';

export const ServiceBar: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white border border-gray-200 rounded-xl p-5 mb-8 shadow-xs">
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-uzum-purple-light text-uzum-purple flex items-center justify-center shrink-0">
          <Truck size={22} />
        </div>
        <div className="flex flex-col">
          <strong className="text-sm font-bold text-uzum-dark">1 kunda yetkazish</strong>
          <span className="text-xs text-gray-500">Respublika bo'ylab bepul</span>
        </div>
      </div>

      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-uzum-purple-light text-uzum-purple flex items-center justify-center shrink-0">
          <CreditCard size={22} />
        </div>
        <div className="flex flex-col">
          <strong className="text-sm font-bold text-uzum-dark">Uzum Nasiya 0-0-12</strong>
          <span className="text-xs text-gray-500">Boshlang'ich to'lovsiz</span>
        </div>
      </div>

      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-uzum-purple-light text-uzum-purple flex items-center justify-center shrink-0">
          <ShieldCheck size={22} />
        </div>
        <div className="flex flex-col">
          <strong className="text-sm font-bold text-uzum-dark">100% Sifat kafolati</strong>
          <span className="text-xs text-gray-500">Original tovarlar</span>
        </div>
      </div>

      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-uzum-purple-light text-uzum-purple flex items-center justify-center shrink-0">
          <RefreshCw size={22} />
        </div>
        <div className="flex flex-col">
          <strong className="text-sm font-bold text-uzum-dark">Oson qaytarish</strong>
          <span className="text-xs text-gray-500">10 kun ichida almashtirish</span>
        </div>
      </div>
    </div>
  );
};
