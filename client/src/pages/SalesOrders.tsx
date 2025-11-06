import { useState } from "react";
import { DataTable, StatusBadge } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Download, Printer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//todo: remove mock functionality
const mockOrders = [
  { id: "1", orderNumber: "SO-2024-001", customer: "Acme Corp", orderDate: "2024-11-05", dueDate: "2024-11-15", status: "Confirmed", total: "£2,450.00", shippingAddress: "123 Business Park, London", email: "john@acme.com" },
  { id: "2", orderNumber: "SO-2024-002", customer: "TechStart Ltd", orderDate: "2024-11-05", dueDate: "2024-11-12", status: "Pending", total: "£1,890.00", shippingAddress: "456 Tech Avenue, Manchester", email: "emma@techstart.com" },
  { id: "3", orderNumber: "SO-2024-003", customer: "Global Supplies", orderDate: "2024-11-04", dueDate: "2024-11-10", status: "Shipped", total: "£3,250.00", shippingAddress: "789 Supply Street, Birmingham", email: "david@global.com" },
  { id: "4", orderNumber: "SO-2024-004", customer: "Metro Industries", orderDate: "2024-11-04", dueDate: "2024-11-18", status: "Confirmed", total: "£4,120.00", shippingAddress: "321 Industrial Road, Leeds", email: "lisa@metro.com" },
  { id: "5", orderNumber: "SO-2024-005", customer: "BuildRight Co", orderDate: "2024-11-03", dueDate: "2024-11-08", status: "Cancelled", total: "£1,200.00", shippingAddress: "555 Builder Lane, Liverpool", email: "robert@buildright.com" },
];

export default function SalesOrders() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const columns = [
    { key: "orderNumber", label: "Order #" },
    { key: "customer", label: "Customer" },
    { key: "orderDate", label: "Order Date" },
    { key: "dueDate", label: "Due Date" },
    { key: "total", label: "Total", render: (value: string) => <span className="font-mono font-semibold">{value}</span> },
    { key: "status", label: "Status", render: (value: string) => <StatusBadge status={value} /> },
  ];

  const handleEdit = (order: any) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
    console.log("Edit order:", order);
  };

  const handleDelete = (order: any) => {
    console.log("Delete order:", order);
  };

  const handleView = (order: any) => {
    console.log("View order:", order);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Sales Orders</h1>
          <p className="text-muted-foreground mt-1">Manage customer orders and sales</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" data-testid="button-export">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => { setSelectedOrder(null); setIsDialogOpen(true); }} data-testid="button-create-order">
            <Plus className="w-4 h-4 mr-2" />
            Create Order
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={mockOrders}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            searchPlaceholder="Search orders..."
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedOrder ? `Order ${selectedOrder.orderNumber}` : "Create New Sales Order"}</DialogTitle>
            <DialogDescription>
              {selectedOrder ? "View and edit order details" : "Create a new sales order"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Customer *</Label>
                <Select defaultValue={selectedOrder?.customer}>
                  <SelectTrigger id="customer" data-testid="select-customer">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Acme Corp">Acme Corp</SelectItem>
                    <SelectItem value="TechStart Ltd">TechStart Ltd</SelectItem>
                    <SelectItem value="Global Supplies">Global Supplies</SelectItem>
                    <SelectItem value="Metro Industries">Metro Industries</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="orderDate">Order Date *</Label>
                <Input id="orderDate" type="date" defaultValue={selectedOrder?.orderDate || "2024-11-06"} data-testid="input-order-date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" type="date" defaultValue={selectedOrder?.dueDate} data-testid="input-due-date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={selectedOrder?.status || "Pending"}>
                  <SelectTrigger id="status" data-testid="select-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="shippingAddress">Shipping Address</Label>
                <Textarea id="shippingAddress" rows={2} defaultValue={selectedOrder?.shippingAddress} data-testid="input-shipping-address" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Customer Email</Label>
                <Input id="email" type="email" defaultValue={selectedOrder?.email} data-testid="input-email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shippingCost">Shipping Cost</Label>
                <Input id="shippingCost" type="number" step="0.01" defaultValue="0.00" data-testid="input-shipping-cost" />
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" rows={3} data-testid="input-notes" />
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Order Items</h3>
                <Button variant="outline" size="sm" data-testid="button-add-item">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Item
                </Button>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-12 gap-2 font-medium text-muted-foreground">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2">Quantity</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2">Tax</div>
                  <div className="col-span-1">Total</div>
                </div>
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-5">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PRD-001">Widget A</SelectItem>
                        <SelectItem value="PRD-002">Component B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2"><Input type="number" defaultValue="1" /></div>
                  <div className="col-span-2"><Input type="number" step="0.01" defaultValue="24.99" /></div>
                  <div className="col-span-2"><Input type="number" step="0.01" defaultValue="5.00" /></div>
                  <div className="col-span-1 font-mono text-sm">£29.99</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-mono">£24.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax:</span>
                  <span className="font-mono">£5.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span className="font-mono">£0.00</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                  <span>Total:</span>
                  <span className="font-mono">£29.99</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            {selectedOrder && (
              <Button variant="outline" data-testid="button-print">
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            )}
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="button-cancel">
              Cancel
            </Button>
            <Button onClick={() => { console.log("Save order"); setIsDialogOpen(false); }} data-testid="button-save">
              {selectedOrder ? "Update" : "Create"} Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
