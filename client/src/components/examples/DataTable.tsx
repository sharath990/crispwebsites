import { DataTable, StatusBadge } from '../DataTable';

export default function DataTableExample() {
  const data = [
    { id: "1", name: "John Doe", email: "john@example.com", status: "Active", balance: "£1,250" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", status: "Pending", balance: "£850" },
    { id: "3", name: "Bob Wilson", email: "bob@example.com", status: "Inactive", balance: "£0" },
  ];

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "status", label: "Status", render: (value: string) => <StatusBadge status={value} /> },
    { key: "balance", label: "Balance" },
  ];

  return (
    <div className="p-6">
      <DataTable
        columns={columns}
        data={data}
        onEdit={(row) => console.log("Edit", row)}
        onDelete={(row) => console.log("Delete", row)}
        onView={(row) => console.log("View", row)}
        searchPlaceholder="Search customers..."
      />
    </div>
  );
}
