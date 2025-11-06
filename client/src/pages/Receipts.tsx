import { DataTable, StatusBadge } from "@/components/DataTable";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

//todo: remove mock functionality
const mockReceipts = [
  { id: "1", receiptNumber: "RCP-2024-001", poNumber: "PO-2024-016", supplier: "Parts Unlimited", receiptDate: "2024-11-04", quantity: 500, warehouse: "Main Warehouse", status: "Completed", qualityCheck: "Passed" },
  { id: "2", receiptNumber: "RCP-2024-002", poNumber: "PO-2024-018", supplier: "Materials Direct", receiptDate: "2024-11-05", quantity: 300, warehouse: "South Hub", status: "Partial", qualityCheck: "In Progress" },
  { id: "3", receiptNumber: "RCP-2024-003", poNumber: "PO-2024-015", supplier: "Global Tech Ltd", receiptDate: "2024-11-06", quantity: 100, warehouse: "Main Warehouse", status: "Pending", qualityCheck: "Not Started" },
];

export default function Receipts() {
  const columns = [
    { key: "receiptNumber", label: "Receipt #" },
    { key: "poNumber", label: "PO Number" },
    { key: "supplier", label: "Supplier" },
    { key: "receiptDate", label: "Receipt Date" },
    { key: "quantity", label: "Quantity", render: (value: number) => <span className="font-mono">{value}</span> },
    { key: "warehouse", label: "Warehouse" },
    { key: "qualityCheck", label: "Quality Check" },
    { key: "status", label: "Status", render: (value: string) => <StatusBadge status={value} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Goods Receipts</h1>
          <p className="text-muted-foreground mt-1">Manage incoming stock receipts and quality checks</p>
        </div>
        <Button variant="outline" data-testid="button-export">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">{mockReceipts.filter(r => r.status === "Pending").length}</div>
            <p className="text-sm text-muted-foreground mt-1">Pending Receipts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">{mockReceipts.filter(r => r.qualityCheck === "In Progress").length}</div>
            <p className="text-sm text-muted-foreground mt-1">Quality Checks In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">900</div>
            <p className="text-sm text-muted-foreground mt-1">Total Items Received</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={mockReceipts}
            onView={(receipt) => console.log("View receipt:", receipt)}
            searchPlaceholder="Search receipts..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
