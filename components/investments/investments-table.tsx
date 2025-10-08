"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Eye, TrendingUp, TrendingDown } from "lucide-react"
import { EditInvestmentDialog } from "./edit-investment-dialog"

interface Investment {
  id: string
  type: string
  name: string
  amount: number
  currentValue: number
  purchaseDate: string
  maturityDate?: string
  interestRate?: number
  status: "active" | "matured" | "sold"
  returns: number
  returnsPercentage: number
}

const mockInvestments: Investment[] = [
  {
    id: "1",
    type: "equity",
    name: "Reliance Industries",
    amount: 150000,
    currentValue: 172500,
    purchaseDate: "2023-01-15",
    status: "active",
    returns: 22500,
    returnsPercentage: 15.0,
  },
  {
    id: "2",
    type: "fixed_deposit",
    name: "HDFC Bank FD",
    amount: 300000,
    currentValue: 322500,
    purchaseDate: "2023-02-01",
    maturityDate: "2024-02-01",
    interestRate: 7.5,
    status: "active",
    returns: 22500,
    returnsPercentage: 7.5,
  },
  {
    id: "3",
    type: "mutual_fund",
    name: "SBI Bluechip Fund",
    amount: 200000,
    currentValue: 237000,
    purchaseDate: "2023-03-10",
    status: "active",
    returns: 37000,
    returnsPercentage: 18.5,
  },
  {
    id: "4",
    type: "bond",
    name: "Government Bond 2029",
    amount: 100000,
    currentValue: 106800,
    purchaseDate: "2023-04-15",
    maturityDate: "2029-04-15",
    interestRate: 6.8,
    status: "active",
    returns: 6800,
    returnsPercentage: 6.8,
  },
  {
    id: "5",
    type: "gold",
    name: "Gold ETF",
    amount: 95000,
    currentValue: 108500,
    purchaseDate: "2023-05-20",
    status: "active",
    returns: 13500,
    returnsPercentage: 14.2,
  },
]

interface InvestmentsTableProps {
  searchTerm: string
  filterType: string
}

export function InvestmentsTable({ searchTerm, filterType }: InvestmentsTableProps) {
  const [investments, setInvestments] = useState<Investment[]>(mockInvestments)
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null)

  const filteredInvestments = investments.filter((investment) => {
    const matchesSearch = investment.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || investment.type === filterType
    return matchesSearch && matchesFilter
  })

  const handleDelete = (investmentId: string) => {
    setInvestments(investments.filter((investment) => investment.id !== investmentId))
  }

  const handleEdit = (investment: Investment) => {
    setEditingInvestment(investment)
  }

  const handleUpdate = (updatedInvestment: Investment) => {
    setInvestments(
      investments.map((investment) => (investment.id === updatedInvestment.id ? updatedInvestment : investment)),
    )
    setEditingInvestment(null)
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      equity: "bg-blue-100 text-blue-800",
      fixed_deposit: "bg-green-100 text-green-800",
      mutual_fund: "bg-purple-100 text-purple-800",
      bond: "bg-orange-100 text-orange-800",
      gold: "bg-yellow-100 text-yellow-800",
      ppf: "bg-indigo-100 text-indigo-800",
      nsc: "bg-pink-100 text-pink-800",
      nps: "bg-teal-100 text-teal-800",
    }
    return colors[type] || "bg-gray-100 text-gray-800"
  }

  const formatType = (type: string) => {
    const types: Record<string, string> = {
      equity: "Equity",
      fixed_deposit: "Fixed Deposit",
      mutual_fund: "Mutual Fund",
      bond: "Bond",
      gold: "Gold",
      ppf: "PPF",
      nsc: "NSC",
      nps: "NPS",
    }
    return types[type] || type
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Investment</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Investment Amount</TableHead>
              <TableHead>Current Value</TableHead>
              <TableHead>Returns</TableHead>
              <TableHead>Purchase Date</TableHead>
              <TableHead>Maturity Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvestments.map((investment) => (
              <TableRow key={investment.id}>
                <TableCell className="font-medium">{investment.name}</TableCell>
                <TableCell>
                  <Badge className={getTypeColor(investment.type)}>{formatType(investment.type)}</Badge>
                </TableCell>
                <TableCell>₹{investment.amount.toLocaleString()}</TableCell>
                <TableCell>₹{investment.currentValue.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {investment.returnsPercentage >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span
                      className={`font-medium ${investment.returnsPercentage >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {investment.returnsPercentage >= 0 ? "+" : ""}
                      {investment.returnsPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">₹{investment.returns.toLocaleString()}</div>
                </TableCell>
                <TableCell>{investment.purchaseDate}</TableCell>
                <TableCell>{investment.maturityDate || "-"}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      investment.status === "active"
                        ? "default"
                        : investment.status === "matured"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {investment.status}
                  </Badge>
                </TableCell>
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
                      <DropdownMenuItem onClick={() => handleEdit(investment)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(investment.id)} className="text-destructive">
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

      {editingInvestment && (
        <EditInvestmentDialog
          investment={editingInvestment}
          open={!!editingInvestment}
          onOpenChange={(open) => !open && setEditingInvestment(null)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  )
}
