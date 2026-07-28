import type { Product, Category, Banner, City } from '../types';

export const CITIES: City[] = [
  { id: 'tashkent', name: 'Toshkent', deliveryDays: '1 kunda' },
  { id: 'samarkand', name: 'Samarqand', deliveryDays: '1 kunda' },
  { id: 'namangan', name: 'Namangan', deliveryDays: '1 kunda' },
  { id: 'andijan', name: 'Andijon', deliveryDays: '1 kunda' },
  { id: 'bukhara', name: 'Buxoro', deliveryDays: '1 kunda' },
  { id: 'fergana', name: 'Farg\'ona', deliveryDays: '1 kunda' },
  { id: 'nukus', name: 'Nukus', deliveryDays: '2 kunda' },
  { id: 'urgench', name: 'Urganch', deliveryDays: '2 kunda' },
  { id: 'qarshi', name: 'Qarshi', deliveryDays: '1 kunda' },
];

export const CATEGORIES: Category[] = [
  {
    id: 'electronics',
    name: 'Elektronika',
    icon: 'Smartphone',
    subcategories: ['Smartfonlar', 'Quloqchinlar', 'Planshetlar', 'Aqlli soatlar', 'Noutbuklar', 'Kameralar']
  },
  {
    id: 'appliances',
    name: 'Maishiy texnika',
    icon: 'Tv',
    subcategories: ['Televizorlar', 'Kir yuvish mashinalari', 'Muzlatgichlar', 'Konditsionerlar', 'Changyutgichlar', 'Mikroto‘lqinli pechlar']
  },
  {
    id: 'clothing',
    name: 'Kiyim-kechak',
    icon: 'Shirt',
    subcategories: ['Erkaklar kiyimi', 'Ayollar kiyimi', 'Bolalar kiyimi', 'Sport kiyimlari', 'Kurtkalar']
  },
  {
    id: 'shoes',
    name: 'Poyabzallar',
    icon: 'Footprints',
    subcategories: ['Krossovkalar', 'Klassik poyabzallar', 'Tapochkalar', 'Etiklar', 'Sport poyabzallari']
  },
  {
    id: 'accessories',
    name: 'Aksessuarlar',
    icon: 'Watch',
    subcategories: ["Sumkalar", "Hamyonlar", "Quyosh ko'zoynaklari", "Kamar va bog'ichlar", "Zargarlik buyumlari"]
  },
  {
    id: 'beauty',
    name: "Go'zallik va parvarish",
    icon: 'Sparkles',
    subcategories: ['Parfyumeriya', 'Yuz parvarishi', 'Soch parvarishi', 'Makiyaj', 'Erkaklar parvarishi']
  },
  {
    id: 'home',
    name: "Uy-ro'zg'or buyumlari",
    icon: 'Home',
    subcategories: ['Idish-tovoqlar', 'Postel jamlanmalari', 'Yoritgichlar', 'Oshxona anjomlari', 'Dekor']
  },
  {
    id: 'sports',
    name: 'Sport va hordiq',
    icon: 'Dumbbell',
    subcategories: ['Fitnes anjomlari', 'Velosipedlar', 'Turizm buyumlari', 'Kemping', 'Sport ozuqalari']
  },
  {
    id: 'auto',
    name: 'Avtotovarlar',
    icon: 'Car',
    subcategories: ['Avto aksessuarlar', 'Avto kimyo', 'Videoregistratorlar', 'Gidravlik domkratlar', "Avto g'ildiraklar"]
  }
];

export const BANNERS: Banner[] = [
  {
    id: 1,
    title: 'Super Chegirmalar Haftaligi!',
    subtitle: 'Barcha elektronika mahsulotlariga 50% gacha chegirma',
    badge: 'Uzum Nasiya 0-0-12',
    bgColor: 'linear-gradient(135deg, #7000FF 0%, #4D00B3 100%)',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    link: '#super-sale'
  },
  {
    id: 2,
    title: 'Smartfonlar va Gadjetlar Bomi!',
    subtitle: 'iPhone 15 Pro, Samsung S24 Ultra eng arzon narxda',
    badge: 'Kafolatlangan yetkazish',
    bgColor: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    link: '#smartphones'
  },
  {
    id: 3,
    title: "Maktab va O'quv Mavsumi",
    subtitle: 'Noutbuk va kanselyariya buyumlariga maxsus aksiyalar',
    badge: '1 kunda yetkazib beramiz',
    bgColor: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    link: '#back-to-school'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 101,
    title: 'Smartfon Apple iPhone 15 Pro 128GB Natural Titanium',
    category: 'Elektronika',
    subCategory: 'Smartfonlar',
    price: 14200000,
    oldPrice: 16500000,
    rating: 4.9,
    reviewsCount: 1420,
    monthlyPayment: 1419000,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80'
    ],
    badge: 'Top sotuv',
    isGuaranteed: true,
    description: "Apple A17 Pro chipiga ega, super yengil va mustahkam Titan korpusli iPhone 15 Pro. Professional darajadagi 48 MP kamera va Action Button tugmasi bilan.",
    specifications: {
      'Ekran': '6.1" Super Retina XDR OLED 120Hz',
      'Protsessor': 'Apple A17 Pro (3nm)',
      'Xotira': '128 GB',
      'Operativ xotira': '8 GB',
      'Kamera': '48 MP + 12 MP + 12 MP'
    },
    variants: {
      colors: ['Natural Titanium', 'Blue Titanium', 'Black Titanium'],
      storage: ['128GB', '256GB', '512GB']
    },
    inStock: true,
    seller: 'Uzum Market Official'
  },
  {
    id: 102,
    title: 'Simsiz quloqchinlar Apple AirPods Pro 2-avlod MagSafe USB-C',
    category: 'Elektronika',
    subCategory: 'Quloqchinlar',
    price: 2850000,
    oldPrice: 3400000,
    rating: 4.8,
    reviewsCount: 890,
    monthlyPayment: 285000,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&q=80'
    ],
    badge: 'Aksiya',
    isGuaranteed: true,
    description: 'Faol shovqinni bekor qilish (ANC) va shaffoflik rejimi bilan yangilangan Apple AirPods Pro 2.',
    specifications: {
      'Turi': 'Simsiz TWS quloqchin',
      'Shovqinni bekor qilish': 'Faol ANC',
      'Batareya vaqti': '30 soat'
    },
    inStock: true,
    seller: 'Apple Store Uz'
  },
  {
    id: 103,
    title: 'Smartfon Samsung Galaxy S24 Ultra 12/256GB Titanium Gray',
    category: 'Elektronika',
    subCategory: 'Smartfonlar',
    price: 13500000,
    oldPrice: 15200000,
    rating: 4.9,
    reviewsCount: 640,
    monthlyPayment: 1350000,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80'
    ],
    badge: 'Top sotuv',
    isGuaranteed: true,
    description: "Galaxy AI sun'iy intellekt funksiyalari va 200 MP kameraga ega flagman Samsung Galaxy S24 Ultra.",
    specifications: {
      'Ekran': '6.8" Dynamic AMOLED 2X 120Hz',
      'Protsessor': 'Snapdragon 8 Gen 3',
      'Xotira': '256 GB',
      'RAM': '12 GB'
    },
    variants: {
      colors: ['Titanium Gray', 'Titanium Black'],
      storage: ['256GB', '512GB']
    },
    inStock: true,
    seller: 'Samsung Authorized'
  },
  {
    id: 104,
    title: 'Noutbuk Apple MacBook Air 13 M2 8/256GB Midnight',
    category: 'Elektronika',
    subCategory: 'Noutbuklar',
    price: 11900000,
    oldPrice: 13800000,
    rating: 5.0,
    reviewsCount: 420,
    monthlyPayment: 1190000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80'
    ],
    badge: 'Katta sotuv',
    isGuaranteed: true,
    description: 'Juda yupqa va yengil Apple M2 chipli MacBook Air. 18 soatgacha zaryadsiz ishlash va Liquid Retina ekrani.',
    specifications: {
      'Ekran': '13.6" Liquid Retina',
      'Protsessor': 'Apple M2 (8-core)',
      'Xotira': '256 GB SSD'
    },
    inStock: true,
    seller: 'Uzum Market Official'
  },
  {
    id: 105,
    title: 'Televizor LG 55" 4K Smart TV NanoCell Ultra HD',
    category: 'Maishiy texnika',
    subCategory: 'Televizorlar',
    price: 6400000,
    oldPrice: 7900000,
    rating: 4.7,
    reviewsCount: 310,
    monthlyPayment: 640000,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80'
    ],
    badge: 'Aksiya',
    isGuaranteed: true,
    description: "NanoCell texnologiyasiga ega, HDR10 Pro va webOS smart tizimi bilan ishlaydigan katta 55 dyuymli LG 4K televizori.",
    specifications: {
      'Ekran': '55 dyuym 4K UHD',
      'Smart TV': 'webOS 23'
    },
    inStock: true,
    seller: 'LG Home Uzbekistan'
  },
  {
    id: 106,
    title: 'Kir yuvish mashinasi LG Inverter Direct Drive 7kg',
    category: 'Maishiy texnika',
    subCategory: 'Kir yuvish mashinalari',
    price: 4900000,
    oldPrice: 5600000,
    rating: 4.9,
    reviewsCount: 520,
    monthlyPayment: 490000,
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80'
    ],
    badge: 'Top sotuv',
    isGuaranteed: true,
    description: "Inverter Direct Drive motorli, bug'da yuvish funksiyasi va tejamkor texnologiya.",
    specifications: {
      'Hajmi': '7 kg',
      'Siqish tezligi': '1200 aylanma/daq'
    },
    inStock: true,
    seller: 'Techno Store'
  },
  {
    id: 107,
    title: 'Erkaklar krossovkasi Nike Air Max 270 Black/White',
    category: 'Poyabzallar',
    subCategory: 'Krossovkalar',
    price: 950000,
    oldPrice: 1250000,
    rating: 4.8,
    reviewsCount: 230,
    monthlyPayment: 95000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'
    ],
    badge: 'Aksiya',
    isGuaranteed: false,
    description: "Maksimal qulaylik va amortizatsiyaga ega afsonaviy Nike Air Max 270 krossovkasi.",
    specifications: {
      'Material': "To'qimachilik / Mesh",
      'Mavsum': 'Bahor / Yoz'
    },
    variants: {
      sizes: ['40', '41', '42', '43', '44']
    },
    inStock: true,
    seller: 'Sportwear Uz'
  },
  {
    id: 108,
    title: 'Ayollar parfyumeriyasi Yves Saint Laurent Libre EDP 50ml',
    category: "Go'zallik va parvarish",
    subCategory: 'Parfyumeriya',
    price: 1350000,
    oldPrice: 1600000,
    rating: 4.9,
    reviewsCount: 380,
    monthlyPayment: 135000,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80'
    ],
    badge: 'Top sotuv',
    isGuaranteed: true,
    description: "Frantsiya lavandasi va Marokash apelsin gulining maftunkor uyg'unligi bilan mashhur Libre atr-upuri.",
    specifications: {
      'Hajmi': '50 ml',
      'Ishlab chiqaruvchi': 'Fransiya'
    },
    inStock: true,
    seller: 'Beauty World'
  },
  {
    id: 109,
    title: 'Elektr choynak Tefal Glass Kettle 1.7L Chini va Shisha',
    category: "Uy-ro'zg'or buyumlari",
    subCategory: 'Idish-tovoqlar',
    price: 420000,
    oldPrice: 550000,
    rating: 4.6,
    reviewsCount: 195,
    monthlyPayment: 42000,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?w=800&q=80'
    ],
    badge: 'Yangi',
    isGuaranteed: true,
    description: 'LED yoritgichli, issiqqa chidamli shishadan tayyorlangan 2200W quvvatga ega elektr choynak Tefal.',
    specifications: {
      'Hajmi': '1.7 litr',
      'Quvvati': '2200 Vt'
    },
    inStock: true,
    seller: 'Tefal Official'
  },
  {
    id: 110,
    title: 'Kofe mashinasi DeLonghi Magnifica S Inverter Automatic',
    category: 'Maishiy texnika',
    subCategory: 'Oshxona anjomlari',
    price: 5200000,
    oldPrice: 6100000,
    rating: 4.9,
    reviewsCount: 140,
    monthlyPayment: 520000,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80'
    ],
    badge: 'Kafolatli',
    isGuaranteed: true,
    description: 'Espresso, Kapuchino va Latte kofelarini bir tugma bilan tayyorlaydigan avtomat DeLonghi kofe mashinasi.',
    specifications: {
      'Bosim': '15 bar',
      'Suv baki': '1.8 litr'
    },
    inStock: true,
    seller: 'DeLonghi Store'
  },
  {
    id: 111,
    title: 'Aqlli soat Apple Watch Series 9 GPS 45mm Starlight',
    category: 'Elektronika',
    subCategory: 'Aqlli soatlar',
    price: 5400000,
    oldPrice: 6200000,
    rating: 4.9,
    reviewsCount: 310,
    monthlyPayment: 540000,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80'
    ],
    badge: 'Top sotuv',
    isGuaranteed: true,
    description: 'Double Tap imo-ishoralarini qo\'llab-quvvatlovchi, super yorqin ekranga ega Apple Watch Series 9.',
    specifications: {
      'Korpus o\'lchami': '45 mm',
      'Ekran': 'Always-On Retina'
    },
    inStock: true,
    seller: 'Apple Store Uz'
  },
  {
    id: 112,
    title: 'Simsiz dinamik JBL Charge 5 Waterproof Portable Speaker',
    category: 'Elektronika',
    subCategory: 'Quloqchinlar',
    price: 1850000,
    oldPrice: 2200000,
    rating: 4.8,
    reviewsCount: 480,
    monthlyPayment: 185000,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80'
    ],
    badge: 'Aksiya',
    isGuaranteed: true,
    description: 'Kuchli bas va 20 soatgacha batareya quvvatiga ega IP67 suvo\'tkazmaydigan simsiz dinamik JBL.',
    specifications: {
      'Quvvati': '40 Vt RMS',
      'Batareya vaqti': '20 soat'
    },
    inStock: true,
    seller: 'JBL Uzbekistan'
  },
  {
    id: 113,
    title: 'Erkaklar teri kurtkasi Classic Leather Jacket Black',
    category: 'Kiyim-kechak',
    subCategory: 'Kurtkalar',
    price: 1200000,
    oldPrice: 1550000,
    rating: 4.7,
    reviewsCount: 160,
    monthlyPayment: 120000,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80'
    ],
    badge: 'Katta sotuv',
    isGuaranteed: false,
    description: 'Tabiiy charmdan tayyorlangan, klassik biqim va mustahkam molniyali uslubdagi erkaklar kurtkasi.',
    specifications: {
      'Material': '100% Tabiiy charm',
      'Mavsum': 'Kuz / Bahor'
    },
    variants: {
      sizes: ['S', 'M', 'L', 'XL']
    },
    inStock: true,
    seller: 'Fashion Leather'
  },
  {
    id: 114,
    title: 'Ayollar sumkasi Michael Kors Jet Set Travel Crossbody',
    category: 'Aksessuarlar',
    subCategory: 'Sumkalar',
    price: 1950000,
    oldPrice: 2400000,
    rating: 4.9,
    reviewsCount: 290,
    monthlyPayment: 195000,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80'
    ],
    badge: 'Top sotuv',
    isGuaranteed: true,
    description: 'Zamonaviy va sig\'imli Michael Kors tabiiy teri sumkasi oltin rang metall furnitura bilan.',
    specifications: {
      'Brend': 'Michael Kors',
      'Material': 'Tabiiy teri'
    },
    inStock: true,
    seller: 'Luxury Brand Store'
  },
  {
    id: 115,
    title: 'Konditsioner Midea Inverter Split System 12000 BTU',
    category: 'Maishiy texnika',
    subCategory: 'Konditsionerlar',
    price: 4800000,
    oldPrice: 5600000,
    rating: 4.8,
    reviewsCount: 340,
    monthlyPayment: 480000,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80'
    ],
    badge: 'Aksiya',
    isGuaranteed: true,
    description: '35 kv.m gacha bo\'lgan xonalarni tejamkor sovutuvchi va isituvchi Inverter Midea split tizimi.',
    specifications: {
      'Quvvati': '12000 BTU',
      'Maydon': '35 kv.m gacha'
    },
    inStock: true,
    seller: 'Midea Climate'
  },
  {
    id: 116,
    title: 'Sport velosipedi Shimano 21-speed Aluminium 29" Wheels',
    category: 'Sport va hordiq',
    subCategory: 'Velosipedlar',
    price: 2450000,
    oldPrice: 2900000,
    rating: 4.7,
    reviewsCount: 175,
    monthlyPayment: 245000,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80'
    ],
    badge: 'Yangi',
    isGuaranteed: true,
    description: 'Mustahkam alyuminiy karkasli va Shimano 21 tezlikli uzatmalar qutisiga ega tog\' velosipedi.',
    specifications: {
      'G\'ildirak diametri': '29 dyuym',
      'Tezliklar soni': '21 tezlik'
    },
    inStock: true,
    seller: 'Bicycle Pro'
  }
];
