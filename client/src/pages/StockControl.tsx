import { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, AlertCircle, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

//todo: remove mock functionality
const mockStock = [
  { id: "1", sku: "PRD-001", name: "Widget A", warehouse: "Main Warehouse", onHand: 150, allocated: 25, onOrder: 100, available: 125, reorderLevel: 50, status: "adequate" },
  { id: "2", sku: "PRD-002", name: "Component B", warehouse: "Main Warehouse", onHand: 25, allocated: 10, onOrder: 50, available: 15, reorderLevel: 50, status: "reorder" },
  { id: "3", sku: "PRD-003", name: "Assembly C", warehouse: "North Depot", onHand: 5, allocated: 3, onOrder: 0, available: 2, reorderLevel: 25, status: "critical" },
  { id: "4", sku: "PRD-004", name: "Tool D", warehouse: "Main Warehouse", onHand: 82, allocated: 15, onOrder: 0, available: 67, reorderLevel: 30, status: "adequate" },
  { id: "5", sku: "PRD-005", name: "Material E", warehouse: "South Hub", onHand: 320, allocated: 50, onOrder: 200, available: 270, reorderLevel: 100, status: "adequate" },
];

//todo: remove mock functionality
const stockMovements = [
  { id: "1", sku: "PRD-001", product: "Widget A", type: "Receipt", quantity: 100, warehouse: "Main Warehouse", date: "2024-11-05", user: "Admin User", reference: "PO-2024-015" },
  { id: "2", sku: "PRD-002", product: "Component B", type: "Adjustment", quantity: -5, warehouse: "Main Warehouse", date: "2024-11-04", user: "Sarah Jones", reference: "ADJ-001" },
  { id: "3", sku: "PRD-003", product: "Assembly C", type: "Sale", quantity: -10, warehouse: "North Depot", date: "2024-11-04", user: "System", reference: "SO-2024-003" },
];

export default function StockControl() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState("all");

  const columns = [
    { key: "sku", label: "SKU" },
    { key: "name", label: "Product" },
    { key: "warehouse", label: "Warehouse" },
    { key: "onHand", label: "On Hand", render: (value: number) => <span className="font-mono">{value}</span> },
    { key: "allocated", label: "Allocated", render: (value: number) => <span className="font-mono text-muted-foreground">{value}</span> },
    { key: "available", label: "Available", render: (value: number) => <span className="font-mono font-semibold">{value}</span> },
    { key: "onOrder", label: "On Order", render: (value: number) => <span className="font-mono text-blue-600">{value}</span> },
    { 
      key: "status", 
      label: "Status", 
      render: (value: string) => {
        const colors = {
          adequate: "default",
          reorder: "secondary",
          critical: "destructive",
        } as const;
        return <Badge variant={colors[value as keyof typeof colors]}>{value}</Badge>;
      }
    },
  ];

  const movementColumns = [
    { key: "date", label: "Date" },
    { key: "sku", label: "SKU" },
    { key: "product", label: "Product" },
    { key: "type", label: "Type" },
    { 
      key: "quantity", 
      label: "Quantity", 
      render: (value: number) => (
        <span className={`font-mono font-semibold ${value > 0 ? "text-green-600" : "text-red-600"}`}>
          {value > 0 ? "+" : ""}{value}
        </span>
      )
    },
    { key: "warehouse", label: "Warehouse" },
    { key: "reference", label: "Reference" },
    { key: "user", label: "User" },
  ];

  const filteredStock = selectedWarehouse === "all" 
    ? mockStock 
    : mockStock.filter(item => item.warehouse === selectedWarehouse);

  const lowStockItems = mockStock.filter(item => item.status === "reorder" || item.status === "critical");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Stock Control</h1>
          <p className="text-muted-foreground mt-1">Monitor inventory levels and stock movements</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
            <SelectTrigger className="w-48" data-testid="select-warehouse">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Warehouses</SelectItem>
              <SelectItem value="Main Warehouse">Main Warehouse</SelectItem>
              <SelectItem value="North Depot">North Depot</SelectItem>
              <SelectItem value="South Hub">South Hub</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" data-testid="button-export">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setIsDialogOpen(true)} data-testid="button-stock-adjustment">
            <Plus className="w-4 h-4 mr-2" />
            Stock Adjustment
          </Button>
        </div>
      </div>

      {lowStockItems.length > 0 && (
        <Card className="border-destructive/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" />
              {lowStockItems.length} Items Need Reordering
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {lowStockItems.map(item => (
                <div key={item.id} className="flex items-center justify-between text-sm" data-testid={`alert-${item.sku}`}>
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground ml-2">({item.sku})</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-destructive font-semibold">{item.available} available</span>
                    <span className="text-muted-foreground">Reorder at {item.reorderLevel}</span>
                    <Button size="sm" variant="outline" data-testid={`button-reorder-${item.sku}`}>Create PO</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="levels" className="space-y-4">
        <TabsList>
          <TabsTrigger value="levels" data-testid="tab-levels">Stock Levels</TabsTrigger>
          <TabsTrigger value="movements" data-testid="tab-movements">Stock Movements</TabsTrigger>
        </TabsList>

        <TabsContent value="levels">
          <Card>
            <CardContent className="pt-6">
              <DataTable
                columns={columns}
                data={filteredStock}
                searchPlaceholder="Search stock..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements">
          <Card>
            <CardContent className="pt-6">
              <DataTable
                columns={movementColumns}
                data={stockMovements}
                searchPlaceholder="Search movements..."
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stock Adjustment</DialogTitle>
            <DialogDescription>
              Record stock adjustments for damage, shrinkage, or returns
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="product">Product *</Label>
              <Select>
                <SelectTrigger id="product" data-testid="select-product">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRD-001">PRD-001 - Widget A</SelectItem>
                  <SelectItem value="PRD-002">PRD-002 - Component B</SelectItem>
                  <SelectItem value="PRD-003">PRD-003 - Assembly C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="warehouse">Warehouse *</Label>
              <Select>
                <SelectTrigger id="warehouse" data-testid="select-warehouse-adj">
                  <SelectValue placeholder="Select warehouse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Main Warehouse">Main Warehouse</SelectItem>
                  <SelectItem value="North Depot">North Depot</SelectItem>
                  <SelectItem value="South Hub">South Hub</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Adjustment Quantity *</Label>
              <Input id="quantity" type="number" placeholder="+10 or -5" data-testid="input-quantity" />
              <p className="text-xs text-muted-foreground">Use positive for additions, negative for removals</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason *</Label>
              <Select>
                <SelectTrigger id="reason" data-testid="select-reason">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Damage">Damage</SelectItem>
                  <SelectItem value="Shrinkage">Shrinkage</SelectItem>
                  <SelectItem value="Return">Return</SelectItem>
                  <SelectItem value="Correction">Correction</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="button-cancel">
              Cancel
            </Button>
            <Button onClick={() => { console.log("Save adjustment"); setIsDialogOpen(false); }} data-testid="button-save">
              Save Adjustment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
