import { useState } from "react";
import { DataTable, StatusBadge } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Download, Mail } from "lucide-react";
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
const mockPOs = [
  { id: "1", poNumber: "PO-2024-015", supplier: "Global Tech Ltd", orderDate: "2024-11-05", expectedDelivery: "2024-11-12", status: "Issued", total: "£1,250.00", supplierEmail: "orders@globaltech.com" },
  { id: "2", poNumber: "PO-2024-016", supplier: "Parts Unlimited", orderDate: "2024-11-04", expectedDelivery: "2024-11-10", status: "Received", total: "£890.00", supplierEmail: "purchasing@parts.com" },
  { id: "3", poNumber: "PO-2024-017", supplier: "Tool Masters", orderDate: "2024-11-03", expectedDelivery: "2024-11-15", status: "Issued", total: "£2,340.00", supplierEmail: "sales@toolmasters.com" },
  { id: "4", poNumber: "PO-2024-018", supplier: "Materials Direct", orderDate: "2024-11-02", expectedDelivery: "2024-11-08", status: "Partially Received", total: "£1,560.00", supplierEmail: "orders@materials.com" },
];

export default function PurchaseOrders() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPO, setSelectedPO] = useState<any>(null);

  const columns = [
    { key: "poNumber", label: "PO #" },
    { key: "supplier", label: "Supplier" },
    { key: "orderDate", label: "Order Date" },
    { key: "expectedDelivery", label: "Expected Delivery" },
    { key: "total", label: "Total", render: (value: string) => <span className="font-mono font-semibold">{value}</span> },
    { key: "status", label: "Status", render: (value: string) => <StatusBadge status={value} /> },
  ];

  const handleEdit = (po: any) => {
    setSelectedPO(po);
    setIsDialogOpen(true);
    console.log("Edit PO:", po);
  };

  const handleDelete = (po: any) => {
    console.log("Delete PO:", po);
  };

  const handleView = (po: any) => {
    console.log("View PO:", po);
  };

  const handleEmailPO = (po: any) => {
    console.log("Email PO to supplier:", po);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Purchase Orders</h1>
          <p className="text-muted-foreground mt-1">Manage supplier orders and purchasing</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" data-testid="button-export">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => { setSelectedPO(null); setIsDialogOpen(true); }} data-testid="button-create-po">
            <Plus className="w-4 h-4 mr-2" />
            Create PO
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={mockPOs}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            searchPlaceholder="Search purchase orders..."
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedPO ? `Purchase Order ${selectedPO.poNumber}` : "Create Purchase Order"}</DialogTitle>
            <DialogDescription>
              {selectedPO ? "View and edit purchase order details" : "Create a new purchase order"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier *</Label>
                <Select defaultValue={selectedPO?.supplier}>
                  <SelectTrigger id="supplier" data-testid="select-supplier">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Global Tech Ltd">Global Tech Ltd</SelectItem>
                    <SelectItem value="Parts Unlimited">Parts Unlimited</SelectItem>
                    <SelectItem value="Tool Masters">Tool Masters</SelectItem>
                    <SelectItem value="Materials Direct">Materials Direct</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="orderDate">Order Date *</Label>
                <Input id="orderDate" type="date" defaultValue={selectedPO?.orderDate || "2024-11-06"} data-testid="input-order-date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedDelivery">Expected Delivery</Label>
                <Input id="expectedDelivery" type="date" defaultValue={selectedPO?.expectedDelivery} data-testid="input-expected-delivery" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={selectedPO?.status || "Issued"}>
                  <SelectTrigger id="status" data-testid="select-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Issued">Issued</SelectItem>
                    <SelectItem value="Partially Received">Partially Received</SelectItem>
                    <SelectItem value="Received">Received</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" rows={2} data-testid="input-notes" />
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
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2">Quantity</div>
                  <div className="col-span-2">Unit Price</div>
                  <div className="col-span-2">Total</div>
                </div>
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-6">
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
                  <div className="col-span-2"><Input type="number" defaultValue="100" /></div>
                  <div className="col-span-2"><Input type="number" step="0.01" defaultValue="12.50" /></div>
                  <div className="col-span-2 font-mono text-sm">£1,250.00</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t space-y-2">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="font-mono">£1,250.00</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            {selectedPO && (
              <Button variant="outline" onClick={() => handleEmailPO(selectedPO)} data-testid="button-email">
                <Mail className="w-4 h-4 mr-2" />
                Email to Supplier
              </Button>
            )}
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="button-cancel">
              Cancel
            </Button>
            <Button onClick={() => { console.log("Save PO"); setIsDialogOpen(false); }} data-testid="button-save">
              {selectedPO ? "Update" : "Create"} PO
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
