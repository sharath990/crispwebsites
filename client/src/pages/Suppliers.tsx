import { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
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

//todo: remove mock functionality
const mockSuppliers = [
  { id: "1", name: "Global Tech Ltd", contactName: "Peter Johnson", email: "peter@globaltech.com", phone: "020 9876 5432", address: "12 Tech Park, London, SW1A 1AA", totalPOs: 45, activePOs: 3 },
  { id: "2", name: "Parts Unlimited", contactName: "Sarah Williams", email: "sarah@parts.com", phone: "020 8765 4321", address: "456 Supply Road, Manchester, M1 2AB", totalPOs: 32, activePOs: 1 },
  { id: "3", name: "Tool Masters", contactName: "Mike Brown", email: "mike@toolmasters.com", phone: "020 7654 3210", address: "789 Industrial Estate, Birmingham, B2 3CD", totalPOs: 28, activePOs: 2 },
  { id: "4", name: "Materials Direct", contactName: "Lucy Chen", email: "lucy@materials.com", phone: "020 6543 2109", address: "321 Materials Drive, Leeds, LS1 4DE", totalPOs: 56, activePOs: 4 },
];

export default function Suppliers() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

  const columns = [
    { key: "name", label: "Supplier Name" },
    { key: "contactName", label: "Contact" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" },
    { key: "totalPOs", label: "Total POs" },
    { key: "activePOs", label: "Active POs", render: (value: number) => <span className="font-semibold text-primary">{value}</span> },
  ];

  const handleEdit = (supplier: any) => {
    setSelectedSupplier(supplier);
    setIsDialogOpen(true);
    console.log("Edit supplier:", supplier);
  };

  const handleDelete = (supplier: any) => {
    console.log("Delete supplier:", supplier);
  };

  const handleView = (supplier: any) => {
    console.log("View supplier:", supplier);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Suppliers</h1>
          <p className="text-muted-foreground mt-1">Manage your supplier relationships</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" data-testid="button-export">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => { setSelectedSupplier(null); setIsDialogOpen(true); }} data-testid="button-add-supplier">
            <Plus className="w-4 h-4 mr-2" />
            Add Supplier
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={mockSuppliers}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            searchPlaceholder="Search suppliers..."
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedSupplier ? "Edit Supplier" : "Add New Supplier"}</DialogTitle>
            <DialogDescription>
              {selectedSupplier ? "Update supplier information" : "Create a new supplier record"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="name">Supplier Name *</Label>
              <Input id="name" defaultValue={selectedSupplier?.name} data-testid="input-name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Name *</Label>
              <Input id="contactName" defaultValue={selectedSupplier?.contactName} data-testid="input-contact-name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" defaultValue={selectedSupplier?.email} data-testid="input-email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" defaultValue={selectedSupplier?.phone} data-testid="input-phone" />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea id="address" rows={3} defaultValue={selectedSupplier?.address} data-testid="input-address" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="button-cancel">
              Cancel
            </Button>
            <Button onClick={() => { console.log("Save supplier"); setIsDialogOpen(false); }} data-testid="button-save">
              {selectedSupplier ? "Update" : "Create"} Supplier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
