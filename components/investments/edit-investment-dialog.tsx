"use client"

import type React from "react"

import { useState, useEffect } from "react"
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

interface Investment {
  id: string
  type: string
  name: string
  amount: number
  currentValue: number
  purchaseDate: string
  maturityDate?: string
  interestRate?: number
  status: "active" | "matured" | "sold"
  returns: number
  returnsPercentage: number
}

interface EditInvestmentDialogProps {
  investment: Investment
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (investment: Investment) => void
}

export function EditInvestmentDialog({ investment, open, onOpenChange, onUpdate }: EditInvestmentDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    currentValue: "",
    purchaseDate: "",
    maturityDate: "",
    interestRate: "",
    status: "active" as "active" | "matured" | "sold",
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (investment) {
      setFormData({
        name: investment.name,
        amount: investment.amount.toString(),
        currentValue: investment.currentValue.toString(),
        purchaseDate: investment.purchaseDate,
        maturityDate: investment.maturityDate || "",
        interestRate: investment.interestRate?.toString() || "",
        status: investment.status,
      })
    }
  }, [investment])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const amount = Number.parseFloat(formData.amount)
      const currentValue = Number.parseFloat(formData.currentValue)
      const returns = currentValue - amount
      const returnsPercentage = (returns / amount) * 100

      const updatedInvestment: Investment = {
        ...investment,
        name: formData.name,
        amount,
        currentValue,
        purchaseDate: formData.purchaseDate,
        maturityDate: formData.maturityDate || undefined,
        interestRate: formData.interestRate ? Number.parseFloat(formData.interestRate) : undefined,
        status: formData.status,
        returns,
        returnsPercentage,
      }

      onUpdate(updatedInvestment)
    } catch (error) {
      console.error("Error updating investment:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Investment</DialogTitle>
          <DialogDescription>Update the investment details.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Investment Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-amount">Investment Amount *</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleChange("amount", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-currentValue">Current Value *</Label>
                <Input
                  id="edit-currentValue"
                  type="number"
                  value={formData.currentValue}
                  onChange={(e) => handleChange("currentValue", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-purchaseDate">Purchase Date *</Label>
                <Input
                  id="edit-purchaseDate"
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) => handleChange("purchaseDate", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-maturityDate">Maturity Date</Label>
                <Input
                  id="edit-maturityDate"
                  type="date"
                  value={formData.maturityDate}
                  onChange={(e) => handleChange("maturityDate", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-interestRate">Interest Rate (%)</Label>
                <Input
                  id="edit-interestRate"
                  type="number"
                  step="0.1"
                  value={formData.interestRate}
                  onChange={(e) => handleChange("interestRate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "active" | "matured" | "sold") => handleChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="matured">Matured</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Investment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
