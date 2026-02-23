import { Heart } from 'lucide-react';
import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';
import logo from "@/images/Bihari_Masala.png";

interface FooterProps {
  onNavigate: (section: 'home' | 'products' | 'gallery' | 'contact') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src=
                {logo}
                alt="Bihari Masala"
                className="h-10 w-10"
              />
              <div>
                <h3 className="font-bold text-spice-brown">Bihari Masala</h3>
                <p className="text-xs text-muted-foreground">Authentic Indian Spices</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Bringing the authentic taste of Bihar to your kitchen with traditional recipes and premium quality spices.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-spice-orange/10 hover:bg-spice-orange/20 flex items-center justify-center text-spice-brown transition-colors"
              >
                <SiFacebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-spice-orange/10 hover:bg-spice-orange/20 flex items-center justify-center text-spice-brown transition-colors"
              >
                <SiInstagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-spice-orange/10 hover:bg-spice-orange/20 flex items-center justify-center text-spice-brown transition-colors"
              >
                <SiX className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-spice-brown mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-muted-foreground hover:text-spice-red transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="text-muted-foreground hover:text-spice-red transition-colors"
                >
                  Products
                </button>
              </li>
              
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-muted-foreground hover:text-spice-red transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-spice-brown mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Masala Powders</li>
              <li>Handmade Pickles</li>
              <li>Spice Blends</li>
              <li>Gift Hampers</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-spice-brown mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Alabaskpur, Gaurichak</li>
              <li>Patna, Bihar 800007</li>
              <li></li>
              <li>7488064910</li>
              <li>biharimasala589@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1 flex-wrap">
            
              © 2026 Bihari Masala. All rights reserved.
            
          </p>
        </div>
      </div>
    </footer>
  );
}
