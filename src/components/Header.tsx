import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/dinelog-logo.png";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();

  const roleBasedLinks = [
    { role: "Super Admin", links: [
      { to: "/dashboard/admin", label: "Dashboard" },
      { to: "/menu", label: "Menu" },
      { to: "/orders", label: "Orders" },
      { to: "/inventory-page", label: "Inventory" },
      { to: "/billing", label: "Billing" },
      { to: "/reports", label: "Reports" }
    ]},
    { role: "Manager", links: [
      { to: "/dashboard/manager", label: "Dashboard" },
      { to: "/menu", label: "Menu" },
      { to: "/orders", label: "Orders" },
      { to: "/reports", label: "Reports" }
    ]},
    { role: "Cashier", links: [
      { to: "/dashboard/cashier", label: "Dashboard" },
      { to: "/billing", label: "Billing" },
      { to: "/orders", label: "Orders" }
    ]},
    { role: "Waiter", links: [
      { to: "/dashboard/waiter", label: "Dashboard" },
      { to: "/orders", label: "Orders" },
      { to: "/menu", label: "Menu" }
    ]},
    { role: "Chef", links: [
      { to: "/dashboard/chef", label: "Dashboard" },
      { to: "/orders", label: "Orders" }
    ]},
    { role: "Inventory Manager", links: [
      { to: "/dashboard/inventory", label: "Dashboard" },
      { to: "/inventory-page", label: "Inventory" }
    ]},
    { role: "Customer", links: [
      { to: "/dashboard/customer", label: "Dashboard" },
      { to: "/menu", label: "Menu" }
    ]}
  ];

  const userLinks = user ? roleBasedLinks.find(r => r.role === user.role)?.links || [] : [];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm"
    >
      <div className="container flex h-20 items-center justify-between px-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Link to="/" className="flex items-center group">
            <img src={logo} alt="DineLog" className="h-16 w-auto transition-transform group-hover:rotate-3" />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {isAuthenticated && userLinks.map((link, index) => (
            <motion.div
              key={link.to}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={link.to}
                className="relative px-4 py-2 text-sm font-medium transition-all hover:text-primary group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 rounded-lg bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-200" />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated && user && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 px-4 py-2 rounded-full bg-muted/50 border border-border/50"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-sm">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-none">{user.fullName}</span>
                <span className="text-xs text-muted-foreground mt-0.5">{user.role}</span>
              </div>
            </motion.div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative rounded-full hover:bg-primary/10"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {isAuthenticated ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={logout}
              className="rounded-full hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="default" size="sm" className="rounded-full">Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-full"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl"
          >
            <nav className="container flex flex-col space-y-2 p-6">
              {isAuthenticated && userLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-all"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {isAuthenticated && user && (
                <div className="pt-4 mt-2 border-t border-border/40">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/50">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.fullName}</span>
                      <span className="text-xs text-muted-foreground">{user.role}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 pt-4 mt-2 border-t border-border/40">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full"
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>

                {isAuthenticated ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={logout} 
                    className="flex-1 rounded-full hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                ) : (
                  <Link to="/login" className="flex-1">
                    <Button variant="default" size="sm" className="w-full rounded-full">Login</Button>
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
