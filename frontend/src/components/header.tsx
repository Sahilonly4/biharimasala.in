import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useCart } from './CartContext';
import logo from "@/images/Bihari_Masala.png";

interface HeaderProps {
  activeSection: 'home' | 'products'  | 'contact';
  onNavigate: (section: 'home' | 'products'  | 'contact') => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleCart, getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const navItems = [
    { id: 'home' as const, label: 'Home' },
    { id: 'products' as const, label: 'Products' },
   
    { id: 'contact' as const, label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Bihari Masala"
            className="h-10 w-10"
          />
          <div>
            <h1 className="text-xl font-bold text-primary">Bihari Masala</h1>
            <p className="text-xs text-muted-foreground">Authentic Indian Spices</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === item.id ? 'text-primary' : 'text-foreground/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={toggleCart}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs font-bold text-primary-foreground flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <nav className="container py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-sm font-medium transition-colors hover:text-primary py-2 ${
                  activeSection === item.id ? 'text-primary' : 'text-foreground/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
