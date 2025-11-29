import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user) {
      const dashboards: { [key: string]: string } = {
        'Super Admin': '/dashboard/admin',
        'Manager': '/dashboard/manager',
        'Cashier': '/dashboard/cashier',
        'Waiter': '/dashboard/waiter',
        'Chef': '/dashboard/chef',
        'Inventory Manager': '/dashboard/inventory',
        'Customer': '/dashboard/customer'
      };
      navigate(dashboards[user.role] || '/dashboard/customer');
    }
  }, [isAuthenticated, user, navigate]);

  return null;
};

export default Index;
