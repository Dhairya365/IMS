"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

const maturities = [
  {
    id: 1,
    asset: "HDFC Fixed Deposit",
    amount: 200000,
    maturityDate: "2024-02-15",
    daysLeft: 15,
    interestRate: 7.5,
  },
  {
    id: 2,
    asset: "SBI NSC Certificate",
    amount: 50000,
    maturityDate: "2024-02-28",
    daysLeft: 28,
    interestRate: 6.8,
  },
  {
    id: 3,
    asset: "ICICI Recurring Deposit",
    amount: 120000,
    maturityDate: "2024-03-10",
    daysLeft: 38,
    interestRate: 7.0,
  },
]

export function UpcomingMaturities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-chart-4" />
          Upcoming Maturities
        </CardTitle>
        <CardDescription>Investments maturing in the next 60 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {maturities.map((maturity) => (
            <div key={maturity.id} className="p-4 rounded-lg border border-border">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-foreground">{maturity.asset}</p>
                  <p className="text-sm text-muted-foreground">₹{maturity.amount.toLocaleString()}</p>
                </div>
                <Badge variant={maturity.daysLeft <= 30 ? "destructive" : "secondary"} className="text-xs">
                  {maturity.daysLeft} days
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  <span>Maturity: {maturity.maturityDate}</span>
                  <span className="ml-3">Rate: {maturity.interestRate}%</span>
                </div>
                {maturity.daysLeft <= 30 && (
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    Renew
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
