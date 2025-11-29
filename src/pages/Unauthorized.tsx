import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import logo from '@/assets/dinelog-logo.png';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-accent/10 p-4">
      <Card className="w-full max-w-md shadow-2xl border-border/50">
        <CardHeader className="text-center space-y-4">
          <img src={logo} alt="DineLog" className="h-20 w-auto mx-auto" />
          <CardTitle className="text-3xl font-bold text-destructive">Access Denied</CardTitle>
          <CardDescription className="text-base">
            You don't have permission to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Link to="/login">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Return to Login
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unauthorized;
