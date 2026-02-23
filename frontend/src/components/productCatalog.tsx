import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import {
  useGetAllProducts,
  useGetProductsByCategory,
} from "../hooks/useQueries";
import { ProductCategory } from "../types/product";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "./cartContext";
import { toast } from "sonner";

type SizeType = string;

export default function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState<
    "all" | ProductCategory
  >("all");

  const { data: allProducts, isLoading: isLoadingAll } =
    useGetAllProducts();
  const { data: spices, isLoading: isLoadingSpices } =
    useGetProductsByCategory(ProductCategory.spices);
  const { data: pickles, isLoading: isLoadingPickles } =
    useGetProductsByCategory(ProductCategory.pickles);

  const { addToCart } = useCart();

  const [selectedSizes, setSelectedSizes] = useState<
    Record<number, SizeType>
  >({});

  const handleSizeChange = (productId: number, size: SizeType) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const products =
    activeCategory === "all"
      ? allProducts
      : activeCategory === ProductCategory.spices
      ? spices
      : pickles;

  const isLoading =
    activeCategory === "all"
      ? isLoadingAll
      : activeCategory === ProductCategory.spices
      ? isLoadingSpices
      : isLoadingPickles;

  const handleAddToCart = (product: NonNullable<typeof products>[0]) => {
    if (!product.prices || product.prices.length === 0) {
      toast.error("Product not available yet");
      return;
    }

    const selectedSize =
      selectedSizes[product.id] || product.prices[0].size;

    const selectedPrice = product.prices.find(
      (p) => p.size === selectedSize
    )?.price;

    if (!selectedPrice) {
      toast.error("Product price not available");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      size: selectedSize,
      price: selectedPrice,
      quantity: 1,
      image: product.image.getDirectURL(),
    });

    toast.success("Added to cart", {
      description: `${product.name} (${selectedSize}) added to cart.`,
    });
  };

  return (
    <section className="py-16 md:py-24 min-h-screen">
      <div className="container">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-spice-brown mb-4">
            Our Products
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our complete range of authentic Bihari masalas and
            handmade pickles.
          </p>
        </div>

        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={(value) =>
            setActiveCategory(value as "all" | ProductCategory)
          }
        >
          <TabsList className="mb-8 bg-muted">
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value={ProductCategory.spices}>
              Spices
            </TabsTrigger>
            <TabsTrigger value={ProductCategory.pickles}>
              Pickles
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeCategory}>
            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <Skeleton className="aspect-square mb-4" />
                      <Skeleton className="h-5 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : products && products.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => {
                  const selectedSize =
                    selectedSizes[product.id] ||
                    product.prices?.[0]?.size;

                  const price = product.prices?.find(
                    (p) => p.size === selectedSize
                  )?.price;

                  return (
                    <Card
                      key={product.id}
                      className="group overflow-hidden hover:shadow-lg transition"
                    >
                      <CardContent className="p-0">
                        <div className="relative aspect-square bg-muted">
                          <img
                            src={product.image.getDirectURL()}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition"
                          />
                          <Badge className="absolute top-3 right-3 bg-spice-orange text-white">
                            {product.category ===
                            ProductCategory.spices
                              ? "Spice"
                              : "Pickle"}
                          </Badge>
                        </div>

                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-2">
                            {product.name}
                          </h3>

                          {/* Size selector */}
                          {product.prices.length > 0 && (
                            <div className="flex gap-2 mb-3">
                              {product.prices.map((p) => (
                                <button
                                  key={p.size}
                                  onClick={() =>
                                    handleSizeChange(
                                      product.id,
                                      p.size
                                    )
                                  }
                                  className={`px-3 py-1 text-xs rounded border
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
                          )}

                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-spice-red">
                              {price ? `₹${price}` : "Upcoming"}
                            </span>

                            <Button
                              size="sm"
                              disabled={!price}
                              className="bg-spice-orange hover:bg-spice-orange/90 text-white"
                              onClick={() =>
                                handleAddToCart(product)
                              }
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No products found.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
