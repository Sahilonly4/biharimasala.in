import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const galleryImages = {
  products: [
    { src: '/assets/generated/red-chili-powder.dim_400x400.jpg', title: 'Red Chili Powder' },
    { src: '/assets/generated/turmeric-powder.dim_400x400.jpg', title: 'Turmeric Powder' },
    { src: '/assets/generated/garam-masala.dim_400x400.jpg', title: 'Garam Masala' },
    { src: '/assets/generated/coriander-powder.dim_400x400.jpg', title: 'Coriander Powder' },
    { src: '/assets/generated/mango-pickle.dim_400x400.jpg', title: 'Mango Pickle' },
    { src: '/assets/generated/mixed-pickle.dim_400x400.jpg', title: 'Mixed Pickle' },
    { src: '/assets/generated/lemon-pickle.dim_400x400.jpg', title: 'Lemon Pickle' },
  ],
  process: [
    { src: '/assets/generated/spice-preparation.dim_600x400.jpg', title: 'Spice Preparation' },
    { src: '/assets/generated/packaging-process.dim_600x400.jpg', title: 'Packaging Process' },
    { src: '/assets/generated/spice-collection.dim_800x600.jpg', title: 'Spice Collection' },
  ],
};

export default function Gallery() {
  return (
    <section className="py-16 md:py-24 min-h-screen">
      <div className="container">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-spice-brown mb-4">Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Take a visual journey through our products, preparation methods, and the care we put into every package.
          </p>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="mb-8 bg-muted">
            <TabsTrigger value="products" className="data-[state=active]:bg-spice-orange data-[state=active]:text-white">
              Products
            </TabsTrigger>
            <TabsTrigger value="process" className="data-[state=active]:bg-spice-orange data-[state=active]:text-white">
              Our Process
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-0">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {galleryImages.products.map((image, index) => (
                <Card key={index} className="group overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-spice-brown">{image.title}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="process" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {galleryImages.process.map((image, index) => (
                <Card key={index} className="group overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-spice-brown">{image.title}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
