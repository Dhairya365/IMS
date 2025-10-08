"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, Filter, CalendarIcon, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { format } from "date-fns"

interface Transaction {
  id: string
  date: string
  type: "buy" | "sell" | "dividend" | "interest"
  investment: string
  amount: number
  quantity?: number
  price?: number
  status: "completed" | "pending" | "failed"
  category: string
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-01-15",
    type: "buy",
    investment: "HDFC Equity Fund",
    amount: 25000,
    quantity: 500,
    price: 50,
    status: "completed",
    category: "mutual_fund",
  },
  {
    id: "2",
    date: "2024-01-14",
    type: "sell",
    investment: "Reliance Industries",
    amount: 15000,
    quantity: 10,
    price: 1500,
    status: "completed",
    category: "equity",
  },
  {
    id: "3",
    date: "2024-01-12",
    type: "buy",
    investment: "SBI Fixed Deposit",
    amount: 100000,
    status: "completed",
    category: "fixed_deposit",
  },
  {
    id: "4",
    date: "2024-01-10",
    type: "dividend",
    investment: "TCS Limited",
    amount: 2500,
    status: "completed",
    category: "equity",
  },
  {
    id: "5",
    date: "2024-01-08",
    type: "interest",
    investment: "HDFC Bank FD",
    amount: 1875,
    status: "completed",
    category: "fixed_deposit",
  },
  {
    id: "6",
    date: "2024-01-05",
    type: "buy",
    investment: "Gold ETF",
    amount: 30000,
    quantity: 60,
    price: 500,
    status: "pending",
    category: "gold",
  },
]

export function TransactionHistory() {
  const [transactions] = useState<Transaction[]>(mockTransactions)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.investment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || transaction.type === filterType
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus
    const matchesDateFrom = !dateFrom || new Date(transaction.date) >= dateFrom
    const matchesDateTo = !dateTo || new Date(transaction.date) <= dateTo

    return matchesSearch && matchesType && matchesStatus && matchesDateFrom && matchesDateTo
  })

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "buy":
        return <ArrowDownRight className="h-4 w-4 text-green-600" />
      case "sell":
        return <ArrowUpRight className="h-4 w-4 text-red-600" />
      case "dividend":
      case "interest":
        return <ArrowDownRight className="h-4 w-4 text-blue-600" />
      default:
        return <ArrowDownRight className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "pending":
        return "secondary"
      case "failed":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>Complete record of all your investment transactions</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[150px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="buy">Buy</SelectItem>
              <SelectItem value="sell">Sell</SelectItem>
              <SelectItem value="dividend">Dividend</SelectItem>
              <SelectItem value="interest">Interest</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[150px] justify-start text-left font-normal bg-transparent">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFrom ? format(dateFrom, "PPP") : "From Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[150px] justify-start text-left font-normal bg-transparent">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateTo ? format(dateTo, "PPP") : "To Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
            </PopoverContent>
          </Popover>

          {(dateFrom || dateTo) && (
            <Button
              variant="ghost"
              onClick={() => {
                setDateFrom(undefined)
                setDateTo(undefined)
              }}
              className="px-2"
            >
              Clear Dates
            </Button>
          )}
        </div>

        {/* Transactions Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Investment</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{format(new Date(transaction.date), "MMM dd, yyyy")}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTransactionIcon(transaction.type)}
                      <span className="capitalize">{transaction.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{transaction.investment}</TableCell>
                  <TableCell>{transaction.quantity || "-"}</TableCell>
                  <TableCell>{transaction.price ? `₹${transaction.price}` : "-"}</TableCell>
                  <TableCell className="font-medium">₹{transaction.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(transaction.status) as any} className="capitalize">
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No transactions found matching your filters.</div>
        )}
      </CardContent>
    </Card>
  )
}
