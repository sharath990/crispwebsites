import { useState } from "react";
import { DataTable, StatusBadge } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Phone, PhoneIncoming, PhoneOutgoing } from "lucide-react";
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
const mockCalls = [
  { id: "1", customer: "Acme Corp", type: "Outgoing", date: "2024-11-06", duration: "12 min", notes: "Discussed new order requirements", followUp: "2024-11-10", status: "Completed", user: "Sarah Jones", lastOrderDate: "2024-10-25", numberOfOrders: 15, lastContacted: "2024-11-06" },
  { id: "2", customer: "TechStart Ltd", type: "Incoming", date: "2024-11-06", duration: "8 min", notes: "Product inquiry", followUp: "2024-11-08", status: "Follow-up Required", user: "Mike Brown", lastOrderDate: "2024-11-01", numberOfOrders: 8, lastContacted: "2024-11-06" },
  { id: "3", customer: "Global Supplies", type: "Outgoing", date: "2024-11-05", duration: "15 min", notes: "Invoice payment discussion", followUp: "", status: "Completed", user: "Sarah Jones", lastOrderDate: "2024-10-30", numberOfOrders: 22, lastContacted: "2024-11-05" },
  { id: "4", customer: "Metro Industries", type: "Incoming", date: "2024-11-05", duration: "20 min", notes: "Technical support request", followUp: "2024-11-07", status: "Follow-up Required", user: "Tom Davis", lastOrderDate: "2024-10-20", numberOfOrders: 5, lastContacted: "2024-11-05" },
];

export default function CallManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState<any>(null);

  const columns = [
    { key: "customer", label: "Customer" },
    { 
      key: "type", 
      label: "Type", 
      render: (value: string) => (
        <div className="flex items-center gap-2">
          {value === "Incoming" ? <PhoneIncoming className="w-4 h-4 text-green-600" /> : <PhoneOutgoing className="w-4 h-4 text-blue-600" />}
          {value}
        </div>
      )
    },
    { key: "date", label: "Date" },
    { key: "duration", label: "Duration" },
    { key: "user", label: "Handled By" },
    { key: "lastOrderDate", label: "Last Order" },
    { key: "numberOfOrders", label: "Total Orders" },
    { key: "status", label: "Status", render: (value: string) => <StatusBadge status={value} /> },
  ];

  const handleView = (call: any) => {
    setSelectedCall(call);
    setIsDialogOpen(true);
    console.log("View call:", call);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Call Manager</h1>
          <p className="text-muted-foreground mt-1">Track and manage customer communications</p>
        </div>
        <Button onClick={() => { setSelectedCall(null); setIsDialogOpen(true); }} data-testid="button-log-call">
          <Phone className="w-4 h-4 mr-2" />
          Log New Call
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Phone className="w-8 h-8 mx-auto text-primary mb-2" />
              <div className="text-2xl font-semibold">{mockCalls.length}</div>
              <p className="text-sm text-muted-foreground">Total Calls Today</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <PhoneIncoming className="w-8 h-8 mx-auto text-green-600 mb-2" />
              <div className="text-2xl font-semibold">{mockCalls.filter(c => c.type === "Incoming").length}</div>
              <p className="text-sm text-muted-foreground">Incoming Calls</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <PhoneOutgoing className="w-8 h-8 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl font-semibold">{mockCalls.filter(c => c.type === "Outgoing").length}</div>
              <p className="text-sm text-muted-foreground">Outgoing Calls</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={mockCalls}
            onView={handleView}
            searchPlaceholder="Search calls..."
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedCall ? "Call Details" : "Log New Call"}</DialogTitle>
            <DialogDescription>
              {selectedCall ? "View call information and notes" : "Record a new customer call"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Customer *</Label>
              <Select defaultValue={selectedCall?.customer}>
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
              <Label htmlFor="type">Call Type *</Label>
              <Select defaultValue={selectedCall?.type || "Outgoing"}>
                <SelectTrigger id="type" data-testid="select-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Incoming">Incoming</SelectItem>
                  <SelectItem value="Outgoing">Outgoing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input id="date" type="date" defaultValue={selectedCall?.date || "2024-11-06"} data-testid="input-date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input id="duration" type="number" defaultValue={selectedCall?.duration?.replace(" min", "")} data-testid="input-duration" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="followUp">Follow-up Date</Label>
              <Input id="followUp" type="date" defaultValue={selectedCall?.followUp} data-testid="input-followup" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={selectedCall?.status || "Completed"}>
                <SelectTrigger id="status" data-testid="select-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Follow-up Required">Follow-up Required</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="notes">Call Notes *</Label>
              <Textarea id="notes" rows={4} defaultValue={selectedCall?.notes} data-testid="input-notes" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="button-cancel">
              Close
            </Button>
            {!selectedCall && (
              <Button onClick={() => { console.log("Save call"); setIsDialogOpen(false); }} data-testid="button-save">
                Save Call
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
