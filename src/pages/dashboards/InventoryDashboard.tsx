import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Package, AlertTriangle, TrendingUp, Users, Plus, Minus } from 'lucide-react';
import logo from '@/assets/dinelog-logo.png';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const InventoryDashboard = () => {
  const { user, logout } = useAuth();
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Tomatoes', quantity: 50, unit: 'kg', threshold: 10, supplier: 'Fresh Farms' },
    { id: 2, name: 'Chicken', quantity: 8, unit: 'kg', threshold: 15, supplier: 'Meat Co.' },
    { id: 3, name: 'Pasta', quantity: 30, unit: 'kg', threshold: 20, supplier: 'Italian Foods' },
    { id: 4, name: 'Olive Oil', quantity: 15, unit: 'L', threshold: 5, supplier: 'Oil Suppliers' },
  ]);

  const [vendors] = useState([
    { id: 1, name: 'Fresh Farms', contact: '+1 234 567 8900', items: 'Vegetables, Fruits' },
    { id: 2, name: 'Meat Co.', contact: '+1 234 567 8901', items: 'Meat, Poultry' },
    { id: 3, name: 'Italian Foods', contact: '+1 234 567 8902', items: 'Pasta, Sauces' },
  ]);

  const [newStock, setNewStock] = useState({ itemId: 0, quantity: '' });

  const addStock = (itemId: number, amount: number) => {
    setInventory(inventory.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity + amount } : item
    ));
    toast({ title: "Stock Added", description: "Inventory updated successfully." });
  };

  const reduceStock = (itemId: number, amount: number) => {
    setInventory(inventory.map(item =>
      item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity - amount) } : item
    ));
    toast({ title: "Stock Reduced", description: "Inventory updated successfully." });
  };

  const lowStockItems = inventory.filter(item => item.quantity <= item.threshold);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5 pt-6">
      <div className="container mx-auto px-4 mb-6">
        <h1 className="text-3xl font-bold text-primary">Inventory Manager Dashboard</h1>
        <p className="text-muted-foreground">Stock management</p>
      </div>

      <main className="container mx-auto px-4 pb-8">
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{inventory.length}</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{lowStockItems.length}</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendors</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{vendors.length}</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">$12,450</div>
            </CardContent>
          </Card>
        </div>

        {lowStockItems.length > 0 && (
          <Card className="border-red-500/50 shadow-lg mb-6 bg-red-50/50 dark:bg-red-950/20">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Low Stock Alerts
              </CardTitle>
              <CardDescription>Items that need reordering</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lowStockItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-card rounded-lg border border-red-500/20">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Current: {item.quantity} {item.unit} (Threshold: {item.threshold} {item.unit})
                      </p>
                    </div>
                    <Badge variant="destructive">Low Stock</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-border/50 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <Package className="h-5 w-5" />
              Current Stock Levels
            </CardTitle>
            <CardDescription>Manage inventory quantities</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="font-semibold">{item.quantity}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>
                      <Badge variant={item.quantity <= item.threshold ? 'destructive' : 'default'}>
                        {item.quantity <= item.threshold ? 'Low' : 'Good'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setNewStock({ itemId: item.id, quantity: '' })}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Stock - {item.name}</DialogTitle>
                              <DialogDescription>Enter quantity to add</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Quantity ({item.unit})</Label>
                                <Input 
                                  type="number" 
                                  placeholder="Enter amount"
                                  value={newStock.itemId === item.id ? newStock.quantity : ''}
                                  onChange={(e) => setNewStock({ itemId: item.id, quantity: e.target.value })}
                                />
                              </div>
                              <Button 
                                onClick={() => {
                                  addStock(item.id, parseInt(newStock.quantity) || 0);
                                  setNewStock({ itemId: 0, quantity: '' });
                                }}
                                className="w-full"
                              >
                                Add Stock
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => reduceStock(item.id, 5)}
                        >
                          <Minus className="h-4 w-4" />
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
              <Users className="h-5 w-5" />
              Vendor Management
            </CardTitle>
            <CardDescription>Supplier contact information</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Items Supplied</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell className="font-medium">{vendor.name}</TableCell>
                    <TableCell>{vendor.contact}</TableCell>
                    <TableCell className="text-sm">{vendor.items}</TableCell>
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

export default InventoryDashboard;
