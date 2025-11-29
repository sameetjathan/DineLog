import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ShoppingCart, Utensils, Package, Star, Plus, Minus } from 'lucide-react';
import logo from '@/assets/dinelog-logo.png';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const [menuItems] = useState([
    { id: 1, name: 'Classic Burger', price: 12.99, category: 'Main', image: '🍔', description: 'Juicy beef patty with fresh vegetables' },
    { id: 2, name: 'Caesar Salad', price: 8.99, category: 'Starter', image: '🥗', description: 'Fresh romaine with Caesar dressing' },
    { id: 3, name: 'Grilled Steak', price: 24.99, category: 'Main', image: '🥩', description: 'Premium ribeye steak' },
    { id: 4, name: 'Margherita Pizza', price: 14.99, category: 'Main', image: '🍕', description: 'Classic tomato and mozzarella' },
    { id: 5, name: 'Chocolate Cake', price: 6.99, category: 'Dessert', image: '🍰', description: 'Rich chocolate layer cake' },
    { id: 6, name: 'Fresh Juice', price: 4.99, category: 'Beverage', image: '🧃', description: 'Orange or apple juice' },
  ]);

  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [orders, setOrders] = useState([
    { id: 1, items: 'Burger, Fries', total: 15.99, status: 'Preparing', time: '15 min' },
    { id: 2, items: 'Pizza, Coke', total: 17.98, status: 'Delivered', time: 'Completed' },
  ]);
  const [feedback, setFeedback] = useState('');

  const addToCart = (itemId: number) => {
    setCart({ ...cart, [itemId]: (cart[itemId] || 0) + 1 });
    toast({ title: "Added to Cart", description: "Item added successfully!" });
  };

  const removeFromCart = (itemId: number) => {
    if (cart[itemId] > 1) {
      setCart({ ...cart, [itemId]: cart[itemId] - 1 });
    } else {
      const newCart = { ...cart };
      delete newCart[itemId];
      setCart(newCart);
    }
  };

  const placeOrder = () => {
    const cartItems = Object.entries(cart).map(([id, qty]) => {
      const item = menuItems.find(m => m.id === parseInt(id));
      return `${item?.name} x${qty}`;
    }).join(', ');

    const total = Object.entries(cart).reduce((sum, [id, qty]) => {
      const item = menuItems.find(m => m.id === parseInt(id));
      return sum + (item?.price || 0) * qty;
    }, 0);

    const newOrder = {
      id: orders.length + 1,
      items: cartItems,
      total: total,
      status: 'Pending',
      time: 'Just now'
    };

    setOrders([...orders, newOrder]);
    setCart({});
    toast({ title: "Order Placed", description: "Your order has been sent to the kitchen!" });
  };

  const submitFeedback = () => {
    if (feedback) {
      toast({ title: "Feedback Submitted", description: "Thank you for your feedback!" });
      setFeedback('');
    }
  };

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menuItems.find(m => m.id === parseInt(id));
    return sum + (item?.price || 0) * qty;
  }, 0);

  const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5 pt-6">
      <div className="container mx-auto px-4 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Customer Dashboard</h1>
          <p className="text-muted-foreground">Your dining experience</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="relative">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Your Cart</DialogTitle>
              <DialogDescription>Review your items before placing order</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {Object.entries(cart).map(([id, qty]) => {
                const item = menuItems.find(m => m.id === parseInt(id));
                return (
                  <div key={id} className="flex justify-between items-center p-2 border rounded">
                    <div>
                      <p className="font-medium">{item?.name}</p>
                      <p className="text-sm text-muted-foreground">${item?.price} x {qty}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => removeFromCart(parseInt(id))}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span>{qty}</span>
                      <Button size="sm" variant="outline" onClick={() => addToCart(parseInt(id))}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                );
              })}
              {Object.keys(cart).length === 0 && (
                <p className="text-center text-muted-foreground">Your cart is empty</p>
              )}
              {Object.keys(cart).length > 0 && (
                <>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button onClick={placeOrder} className="w-full bg-primary text-primary-foreground">
                    Place Order
                  </Button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <main className="container mx-auto px-4 pb-8">
        <Card className="border-border/50 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              Browse Menu
            </CardTitle>
            <CardDescription>Explore our delicious offerings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {menuItems.map(item => (
                <Card key={item.id} className="border-border/50">
                  <CardContent className="p-4">
                    <div className="text-center mb-3">
                      <div className="text-6xl mb-2">{item.image}</div>
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <Badge variant="secondary" className="mb-2">{item.category}</Badge>
                      <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                      <p className="text-xl font-bold text-primary">${item.price}</p>
                    </div>
                    <Button 
                      onClick={() => addToCart(item.id)} 
                      className="w-full bg-primary text-primary-foreground"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Package className="h-5 w-5" />
                My Orders
              </CardTitle>
              <CardDescription>Track your orders and history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {orders.map(order => (
                  <div key={order.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.items}</p>
                      </div>
                      <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{order.time}</span>
                      <span className="font-semibold">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Star className="h-5 w-5" />
                Give Feedback
              </CardTitle>
              <CardDescription>Share your dining experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2 justify-center mb-4">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="h-8 w-8 cursor-pointer text-accent fill-accent" />
                  ))}
                </div>
                <Textarea 
                  placeholder="Tell us about your experience..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                />
                <Button onClick={submitFeedback} className="w-full bg-primary text-primary-foreground">
                  Submit Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
