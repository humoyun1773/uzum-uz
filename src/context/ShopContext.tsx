import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem, City, User } from '../types';
import { CITIES, PRODUCTS } from '../data/mockData';
import { TRANSLATIONS } from '../i18n/translations';
import type { Language } from '../i18n/translations';

export type ViewType = 'home' | 'wishlist' | 'checkout';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: number[];
  selectedCity: City;
  user: User | null;
  selectedProduct: Product | null;
  selectedCategory: string | null;
  searchQuery: string;
  isCatalogOpen: boolean;
  isCartOpen: boolean;
  isAuthOpen: boolean;
  isLocationOpen: boolean;
  currentView: ViewType;
  promoCode: string | null;
  promoDiscount: number;
  promoError: string | null;
  language: Language;

  // Actions
  setSelectedCity: (city: City) => void;
  setSelectedProduct: (product: Product | null) => void;
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  setIsCatalogOpen: (isOpen: boolean | ((prev: boolean) => boolean)) => void;
  setIsCartOpen: (isOpen: boolean | ((prev: boolean) => boolean)) => void;
  setIsAuthOpen: (isOpen: boolean | ((prev: boolean) => boolean)) => void;
  setIsLocationOpen: (isOpen: boolean | ((prev: boolean) => boolean)) => void;
  setCurrentView: (view: ViewType) => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;

  addToCart: (product: Product, color?: string, size?: string, storage?: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: number) => void;
  clearWishlist: () => void;
  addAllWishlistToCart: () => void;
  isWishlisted: (productId: number) => boolean;
  applyPromoCode: (code: string) => void;
  loginUser: (phone: string, name: string) => void;
  logoutUser: () => void;

  // Computed
  cartTotalCount: number;
  cartSubtotal: number;
  cartDiscountedTotal: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('uzum_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<number[]>(() => {
    const saved = localStorage.getItem('uzum_wishlist');
    return saved ? JSON.parse(saved) : [101, 103];
  });
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]);
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('uzum_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('uzum_lang');
    return (saved as Language) || 'uz';
  });

  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Sync localStorage
  useEffect(() => {
    localStorage.setItem('uzum_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('uzum_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('uzum_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('uzum_user');
    }
  }, [user]);

  // Lock background scroll when any modal or drawer is open
  useEffect(() => {
    const isModalOpen = Boolean(
      selectedProduct || isCatalogOpen || isCartOpen || isAuthOpen || isLocationOpen
    );

    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [selectedProduct, isCatalogOpen, isCartOpen, isAuthOpen, isLocationOpen]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('uzum_lang', lang);
  };

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS['uz'];
    return langDict[key] || TRANSLATIONS['uz'][key] || key;
  };

  const addToCart = (product: Product, color?: string, size?: string, storage?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      }
      return [...prev, { product, quantity: 1, selectedColor: color, selectedSize: size, selectedStorage: storage }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode(null);
    setPromoDiscount(0);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const addAllWishlistToCart = () => {
    wishlist.forEach((id) => {
      const p = products.find((prod) => prod.id === id);
      if (p) addToCart(p);
    });
  };

  const isWishlisted = (productId: number) => wishlist.includes(productId);

  const applyPromoCode = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'UZUM2026' || trimmed === 'SALE15') {
      setPromoCode(trimmed);
      setPromoDiscount(0.15); // 15% discount
      setPromoError(null);
    } else {
      setPromoError('Promokod noto\'g\'ri yoki muddati o\'tgan');
    }
  };

  const loginUser = (phone: string, name: string) => {
    setUser({ phone, name, isLoggedIn: true });
    setIsAuthOpen(false);
  };

  const logoutUser = () => {
    setUser(null);
  };

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartDiscountedTotal = Math.round(cartSubtotal * (1 - promoDiscount));

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        selectedCity,
        user,
        selectedProduct,
        selectedCategory,
        searchQuery,
        isCatalogOpen,
        isCartOpen,
        isAuthOpen,
        isLocationOpen,
        currentView,
        promoCode,
        promoDiscount,
        promoError,
        language,
        setSelectedCity,
        setSelectedProduct,
        setSelectedCategory,
        setSearchQuery,
        setIsCatalogOpen,
        setIsCartOpen,
        setIsAuthOpen,
        setIsLocationOpen,
        setCurrentView,
        setLanguage,
        t,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        clearWishlist,
        addAllWishlistToCart,
        isWishlisted,
        applyPromoCode,
        loginUser,
        logoutUser,
        cartTotalCount,
        cartSubtotal,
        cartDiscountedTotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
