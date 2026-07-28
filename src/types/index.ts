export interface Product {
  id: number;
  title: string;
  category: string;
  subCategory?: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  monthlyPayment: number; // Nasiya payment per month (e.g. 12 oy)
  image: string;
  gallery: string[];
  badge?: 'Aksiya' | 'Top sotuv' | 'Katta sotuv' | 'Yangi' | 'Kafolatli';
  isGuaranteed?: boolean;
  description: string;
  specifications: Record<string, string>;
  variants?: {
    colors?: string[];
    sizes?: string[];
    storage?: string[];
  };
  inStock: boolean;
  seller: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  selectedStorage?: string;
}

export interface City {
  id: string;
  name: string;
  deliveryDays: string;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  bgColor: string;
  image: string;
  link: string;
}

export interface User {
  phone: string;
  name: string;
  isLoggedIn: boolean;
}
