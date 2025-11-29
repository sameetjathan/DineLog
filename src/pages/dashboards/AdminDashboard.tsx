import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Users, Settings, BarChart3, ShoppingBag, Package } from 'lucide-react';
import logo from '@/assets/dinelog-logo.png';
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(storedUsers);
  }, []);

  const handleRoleChange = (email: string, newRole: string) => {
    const updatedUsers = users.map(u => 
      u.email === email ? { ...u, role: newRole } : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    if (user?.email === email) {
      const updatedCurrentUser = { ...user, role: newRole as any };
      localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
    }
    
    toast({
      title: "Role Updated",
      description: `User role changed to ${newRole}`,
    });
  };

  const stats = [
    { title: 'Total Users', value: users.length, icon: Users, color: 'text-primary' },
    { title: 'Active Orders', value: '24', icon: ShoppingBag, color: 'text-accent' },
    { title: 'Revenue Today', value: '$2,850', icon: BarChart3, color: 'text-green-600' },
    { title: 'Inventory Items', value: '156', icon: Package, color: 'text-blue-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5 pt-6">
      <div className="container mx-auto px-4 mb-6">
        <h1 className="text-3xl font-bold text-primary">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">Complete system control</p>
      </div>

      <main className="container mx-auto px-4 pb-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-border/50 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border/50 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
            <CardDescription>Manage all system users and their roles</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Current Role</TableHead>
                  <TableHead>Change Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.email}>
                    <TableCell className="font-medium">{u.fullName}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{u.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Select value={u.role} onValueChange={(value) => handleRoleChange(u.email, value)}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Super Admin">Super Admin</SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="Cashier">Cashier</SelectItem>
                          <SelectItem value="Waiter">Waiter</SelectItem>
                          <SelectItem value="Chef">Chef</SelectItem>
                          <SelectItem value="Inventory Manager">Inventory Manager</SelectItem>
                          <SelectItem value="Customer">Customer</SelectItem>
                        </SelectContent>
                      </Select>
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
                <Settings className="h-5 w-5" />
                System Settings
              </CardTitle>
              <CardDescription>Configure hotel and restaurant settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-foreground">✓ Restaurant operating hours</p>
              <p className="text-foreground">✓ Tax and service charge settings</p>
              <p className="text-foreground">✓ Payment gateway configuration</p>
              <p className="text-foreground">✓ Email notification templates</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Analytics Overview
              </CardTitle>
              <CardDescription>View comprehensive reports and insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-foreground">✓ Daily revenue reports</p>
              <p className="text-foreground">✓ Popular menu items</p>
              <p className="text-foreground">✓ Staff performance metrics</p>
              <p className="text-foreground">✓ Customer satisfaction scores</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
