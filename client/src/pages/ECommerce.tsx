import { useState } from "react";
import { DataTable, StatusBadge } from "@/components/DataTable";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ShoppingBag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

//todo: remove mock functionality
const mockEcommerceOrders = [
  { id: "1", orderNumber: "WEB-2024-101", customer: "John Smith", email: "john@email.com", orderDate: "2024-11-06 14:23", total: "£145.99", status: "Pending", paymentStatus: "Paid", items: 3 },
  { id: "2", orderNumber: "WEB-2024-102", customer: "Emma Wilson", email: "emma@email.com", orderDate: "2024-11-06 13:45", total: "£89.50", status: "Confirmed", paymentStatus: "Paid", items: 2 },
  { id: "3", orderNumber: "WEB-2024-103", customer: "David Lee", email: "david@email.com", orderDate: "2024-11-06 12:30", total: "£234.00", status: "Shipped", paymentStatus: "Paid", items: 5 },
  { id: "4", orderNumber: "WEB-2024-104", customer: "Sarah Brown", email: "sarah@email.com", orderDate: "2024-11-05 16:20", total: "£67.25", status: "Delivered", paymentStatus: "Paid", items: 1 },
];

//todo: remove mock functionality
const basketLogs = [
  { id: "1", sessionId: "sess_abc123", customer: "Anonymous", action: "Added to cart", product: "Widget A", quantity: 2, timestamp: "2024-11-06 14:20:15" },
  { id: "2", sessionId: "sess_abc123", customer: "Anonymous", action: "Updated quantity", product: "Widget A", quantity: 3, timestamp: "2024-11-06 14:21:30" },
  { id: "3", sessionId: "sess_abc123", customer: "John Smith", action: "Checkout started", product: "-", quantity: 0, timestamp: "2024-11-06 14:22:45" },
  { id: "4", sessionId: "sess_xyz789", customer: "Anonymous", action: "Added to cart", product: "Component B", quantity: 1, timestamp: "2024-11-06 14:15:20" },
  { id: "5", sessionId: "sess_xyz789", customer: "Anonymous", action: "Removed from cart", product: "Component B", quantity: 0, timestamp: "2024-11-06 14:16:10" },
];

export default function ECommerce() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const orderColumns = [
    { key: "orderNumber", label: "Order #" },
    { key: "customer", label: "Customer" },
    { key: "email", label: "Email" },
    { key: "orderDate", label: "Order Date" },
    { key: "items", label: "Items" },
    { key: "total", label: "Total", render: (value: string) => <span className="font-mono font-semibold">{value}</span> },
    { key: "paymentStatus", label: "Payment" },
    { key: "status", label: "Status", render: (value: string) => <StatusBadge status={value} /> },
  ];

  const basketLogColumns = [
    { key: "timestamp", label: "Time" },
    { key: "sessionId", label: "Session ID", render: (value: string) => <span className="font-mono text-xs">{value}</span> },
    { key: "customer", label: "Customer" },
    { key: "action", label: "Action" },
    { key: "product", label: "Product" },
    { key: "quantity", label: "Quantity" },
  ];

  const handleView = (order: any) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
    console.log("View order:", order);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">E-Commerce Orders</h1>
          <p className="text-muted-foreground mt-1">Manage online orders and customer activity</p>
        </div>
        <Button variant="outline" data-testid="button-export">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-primary" />
              <div>
                <div className="text-2xl font-semibold">{mockEcommerceOrders.length}</div>
                <p className="text-sm text-muted-foreground">Online Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">£536.74</div>
            <p className="text-sm text-muted-foreground mt-1">Revenue Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">{mockEcommerceOrders.filter(o => o.status === "Pending").length}</div>
            <p className="text-sm text-muted-foreground mt-1">Pending Processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">11</div>
            <p className="text-sm text-muted-foreground mt-1">Active Sessions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders" data-testid="tab-orders">Online Orders</TabsTrigger>
          <TabsTrigger value="basket" data-testid="tab-basket">Basket Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardContent className="pt-6">
              <DataTable
                columns={orderColumns}
                data={mockEcommerceOrders}
                onView={handleView}
                searchPlaceholder="Search online orders..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="basket">
          <Card>
            <CardContent className="pt-6">
              <DataTable
                columns={basketLogColumns}
                data={basketLogs}
                searchPlaceholder="Search basket logs..."
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order {selectedOrder?.orderNumber}</DialogTitle>
            <DialogDescription>
              Online order details from website
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Customer</p>
                <p className="font-medium">{selectedOrder?.customer}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{selectedOrder?.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Order Date</p>
                <p className="font-medium">{selectedOrder?.orderDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium">{selectedOrder?.status}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Items</p>
                <p className="font-medium">{selectedOrder?.items} items</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="font-mono font-semibold">{selectedOrder?.total}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Order Items</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Widget A × 2</span>
                  <span className="font-mono">£49.98</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Component B × 1</span>
                  <span className="font-mono">£45.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Material E × 3</span>
                  <span className="font-mono">£46.50</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
