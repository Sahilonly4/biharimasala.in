import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Header from './components/header';
import Hero from './components/hero';
import FeaturedProducts from './components/featuredProducts';
import ProductCatalog from './components/productCatalog';
import Contact from './components/contact';
import Footer from './components/footer';
import Cart from './components/cart';
import { CartProvider } from './components/temp';

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

