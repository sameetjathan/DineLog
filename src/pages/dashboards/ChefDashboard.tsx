import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Clock, CheckCircle, Bell } from 'lucide-react';
import logo from '@/assets/dinelog-logo.png';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const ChefDashboard = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([
    { id: 1, table: 'T1', items: ['Burger', 'Fries'], status: 'Pending', time: '2 min ago' },
    { id: 2, table: 'T3', items: ['Steak', 'Salad'], status: 'Cooking', time: '8 min ago' },
    { id: 3, table: 'T5', items: ['Pasta', 'Garlic Bread'], status: 'Pending', time: '1 min ago' },
  ]);

  const updateStatus = (orderId: number, newStatus: string) => {
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
    toast({
      title: "Status Updated",
      description: `Order #${orderId} is now ${newStatus}`,
    });
  };

  const notifyWaiter = (orderId: number) => {
    toast({
      title: "Waiter Notified",
      description: `Waiter has been notified that Order #${orderId} is ready.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Pending': return 'secondary';
      case 'Cooking': return 'default';
      case 'Ready': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5 pt-6">
      <div className="container mx-auto px-4 mb-6">
        <h1 className="text-3xl font-bold text-primary">Chef Dashboard</h1>
        <p className="text-muted-foreground">Kitchen operations</p>
      </div>

      <main className="container mx-auto px-4 pb-8">
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Clock className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {orders.filter(o => o.status === 'Pending').length}
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <ChefHat className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {orders.filter(o => o.status === 'Cooking').length}
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ready</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {orders.filter(o => o.status === 'Ready').length}
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">32</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <ChefHat className="h-5 w-5" />
              Order Queue
            </CardTitle>
            <CardDescription>Manage cooking status and notify waiters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="p-4 border rounded-lg bg-card">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-lg">Order #{order.id} - {order.table}</p>
                      <p className="text-sm text-muted-foreground">{order.time}</p>
                    </div>
                    <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Items:</p>
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-primary"></span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {order.status === 'Pending' && (
                      <Button 
                        onClick={() => updateStatus(order.id, 'Cooking')}
                        className="bg-primary text-primary-foreground"
                      >
                        <ChefHat className="h-4 w-4 mr-2" />
                        Start Cooking
                      </Button>
                    )}
                    {order.status === 'Cooking' && (
                      <Button 
                        onClick={() => updateStatus(order.id, 'Ready')}
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Ready
                      </Button>
                    )}
                    {order.status === 'Ready' && (
                      <Button 
                        onClick={() => notifyWaiter(order.id)}
                        variant="outline"
                      >
                        <Bell className="h-4 w-4 mr-2" />
                        Notify Waiter
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <ChefHat className="h-5 w-5" />
              Today's Menu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Starters</p>
                <p className="text-sm text-muted-foreground">Caesar Salad, Soup, Garlic Bread</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Main Course</p>
                <p className="text-sm text-muted-foreground">Burger, Steak, Pasta, Pizza</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Desserts</p>
                <p className="text-sm text-muted-foreground">Ice Cream, Cake, Pudding</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ChefDashboard;
