import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Download, Printer } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const BillingPage = () => {
  const menuItems = [
    { id: 1, name: 'Classic Burger', price: 12.99 },
    { id: 2, name: 'Caesar Salad', price: 8.99 },
    { id: 3, name: 'Grilled Steak', price: 24.99 },
    { id: 4, name: 'Margherita Pizza', price: 14.99 },
    { id: 5, name: 'Chocolate Cake', price: 6.99 },
    { id: 6, name: 'Fresh Juice', price: 4.99 },
  ];

  const [billItems, setBillItems] = useState<{id: number, name: string, price: number, quantity: number}[]>([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [taxRate] = useState(10); // 10% tax

  const addItem = () => {
    if (selectedItem) {
      const item = menuItems.find(m => m.id === parseInt(selectedItem));
      if (item) {
        const existing = billItems.find(b => b.id === item.id);
        if (existing) {
          setBillItems(billItems.map(b => 
            b.id === item.id ? {...b, quantity: b.quantity + 1} : b
          ));
        } else {
          setBillItems([...billItems, { ...item, quantity: 1 }]);
        }
        toast({ title: "Item Added", description: `${item.name} added to bill` });
      }
    }
  };

  const removeItem = (id: number) => {
    setBillItems(billItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      setBillItems(billItems.map(item => 
        item.id === id ? {...item, quantity} : item
      ));
    }
  };

  const subtotal = billItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  const generateBill = () => {
    if (billItems.length === 0) {
      toast({ title: "Error", description: "Please add items to the bill", variant: "destructive" });
      return;
    }

    const billContent = `
      ========================================
              DINELOG RESTAURANT
      ========================================
      
      Table: ${tableNumber || 'N/A'}
      Customer: ${customerName || 'Guest'}
      Date: ${new Date().toLocaleString()}
      
      ========================================
      ITEMS
      ========================================
      ${billItems.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n      ')}
      
      ========================================
      Subtotal: $${subtotal.toFixed(2)}
      Tax (${taxRate}%): $${tax.toFixed(2)}
      ========================================
      TOTAL: $${total.toFixed(2)}
      ========================================
      
      Thank you for dining with us!
    `;

    console.log(billContent);
    toast({ title: "Bill Generated", description: "Check console for bill details" });
  };

  const downloadBill = () => {
    if (billItems.length === 0) {
      toast({ title: "Error", description: "Please add items to the bill", variant: "destructive" });
      return;
    }

    const billContent = `DINELOG RESTAURANT\n\nTable: ${tableNumber || 'N/A'}\nCustomer: ${customerName || 'Guest'}\nDate: ${new Date().toLocaleString()}\n\nITEMS:\n${billItems.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}\n\nSubtotal: $${subtotal.toFixed(2)}\nTax (${taxRate}%): $${tax.toFixed(2)}\nTOTAL: $${total.toFixed(2)}\n\nThank you for dining with us!`;

    const blob = new Blob([billContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bill-${Date.now()}.txt`;
    a.click();
    
    toast({ title: "Success", description: "Bill downloaded successfully!" });
  };

  const clearBill = () => {
    setBillItems([]);
    setTableNumber('');
    setCustomerName('');
    setSelectedItem('');
    toast({ title: "Bill Cleared", description: "Ready for new bill" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary">Billing & Payment</h1>
          <p className="text-muted-foreground mt-1">Generate bills and process payments</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Bill Creation */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-primary">Create Bill</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Table Number</Label>
                  <Input value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} placeholder="e.g., T-5" />
                </div>
                <div>
                  <Label>Customer Name (Optional)</Label>
                  <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="John Doe" />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <Label>Select Item</Label>
                  <Select value={selectedItem} onValueChange={setSelectedItem}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a menu item" />
                    </SelectTrigger>
                    <SelectContent>
                      {menuItems.map(item => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.name} - ${item.price.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={addItem} className="bg-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>

              <div className="border border-border/50 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-bold">Item</TableHead>
                      <TableHead className="font-bold">Price</TableHead>
                      <TableHead className="font-bold">Qty</TableHead>
                      <TableHead className="font-bold">Total</TableHead>
                      <TableHead className="font-bold"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {billItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                          No items added yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      billItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                              className="w-16 h-8"
                              min="1"
                            />
                          </TableCell>
                          <TableCell className="font-semibold">${(item.price * item.quantity).toFixed(2)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="h-8 w-8">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex gap-2">
                <Button onClick={clearBill} variant="outline" className="flex-1">
                  Clear Bill
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Right: Bill Summary */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-primary">Bill Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold text-lg">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Tax ({taxRate}%)</span>
                  <span className="font-semibold text-lg">${tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-3xl font-bold text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={generateBill} className="w-full bg-primary h-12 text-lg" size="lg">
                  <Printer className="h-5 w-5 mr-2" />
                  Generate Bill
                </Button>
                <Button onClick={downloadBill} variant="outline" className="w-full h-12 text-lg" size="lg">
                  <Download className="h-5 w-5 mr-2" />
                  Download Bill
                </Button>
              </div>

              <div className="pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground text-center">
                  {tableNumber && `Table: ${tableNumber}`}
                  {tableNumber && customerName && ' • '}
                  {customerName && `Customer: ${customerName}`}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
