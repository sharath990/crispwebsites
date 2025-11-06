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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//todo: remove mock functionality
const mockUsers = [
  { id: "1", fullName: "Admin User", username: "admin", email: "admin@crisp.com", role: "Administrator", lastLogin: "2024-11-06 09:15", status: "Active" },
  { id: "2", fullName: "Sarah Jones", username: "sjones", email: "sarah@crisp.com", role: "Sales Manager", lastLogin: "2024-11-06 08:30", status: "Active" },
  { id: "3", fullName: "Mike Brown", username: "mbrown", email: "mike@crisp.com", role: "Warehouse Manager", lastLogin: "2024-11-05 16:45", status: "Active" },
  { id: "4", fullName: "Tom Davis", username: "tdavis", email: "tom@crisp.com", role: "Sales Representative", lastLogin: "2024-11-04 14:20", status: "Active" },
  { id: "5", fullName: "Lucy Wilson", username: "lwilson", email: "lucy@crisp.com", role: "Accountant", lastLogin: "2024-10-28 11:30", status: "Inactive" },
];

export default function UserAdmin() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const columns = [
    { key: "fullName", label: "Full Name" },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "lastLogin", label: "Last Login" },
    { key: "status", label: "Status", render: (value: string) => <StatusBadge status={value} /> },
  ];

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
    console.log("Edit user:", user);
  };

  const handleDelete = (user: any) => {
    console.log("Delete user:", user);
  };

  const handleView = (user: any) => {
    console.log("View user:", user);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">User Administration</h1>
          <p className="text-muted-foreground mt-1">Manage system users and permissions</p>
        </div>
        <Button onClick={() => { setSelectedUser(null); setIsDialogOpen(true); }} data-testid="button-add-user">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">{mockUsers.length}</div>
            <p className="text-sm text-muted-foreground mt-1">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">{mockUsers.filter(u => u.status === "Active").length}</div>
            <p className="text-sm text-muted-foreground mt-1">Active Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-semibold">{mockUsers.filter(u => u.role === "Administrator").length}</div>
            <p className="text-sm text-muted-foreground mt-1">Administrators</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={mockUsers}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            searchPlaceholder="Search users..."
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedUser ? "Edit User" : "Add New User"}</DialogTitle>
            <DialogDescription>
              {selectedUser ? "Update user information and permissions" : "Create a new system user"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input id="fullName" defaultValue={selectedUser?.fullName} data-testid="input-full-name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username *</Label>
              <Input id="username" defaultValue={selectedUser?.username} data-testid="input-username" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" defaultValue={selectedUser?.email} data-testid="input-email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Select defaultValue={selectedUser?.role || "Sales Representative"}>
                <SelectTrigger id="role" data-testid="select-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Administrator">Administrator</SelectItem>
                  <SelectItem value="Sales Manager">Sales Manager</SelectItem>
                  <SelectItem value="Sales Representative">Sales Representative</SelectItem>
                  <SelectItem value="Warehouse Manager">Warehouse Manager</SelectItem>
                  <SelectItem value="Accountant">Accountant</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {!selectedUser && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input id="password" type="password" data-testid="input-password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input id="confirmPassword" type="password" data-testid="input-confirm-password" />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={selectedUser?.status || "Active"}>
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
            <Button onClick={() => { console.log("Save user"); setIsDialogOpen(false); }} data-testid="button-save">
              {selectedUser ? "Update" : "Create"} User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
