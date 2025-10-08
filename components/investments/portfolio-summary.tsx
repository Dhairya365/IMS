"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, PieChart, Target } from "lucide-react"

const portfolioStats = [
  {
    title: "Total Investment",
    value: "₹12,45,000",
    change: "+₹85,000",
    changeType: "positive" as const,
    icon: DollarSign,
    description: "from last month",
  },
  {
    title: "Current Value",
    value: "₹14,30,000",
    change: "+14.9%",
    changeType: "positive" as const,
    icon: TrendingUp,
    description: "total returns",
  },
  {
    title: "Unrealized P&L",
    value: "₹1,85,000",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Target,
    description: "unrealized gains",
  },
  {
    title: "Active Holdings",
    value: "24",
    change: "+3",
    changeType: "positive" as const,
    icon: PieChart,
    description: "investment positions",
  },
]

const topPerformers = [
  { name: "HDFC Equity Fund", return: "+18.5%", value: "₹2,50,000" },
  { name: "Reliance Industries", return: "+15.2%", value: "₹1,80,000" },
  { name: "SBI Fixed Deposit", return: "+7.5%", value: "₹3,00,000" },
]

export function PortfolioSummary() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Stats Cards */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {portfolioStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                <span
                  className={`text-xs font-medium ${
                    stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm text-foreground">{performer.name}</p>
                  <p className="text-xs text-muted-foreground">{performer.value}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-green-600">{performer.return}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
