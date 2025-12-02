export interface Employee {
  id: string
  name: string
  position: string
  salary: number
  hireDate: string
  category: 'professor' | 'administrative' | 'feg' | 'inss' | 'maintain'
  status: 'active' | 'dismissed_december' | 'funcamp_pending' | 'inss_leave' | 'maintain_2026' | 'decision_pending' | 'inss_feg_pending'
  dismissalDate?: string
  severancePay?: number
  observations?: string
}

export interface TaxRisk {
  id: string
  type: 'installment' | 'debt' | 'tax_obligation' | 'other'
  description: string
  amount: number
  dueDate: string
  status: 'current' | 'overdue' | 'resolved'
  installmentInfo?: {
    current: number
    total: number
    monthlyAmount: number
  }
  riskLevel: 'low' | 'medium' | 'high'
  observations?: string
}

export interface RiskAnalysis {
  totalEmployees: number
  totalSeverancePay: number
  totalMonthlySavings: number
  byCategory: Record<string, { count: number; total: number }>
  fiscalRisks: {
    total: number
    overdue: number
    upcoming: number
  }
}