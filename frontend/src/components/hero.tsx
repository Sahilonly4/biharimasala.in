import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import heroImage from "@/images/indian-spices.webp";


interface HeroProps {
  onShopNow: () => void;
}

export default function Hero({ onShopNow }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-spice-red/10 via-spice-orange/10 to-spice-brown/10">
      <div className="container py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block rounded-lg bg-spice-orange/20 px-3 py-1 text-sm font-medium text-spice-brown">
              Traditional & Authentic
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-spice-brown">
              Taste the Authentic
              <span className="block text-spice-red">Bihari Flavors</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-[600px]">
              Experience the rich heritage of Bihar with our handcrafted masala powders and traditional pickles. 
              Made with love using time-honored recipes passed down through generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-spice-red hover:bg-spice-red/90 text-white"
                onClick={onShopNow}
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-spice-brown text-spice-brown hover:bg-spice-brown/10">
                Learn More
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
              <div>
                <div className="text-2xl font-bold text-spice-red">100%</div>
                <div className="text-sm text-muted-foreground">Natural</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-spice-red">Fresh</div>
                <div className="text-sm text-muted-foreground">Ingredients</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-spice-red">Traditional</div>
                <div className="text-sm text-muted-foreground">Recipes</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={heroImage}
                alt="Bihari Masala Spices"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-card p-6 rounded-xl shadow-xl border border-border max-w-[200px]">
              <div className="text-3xl font-bold text-spice-red">50+</div>
              <div className="text-sm text-muted-foreground">Premium Products</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
