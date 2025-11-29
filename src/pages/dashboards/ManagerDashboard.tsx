import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Users, Utensils, ShoppingCart, TrendingUp, MessageSquare, Plus } from 'lucide-react';
import logo from '@/assets/dinelog-logo.png';
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

const ManagerDashboard = () => {
  const { user, logout } = useAuth();
  const [tables, setTables] = useState<any[]>([]);
  const [newTable, setNewTable] = useState({ number: '', capacity: '' });
  const [staff, setStaff] = useState<any[]>([]);

  useEffect(() => {
    const storedTables = JSON.parse(localStorage.getItem('tables') || '[]');
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setTables(storedTables.length > 0 ? storedTables : [
      { id: 1, number: 'T1', capacity: 4, status: 'Available' },
      { id: 2, number: 'T2', capacity: 6, status: 'Occupied' },
      { id: 3, number: 'T3', capacity: 2, status: 'Reserved' },
    ]);
    setStaff(storedUsers.filter((u: any) => u.role !== 'Customer' && u.role !== 'Super Admin'));
  }, []);

  const addTable = () => {
    if (newTable.number && newTable.capacity) {
      const table = {
        id: tables.length + 1,
        number: newTable.number,
        capacity: parseInt(newTable.capacity),
        status: 'Available'
      };
      const updated = [...tables, table];
      setTables(updated);
      localStorage.setItem('tables', JSON.stringify(updated));
      setNewTable({ number: '', capacity: '' });
      toast({ title: "Table Added", description: `Table ${table.number} has been added.` });
    }
  };

  const deleteTable = (id: number) => {
    const updated = tables.filter(t => t.id !== id);
    setTables(updated);
    localStorage.setItem('tables', JSON.stringify(updated));
    toast({ title: "Table Deleted", description: "Table has been removed." });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5 pt-6">
      <div className="container mx-auto px-4 mb-6">
        <h1 className="text-3xl font-bold text-primary">Manager Dashboard</h1>
        <p className="text-muted-foreground">Operations management</p>
      </div>

      <main className="container mx-auto px-4 pb-8">
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Staff</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{staff.length}</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tables</CardTitle>
              <Utensils className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{tables.length}</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">47</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">$3,240</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 shadow-lg mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Utensils className="h-5 w-5" />
                  Table Management
                </CardTitle>
                <CardDescription>Add, edit, and manage restaurant tables</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-primary-foreground">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Table
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Table</DialogTitle>
                    <DialogDescription>Enter table details below</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Table Number</Label>
                      <Input 
                        placeholder="e.g., T4" 
                        value={newTable.number}
                        onChange={(e) => setNewTable({...newTable, number: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Capacity</Label>
                      <Input 
                        type="number" 
                        placeholder="e.g., 4"
                        value={newTable.capacity}
                        onChange={(e) => setNewTable({...newTable, capacity: e.target.value})}
                      />
                    </div>
                    <Button onClick={addTable} className="w-full">Add Table</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Table Number</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tables.map((table) => (
                  <TableRow key={table.id}>
                    <TableCell className="font-medium">{table.number}</TableCell>
                    <TableCell>{table.capacity} people</TableCell>
                    <TableCell>
                      <Badge variant={table.status === 'Available' ? 'default' : 'secondary'}>
                        {table.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => deleteTable(table.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Users className="h-5 w-5" />
                Staff Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {staff.map((s) => (
                  <div key={s.email} className="flex justify-between items-center p-2 border-b">
                    <div>
                      <p className="font-medium">{s.fullName}</p>
                      <p className="text-sm text-muted-foreground">{s.role}</p>
                    </div>
                    <Badge>{s.role}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Customer Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium">John Doe - ⭐⭐⭐⭐⭐</p>
                  <p className="text-sm text-muted-foreground">Excellent service and food!</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium">Jane Smith - ⭐⭐⭐⭐</p>
                  <p className="text-sm text-muted-foreground">Great atmosphere, will come again.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ManagerDashboard;
