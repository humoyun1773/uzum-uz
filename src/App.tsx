import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { TopBar } from './components/layout/TopBar';
import { Navbar } from './components/layout/Navbar';
import { CategoryBar } from './components/layout/CategoryBar';
import { CatalogMegaMenu } from './components/catalog/CatalogMegaMenu';
import { HomePage } from './pages/HomePage';
import { CartDrawer } from './components/cart/CartDrawer';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { AuthModal } from './components/auth/AuthModal';
import { LocationModal } from './components/common/LocationModal';
import { Footer } from './components/layout/Footer';

export const App: React.FC = () => {
  return (
    <ShopProvider>
      <div className="app-layout">
        {/* Header Stack */}
        <TopBar />
        <Navbar />
        <CategoryBar />

        {/* Mega Menu Dropdown */}
        <CatalogMegaMenu />

        {/* Main Body View */}
        <HomePage />

        {/* Slide-out Cart Drawer */}
        <CartDrawer />

        {/* Interactive Modals */}
        <ProductDetailModal />
        <AuthModal />
        <LocationModal />

        {/* Footer */}
        <Footer />
      </div>
    </ShopProvider>
  );
};

export default App;
