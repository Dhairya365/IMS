"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, Calendar, Target } from "lucide-react"

const reportStats = [
  {
    title: "Total Transactions",
    value: "1,247",
    change: "+23 this month",
    changeType: "positive" as const,
    icon: DollarSign,
    description: "across all investments",
  },
  {
    title: "Average Return",
    value: "12.8%",
    change: "+2.1% vs benchmark",
    changeType: "positive" as const,
    icon: TrendingUp,
    description: "annualized return",
  },
  {
    title: "Investment Period",
    value: "18 months",
    change: "Average holding",
    changeType: "neutral" as const,
    icon: Calendar,
    description: "across portfolio",
  },
  {
    title: "Goal Achievement",
    value: "78%",
    change: "On track",
    changeType: "positive" as const,
    icon: Target,
    description: "financial goals met",
  },
]

export function ReportsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {reportStats.map((stat) => (
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
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : stat.changeType === "negative"
                      ? "text-red-600"
                      : "text-muted-foreground"
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
  )
}
