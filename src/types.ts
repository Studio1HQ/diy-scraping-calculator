export type ProxyTier = 'budget' | 'mid' | 'enterprise'

export interface ProxyTierConfig {
  name: string
  costPerGB: number
}

export const PROXY_TIERS: Record<ProxyTier, ProxyTierConfig> = {
  "budget": { name: 'Budget', costPerGB: 2 },
  mid: { name: 'Mid-market', costPerGB: 4.5 },
  enterprise: { name: 'Enterprise', costPerGB: 9 },
}

export interface CalculatorInputs {
  searchVolume: number
  proxyTier: ProxyTier
  captchaTriggerRate: number // 0 to 1 (0% to 100%)
  hourlyRate: number
  maintenanceHours: number
  hostingCost: number
}

export interface CostComponent {
  bandwidthCost: number
  captchaCost: number
  maintenanceCost: number
  hostingCost: number
}

export interface CostBreakdown extends CostComponent {
  totalMonthly: number
  totalAnnual: number
}

export interface SearchApiTierData {
  upTo: number
  ratePer1000: number
}

export interface SearchApiCost {
  monthly: number
  annual: number
}

export interface ChartDataPoint {
  volume: number
  volumeLabel: string
  diy: number
  buy: number
}
