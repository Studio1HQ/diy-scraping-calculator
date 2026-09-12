import type {
  CalculatorInputs,
  CostBreakdown,
  SearchApiCost,
  ChartDataPoint,
  SearchApiTierData,
} from './types'
import { PROXY_TIERS } from './types'

/**
 * Calculate DIY scraping cost breakdown
 * Formula:
 * - bandwidthGB = (searchVolume * 200KB * 1.25 retryMultiplier) / 1,000,000,000
 * - bandwidthCost = bandwidthGB * proxyRatePerGB
 * - captchaSolves = searchVolume * captchaTriggerRate
 * - captchaCost = (captchaSolves / 1000) * 2.00
 * - maintenanceCost = maintenanceHours * hourlyRate
 * - diyMonthlyCost = bandwidthCost + captchaCost + maintenanceCost + hostingCost
 */
export function calculateDIYCost(inputs: CalculatorInputs): CostBreakdown {
  const BYTES_PER_SEARCH = 200_000 // 200KB in bytes
  const RETRY_MULTIPLIER = 1.25
  const CAPTCHA_COST_PER_1000 = 2.0

  // Calculate bandwidth cost
  const totalBytes = inputs.searchVolume * BYTES_PER_SEARCH * RETRY_MULTIPLIER
  const bandwidthGB = totalBytes / 1_000_000_000 // Convert bytes to GB
  const proxyRate = PROXY_TIERS[inputs.proxyTier].costPerGB
  const bandwidthCost = bandwidthGB * proxyRate

  // Calculate CAPTCHA cost
  const captchaSolves = inputs.searchVolume * inputs.captchaTriggerRate
  const captchaCost = (captchaSolves / 1000) * CAPTCHA_COST_PER_1000

  // Calculate maintenance cost
  const maintenanceCost = inputs.maintenanceHours * inputs.hourlyRate

  // Calculate total monthly
  const totalMonthly =
    bandwidthCost + captchaCost + maintenanceCost + inputs.hostingCost

  return {
    bandwidthCost,
    captchaCost,
    maintenanceCost,
    hostingCost: inputs.hostingCost,
    totalMonthly,
    totalAnnual: totalMonthly * 12,
  }
}

/**
 * Calculate SearchApi cost based on tiered pricing
 * Tiers:
 * - Up to 10,000: $4.00 per 1000
 * - Up to 50,000: $2.50 per 1000
 * - Up to 500,000: $1.80 per 1000
 * - 500,000+: $1.00 per 1000
 */
export function calculateSearchApiCost(searchVolume: number): SearchApiCost {
  const SEARCH_API_TIERS: SearchApiTierData[] = [
    { upTo: 10_000, ratePer1000: 4.0 },
    { upTo: 50_000, ratePer1000: 2.5 },
    { upTo: 500_000, ratePer1000: 1.8 },
    { upTo: Infinity, ratePer1000: 1.0 },
  ]

  const tier = SEARCH_API_TIERS.find((t) => searchVolume <= t.upTo)
  if (!tier) {
    throw new Error('No pricing tier found for volume')
  }

  const monthly = (searchVolume / 1000) * tier.ratePer1000

  return {
    monthly,
    annual: monthly * 12,
  }
}

/**
 * Generate chart data points across a fixed range of volumes
 * Uses user's current proxy tier and other settings
 */
export function generateChartData(inputs: CalculatorInputs): ChartDataPoint[] {
  const volumes = [1_000, 5_000, 10_000, 25_000, 50_000, 100_000, 250_000, 500_000, 1_000_000]

  return volumes.map((volume) => {
    const diyInputs: CalculatorInputs = { ...inputs, searchVolume: volume }
    const diyBreakdown = calculateDIYCost(diyInputs)
    const searchApiCost = calculateSearchApiCost(volume)

    return {
      volume,
      volumeLabel: formatVolumeLabel(volume),
      diy: diyBreakdown.totalMonthly,
      buy: searchApiCost.monthly,
    }
  })
}

/**
 * Format volume number as human-readable label (e.g., 1000 -> "1K")
 */
export function formatVolumeLabel(volume: number): string {
  if (volume >= 1_000_000) {
    return `${volume / 1_000_000}M`
  } else if (volume >= 1_000) {
    return `${volume / 1_000}K`
  }
  return volume.toString()
}

/**
 * Format number as USD currency string
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Format percentage value
 */
export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}
