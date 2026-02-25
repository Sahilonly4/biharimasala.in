import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from './temp';
import { usePlaceOrder } from '../hooks/useQueries';

export default function Cart() {
  const { isCartOpen, toggleCart, items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
  });

  const placeOrder = usePlaceOrder();

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsCheckout(true);
  };

  const handlePlaceOrder = () => {
    if (!customerInfo.name || !customerInfo.address) return;

    const productIds = items.map((item) => item.id);
    const totalAmount = BigInt(getTotalPrice());

    placeOrder.mutate(
      {
        customerName: customerInfo.name,
        customerAddress: customerInfo.address,
        productIds,
        totalAmount,
      },
      {
        onSuccess: () => {
          clearCart();
          setIsCheckout(false);
          setCustomerInfo({ name: '', address: '' });
          toggleCart();
        },
      }
    );
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-spice-brown">
            {isCheckout ? 'Checkout' : 'Shopping Cart'}
          </SheetTitle>
        </SheetHeader>

        {!isCheckout ? (
          <>
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-spice-brown mb-2">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground">Add some delicious spices to get started!</p>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1 -mx-6 px-6">
                  <div className="space-y-4 py-4">
                    {items.map((item) => (
                      <div key={item.id.toString()} className="flex gap-4">
                        <div className="h-20 w-20 rounded-lg overflow-hidden bg-muted shrink-0">
  <img
    src={item.image}
    alt={item.name}
    className="object-cover w-full h-full"
  />
</div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-spice-brown truncate">{item.name}</h4>
                          <p className="text-sm text-spice-red font-bold mt-1">₹{Number(item.price)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 ml-auto text-destructive"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="space-y-4 pt-4">
                  <Separator />
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span className="text-spice-brown">Total</span>
                    <span className="text-spice-red">₹{getTotalPrice()}</span>
                  </div>
                  <Button
                    className="w-full bg-spice-red hover:bg-spice-red/90 text-white"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="checkout-name">Full Name</Label>
                  <Input
                    id="checkout-name"
                    placeholder="Enter your name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkout-address">Delivery Address</Label>
                  <Input
                    id="checkout-address"
                    placeholder="Enter your complete address"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  />
                </div>

                <Separator className="my-4" />

                <div>
                  <h4 className="font-semibold text-spice-brown mb-3">Order Summary</h4>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id.toString()} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.name} x {item.quantity}
                        </span>
                        <span className="font-medium">₹{Number(item.price) * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-spice-brown">Total</span>
                    <span className="text-spice-red">₹{getTotalPrice()}</span>
                  </div>
                </div>
              </div>
            </ScrollArea>

            <SheetFooter className="flex-col gap-2 sm:flex-col">
              <Button
                className="w-full bg-spice-red hover:bg-spice-red/90 text-white"
                onClick={handlePlaceOrder}
                disabled={!customerInfo.name || !customerInfo.address || placeOrder.isPending}
              >
                {placeOrder.isPending ? 'Placing Order...' : 'Place Order'}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsCheckout(false)}
                disabled={placeOrder.isPending}
              >
                Back to Cart
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
