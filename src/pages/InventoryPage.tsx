import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Minus, AlertTriangle, Package } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const InventoryPage = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Tomatoes', quantity: 45, unit: 'kg', minStock: 20, category: 'Vegetables' },
    { id: 2, name: 'Chicken Breast', quantity: 8, unit: 'kg', minStock: 15, category: 'Meat' },
    { id: 3, name: 'Pasta', quantity: 30, unit: 'kg', minStock: 25, category: 'Grains' },
    { id: 4, name: 'Olive Oil', quantity: 12, unit: 'liters', minStock: 10, category: 'Oils' },
    { id: 5, name: 'Cheese', quantity: 18, unit: 'kg', minStock: 15, category: 'Dairy' },
    { id: 6, name: 'Onions', quantity: 6, unit: 'kg', minStock: 10, category: 'Vegetables' },
    { id: 7, name: 'Rice', quantity: 50, unit: 'kg', minStock: 30, category: 'Grains' },
    { id: 8, name: 'Beef', quantity: 5, unit: 'kg', minStock: 12, category: 'Meat' },
  ]);

  const [newItem, setNewItem] = useState({ name: '', quantity: '', unit: 'kg', minStock: '', category: 'Vegetables' });

  const addItem = () => {
    if (newItem.name && newItem.quantity) {
      setInventory([...inventory, {
        id: inventory.length + 1,
        name: newItem.name,
        quantity: parseFloat(newItem.quantity),
        unit: newItem.unit,
        minStock: parseFloat(newItem.minStock) || 0,
        category: newItem.category
      }]);
      setNewItem({ name: '', quantity: '', unit: 'kg', minStock: '', category: 'Vegetables' });
      toast({ title: "Item Added", description: "New inventory item has been added!" });
    }
  };

  const updateQuantity = (id: number, change: number) => {
    setInventory(inventory.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    ));
  };

  const isLowStock = (item: typeof inventory[0]) => item.quantity <= item.minStock;

  const lowStockCount = inventory.filter(isLowStock).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary">Inventory Management</h1>
            <p className="text-muted-foreground mt-1">Track and manage stock levels</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Add Stock Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Inventory Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Item Name</Label>
                  <Input value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} placeholder="e.g., Tomatoes" />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input type="number" value={newItem.quantity} onChange={(e) => setNewItem({...newItem, quantity: e.target.value})} placeholder="0" />
                </div>
                <div>
                  <Label>Unit</Label>
                  <Input value={newItem.unit} onChange={(e) => setNewItem({...newItem, unit: e.target.value})} placeholder="kg, liters, pcs" />
                </div>
                <div>
                  <Label>Minimum Stock Level</Label>
                  <Input type="number" value={newItem.minStock} onChange={(e) => setNewItem({...newItem, minStock: e.target.value})} placeholder="0" />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input value={newItem.category} onChange={(e) => setNewItem({...newItem, category: e.target.value})} placeholder="Vegetables, Meat, etc." />
                </div>
                <Button onClick={addItem} className="w-full">Add Item</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Alert Card for Low Stock */}
        {lowStockCount > 0 && (
          <Card className="mb-6 border-destructive/50 bg-destructive/5">
            <CardContent className="flex items-center gap-3 p-4">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <p className="text-sm"><span className="font-bold">{lowStockCount}</span> item(s) are running low on stock!</p>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card className="border-border/50 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                  <p className="text-3xl font-bold text-primary">{inventory.length}</p>
                </div>
                <Package className="h-10 w-10 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Low Stock Items</p>
                  <p className="text-3xl font-bold text-destructive">{lowStockCount}</p>
                </div>
                <AlertTriangle className="h-10 w-10 text-destructive opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <p className="text-3xl font-bold text-primary">{new Set(inventory.map(i => i.category)).size}</p>
                </div>
                <Package className="h-10 w-10 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Table */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary">Stock Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-bold">Item</TableHead>
                    <TableHead className="font-bold">Category</TableHead>
                    <TableHead className="font-bold">Current Stock</TableHead>
                    <TableHead className="font-bold">Min Stock</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="font-bold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
                      <TableCell>
                        <span className={isLowStock(item) ? 'text-destructive font-bold' : 'font-semibold'}>
                          {item.quantity} {item.unit}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{item.minStock} {item.unit}</TableCell>
                      <TableCell>
                        {isLowStock(item) ? (
                          <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                            <AlertTriangle className="h-3 w-3" />
                            Low Stock
                          </Badge>
                        ) : (
                          <Badge variant="default">In Stock</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 5)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -5)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InventoryPage;
