import { DataTable, StatusBadge } from "@/components/DataTable";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

//todo: remove mock functionality
const mockShipments = [
  { id: "1", shipmentNumber: "SHP-2024-001", salesOrder: "SO-2024-003", customer: "Global Supplies", carrier: "DPD", trackingNumber: "DPD123456789GB", shipmentDate: "2024-11-04", status: "Delivered", warehouse: "Main Warehouse" },
  { id: "2", shipmentNumber: "SHP-2024-002", salesOrder: "SO-2024-001", customer: "Acme Corp", carrier: "Royal Mail", trackingNumber: "RM987654321GB", shipmentDate: "2024-11-05", status: "In Transit", warehouse: "Main Warehouse" },
  { id: "3", shipmentNumber: "SHP-2024-003", salesOrder: "SO-2024-004", customer: "Metro Industries", carrier: "DHL", trackingNumber: "DHL555666777GB", shipmentDate: "2024-11-06", status: "Pending", warehouse: "North Depot" },
];

export default function Shipments() {
  const columns = [
    { key: "shipmentNumber", label: "Shipment #" },
    { key: "salesOrder", label: "Sales Order" },
    { key: "customer", label: "Customer" },
    { key: "carrier", label: "Carrier" },
    { key: "trackingNumber", label: "Tracking Number", render: (value: string) => <span className="font-mono text-sm">{value}</span> },
    { key: "shipmentDate", label: "Ship Date" },
    { key: "warehouse", label: "Warehouse" },
    { key: "status", label: "Status", render: (value: string) => <StatusBadge status={value} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Shipments</h1>
          <p className="text-muted-foreground mt-1">Track shipments and deliveries</p>
        </div>
        <Button variant="outline" data-testid="button-export">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">{mockShipments.filter(s => s.status === "Pending").length}</div>
            <p className="text-sm text-muted-foreground mt-1">Pending Shipments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">{mockShipments.filter(s => s.status === "In Transit").length}</div>
            <p className="text-sm text-muted-foreground mt-1">In Transit</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">{mockShipments.filter(s => s.status === "Delivered").length}</div>
            <p className="text-sm text-muted-foreground mt-1">Delivered Today</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={mockShipments}
            onView={(shipment) => console.log("View shipment:", shipment)}
            searchPlaceholder="Search shipments..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
