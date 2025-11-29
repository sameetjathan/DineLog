import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Receipt, CreditCard, TrendingUp, FileText } from 'lucide-react';
import logo from '@/assets/dinelog-logo.png';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const CashierDashboard = () => {
  const { user, logout } = useAuth();
  const [orders] = useState([
    { id: '001', table: 'T1', amount: 45.50, status: 'Pending', items: 'Burger, Fries, Coke' },
    { id: '002', table: 'T3', amount: 78.00, status: 'Pending', items: 'Steak, Wine, Salad' },
    { id: '003', table: 'T5', amount: 32.00, status: 'Paid', items: 'Pizza, Juice' },
  ]);

  const [salesHistory] = useState([
    { date: '2025-11-28', orders: 45, revenue: 1850.00 },
    { date: '2025-11-27', orders: 52, revenue: 2140.00 },
    { date: '2025-11-26', orders: 48, revenue: 1920.00 },
  ]);

  const processPayment = (orderId: string) => {
    toast({
      title: "Payment Processed",
      description: `Order ${orderId} has been paid successfully.`,
    });
  };

  const generateInvoice = (orderId: string) => {
    toast({
      title: "Invoice Generated",
      description: `Invoice for Order ${orderId} is ready to print.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5 pt-6">
      <div className="container mx-auto px-4 mb-6">
        <h1 className="text-3xl font-bold text-primary">Cashier Dashboard</h1>
        <p className="text-muted-foreground">Billing and payments</p>
      </div>

      <main className="container mx-auto px-4 pb-8">
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">$1,850</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Bills</CardTitle>
              <Receipt className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {orders.filter(o => o.status === 'Pending').length}
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processed Today</CardTitle>
              <CreditCard className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">45</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Transaction</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">$41.11</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Pending Bills
            </CardTitle>
            <CardDescription>Process customer payments and generate invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Table</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>{order.table}</TableCell>
                    <TableCell className="text-sm">{order.items}</TableCell>
                    <TableCell className="font-semibold">${order.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={order.status === 'Paid' ? 'default' : 'secondary'}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {order.status === 'Pending' && (
                          <Button 
                            size="sm" 
                            onClick={() => processPayment(order.id)}
                            className="bg-primary text-primary-foreground"
                          >
                            Pay
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => generateInvoice(order.id)}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Invoice
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Sales History
            </CardTitle>
            <CardDescription>Recent transaction records</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesHistory.map((day) => (
                  <TableRow key={day.date}>
                    <TableCell className="font-medium">{day.date}</TableCell>
                    <TableCell>{day.orders}</TableCell>
                    <TableCell className="font-semibold text-green-600">
                      ${day.revenue.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CashierDashboard;
