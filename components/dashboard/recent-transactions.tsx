"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react"

const transactions = [
  {
    id: 1,
    type: "buy",
    asset: "HDFC Equity Fund",
    amount: 25000,
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: 2,
    type: "sell",
    asset: "Reliance Industries",
    amount: 15000,
    date: "2024-01-14",
    status: "completed",
  },
  {
    id: 3,
    type: "buy",
    asset: "SBI Fixed Deposit",
    amount: 100000,
    date: "2024-01-12",
    status: "pending",
  },
  {
    id: 4,
    type: "buy",
    asset: "Gold ETF",
    amount: 30000,
    date: "2024-01-10",
    status: "completed",
  },
]

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-chart-2" />
          Recent Transactions
        </CardTitle>
        <CardDescription>Your latest investment activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    transaction.type === "buy" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  }`}
                >
                  {transaction.type === "buy" ? (
                    <ArrowDownRight className="h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">{transaction.asset}</p>
                  <p className="text-sm text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">₹{transaction.amount.toLocaleString()}</p>
                <Badge variant={transaction.status === "completed" ? "default" : "secondary"} className="text-xs">
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
