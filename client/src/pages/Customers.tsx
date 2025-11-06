import { useState } from "react";
import { DataTable, StatusBadge } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Download } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

//todo: remove mock functionality
const mockCustomers = [
  { id: "1", companyName: "Acme Corp", contactName: "John Smith", email: "john@acme.com", phone: "020 1234 5678", status: "Active", balance: "£1,250", accountManager: "Sarah Jones", creditLimit: "£10,000" },
  { id: "2", companyName: "TechStart Ltd", contactName: "Emma Wilson", email: "emma@techstart.com", phone: "020 2345 6789", status: "Active", balance: "£850", accountManager: "Mike Brown", creditLimit: "£5,000" },
  { id: "3", companyName: "Global Supplies", contactName: "David Lee", email: "david@global.com", phone: "020 3456 7890", status: "Active", balance: "£2,450", accountManager: "Sarah Jones", creditLimit: "£15,000" },
  { id: "4", companyName: "Metro Industries", contactName: "Lisa Chen", email: "lisa@metro.com", phone: "020 4567 8901", status: "Prospect", balance: "£0", accountManager: "Tom Davis", creditLimit: "£8,000" },
  { id: "5", companyName: "BuildRight Co", contactName: "Robert Taylor", email: "robert@buildright.com", phone: "020 5678 9012", status: "Inactive", balance: "£0", accountManager: "Sarah Jones", creditLimit: "£12,000" },
];

//todo: remove mock functionality
const debtReportData = [
  { customer: "Acme Corp", balance: "£1,250", overdue: "£0", current: "£1,250", days30: "£0", days60: "£0", days90: "£0" },
  { customer: "Global Supplies", balance: "£2,450", overdue: "£450", current: "£2,000", days30: "£450", days60: "£0", days90: "£0" },
  { customer: "TechStart Ltd", balance: "£850", overdue: "£0", current: "£850", days30: "£0", days60: "£0", days90: "£0" },
];

export default function Customers() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const columns = [
    { key: "companyName", label: "Company Name" },
    { key: "contactName", label: "Contact" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "status", label: "Status", render: (value: string) => <StatusBadge status={value} /> },
    { key: "balance", label: "Balance", render: (value: string) => <span className="font-mono">{value}</span> },
    { key: "accountManager", label: "Account Manager" },
  ];

  const debtColumns = [
    { key: "customer", label: "Customer" },
    { key: "balance", label: "Total Balance", render: (value: string) => <span className="font-mono font-semibold">{value}</span> },
    { key: "overdue", label: "Overdue", render: (value: string) => <span className={`font-mono ${value !== "£0" ? "text-destructive font-semibold" : ""}`}>{value}</span> },
    { key: "current", label: "Current" },
    { key: "days30", label: "30 Days" },
    { key: "days60", label: "60 Days" },
    { key: "days90", label: "90+ Days" },
  ];

  const handleEdit = (customer: any) => {
    setSelectedCustomer(customer);
    setIsDialogOpen(true);
    console.log("Edit customer:", customer);
  };

  const handleDelete = (customer: any) => {
    console.log("Delete customer:", customer);
  };

  const handleView = (customer: any) => {
    console.log("View customer:", customer);
  };

  const activeCustomers = mockCustomers.filter(c => c.status === "Active");
  const prospectCustomers = mockCustomers.filter(c => c.status === "Prospect");
  const inactiveCustomers = mockCustomers.filter(c => c.status === "Inactive");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Customers</h1>
          <p className="text-muted-foreground mt-1">Manage your customer relationships and accounts</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" data-testid="button-export">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => { setSelectedCustomer(null); setIsDialogOpen(true); }} data-testid="button-add-customer">
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" data-testid="tab-all">All Customers</TabsTrigger>
          <TabsTrigger value="active" data-testid="tab-active">Active ({activeCustomers.length})</TabsTrigger>
          <TabsTrigger value="prospects" data-testid="tab-prospects">Prospects ({prospectCustomers.length})</TabsTrigger>
          <TabsTrigger value="inactive" data-testid="tab-inactive">Inactive ({inactiveCustomers.length})</TabsTrigger>
          <TabsTrigger value="debt" data-testid="tab-debt"><FileText className="w-4 h-4 mr-1" /> Debt Report</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardContent className="pt-6">
              <DataTable
                columns={columns}
                data={mockCustomers}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
                searchPlaceholder="Search customers..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardContent className="pt-6">
              <DataTable
                columns={columns}
                data={activeCustomers}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
                searchPlaceholder="Search active customers..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prospects">
          <Card>
            <CardContent className="pt-6">
              <DataTable
                columns={columns}
                data={prospectCustomers}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
                searchPlaceholder="Search prospects..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive">
          <Card>
            <CardContent className="pt-6">
              <DataTable
                columns={columns}
                data={inactiveCustomers}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
                searchPlaceholder="Search inactive customers..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="debt">
          <Card>
            <CardHeader>
              <CardTitle>Debt Report & Aging Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={debtColumns}
                data={debtReportData}
                searchPlaceholder="Search debt report..."
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedCustomer ? "Edit Customer" : "Add New Customer"}</DialogTitle>
            <DialogDescription>
              {selectedCustomer ? "Update customer information" : "Create a new customer record"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input id="companyName" defaultValue={selectedCustomer?.companyName} data-testid="input-company-name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Name *</Label>
              <Input id="contactName" defaultValue={selectedCustomer?.contactName} data-testid="input-contact-name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" defaultValue={selectedCustomer?.email} data-testid="input-email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" defaultValue={selectedCustomer?.phone} data-testid="input-phone" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={selectedCustomer?.status || "Active"}>
                <SelectTrigger id="status" data-testid="select-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Prospect">Prospect</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="creditLimit">Credit Limit</Label>
              <Input id="creditLimit" defaultValue={selectedCustomer?.creditLimit} data-testid="input-credit-limit" />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" rows={2} data-testid="input-address" />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" rows={3} data-testid="input-notes" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="button-cancel">
              Cancel
            </Button>
            <Button onClick={() => { console.log("Save customer"); setIsDialogOpen(false); }} data-testid="button-save">
              {selectedCustomer ? "Update" : "Create"} Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
