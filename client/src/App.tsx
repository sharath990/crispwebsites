import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Customers from "@/pages/Customers";
import CallManager from "@/pages/CallManager";
import Products from "@/pages/Products";
import StockControl from "@/pages/StockControl";
import Warehouses from "@/pages/Warehouses";
import SalesOrders from "@/pages/SalesOrders";
import Invoices from "@/pages/Invoices";
import ECommerce from "@/pages/ECommerce";
import PurchaseOrders from "@/pages/PurchaseOrders";
import Receipts from "@/pages/Receipts";
import Suppliers from "@/pages/Suppliers";
import Shipments from "@/pages/Shipments";
import UserAdmin from "@/pages/UserAdmin";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function AuthenticatedRouter() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/customers" component={Customers} />
      <Route path="/calls" component={CallManager} />
      <Route path="/products" component={Products} />
      <Route path="/stock" component={StockControl} />
      <Route path="/warehouses" component={Warehouses} />
      <Route path="/sales-orders" component={SalesOrders} />
      <Route path="/invoices" component={Invoices} />
      <Route path="/ecommerce" component={ECommerce} />
      <Route path="/purchase-orders" component={PurchaseOrders} />
      <Route path="/receipts" component={Receipts} />
      <Route path="/suppliers" component={Suppliers} />
      <Route path="/shipments" component={Shipments} />
      <Route path="/accounting" component={Invoices} />
      <Route path="/users" component={UserAdmin} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function PublicRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route component={Login} />
    </Switch>
  );
}

export default function App() {
  //todo: remove mock functionality
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check authentication status from localStorage
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setLocation("/");
  };

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <PublicRouter />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <header className="flex items-center h-16 px-6 border-b border-border bg-background">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <div className="flex-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  data-testid="button-logout"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </header>
              <main className="flex-1 overflow-auto p-8 bg-background">
                <AuthenticatedRouter />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
