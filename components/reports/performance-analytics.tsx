"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { TrendingUp, BarChart3 } from "lucide-react"

const performanceData = [
  { month: "Jan", portfolio: 1000000, benchmark: 980000 },
  { month: "Feb", portfolio: 1050000, benchmark: 1020000 },
  { month: "Mar", portfolio: 1120000, benchmark: 1080000 },
  { month: "Apr", portfolio: 1080000, benchmark: 1100000 },
  { month: "May", portfolio: 1150000, benchmark: 1140000 },
  { month: "Jun", portfolio: 1200000, benchmark: 1180000 },
  { month: "Jul", portfolio: 1180000, benchmark: 1160000 },
  { month: "Aug", portfolio: 1245000, benchmark: 1200000 },
  { month: "Sep", portfolio: 1300000, benchmark: 1250000 },
  { month: "Oct", portfolio: 1280000, benchmark: 1240000 },
  { month: "Nov", portfolio: 1350000, benchmark: 1290000 },
  { month: "Dec", portfolio: 1430000, benchmark: 1340000 },
]

const assetPerformance = [
  { asset: "Equity", returns: 18.5, allocation: 35 },
  { asset: "Mutual Funds", returns: 15.2, allocation: 25 },
  { asset: "Fixed Deposits", returns: 7.5, allocation: 20 },
  { asset: "Bonds", returns: 8.8, allocation: 10 },
  { asset: "Gold", returns: 12.3, allocation: 10 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-foreground">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: ₹{entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function PerformanceAnalytics() {
  return (
    <div className="space-y-6">
      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-chart-1" />
            Portfolio Performance vs Benchmark
          </CardTitle>
          <CardDescription>Track your portfolio performance against market benchmark</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="portfolio"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={3}
                  name="Your Portfolio"
                  dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="benchmark"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Market Benchmark"
                  dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Asset Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-chart-3" />
              Asset Class Returns
            </CardTitle>
            <CardDescription>Performance by investment category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={assetPerformance}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="asset" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip
                    formatter={(value: any, name: string) => [
                      name === "returns" ? `${value}%` : `${value}%`,
                      name === "returns" ? "Returns" : "Allocation",
                    ]}
                  />
                  <Bar dataKey="returns" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <span className="text-sm font-medium">Total Return</span>
                <span className="text-lg font-bold text-green-600">+43.0%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <span className="text-sm font-medium">Annualized Return</span>
                <span className="text-lg font-bold text-green-600">+12.8%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <span className="text-sm font-medium">Volatility</span>
                <span className="text-lg font-bold text-orange-600">8.5%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <span className="text-sm font-medium">Sharpe Ratio</span>
                <span className="text-lg font-bold text-blue-600">1.51</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <span className="text-sm font-medium">Max Drawdown</span>
                <span className="text-lg font-bold text-red-600">-5.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
