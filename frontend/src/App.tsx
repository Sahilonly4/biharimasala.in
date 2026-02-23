import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import ProductCatalog from './components/ProductCatalog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import { CartProvider } from './components/CartContext';

const queryClient = new QueryClient();

function AppContent() {
  const [activeSection, setActiveSection] = useState<'home' | 'products' | 'gallery' | 'contact'>('home');

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header activeSection={activeSection} onNavigate={setActiveSection} />
        <main>
          {activeSection === 'home' && (
            <>
              <Hero onShopNow={() => setActiveSection('products')} />
              <FeaturedProducts onViewAll={() => setActiveSection('products')} />
            </>
          )}
          {activeSection === 'products' && <ProductCatalog />}
          {activeSection === 'gallery' && <Gallery />}
          {activeSection === 'contact' && <Contact />}
        </main>
        <Footer onNavigate={setActiveSection} />
        <Cart />
        <Toaster />
      </div>
    </CartProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <AppContent />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

