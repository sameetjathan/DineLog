import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Utensils, ClipboardList, Bell, Plus, ChefHat } from 'lucide-react';
import logo from '@/assets/dinelog-logo.png';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const WaiterDashboard = () => {
  const { user, logout } = useAuth();
  const [menuItems] = useState([
    { id: 1, name: 'Classic Burger', price: 12.99, category: 'Main' },
    { id: 2, name: 'Caesar Salad', price: 8.99, category: 'Starter' },
    { id: 3, name: 'Grilled Steak', price: 24.99, category: 'Main' },
    { id: 4, name: 'Pasta Carbonara', price: 14.99, category: 'Main' },
    { id: 5, name: 'Chocolate Cake', price: 6.99, category: 'Dessert' },
  ]);

  const [orders, setOrders] = useState([
    { id: 1, table: 'T1', items: 'Burger, Fries', status: 'Preparing', time: '10 min ago' },
    { id: 2, table: 'T3', items: 'Steak, Wine', status: 'Ready', time: '5 min ago' },
  ]);

  const [newOrder, setNewOrder] = useState({ table: '', items: [] as number[] });

  const takeOrder = () => {
    if (newOrder.table && newOrder.items.length > 0) {
      const itemNames = newOrder.items.map(id => 
        menuItems.find(m => m.id === id)?.name
      ).join(', ');
      
      const order = {
        id: orders.length + 1,
        table: newOrder.table,
        items: itemNames,
        status: 'Pending',
        time: 'Just now'
      };
      
      setOrders([...orders, order]);
      setNewOrder({ table: '', items: [] });
      toast({ title: "Order Placed", description: `Order for ${newOrder.table} has been sent to kitchen.` });
    }
  };

  const callKitchen = (orderId: number) => {
    toast({
      title: "Kitchen Notified",
      description: `Kitchen has been notified about order #${orderId}.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5 pt-6">
      <div className="container mx-auto px-4 mb-6">
        <h1 className="text-3xl font-bold text-primary">Waiter Dashboard</h1>
        <p className="text-muted-foreground">Order management</p>
      </div>

      <main className="container mx-auto px-4 pb-8">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <ClipboardList className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{orders.length}</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ready to Serve</CardTitle>
              <Bell className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {orders.filter(o => o.status === 'Ready').length}
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Tables</CardTitle>
              <Utensils className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">5</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Take New Order
                  </CardTitle>
                  <CardDescription>Add items from menu</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-primary text-primary-foreground">
                      <Plus className="h-4 w-4 mr-2" />
                      New Order
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Order</DialogTitle>
                      <DialogDescription>Select table and items</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Select value={newOrder.table} onValueChange={(v) => setNewOrder({...newOrder, table: v})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Table" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="T1">Table 1</SelectItem>
                          <SelectItem value="T2">Table 2</SelectItem>
                          <SelectItem value="T3">Table 3</SelectItem>
                          <SelectItem value="T4">Table 4</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Select Menu Items:</p>
                        {menuItems.map(item => (
                          <div key={item.id} className="flex items-center gap-2 p-2 border rounded">
                            <input 
                              type="checkbox"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setNewOrder({...newOrder, items: [...newOrder.items, item.id]});
                                } else {
                                  setNewOrder({...newOrder, items: newOrder.items.filter(i => i !== item.id)});
                                }
                              }}
                            />
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">{item.category}</p>
                            </div>
                            <p className="font-semibold">${item.price}</p>
                          </div>
                        ))}
                      </div>
                      
                      <Button onClick={takeOrder} className="w-full">Submit Order</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Menu Categories:</p>
                <div className="flex gap-2 flex-wrap">
                  <Badge>Starters</Badge>
                  <Badge>Main Course</Badge>
                  <Badge>Desserts</Badge>
                  <Badge>Beverages</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Utensils className="h-5 w-5" />
                Table Assignments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['T1', 'T2', 'T3', 'T4', 'T5'].map(table => (
                  <div key={table} className="flex justify-between items-center p-3 border rounded">
                    <span className="font-medium">{table}</span>
                    <Badge variant="secondary">Assigned</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Current Orders
            </CardTitle>
            <CardDescription>Track order status and notify kitchen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orders.map(order => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Order #{order.id} - {order.table}</p>
                    <p className="text-sm text-muted-foreground">{order.items}</p>
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={order.status === 'Ready' ? 'default' : 'secondary'}>
                      {order.status}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => callKitchen(order.id)}
                    >
                      <ChefHat className="h-4 w-4 mr-1" />
                      Call Kitchen
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default WaiterDashboard;
