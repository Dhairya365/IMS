"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Bell, Mail, Smartphone, Calendar, TrendingUp, AlertTriangle } from "lucide-react"

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    maturityReminders: true,
    performanceAlerts: true,
    transactionAlerts: true,
    marketAlerts: false,
    portfolioRebalancing: true,
    maturityReminderDays: "30",
    performanceThreshold: "5",
    emailFrequency: "immediate",
  })

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveSettings = () => {
    console.log("Saving notification settings:", settings)
    // In a real app, this would save to the backend
  }

  return (
    <div className="space-y-6">
      {/* Notification Channels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Channels
          </CardTitle>
          <CardDescription>Choose how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="email-notifications" className="text-base font-medium">
                  Email Notifications
                </Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
            </div>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="push-notifications" className="text-base font-medium">
                  Push Notifications
                </Label>
                <p className="text-sm text-muted-foreground">Browser and app push notifications</p>
              </div>
            </div>
            <Switch
              id="push-notifications"
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="sms-notifications" className="text-base font-medium">
                  SMS Notifications
                </Label>
                <p className="text-sm text-muted-foreground">Critical alerts via SMS</p>
              </div>
            </div>
            <Switch
              id="sms-notifications"
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
            />
          </div>

          {settings.emailNotifications && (
            <div className="pl-8 space-y-2">
              <Label htmlFor="email-frequency">Email Frequency</Label>
              <Select
                value={settings.emailFrequency}
                onValueChange={(value) => handleSettingChange("emailFrequency", value)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                  <SelectItem value="weekly">Weekly Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Types */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Types</CardTitle>
          <CardDescription>Configure which types of notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <Label htmlFor="maturity-reminders" className="text-base font-medium">
                  Maturity Reminders
                </Label>
                <p className="text-sm text-muted-foreground">Get notified before investments mature</p>
              </div>
            </div>
            <Switch
              id="maturity-reminders"
              checked={settings.maturityReminders}
              onCheckedChange={(checked) => handleSettingChange("maturityReminders", checked)}
            />
          </div>

          {settings.maturityReminders && (
            <div className="pl-8 space-y-2">
              <Label htmlFor="maturity-days">Remind me (days before maturity)</Label>
              <Select
                value={settings.maturityReminderDays}
                onValueChange={(value) => handleSettingChange("maturityReminderDays", value)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="15">15 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <Label htmlFor="performance-alerts" className="text-base font-medium">
                  Performance Alerts
                </Label>
                <p className="text-sm text-muted-foreground">Notifications for significant performance changes</p>
              </div>
            </div>
            <Switch
              id="performance-alerts"
              checked={settings.performanceAlerts}
              onCheckedChange={(checked) => handleSettingChange("performanceAlerts", checked)}
            />
          </div>

          {settings.performanceAlerts && (
            <div className="pl-8 space-y-2">
              <Label htmlFor="performance-threshold">Alert threshold (% change)</Label>
              <Select
                value={settings.performanceThreshold}
                onValueChange={(value) => handleSettingChange("performanceThreshold", value)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2%</SelectItem>
                  <SelectItem value="5">5%</SelectItem>
                  <SelectItem value="10">10%</SelectItem>
                  <SelectItem value="15">15%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-blue-600" />
              <div>
                <Label htmlFor="transaction-alerts" className="text-base font-medium">
                  Transaction Alerts
                </Label>
                <p className="text-sm text-muted-foreground">Confirmations for buy/sell transactions</p>
              </div>
            </div>
            <Switch
              id="transaction-alerts"
              checked={settings.transactionAlerts}
              onCheckedChange={(checked) => handleSettingChange("transactionAlerts", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <div>
                <Label htmlFor="market-alerts" className="text-base font-medium">
                  Market Alerts
                </Label>
                <p className="text-sm text-muted-foreground">Important market news and updates</p>
              </div>
            </div>
            <Switch
              id="market-alerts"
              checked={settings.marketAlerts}
              onCheckedChange={(checked) => handleSettingChange("marketAlerts", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <Label htmlFor="portfolio-rebalancing" className="text-base font-medium">
                  Portfolio Rebalancing
                </Label>
                <p className="text-sm text-muted-foreground">Alerts when portfolio needs rebalancing</p>
              </div>
            </div>
            <Switch
              id="portfolio-rebalancing"
              checked={settings.portfolioRebalancing}
              onCheckedChange={(checked) => handleSettingChange("portfolioRebalancing", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="px-8">
          Save Settings
        </Button>
      </div>
    </div>
  )
}
