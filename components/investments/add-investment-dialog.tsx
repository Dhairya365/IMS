"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { InvestmentForm } from "./investment-form"
import { InvestmentFormData } from "@/lib/types"
import { apiService } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

interface AddInvestmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function AddInvestmentDialog({ open, onOpenChange, onSuccess }: AddInvestmentDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (data: InvestmentFormData) => {
    console.log("Creating investment:", data)
    setIsLoading(true)

    try {
      // Call the API service to create investment
      await apiService.createInvestment(data)
      console.log("Investment created successfully:", data)
      toast({
        title: "Success",
        description: "Investment created successfully",
      })
      onOpenChange(false)
      // Call the success callback to refresh the table
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Error creating investment:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create investment",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Investment</DialogTitle>
          <DialogDescription>
            Enter the investment details to add to your portfolio. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <InvestmentForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}
