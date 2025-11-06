import { DashboardStats } from '../DashboardStats';
import { Users, ShoppingCart, Package, DollarSign } from "lucide-react";

export default function DashboardStatsExample() {
  const stats = [
    { title: "Total Customers", value: "1,284", change: 12.5, icon: <Users className="w-4 h-4" /> },
    { title: "Active Orders", value: "156", change: 8.2, icon: <ShoppingCart className="w-4 h-4" /> },
    { title: "Products in Stock", value: "3,421", change: -2.4, icon: <Package className="w-4 h-4" /> },
    { title: "Revenue (MTD)", value: "£124,567", change: 15.3, icon: <DollarSign className="w-4 h-4" /> },
  ];

  return <DashboardStats stats={stats} />;
}
