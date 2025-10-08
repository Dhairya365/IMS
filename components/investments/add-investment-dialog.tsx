"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddInvestmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddInvestmentDialog({ open, onOpenChange }: AddInvestmentDialogProps) {
  const [investmentType, setInvestmentType] = useState("equity")
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    purchaseDate: "",
    maturityDate: "",
    interestRate: "",
    units: "",
    currentPrice: "",
    // Equity specific
    stockSymbol: "",
    brokerCode: "",
    // FD specific
    bankName: "",
    fdAccountNo: "",
    compoundingType: "",
    // Mutual Fund specific
    amc: "",
    fundType: "",
    folioNumber: "",
    nav: "",
    // Bond specific
    companyName: "",
    securityType: "",
    faceValue: "",
    couponRate: "",
    interestFrequency: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Adding investment:", { type: investmentType, ...formData })
      onOpenChange(false)
      resetForm()
    } catch (error) {
      console.error("Error adding investment:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      amount: "",
      purchaseDate: "",
      maturityDate: "",
      interestRate: "",
      units: "",
      currentPrice: "",
      stockSymbol: "",
      brokerCode: "",
      bankName: "",
      fdAccountNo: "",
      compoundingType: "",
      amc: "",
      fundType: "",
      folioNumber: "",
      nav: "",
      companyName: "",
      securityType: "",
      faceValue: "",
      couponRate: "",
      interestFrequency: "",
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const renderEquityForm = () => (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="stockSymbol">Stock Symbol *</Label>
          <Input
            id="stockSymbol"
            value={formData.stockSymbol}
            onChange={(e) => handleChange("stockSymbol", e.target.value)}
            placeholder="e.g., RELIANCE"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="brokerCode">Broker Code</Label>
          <Input
            id="brokerCode"
            value={formData.brokerCode}
            onChange={(e) => handleChange("brokerCode", e.target.value)}
            placeholder="e.g., ZERODHA"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="units">Number of Shares *</Label>
          <Input
            id="units"
            type="number"
            value={formData.units}
            onChange={(e) => handleChange("units", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currentPrice">Purchase Price *</Label>
          <Input
            id="currentPrice"
            type="number"
            value={formData.currentPrice}
            onChange={(e) => handleChange("currentPrice", e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  )

  const renderFDForm = () => (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bankName">Bank Name *</Label>
          <Input
            id="bankName"
            value={formData.bankName}
            onChange={(e) => handleChange("bankName", e.target.value)}
            placeholder="e.g., HDFC Bank"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fdAccountNo">FD Account No.</Label>
          <Input
            id="fdAccountNo"
            value={formData.fdAccountNo}
            onChange={(e) => handleChange("fdAccountNo", e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="interestRate">Interest Rate (%) *</Label>
          <Input
            id="interestRate"
            type="number"
            step="0.1"
            value={formData.interestRate}
            onChange={(e) => handleChange("interestRate", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="compoundingType">Compounding Type</Label>
          <Select value={formData.compoundingType} onValueChange={(value) => handleChange("compoundingType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="annually">Annually</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )

  const renderMutualFundForm = () => (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amc">AMC *</Label>
          <Input
            id="amc"
            value={formData.amc}
            onChange={(e) => handleChange("amc", e.target.value)}
            placeholder="e.g., SBI Mutual Fund"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fundType">Fund Type</Label>
          <Select value={formData.fundType} onValueChange={(value) => handleChange("fundType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="equity">Equity</SelectItem>
              <SelectItem value="debt">Debt</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="index">Index</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="folioNumber">Folio Number</Label>
          <Input
            id="folioNumber"
            value={formData.folioNumber}
            onChange={(e) => handleChange("folioNumber", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nav">NAV at Purchase</Label>
          <Input
            id="nav"
            type="number"
            step="0.01"
            value={formData.nav}
            onChange={(e) => handleChange("nav", e.target.value)}
          />
        </div>
      </div>
    </div>
  )

  const renderBondForm = () => (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company/Issuer *</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
            placeholder="e.g., Government of India"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="securityType">Security Type</Label>
          <Select value={formData.securityType} onValueChange={(value) => handleChange("securityType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="government">Government Bond</SelectItem>
              <SelectItem value="corporate">Corporate Bond</SelectItem>
              <SelectItem value="municipal">Municipal Bond</SelectItem>
              <SelectItem value="treasury">Treasury Bill</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="faceValue">Face Value</Label>
          <Input
            id="faceValue"
            type="number"
            value={formData.faceValue}
            onChange={(e) => handleChange("faceValue", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="couponRate">Coupon Rate (%)</Label>
          <Input
            id="couponRate"
            type="number"
            step="0.1"
            value={formData.couponRate}
            onChange={(e) => handleChange("couponRate", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="interestFrequency">Interest Frequency</Label>
          <Select
            value={formData.interestFrequency}
            onValueChange={(value) => handleChange("interestFrequency", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="semi-annually">Semi-Annually</SelectItem>
              <SelectItem value="annually">Annually</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Investment</DialogTitle>
          <DialogDescription>Enter the investment details to add to your portfolio.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Investment Type Selection */}
            <div className="space-y-2">
              <Label>Investment Type *</Label>
              <Select value={investmentType} onValueChange={setInvestmentType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equity">Equity (Stocks)</SelectItem>
                  <SelectItem value="fixed_deposit">Fixed Deposit</SelectItem>
                  <SelectItem value="mutual_fund">Mutual Fund</SelectItem>
                  <SelectItem value="bond">Bonds/Debentures</SelectItem>
                  <SelectItem value="gold">Gold/Bullion</SelectItem>
                  <SelectItem value="ppf">PPF</SelectItem>
                  <SelectItem value="nsc">NSC</SelectItem>
                  <SelectItem value="nps">NPS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Common Fields */}
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Investment Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter investment name"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Investment Amount *</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => handleChange("amount", e.target.value)}
                    placeholder="Enter amount"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purchaseDate">Purchase Date *</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => handleChange("purchaseDate", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maturityDate">Maturity Date (if applicable)</Label>
                <Input
                  id="maturityDate"
                  type="date"
                  value={formData.maturityDate}
                  onChange={(e) => handleChange("maturityDate", e.target.value)}
                />
              </div>
            </div>

            {/* Type-specific Fields */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Investment Details</Label>
              {investmentType === "equity" && renderEquityForm()}
              {investmentType === "fixed_deposit" && renderFDForm()}
              {investmentType === "mutual_fund" && renderMutualFundForm()}
              {investmentType === "bond" && renderBondForm()}
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Investment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
