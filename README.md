# DIY vs. Buy: What Does Google Scraping Really Cost?

An interactive cost calculator for developers and technical decision-makers comparing the true total cost of ownership (TCO) between building and maintaining your own Google SERP scraper pipeline versus using a managed API service like SearchApi.

## Overview

This single-page React widget helps teams understand the hidden operational costs of DIY web scraping—particularly the ongoing maintenance burden as Google changes markup and selectors. The calculator reveals where the break-even point is: at what search volume does a managed API become cheaper than the engineering time and infrastructure overhead?

**Live inputs:**

- Monthly search volume (1K–1M, log scale)
- Proxy tier cost ($2–$9/GB)
- CAPTCHA trigger rate (0–25%)
- Engineer hourly rate
- Monthly maintenance hours
- Hosting cost

**Real-time outputs:**

- Monthly and annualized cost comparison (DIY vs. SearchApi)
- Visual cost breakdown (bandwidth, CAPTCHA, maintenance, hosting)
- Line chart showing cost curves across volume ranges
- Dynamic recommendation based on current settings

## Tech Stack

- **Vite** + **React 19** + **TypeScript** 6 — Fast development and production builds
- **Tailwind CSS** — Custom dark theme (ink, paper, buy, diy palette)
- **Recharts** — Cost comparison line chart
- **Lucide React** — Icon set
- **Pure client-side** — No backend, no API calls, all calculations happen in the browser

## Project Structure

```
src/
  ├── App.tsx                 # Main calculator component (state, layout, interactivity)
  ├── calculations.ts         # Pure cost calculation functions (unit-testable)
  ├── types.ts               # TypeScript interfaces (ProxyTier, CalculatorInputs, CostBreakdown, etc.)
  ├── index.css              # Tailwind directives + component utilities
  └── main.tsx               # React entry point

tailwind.config.ts           # Custom color palette and font configuration
postcss.config.cjs           # Tailwind + Autoprefixer setup
index.html                   # HTML template with Google Fonts
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5174/` (or next available port). HMR enabled for instant updates.

### Build for Production

```bash
npm run build
```

Outputs optimized bundle to `dist/`.

### Preview Production Build

```bash
npm run preview
```

## Cost Calculation Formula

### DIY Side

```
bandwidthGB = (searchVolume × 200KB × 1.25 retry_multiplier) / 1,000,000,000
bandwidthCost = bandwidthGB × proxyRatePerGB

captchaSolves = searchVolume × captchaTriggerRate
captchaCost = (captchaSolves / 1000) × $2.00

maintenanceCost = maintenanceHours × hourlyRate

diyMonthlyCost = bandwidthCost + captchaCost + maintenanceCost + hostingCost
diyAnnualCost = diyMonthlyCost × 12
```

### SearchApi Side (Tiered Pricing)

```
tiers = [
  { upTo: 10,000,   ratePer1000: $4.00 },
  { upTo: 50,000,   ratePer1000: $2.50 },
  { upTo: 500,000,  ratePer1000: $1.80 },
  { upTo: Infinity, ratePer1000: $1.00 }
]

apiMonthlyCost = (searchVolume / 1000) × rateForVolumeTier
apiAnnualCost = apiMonthlyCost × 12
```

## Design System

### Color Palette

- **Ink** (`#12181F`) — Deep navy background, primary container
- **Paper** (`#E9EDF2`) — Off-white text, high contrast
- **Buy** (`#3FB8AF`) — Cyan accent, SearchApi/recommended indicator
- **DIY** (`#D98E4A`) — Muted amber, DIY indicator, chart line

### Typography

- **Sans** — Inter (Google Fonts)
- **Mono** — JetBrains Mono (Google Fonts) for numeric values
- Dollar figures always rendered in monospace to reinforce "real computed numbers"

### Layout

- Single centered column (~760px max)
- Responsive down to 375px width (mobile)
- Grid-based settings panel + dual cost figures + comparison chart
- Ambient glow effects (subtle, non-intrusive)

## Key Features

1. **Live Updates** — No submit button; all calculations reflect input changes instantly
2. **Log-Scale Volume Slider** — Intuitive control across 1K–1M range
3. **Cost Breakdown** — Stacked visualization showing proportion of each cost component
4. **Comparison Chart** — Line chart showing DIY vs. SearchApi costs across fixed volume points
5. **Annualization** — Both monthly and annual figures to emphasize compounding maintenance cost
6. **Colorblind-Safe** — Amber + cyan + opacity variations, not relying on red/green alone
7. **Keyboard Accessible** — All inputs have visible focus states, proper labels
8. **Fully Responsive** — Seamless experience from mobile to desktop

## Linting

```bash
npm run lint
```

ESLint configured for TypeScript and React best practices.

## Notes

- All calculations are client-side; no backend or API integration
- Numbers are formatted as USD currency (adapts to locale via `Intl.NumberFormat`)
- Proxy and CAPTCHA costs are based on typical provider rates; your actual costs may vary
- The calculator assumes 200KB per search request and 25% request retry rate for failed connections
- Maintenance hours default to 4/month but should be customized based on your team's actual upkeep time

## Future Enhancements

- Export cost scenarios as CSV/PDF
- Save/share calculator presets via URL parameters
- Multi-currency support
- Detailed cost breakdown by proxy provider
- ROI calculator for switching from DIY to managed API

## License

MIT
