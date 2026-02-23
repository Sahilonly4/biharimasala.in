import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Plus } from "lucide-react";
import { useGetAllProducts } from "../hooks/useQueries";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "./CartContext";
import { toast } from "sonner";

interface FeaturedProductsProps {
  onViewAll: () => void;
}

export default function FeaturedProducts({ onViewAll }: FeaturedProductsProps) {
  const { data: products, isLoading } = useGetAllProducts();
  const { addToCart } = useCart();

  // store selected size per product
  const [selectedSizes, setSelectedSizes] = useState<Record<number, "250g" | "500g">>({});

  const featuredProducts = products?.slice(0, 4) || [];

  const handleSizeChange = (productId: number, size: "250g" | "500g") => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const handleAddToCart = (product: any) => {
    const selectedSize = selectedSizes[product.id] || product.prices[0]?.size;
    const selectedPrice = product.prices.find(
      (p: any) => p.size === selectedSize
    )?.price;

    if (!selectedPrice) {
      toast.error("Price not available");
      return;
    }

    const defaultOption = product.prices?.[0];

if (!defaultOption) {
  toast.error("Product price not available");
  return;
}

addToCart({
  id: product.id,
  name: product.name,
  size: selectedSize,
  price: selectedPrice,
  image: product.image.getDirectURL(),
});



    toast.success("Added to cart", {
      description: `${product.name} (${selectedSize}) added to cart.`,
    });
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-spice-brown">
              Featured Products
            </h2>
            <p className="text-muted-foreground mt-2">
              Handpicked selection of our finest spices and pickles
            </p>
          </div>

          <Button
            variant="outline"
            className="hidden sm:flex border-spice-brown text-spice-brown hover:bg-spice-brown/10"
            onClick={onViewAll}
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <Skeleton className="aspect-square rounded-lg mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))
            : featuredProducts.map((product: any) => {
                const selectedSize =
                  selectedSizes[product.id] || product.prices[0]?.size;

                const selectedPrice = product.prices.find(
                  (p: any) => p.size === selectedSize
                )?.price;

                return (
                  <Card
                    key={product.id}
                    className="group overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-0">
                      <div className="aspect-square overflow-hidden bg-muted">
                        <img
                          src={product.image.getDirectURL()}
                          alt={product.name}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="font-semibold text-lg text-spice-brown mb-1">
                          {product.name}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Size selector */}
                        <div className="flex gap-2 mb-3">
                          {product.prices.map((p: any) => (
                            <button
                              key={p.size}
                              onClick={() =>
                                handleSizeChange(product.id, p.size)
                              }
                              className={`px-3 py-1 text-xs rounded border transition
                                ${
                                  selectedSize === p.size
                                    ? "bg-spice-orange text-white border-spice-orange"
                                    : "border-muted text-muted-foreground"
                                }`}
                            >
                              {p.size}
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-spice-red">
                            ₹{selectedPrice ?? "N/A"}
                          </span>

                          <Button
                            size="sm"
                            className="bg-spice-orange hover:bg-spice-orange/90 text-white"
                            onClick={() => handleAddToCart(product)}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button
            variant="outline"
            className="border-spice-brown text-spice-brown hover:bg-spice-brown/10"
            onClick={onViewAll}
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
