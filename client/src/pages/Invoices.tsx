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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//todo: remove mock functionality
const mockInvoices = [
  { id: "1", invoiceNumber: "INV-2024-001", customer: "Acme Corp", invoiceDate: "2024-11-05", dueDate: "2024-11-20", total: "£2,450.00", paidAmount: "£0.00", status: "Unpaid", customerEmail: "accounts@acme.com" },
  { id: "2", invoiceNumber: "INV-2024-002", customer: "TechStart Ltd", invoiceDate: "2024-11-04", dueDate: "2024-11-19", total: "£1,890.00", paidAmount: "£1,890.00", status: "Paid", customerEmail: "finance@techstart.com" },
  { id: "3", invoiceNumber: "INV-2024-003", customer: "Global Supplies", invoiceDate: "2024-11-03", dueDate: "2024-11-18", total: "£3,250.00", paidAmount: "£1,500.00", status: "Partially Paid", customerEmail: "accounts@global.com" },
  { id: "4", invoiceNumber: "INV-2024-004", customer: "Metro Industries", invoiceDate: "2024-10-25", dueDate: "2024-11-09", total: "£4,120.00", paidAmount: "£0.00", status: "Overdue", customerEmail: "billing@metro.com" },
];

export default function Invoices() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const columns = [
    { key: "invoiceNumber", label: "Invoice #" },
    { key: "customer", label: "Customer" },
    { key: "invoiceDate", label: "Invoice Date" },
    { key: "dueDate", label: "Due Date" },
    { key: "total", label: "Total", render: (value: string) => <span className="font-mono font-semibold">{value}</span> },
    { key: "paidAmount", label: "Paid", render: (value: string) => <span className="font-mono text-green-600">{value}</span> },
    { key: "status", label: "Status", render: (value: string) => <StatusBadge status={value} /> },
  ];

  const handleView = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsDialogOpen(true);
    console.log("View invoice:", invoice);
  };

  const handleAllocatePayment = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsPaymentDialogOpen(true);
    console.log("Allocate payment:", invoice);
  };

  const handleEmailInvoice = (invoice: any) => {
    console.log("Email invoice:", invoice);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Invoices</h1>
          <p className="text-muted-foreground mt-1">Manage invoices and payments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" data-testid="button-export">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => { setSelectedInvoice(null); setIsDialogOpen(true); }} data-testid="button-create-invoice">
            <Plus className="w-4 h-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">£11,710.00</div>
            <p className="text-sm text-muted-foreground mt-1">Total Outstanding</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">£4,120.00</div>
            <p className="text-sm text-muted-foreground mt-1">Overdue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">£1,890.00</div>
            <p className="text-sm text-muted-foreground mt-1">Paid This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">3</div>
            <p className="text-sm text-muted-foreground mt-1">Unpaid Invoices</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={mockInvoices}
            onView={handleView}
            searchPlaceholder="Search invoices..."
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedInvoice ? `Invoice ${selectedInvoice.invoiceNumber}` : "Create Invoice"}</DialogTitle>
            <DialogDescription>
              {selectedInvoice ? "View invoice details" : "Generate a new invoice"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Customer *</Label>
                <Select defaultValue={selectedInvoice?.customer}>
                  <SelectTrigger id="customer" data-testid="select-customer">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Acme Corp">Acme Corp</SelectItem>
                    <SelectItem value="TechStart Ltd">TechStart Ltd</SelectItem>
                    <SelectItem value="Global Supplies">Global Supplies</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salesOrder">Sales Order</Label>
                <Select>
                  <SelectTrigger id="salesOrder" data-testid="select-sales-order">
                    <SelectValue placeholder="Select order (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SO-2024-001">SO-2024-001</SelectItem>
                    <SelectItem value="SO-2024-002">SO-2024-002</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="invoiceDate">Invoice Date *</Label>
                <Input id="invoiceDate" type="date" defaultValue={selectedInvoice?.invoiceDate || "2024-11-06"} data-testid="input-invoice-date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input id="dueDate" type="date" defaultValue={selectedInvoice?.dueDate} data-testid="input-due-date" />
              </div>
            </div>

            {selectedInvoice && (
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Invoice Total:</span>
                  <span className="font-mono font-semibold">{selectedInvoice.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount Paid:</span>
                  <span className="font-mono text-green-600">{selectedInvoice.paidAmount}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                  <span>Balance Due:</span>
                  <span className="font-mono text-destructive">
                    £{(parseFloat(selectedInvoice.total.replace("£", "").replace(",", "")) - parseFloat(selectedInvoice.paidAmount.replace("£", "").replace(",", ""))).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            {selectedInvoice && (
              <>
                <Button variant="outline" onClick={() => { setIsDialogOpen(false); handleAllocatePayment(selectedInvoice); }} data-testid="button-allocate-payment">
                  Allocate Payment
                </Button>
                <Button variant="outline" onClick={() => handleEmailInvoice(selectedInvoice)} data-testid="button-email">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Invoice
                </Button>
              </>
            )}
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="button-cancel">
              Close
            </Button>
            {!selectedInvoice && (
              <Button onClick={() => { console.log("Create invoice"); setIsDialogOpen(false); }} data-testid="button-save">
                Create Invoice
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Allocate Payment</DialogTitle>
            <DialogDescription>
              Record a payment for invoice {selectedInvoice?.invoiceNumber}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="paymentAmount">Payment Amount *</Label>
              <Input id="paymentAmount" type="number" step="0.01" placeholder="0.00" data-testid="input-payment-amount" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentDate">Payment Date *</Label>
              <Input id="paymentDate" type="date" defaultValue="2024-11-06" data-testid="input-payment-date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select defaultValue="Bank Transfer">
                <SelectTrigger id="paymentMethod" data-testid="select-payment-method">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference">Reference</Label>
              <Input id="reference" placeholder="Transaction reference" data-testid="input-reference" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)} data-testid="button-cancel-payment">
              Cancel
            </Button>
            <Button onClick={() => { console.log("Allocate payment"); setIsPaymentDialogOpen(false); }} data-testid="button-save-payment">
              Allocate Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
