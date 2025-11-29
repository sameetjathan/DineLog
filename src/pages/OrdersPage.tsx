import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const OrdersPage = () => {
  const [statusFilter, setStatusFilter] = useState('all');

  const [orders, setOrders] = useState([
    { id: 1, table: 'T-5', items: 'Burger, Fries, Coke', total: 18.99, status: 'Pending', time: '10:30 AM', waiter: 'John' },
    { id: 2, table: 'T-12', items: 'Pizza, Salad', total: 23.98, status: 'Cooking', time: '10:45 AM', waiter: 'Sarah' },
    { id: 3, table: 'T-8', items: 'Steak, Wine', total: 45.99, status: 'Ready', time: '11:00 AM', waiter: 'Mike' },
    { id: 4, table: 'T-3', items: 'Pasta, Juice', total: 15.99, status: 'Delivered', time: '11:15 AM', waiter: 'Emma' },
    { id: 5, table: 'T-20', items: 'Fish, Chips', total: 16.99, status: 'Cancelled', time: '11:20 AM', waiter: 'John' },
    { id: 6, table: 'T-15', items: 'Chicken Wings, Beer', total: 14.99, status: 'Pending', time: '11:25 AM', waiter: 'Sarah' },
    { id: 7, table: 'T-7', items: 'Caesar Salad, Water', total: 10.99, status: 'Cooking', time: '11:30 AM', waiter: 'Mike' },
  ]);

  const filteredOrders = orders.filter(order => 
    statusFilter === 'all' || order.status === statusFilter
  );

  const updateOrderStatus = (id: number, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
    toast({ title: "Status Updated", description: `Order #${id} is now ${newStatus}` });
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Pending': return <Clock className="h-4 w-4" />;
      case 'Cooking': return <AlertCircle className="h-4 w-4" />;
      case 'Ready': return <CheckCircle className="h-4 w-4" />;
      case 'Delivered': return <CheckCircle className="h-4 w-4" />;
      case 'Cancelled': return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch(status) {
      case 'Pending': return 'secondary';
      case 'Cooking': return 'default';
      case 'Ready': return 'default';
      case 'Delivered': return 'outline';
      case 'Cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <Card className="border-border/50 shadow-lg mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-primary text-3xl">Orders Management</CardTitle>
                <p className="text-muted-foreground mt-1">Track and manage all orders</p>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Cooking">Cooking</SelectItem>
                  <SelectItem value="Ready">Ready</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-bold">Order ID</TableHead>
                    <TableHead className="font-bold">Table</TableHead>
                    <TableHead className="font-bold">Items</TableHead>
                    <TableHead className="font-bold">Time</TableHead>
                    <TableHead className="font-bold">Waiter</TableHead>
                    <TableHead className="font-bold">Total</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="font-bold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{order.table}</TableCell>
                      <TableCell className="max-w-xs truncate">{order.items}</TableCell>
                      <TableCell>{order.time}</TableCell>
                      <TableCell>{order.waiter}</TableCell>
                      <TableCell className="font-semibold">${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(order.status)} className="flex items-center gap-1 w-fit">
                          {getStatusIcon(order.status)}
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={order.status} 
                          onValueChange={(status) => updateOrderStatus(order.id, status)}
                        >
                          <SelectTrigger className="w-32 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Cooking">Cooking</SelectItem>
                            <SelectItem value="Ready">Ready</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary Cards */}
        <div className="grid md:grid-cols-5 gap-4">
          {['Pending', 'Cooking', 'Ready', 'Delivered', 'Cancelled'].map((status) => (
            <Card key={status} className="border-border/50 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{status}</p>
                    <p className="text-2xl font-bold text-primary">
                      {orders.filter(o => o.status === status).length}
                    </p>
                  </div>
                  {getStatusIcon(status)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
