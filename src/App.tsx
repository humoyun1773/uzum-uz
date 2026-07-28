import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { TopBar } from './components/layout/TopBar';
import { Navbar } from './components/layout/Navbar';
import { CategoryBar } from './components/layout/CategoryBar';
import { CatalogMegaMenu } from './components/catalog/CatalogMegaMenu';
import { HomePage } from './pages/HomePage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CartDrawer } from './components/cart/CartDrawer';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { AuthModal } from './components/auth/AuthModal';
import { LocationModal } from './components/common/LocationModal';
import { Footer } from './components/layout/Footer';

const AppContent: React.FC = () => {
  const { currentView } = useShop();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-uzum-gray">
      <div>
        {/* Header Stack */}
        <TopBar />
        <Navbar />
        <CategoryBar />

        {/* Mega Menu Dropdown */}
        <CatalogMegaMenu />

        {/* Dynamic Main View */}
        {currentView === 'home' && <HomePage />}
        {currentView === 'wishlist' && <WishlistPage />}
        {currentView === 'checkout' && <CheckoutPage />}

        {/* Slide-out Cart Drawer */}
        <CartDrawer />

        {/* Interactive Modals */}
        <ProductDetailModal />
        <AuthModal />
        <LocationModal />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
};

export default App;
