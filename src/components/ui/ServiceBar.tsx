import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Truck, CreditCard, ShieldCheck, RefreshCw } from 'lucide-react';

export const ServiceBar: React.FC = () => {
  const { t } = useShop();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white border border-gray-200 rounded-xl p-5 mb-8 shadow-xs">
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-uzum-purple-light text-uzum-purple flex items-center justify-center shrink-0">
          <Truck size={22} />
        </div>
        <div className="flex flex-col">
          <strong className="text-sm font-bold text-uzum-dark">{t('service.delivery_title')}</strong>
          <span className="text-xs text-gray-500">{t('service.delivery_sub')}</span>
        </div>
      </div>

      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-uzum-purple-light text-uzum-purple flex items-center justify-center shrink-0">
          <CreditCard size={22} />
        </div>
        <div className="flex flex-col">
          <strong className="text-sm font-bold text-uzum-dark">{t('service.nasiya_title')}</strong>
          <span className="text-xs text-gray-500">{t('service.nasiya_sub')}</span>
        </div>
      </div>

      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-uzum-purple-light text-uzum-purple flex items-center justify-center shrink-0">
          <ShieldCheck size={22} />
        </div>
        <div className="flex flex-col">
          <strong className="text-sm font-bold text-uzum-dark">{t('service.quality_title')}</strong>
          <span className="text-xs text-gray-500">{t('service.quality_sub')}</span>
        </div>
      </div>

      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-uzum-purple-light text-uzum-purple flex items-center justify-center shrink-0">
          <RefreshCw size={22} />
        </div>
        <div className="flex flex-col">
          <strong className="text-sm font-bold text-uzum-dark">{t('service.return_title')}</strong>
          <span className="text-xs text-gray-500">{t('service.return_sub')}</span>
        </div>
      </div>
    </div>
  );
};
