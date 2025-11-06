import { Home, Users, Phone, Package, Warehouse, ShoppingCart, FileText, Truck, ClipboardCheck, MapPin, DollarSign, Building2, Settings, User, LayoutDashboard, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard, section: "Main" },
  { title: "Customers", url: "/customers", icon: Users, section: "CRM" },
  { title: "Call Manager", url: "/calls", icon: Phone, section: "CRM" },
  { title: "Products", url: "/products", icon: Package, section: "Inventory" },
  { title: "Stock Control", url: "/stock", icon: Warehouse, section: "Inventory" },
  { title: "Warehouse Locations", url: "/warehouses", icon: MapPin, section: "Inventory" },
  { title: "Sales Orders", url: "/sales-orders", icon: ShoppingCart, section: "Sales" },
  { title: "Invoices", url: "/invoices", icon: FileText, section: "Sales" },
  { title: "E-Commerce Orders", url: "/ecommerce", icon: ShoppingBag, section: "Sales" },
  { title: "Purchase Orders", url: "/purchase-orders", icon: ClipboardCheck, section: "Purchasing" },
  { title: "Receipts", url: "/receipts", icon: ClipboardCheck, section: "Purchasing" },
  { title: "Suppliers", url: "/suppliers", icon: Building2, section: "Purchasing" },
  { title: "Accounting", url: "/accounting", icon: DollarSign, section: "Finance" },
  { title: "Shipments", url: "/shipments", icon: Truck, section: "Logistics" },
  { title: "User Admin", url: "/users", icon: User, section: "Administration" },
  { title: "Site Settings", url: "/settings", icon: Settings, section: "Administration" },
];

const groupedItems = menuItems.reduce((acc, item) => {
  if (!acc[item.section]) {
    acc[item.section] = [];
  }
  acc[item.section].push(item);
  return acc;
}, {} as Record<string, typeof menuItems>);

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
            <Home className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-base text-sidebar-foreground">CrispWebsites</h2>
            <p className="text-xs text-muted-foreground">Business Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {Object.entries(groupedItems).map(([section, items]) => (
          <SidebarGroup key={section}>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-3 py-2">
              {section}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={location === item.url} data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      <Link href={item.url}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">AD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Admin User</p>
            <p className="text-xs text-muted-foreground truncate">admin@crisp.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
