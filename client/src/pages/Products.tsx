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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//todo: remove mock functionality
const mockProducts = [
  { id: "1", sku: "PRD-001", name: "Widget A", category: "Components", price: "£24.99", cost: "£12.50", stock: 150, supplier: "Global Tech Ltd", barcode: "1234567890123" },
  { id: "2", sku: "PRD-002", name: "Component B", category: "Parts", price: "£45.00", cost: "£22.00", stock: 85, supplier: "Parts Unlimited", barcode: "1234567890124" },
  { id: "3", sku: "PRD-003", name: "Assembly C", category: "Assemblies", price: "£120.00", cost: "£65.00", stock: 42, supplier: "Global Tech Ltd", barcode: "1234567890125" },
  { id: "4", sku: "PRD-004", name: "Tool D", category: "Tools", price: "£89.99", cost: "£45.00", stock: 28, supplier: "Tool Masters", barcode: "1234567890126" },
  { id: "5", sku: "PRD-005", name: "Material E", category: "Raw Materials", price: "£15.50", cost: "£8.00", stock: 320, supplier: "Materials Direct", barcode: "1234567890127" },
];

export default function Products() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const columns = [
    { key: "sku", label: "SKU" },
    { key: "name", label: "Product Name" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price", render: (value: string) => <span className="font-mono">{value}</span> },
    { key: "cost", label: "Cost", render: (value: string) => <span className="font-mono text-muted-foreground">{value}</span> },
    { key: "stock", label: "Stock", render: (value: number) => <span className={value < 50 ? "text-destructive font-semibold" : ""}>{value}</span> },
    { key: "supplier", label: "Supplier" },
  ];

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
    console.log("Edit product:", product);
  };

  const handleDelete = (product: any) => {
    console.log("Delete product:", product);
  };

  const handleView = (product: any) => {
    console.log("View product:", product);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your product catalog and pricing</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" data-testid="button-export">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => { setSelectedProduct(null); setIsDialogOpen(true); }} data-testid="button-add-product">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={mockProducts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            searchPlaceholder="Search products..."
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {selectedProduct ? "Update product information" : "Create a new product in the catalog"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="sku">SKU *</Label>
              <Input id="sku" defaultValue={selectedProduct?.sku} data-testid="input-sku" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="barcode">Barcode</Label>
              <Input id="barcode" defaultValue={selectedProduct?.barcode} data-testid="input-barcode" />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input id="name" defaultValue={selectedProduct?.name} data-testid="input-name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue={selectedProduct?.category}>
                <SelectTrigger id="category" data-testid="select-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Components">Components</SelectItem>
                  <SelectItem value="Parts">Parts</SelectItem>
                  <SelectItem value="Assemblies">Assemblies</SelectItem>
                  <SelectItem value="Tools">Tools</SelectItem>
                  <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Select defaultValue={selectedProduct?.supplier}>
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
              <Label htmlFor="price">Price *</Label>
              <Input id="price" type="number" step="0.01" defaultValue={selectedProduct?.price?.replace("£", "")} data-testid="input-price" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cost">Cost</Label>
              <Input id="cost" type="number" step="0.01" defaultValue={selectedProduct?.cost?.replace("£", "")} data-testid="input-cost" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input id="taxRate" type="number" step="0.01" defaultValue="20" data-testid="input-tax-rate" />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={3} data-testid="input-description" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="button-cancel">
              Cancel
            </Button>
            <Button onClick={() => { console.log("Save product"); setIsDialogOpen(false); }} data-testid="button-save">
              {selectedProduct ? "Update" : "Create"} Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
