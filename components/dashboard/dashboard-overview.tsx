"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, PieChart, Calendar } from "lucide-react"

const stats = [
  {
    title: "Total Portfolio Value",
    value: "₹12,45,000",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: DollarSign,
    description: "vs last month",
  },
  {
    title: "Total Returns",
    value: "₹1,85,000",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: TrendingUp,
    description: "overall returns",
  },
  {
    title: "Active Investments",
    value: "24",
    change: "+3",
    changeType: "positive" as const,
    icon: PieChart,
    description: "new this month",
  },
  {
    title: "Upcoming Maturities",
    value: "5",
    change: "Next 30 days",
    changeType: "neutral" as const,
    icon: Calendar,
    description: "requiring attention",
  },
]

export function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="relative overflow-hidden">
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
