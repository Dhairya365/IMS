"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { PieChartIcon } from "lucide-react"

const portfolioData = [
  { name: "Equity", value: 450000, color: "hsl(var(--chart-1))" },
  { name: "Fixed Deposits", value: 300000, color: "hsl(var(--chart-2))" },
  { name: "Mutual Funds", value: 250000, color: "hsl(var(--chart-3))" },
  { name: "Bonds", value: 150000, color: "hsl(var(--chart-4))" },
  { name: "Gold", value: 95000, color: "hsl(var(--chart-5))" },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-foreground">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          ₹{data.value.toLocaleString()} ({((data.value / 1245000) * 100).toFixed(1)}%)
        </p>
      </div>
    )
  }
  return null
}

export function PortfolioChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChartIcon className="h-5 w-5 text-chart-1" />
          Portfolio Distribution
        </CardTitle>
        <CardDescription>Asset allocation across different investment types</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={portfolioData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {portfolioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value, entry: any) => <span className="text-sm text-foreground">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
