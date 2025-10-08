"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { EditClientDialog } from "./edit-client-dialog"

interface Client {
  id: string
  name: string
  email: string
  phone: string
  address: string
  totalInvestment: number
  status: "active" | "inactive"
  joinDate: string
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    address: "Mumbai, Maharashtra",
    totalInvestment: 850000,
    status: "active",
    joinDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 87654 32109",
    address: "Delhi, NCR",
    totalInvestment: 1200000,
    status: "active",
    joinDate: "2023-03-22",
  },
  {
    id: "3",
    name: "Amit Patel",
    email: "amit.patel@email.com",
    phone: "+91 76543 21098",
    address: "Ahmedabad, Gujarat",
    totalInvestment: 650000,
    status: "inactive",
    joinDate: "2022-11-08",
  },
  {
    id: "4",
    name: "Sunita Reddy",
    email: "sunita.reddy@email.com",
    phone: "+91 65432 10987",
    address: "Hyderabad, Telangana",
    totalInvestment: 950000,
    status: "active",
    joinDate: "2023-05-10",
  },
  {
    id: "5",
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 54321 09876",
    address: "Jaipur, Rajasthan",
    totalInvestment: 750000,
    status: "active",
    joinDate: "2023-02-18",
  },
]

interface ClientsTableProps {
  searchTerm: string
}

export function ClientsTable({ searchTerm }: ClientsTableProps) {
  const [clients, setClients] = useState<Client[]>(mockClients)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm),
  )

  const handleDelete = (clientId: string) => {
    setClients(clients.filter((client) => client.id !== clientId))
  }

  const handleEdit = (client: Client) => {
    setEditingClient(client)
  }

  const handleUpdate = (updatedClient: Client) => {
    setClients(clients.map((client) => (client.id === updatedClient.id ? updatedClient : client)))
    setEditingClient(null)
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Investment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.address}</TableCell>
                <TableCell>₹{client.totalInvestment.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={client.status === "active" ? "default" : "secondary"}>{client.status}</Badge>
                </TableCell>
                <TableCell>{client.joinDate}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(client)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(client.id)} className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingClient && (
        <EditClientDialog
          client={editingClient}
          open={!!editingClient}
          onOpenChange={(open) => !open && setEditingClient(null)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  )
}
