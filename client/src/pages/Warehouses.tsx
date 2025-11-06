import { useState } from "react";
import { DataTable, StatusBadge } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
const mockWarehouses = [
  { id: "1", name: "Main Warehouse", location: "London - Central", address: "123 Storage Road, London, E1 2AB", totalProducts: 1250, totalValue: "£125,450", status: "Active" },
  { id: "2", name: "North Depot", location: "Manchester", address: "456 Depot Street, Manchester, M2 3CD", totalProducts: 890, totalValue: "£89,230", status: "Active" },
  { id: "3", name: "South Hub", location: "Birmingham", address: "789 Hub Avenue, Birmingham, B4 5EF", totalProducts: 640, totalValue: "£64,180", status: "Active" },
  { id: "4", name: "East Storage", location: "Cambridge", address: "321 Store Lane, Cambridge, CB1 2GH", totalProducts: 425, totalValue: "£42,890", status: "Inactive" },
];

export default function Warehouses() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>(null);

  const columns = [
    { key: "name", label: "Warehouse Name" },
    { key: "location", label: "Location" },
    { key: "address", label: "Address" },
    { key: "totalProducts", label: "Products", render: (value: number) => <span className="font-semibold">{value.toLocaleString()}</span> },
    { key: "totalValue", label: "Total Value", render: (value: string) => <span className="font-mono font-semibold">{value}</span> },
    { key: "status", label: "Status", render: (value: string) => <StatusBadge status={value} /> },
  ];

  const handleEdit = (warehouse: any) => {
    setSelectedWarehouse(warehouse);
    setIsDialogOpen(true);
    console.log("Edit warehouse:", warehouse);
  };

  const handleDelete = (warehouse: any) => {
    console.log("Delete warehouse:", warehouse);
  };

  const handleView = (warehouse: any) => {
    console.log("View warehouse:", warehouse);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Warehouse Locations</h1>
          <p className="text-muted-foreground mt-1">Manage warehouse facilities and locations</p>
        </div>
        <Button onClick={() => { setSelectedWarehouse(null); setIsDialogOpen(true); }} data-testid="button-add-warehouse">
          <Plus className="w-4 h-4 mr-2" />
          Add Warehouse
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">{mockWarehouses.filter(w => w.status === "Active").length}</div>
            <p className="text-sm text-muted-foreground mt-1">Active Warehouses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">3,205</div>
            <p className="text-sm text-muted-foreground mt-1">Total Products</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">£321,750</div>
            <p className="text-sm text-muted-foreground mt-1">Total Inventory Value</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={mockWarehouses}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            searchPlaceholder="Search warehouses..."
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedWarehouse ? "Edit Warehouse" : "Add New Warehouse"}</DialogTitle>
            <DialogDescription>
              {selectedWarehouse ? "Update warehouse information" : "Create a new warehouse location"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Warehouse Name *</Label>
              <Input id="name" defaultValue={selectedWarehouse?.name} data-testid="input-name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input id="location" defaultValue={selectedWarehouse?.location} data-testid="input-location" />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea id="address" rows={2} defaultValue={selectedWarehouse?.address} data-testid="input-address" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={selectedWarehouse?.status || "Active"}>
                <SelectTrigger id="status" data-testid="select-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="button-cancel">
              Cancel
            </Button>
            <Button onClick={() => { console.log("Save warehouse"); setIsDialogOpen(false); }} data-testid="button-save">
              {selectedWarehouse ? "Update" : "Create"} Warehouse
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
