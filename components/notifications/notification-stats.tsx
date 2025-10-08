"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Clock, AlertTriangle, CheckCircle } from "lucide-react"

interface NotificationStatsProps {
  unreadCount: number
}

export function NotificationStats({ unreadCount }: NotificationStatsProps) {
  const stats = [
    {
      title: "Unread Notifications",
      value: unreadCount.toString(),
      change: "Requires attention",
      changeType: unreadCount > 0 ? ("warning" as const) : ("neutral" as const),
      icon: Bell,
      description: "new notifications",
    },
    {
      title: "Upcoming Maturities",
      value: "3",
      change: "Next 30 days",
      changeType: "warning" as const,
      icon: Clock,
      description: "investments maturing",
    },
    {
      title: "Critical Alerts",
      value: "1",
      change: "Immediate action",
      changeType: "error" as const,
      icon: AlertTriangle,
      description: "high priority",
    },
    {
      title: "Completed Actions",
      value: "12",
      change: "This month",
      changeType: "positive" as const,
      icon: CheckCircle,
      description: "tasks completed",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
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
                    : stat.changeType === "warning"
                      ? "text-orange-600"
                      : stat.changeType === "error"
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
