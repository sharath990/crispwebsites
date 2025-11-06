import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Site Settings</h1>
        <p className="text-muted-foreground mt-1">Configure system settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general" data-testid="tab-general">General</TabsTrigger>
          <TabsTrigger value="notifications" data-testid="tab-notifications">Notifications</TabsTrigger>
          <TabsTrigger value="email" data-testid="tab-email">Email Templates</TabsTrigger>
          <TabsTrigger value="modules" data-testid="tab-modules">Modules</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Basic company details and branding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" defaultValue="CrispWebsites Ltd" data-testid="input-company-name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="Europe/London">
                      <SelectTrigger id="timezone" data-testid="select-timezone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                        <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                        <SelectItem value="America/Los_Angeles">America/Los_Angeles (PST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select defaultValue="GBP">
                      <SelectTrigger id="currency" data-testid="select-currency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en-GB">
                      <SelectTrigger id="language" data-testid="select-language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en-GB">English (UK)</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button data-testid="button-save-company">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Preferences</CardTitle>
                <CardDescription>Configure default system behaviors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-approve Purchase Orders</Label>
                    <p className="text-sm text-muted-foreground">Automatically approve POs under £1,000</p>
                  </div>
                  <Switch data-testid="switch-auto-approve" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Send Low Stock Alerts</Label>
                    <p className="text-sm text-muted-foreground">Email notifications when stock reaches reorder level</p>
                  </div>
                  <Switch defaultChecked data-testid="switch-stock-alerts" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Invoice Approval</Label>
                    <p className="text-sm text-muted-foreground">Invoices must be approved before sending</p>
                  </div>
                  <Switch data-testid="switch-invoice-approval" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure email and system notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Order Notifications</Label>
                  <p className="text-sm text-muted-foreground">Email when new orders are placed</p>
                </div>
                <Switch defaultChecked data-testid="switch-order-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Payment Received Notifications</Label>
                  <p className="text-sm text-muted-foreground">Email when payments are received</p>
                </div>
                <Switch defaultChecked data-testid="switch-payment-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Overdue Invoice Alerts</Label>
                  <p className="text-sm text-muted-foreground">Daily alerts for overdue invoices</p>
                </div>
                <Switch defaultChecked data-testid="switch-overdue-alerts" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Shipment Updates</Label>
                  <p className="text-sm text-muted-foreground">Notifications when shipments are dispatched</p>
                </div>
                <Switch defaultChecked data-testid="switch-shipment-notifications" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Customize automated email templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="invoiceTemplate">Invoice Email Template</Label>
                <Textarea 
                  id="invoiceTemplate" 
                  rows={6} 
                  defaultValue="Dear {customer_name},&#10;&#10;Please find attached invoice {invoice_number} for {invoice_total}.&#10;&#10;Payment is due by {due_date}.&#10;&#10;Thank you for your business."
                  data-testid="textarea-invoice-template"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="statementTemplate">Statement Email Template</Label>
                <Textarea 
                  id="statementTemplate" 
                  rows={6} 
                  defaultValue="Dear {customer_name},&#10;&#10;Please find attached your account statement as of {statement_date}.&#10;&#10;Current balance: {balance}.&#10;&#10;Best regards."
                  data-testid="textarea-statement-template"
                />
              </div>
              <div className="flex justify-end">
                <Button data-testid="button-save-templates">
                  <Save className="w-4 h-4 mr-2" />
                  Save Templates
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules">
          <Card>
            <CardHeader>
              <CardTitle>Module Management</CardTitle>
              <CardDescription>Enable or disable system modules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Customer Management (CRM)</Label>
                  <p className="text-sm text-muted-foreground">Customer records and relationship management</p>
                </div>
                <Switch defaultChecked disabled data-testid="switch-crm-module" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Call Manager</Label>
                  <p className="text-sm text-muted-foreground">Call logging and follow-up tracking</p>
                </div>
                <Switch defaultChecked data-testid="switch-call-module" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Inventory Management</Label>
                  <p className="text-sm text-muted-foreground">Stock control and warehouse management</p>
                </div>
                <Switch defaultChecked disabled data-testid="switch-inventory-module" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>E-Commerce Integration</Label>
                  <p className="text-sm text-muted-foreground">Online order management and basket tracking</p>
                </div>
                <Switch defaultChecked data-testid="switch-ecommerce-module" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Accounting Module</Label>
                  <p className="text-sm text-muted-foreground">Invoicing and financial tracking</p>
                </div>
                <Switch defaultChecked disabled data-testid="switch-accounting-module" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
