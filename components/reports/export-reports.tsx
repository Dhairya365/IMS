"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Download, FileText, FileSpreadsheet, CalendarIcon } from "lucide-react"
import { format } from "date-fns"

export function ExportReports() {
  const [reportType, setReportType] = useState("portfolio")
  const [exportFormat, setExportFormat] = useState("pdf")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [selectedSections, setSelectedSections] = useState({
    summary: true,
    transactions: true,
    performance: true,
    holdings: true,
    analytics: false,
  })
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    try {
      // Simulate export process
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Exporting report:", {
        type: reportType,
        format: exportFormat,
        dateFrom,
        dateTo,
        sections: selectedSections,
      })
      // In a real app, this would trigger the actual export
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleSectionChange = (section: string, checked: boolean) => {
    setSelectedSections((prev) => ({ ...prev, [section]: checked }))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Export Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Export Configuration</CardTitle>
          <CardDescription>Configure your report export settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Report Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Report Type</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="portfolio">Portfolio Summary</SelectItem>
                <SelectItem value="transactions">Transaction History</SelectItem>
                <SelectItem value="performance">Performance Report</SelectItem>
                <SelectItem value="tax">Tax Report</SelectItem>
                <SelectItem value="comprehensive">Comprehensive Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Export Format */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Export Format</label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                <SelectItem value="csv">CSV File</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="space-y-4">
            <label className="text-sm font-medium">Date Range</label>
            <div className="flex gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex-1 justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : "From Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex-1 justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : "To Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Report Sections */}
          <div className="space-y-4">
            <label className="text-sm font-medium">Include Sections</label>
            <div className="space-y-3">
              {Object.entries(selectedSections).map(([section, checked]) => (
                <div key={section} className="flex items-center space-x-2">
                  <Checkbox
                    id={section}
                    checked={checked}
                    onCheckedChange={(checked) => handleSectionChange(section, checked as boolean)}
                  />
                  <label htmlFor={section} className="text-sm capitalize cursor-pointer">
                    {section.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Export Button */}
          <Button onClick={handleExport} disabled={isExporting} className="w-full">
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Quick Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Export</CardTitle>
          <CardDescription>Pre-configured report templates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start h-auto p-4 bg-transparent">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="text-left">
                <div className="font-medium">Monthly Portfolio Report</div>
                <div className="text-sm text-muted-foreground">Complete portfolio summary for the current month</div>
              </div>
            </div>
          </Button>

          <Button variant="outline" className="w-full justify-start h-auto p-4 bg-transparent">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="h-8 w-8 text-green-600" />
              <div className="text-left">
                <div className="font-medium">Transaction Export</div>
                <div className="text-sm text-muted-foreground">All transactions in Excel format</div>
              </div>
            </div>
          </Button>

          <Button variant="outline" className="w-full justify-start h-auto p-4 bg-transparent">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-purple-600" />
              <div className="text-left">
                <div className="font-medium">Tax Report</div>
                <div className="text-sm text-muted-foreground">Capital gains and tax implications</div>
              </div>
            </div>
          </Button>

          <Button variant="outline" className="w-full justify-start h-auto p-4 bg-transparent">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-orange-600" />
              <div className="text-left">
                <div className="font-medium">Performance Analysis</div>
                <div className="text-sm text-muted-foreground">Detailed performance metrics and charts</div>
              </div>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
