"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Clock, AlertTriangle, TrendingUp, Calendar, DollarSign, Filter } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Notification {
  id: string
  type: "maturity" | "alert" | "performance" | "transaction" | "reminder"
  title: string
  message: string
  timestamp: string
  isRead: boolean
  priority: "low" | "medium" | "high" | "critical"
  actionRequired: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "maturity",
    title: "Fixed Deposit Maturing Soon",
    message: "Your HDFC Bank FD of ₹2,00,000 will mature on February 15, 2024. Consider renewal options.",
    timestamp: "2024-01-30T10:00:00Z",
    isRead: false,
    priority: "high",
    actionRequired: true,
  },
  {
    id: "2",
    type: "alert",
    title: "Portfolio Rebalancing Required",
    message: "Your equity allocation has exceeded 40%. Consider rebalancing your portfolio.",
    timestamp: "2024-01-29T15:30:00Z",
    isRead: false,
    priority: "medium",
    actionRequired: true,
  },
  {
    id: "3",
    type: "performance",
    title: "Mutual Fund Performance Alert",
    message: "SBI Bluechip Fund has outperformed benchmark by 5% this quarter.",
    timestamp: "2024-01-28T09:15:00Z",
    isRead: false,
    priority: "low",
    actionRequired: false,
  },
  {
    id: "4",
    type: "transaction",
    title: "Transaction Completed",
    message: "Your purchase of Gold ETF worth ₹30,000 has been successfully completed.",
    timestamp: "2024-01-27T14:20:00Z",
    isRead: true,
    priority: "low",
    actionRequired: false,
  },
  {
    id: "5",
    type: "reminder",
    title: "SIP Due Tomorrow",
    message: "Your monthly SIP of ₹10,000 in HDFC Equity Fund is due tomorrow.",
    timestamp: "2024-01-26T08:00:00Z",
    isRead: false,
    priority: "medium",
    actionRequired: true,
  },
  {
    id: "6",
    type: "alert",
    title: "Market Volatility Alert",
    message: "High volatility detected in your equity holdings. Monitor closely.",
    timestamp: "2024-01-25T11:45:00Z",
    isRead: true,
    priority: "critical",
    actionRequired: false,
  },
]

interface NotificationsListProps {
  onUnreadCountChange: (count: number) => void
}

export function NotificationsList({ onUnreadCountChange }: NotificationsListProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const unreadCount = notifications.filter((n) => !n.isRead).length
    onUnreadCountChange(unreadCount)
  }, [notifications, onUnreadCountChange])

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true
    if (filter === "unread") return !notification.isRead
    if (filter === "action") return notification.actionRequired
    return notification.type === filter
  })

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "maturity":
        return <Calendar className="h-5 w-5 text-orange-600" />
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "performance":
        return <TrendingUp className="h-5 w-5 text-green-600" />
      case "transaction":
        return <DollarSign className="h-5 w-5 text-blue-600" />
      case "reminder":
        return <Clock className="h-5 w-5 text-purple-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "destructive"
      case "high":
        return "default"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>All Notifications</CardTitle>
            <CardDescription>Stay updated with your investment activities</CardDescription>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Notifications</SelectItem>
              <SelectItem value="unread">Unread Only</SelectItem>
              <SelectItem value="action">Action Required</SelectItem>
              <SelectItem value="maturity">Maturities</SelectItem>
              <SelectItem value="alert">Alerts</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="transaction">Transactions</SelectItem>
              <SelectItem value="reminder">Reminders</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-colors ${
                notification.isRead ? "bg-background" : "bg-muted/50 border-primary/20"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className={`font-medium ${!notification.isRead ? "text-foreground" : "text-muted-foreground"}`}>
                      {notification.title}
                    </h4>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant={getPriorityColor(notification.priority) as any} className="text-xs">
                        {notification.priority}
                      </Badge>
                      {notification.actionRequired && (
                        <Badge variant="outline" className="text-xs">
                          Action Required
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                    </span>
                    <div className="flex items-center gap-2">
                      {notification.actionRequired && (
                        <Button size="sm" variant="outline" className="text-xs bg-transparent">
                          Take Action
                        </Button>
                      )}
                      {!notification.isRead && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-xs"
                        >
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No notifications found matching your filter criteria.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
