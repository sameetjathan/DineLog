import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const MenuPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Classic Burger', price: 12.99, category: 'Main', type: 'non-veg', image: '🍔', description: 'Juicy beef patty with fresh vegetables', available: true },
    { id: 2, name: 'Caesar Salad', price: 8.99, category: 'Starter', type: 'veg', image: '🥗', description: 'Fresh romaine with Caesar dressing', available: true },
    { id: 3, name: 'Grilled Steak', price: 24.99, category: 'Main', type: 'non-veg', image: '🥩', description: 'Premium ribeye steak', available: true },
    { id: 4, name: 'Margherita Pizza', price: 14.99, category: 'Main', type: 'veg', image: '🍕', description: 'Classic tomato and mozzarella', available: true },
    { id: 5, name: 'Chocolate Cake', price: 6.99, category: 'Dessert', type: 'veg', image: '🍰', description: 'Rich chocolate layer cake', available: true },
    { id: 6, name: 'Fresh Juice', price: 4.99, category: 'Beverage', type: 'veg', image: '🧃', description: 'Orange or apple juice', available: true },
    { id: 7, name: 'Chicken Wings', price: 9.99, category: 'Starter', type: 'non-veg', image: '🍗', description: 'Spicy buffalo wings', available: true },
    { id: 8, name: 'Fish & Chips', price: 16.99, category: 'Main', type: 'non-veg', image: '🐟', description: 'Crispy battered fish with fries', available: true },
  ]);

  const [newItem, setNewItem] = useState({ name: '', price: '', category: 'Main', type: 'veg', description: '', image: '🍽️' });

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesPrice = priceFilter === 'all' || 
      (priceFilter === 'low' && item.price < 10) ||
      (priceFilter === 'medium' && item.price >= 10 && item.price < 20) ||
      (priceFilter === 'high' && item.price >= 20);
    return matchesSearch && matchesCategory && matchesType && matchesPrice;
  });

  const addMenuItem = () => {
    if (newItem.name && newItem.price) {
      setMenuItems([...menuItems, { 
        id: menuItems.length + 1, 
        name: newItem.name, 
        price: parseFloat(newItem.price), 
        category: newItem.category,
        type: newItem.type,
        image: newItem.image,
        description: newItem.description,
        available: true
      }]);
      setNewItem({ name: '', price: '', category: 'Main', type: 'veg', description: '', image: '🍽️' });
      toast({ title: "Success", description: "Menu item added successfully!" });
    }
  };

  const deleteMenuItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    toast({ title: "Item Deleted", description: "Menu item has been removed." });
  };

  const toggleAvailability = (id: number) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary">Menu Management</h1>
            <p className="text-muted-foreground mt-1">Manage your restaurant menu</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Add Menu Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Menu Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Item Name</Label>
                  <Input value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} placeholder="e.g., Grilled Chicken" />
                </div>
                <div>
                  <Label>Price ($)</Label>
                  <Input type="number" value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})} placeholder="0.00" />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={newItem.category} onValueChange={(val) => setNewItem({...newItem, category: val})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Starter">Starter</SelectItem>
                      <SelectItem value="Main">Main Course</SelectItem>
                      <SelectItem value="Dessert">Dessert</SelectItem>
                      <SelectItem value="Beverage">Beverage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Type</Label>
                  <Select value={newItem.type} onValueChange={(val) => setNewItem({...newItem, type: val})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="veg">Vegetarian</SelectItem>
                      <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea value={newItem.description} onChange={(e) => setNewItem({...newItem, description: e.target.value})} placeholder="Describe the dish..." />
                </div>
                <Button onClick={addMenuItem} className="w-full">Add Item</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Starter">Starter</SelectItem>
                <SelectItem value="Main">Main Course</SelectItem>
                <SelectItem value="Dessert">Dessert</SelectItem>
                <SelectItem value="Beverage">Beverage</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="veg">Vegetarian</SelectItem>
                <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="low">Under $10</SelectItem>
                <SelectItem value="medium">$10 - $20</SelectItem>
                <SelectItem value="high">$20+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div>
          {filteredItems.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No menu items found</p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden border-border/50 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl">{item.image}</div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteMenuItem(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant={item.type === 'veg' ? 'default' : 'destructive'}>{item.type === 'veg' ? 'Veg' : 'Non-Veg'}</Badge>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">${item.price.toFixed(2)}</span>
                      <Button 
                        variant={item.available ? "default" : "outline"} 
                        size="sm"
                        onClick={() => toggleAvailability(item.id)}
                      >
                        {item.available ? 'Available' : 'Unavailable'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
