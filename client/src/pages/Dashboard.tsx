import { DashboardStats } from "@/components/DashboardStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShoppingCart, Package, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

//todo: remove mock functionality
const stats = [
  { title: "Total Customers", value: "1,284", change: 12.5, icon: <Users className="w-4 h-4" /> },
  { title: "Active Orders", value: "156", change: 8.2, icon: <ShoppingCart className="w-4 h-4" /> },
  { title: "Products in Stock", value: "3,421", change: -2.4, icon: <Package className="w-4 h-4" /> },
  { title: "Revenue (MTD)", value: "£124,567", change: 15.3, icon: <DollarSign className="w-4 h-4" /> },
];

//todo: remove mock functionality
const recentOrders = [
  { id: "SO-2024-001", customer: "Acme Corp", amount: "£2,450", status: "Confirmed", date: "2024-11-05" },
  { id: "SO-2024-002", customer: "TechStart Ltd", amount: "£1,890", status: "Pending", date: "2024-11-05" },
  { id: "SO-2024-003", customer: "Global Supplies", amount: "£3,250", status: "Shipped", date: "2024-11-04" },
  { id: "SO-2024-004", customer: "Metro Industries", amount: "£4,120", status: "Confirmed", date: "2024-11-04" },
];

//todo: remove mock functionality
const lowStockItems = [
  { sku: "PRD-001", name: "Widget A", current: 15, reorder: 50 },
  { sku: "PRD-002", name: "Component B", current: 8, reorder: 25 },
  { sku: "PRD-003", name: "Part C", current: 22, reorder: 100 },
];

//todo: remove mock functionality
const recentCalls = [
  { customer: "Acme Corp", type: "Outgoing", duration: "12 min", time: "2 hours ago", status: "Completed" },
  { customer: "TechStart Ltd", type: "Incoming", duration: "8 min", time: "4 hours ago", status: "Follow-up Required" },
  { customer: "Global Supplies", type: "Outgoing", duration: "15 min", time: "5 hours ago", status: "Completed" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your business overview.</p>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="text-lg">Recent Sales Orders</CardTitle>
            <Button variant="ghost" size="sm" data-testid="button-view-all-orders">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between" data-testid={`order-${order.id}`}>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-mono text-sm font-medium">{order.amount}</p>
                    <Badge variant={order.status === "Confirmed" ? "default" : order.status === "Pending" ? "secondary" : "outline"}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Low Stock Alerts
            </CardTitle>
            <Button variant="ghost" size="sm" data-testid="button-view-all-stock">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div key={item.sku} className="flex items-center justify-between" data-testid={`stock-${item.sku}`}>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-destructive">{item.current} units</p>
                    <p className="text-xs text-muted-foreground">Reorder: {item.reorder}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCalls.map((call, index) => (
                <div key={index} className="flex items-center justify-between" data-testid={`call-${index}`}>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{call.customer}</p>
                    <p className="text-sm text-muted-foreground">{call.type} • {call.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{call.time}</p>
                    <Badge variant={call.status === "Completed" ? "default" : "secondary"} className="text-xs mt-1">
                      {call.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Monthly Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Orders Processed</span>
                <span className="font-semibold">432</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Revenue Growth</span>
                <span className="font-semibold text-green-600">+15.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                <span className="font-semibold">94%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">On-Time Delivery</span>
                <span className="font-semibold">97%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
