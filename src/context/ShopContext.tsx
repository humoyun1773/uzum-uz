import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem, City, User } from '../types';
import { CITIES, PRODUCTS } from '../data/mockData';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: number[];
  selectedCity: City;
  searchQuery: string;
  selectedCategory: string | null;
  
  // Modals & Panels
  isCatalogOpen: boolean;
  isCartOpen: boolean;
  isAuthOpen: boolean;
  isLocationOpen: boolean;
  selectedProduct: Product | null;
  
  // User auth state
  user: User | null;
  
  // Promo code
  promoCode: string;
  promoDiscount: number; // e.g. 0.10 for 10%
  promoError: string;

  // Actions
  addToCart: (product: Product, selectedColor?: string, selectedSize?: string, selectedStorage?: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: number) => void;
  isWishlisted: (productId: number) => boolean;
  
  setSelectedCity: (city: City) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  
  setIsCatalogOpen: (isOpen: boolean | ((prev: boolean) => boolean)) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  setIsAuthOpen: (isOpen: boolean) => void;
  setIsLocationOpen: (isOpen: boolean) => void;
  setSelectedProduct: (product: Product | null) => void;
  
  applyPromoCode: (code: string) => boolean;
  loginUser: (phone: string, name?: string) => void;
  logoutUser: () => void;
  
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
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Modals state
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isLocationOpen, setIsLocationOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // User state
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('uzum_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Promo code
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState<string>('');

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

  const addToCart = (product: Product, selectedColor?: string, selectedSize?: string, selectedStorage?: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id &&
                  item.selectedColor === selectedColor &&
                  item.selectedSize === selectedSize &&
                  item.selectedStorage === selectedStorage
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prevCart,
        {
          product,
          quantity: 1,
          selectedColor,
          selectedSize,
          selectedStorage
        }
      ];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setPromoDiscount(0);
    setPromoError('');
  };

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isWishlisted = (productId: number) => wishlist.includes(productId);

  const applyPromoCode = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'UZUM2026' || cleanCode === 'UZUM10') {
      setPromoCode(cleanCode);
      setPromoDiscount(0.15); // 15% discount
      setPromoError('');
      return true;
    } else {
      setPromoError("Noto'g'ri promokod. 'UZUM2026' kodini sinab ko'ring!");
      return false;
    }
  };

  const loginUser = (phone: string, name: string = 'Xaridor') => {
    const newUser: User = { phone, name, isLoggedIn: true };
    setUser(newUser);
    setIsAuthOpen(false);
  };

  const logoutUser = () => {
    setUser(null);
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDiscountedTotal = Math.round(cartSubtotal * (1 - promoDiscount));

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        selectedCity,
        searchQuery,
        selectedCategory,
        isCatalogOpen,
        isCartOpen,
        isAuthOpen,
        isLocationOpen,
        selectedProduct,
        user,
        promoCode,
        promoDiscount,
        promoError,

        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        setSelectedCity,
        setSearchQuery,
        setSelectedCategory,
        setIsCatalogOpen,
        setIsCartOpen,
        setIsAuthOpen,
        setIsLocationOpen,
        setSelectedProduct,
        applyPromoCode,
        loginUser,
        logoutUser,

        cartTotalCount,
        cartSubtotal,
        cartDiscountedTotal
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
