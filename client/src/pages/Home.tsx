import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  Shield,
  Zap,
  Globe
} from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Customer Management",
      description: "Complete CRM with customer tracking, debt reports, and account management"
    },
    {
      icon: <Package className="w-8 h-8 text-primary" />,
      title: "Inventory Control",
      description: "Multi-warehouse stock management with real-time tracking and alerts"
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-primary" />,
      title: "Sales & Orders",
      description: "Streamlined order processing from quote to delivery with full visibility"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Financial Management",
      description: "Invoicing, payments, and comprehensive financial reporting"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with role-based access control"
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Real-time Updates",
      description: "Stay informed with instant notifications and live data updates"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">CrispWebsites</h1>
              <p className="text-xs text-muted-foreground">Business Management System</p>
            </div>
          </div>
          <Button onClick={() => setLocation("/login")} data-testid="button-login">
            Sign In
          </Button>
        </div>
      </header>

      <main>
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Globe className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-primary">All-in-One Business Solution</span>
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Unified Business Management
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Streamline your operations with our comprehensive ERP system. Manage customers, 
              inventory, sales, purchasing, and accounting all in one powerful platform.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" onClick={() => setLocation("/login")} data-testid="button-get-started">
                Get Started
              </Button>
              <Button size="lg" variant="outline" data-testid="button-learn-more">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Everything You Need to Run Your Business
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Powerful features designed to help you manage every aspect of your business operations efficiently
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="hover-elevate">
                  <CardContent className="pt-6">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-12 text-center border border-primary/20">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join hundreds of businesses already using CrispWebsites to streamline their operations
              </p>
              <Button size="lg" onClick={() => setLocation("/login")} data-testid="button-start-trial">
                Start Your Free Trial
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 px-6">
        <div className="container mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          <p>&copy; 2024 CrispWebsites. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
