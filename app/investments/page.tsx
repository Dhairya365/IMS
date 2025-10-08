"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { InvestmentsTable } from "@/components/investments/investments-table"
import { AddInvestmentDialog } from "@/components/investments/add-investment-dialog"
import { PortfolioSummary } from "@/components/investments/portfolio-summary"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Search, Plus, Filter } from "lucide-react"
import { useState } from "react"

export default function InvestmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Investment Portfolio</h1>
            <p className="text-muted-foreground mt-2">Track and manage all your investments</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Investment
          </Button>
        </div>

        {/* Portfolio Summary */}
        <PortfolioSummary />

        {/* Investments Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-chart-1" />
              Investment Holdings
            </CardTitle>
            <CardDescription>View and manage all your investment positions</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search and Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search investments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="equity">Equity</SelectItem>
                  <SelectItem value="fixed_deposit">Fixed Deposit</SelectItem>
                  <SelectItem value="mutual_fund">Mutual Fund</SelectItem>
                  <SelectItem value="bond">Bonds</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="ppf">PPF</SelectItem>
                  <SelectItem value="nsc">NSC</SelectItem>
                  <SelectItem value="nps">NPS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <InvestmentsTable searchTerm={searchTerm} filterType={filterType} />
          </CardContent>
        </Card>

        <AddInvestmentDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
      </div>
    </DashboardLayout>
  )
}
