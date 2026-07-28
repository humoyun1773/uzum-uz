import React from 'react';

interface UzumLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const UzumLogo: React.FC<UzumLogoProps> = ({ className = '', size = 'md' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9 md:w-10 md:h-10',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl md:text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Uzum Logo Emblem */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        {/* Outer Yellow Circle */}
        <div className="absolute inset-0 bg-[#FFD800] rounded-full shadow-xs"></div>

        {/* Tilted Purple Badge */}
        <div className="relative w-3/4 h-3/4 bg-[#7000FF] rounded-lg -rotate-6 flex items-center justify-center shadow-sm">
          {/* Inner U Emblem */}
          <svg 
            viewBox="0 0 24 24" 
            className="w-4 h-4 text-white fill-none stroke-current stroke-[3] stroke-linecap-round stroke-linejoin-round"
          >
            <path d="M7 9v4a5 5 0 0 0 10 0V9" />
            <line x1="12" y1="5" x2="12" y2="9" />
          </svg>
        </div>
      </div>

      {/* Official Uzum Market Wordmark */}
      <div className={`font-black text-[#7000FF] tracking-tight leading-none ${textSizes[size]}`}>
        <span>uzum market</span>
      </div>
    </div>
  );
};
