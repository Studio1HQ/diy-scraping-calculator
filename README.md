<div align="center">

<img src="https://raw.githubusercontent.com/Studio1HQ/Studio1HQ/main/assets/banners/diy-scraping-calculator.webp" alt="DIY vs Buy Scraping Cost Calculator: An interactive calculator for the true cost of scraping Google SERPs" width="100%" />

<br />
<br />

# DIY vs Buy Scraping Cost Calculator

### An interactive calculator for the true cost of scraping Google SERPs

A client-side React calculator that compares the monthly and annual cost of running your own Google SERP scraper against a managed API such as SearchApi, and shows the break-even volume.

<br />

[![Built by Studio1](https://img.shields.io/badge/Built_by_Studio1-f97316?style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTYwIiBmaWxsPSJub25lIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMzVDMCAxNi42ODA3IDE0LjA3NDQgMS42NDg0NCAzMiAwLjEyNjk1M1YxNDFINTEuMDUyM0M1Mi40MzA4IDEzNy4zNDQgNTQuNzQ0NiAxMzMuNjg5IDU3Ljk5MzggMTMwLjAzM0M2MS4xNDQ2IDEyNi41MDggNjQuNjg5MiAxMjMuNDQgNjguNjI3NyAxMjAuODI5QzcyLjU2NjIgMTE4LjM0OSA3Ni4zNTY5IDExNi43ODIgODAgMTE2LjEyOVY4Ni43NTQ0Qzc1LjQ3MDggODcuOTI5MiA3MS4zODQ2IDg5LjY5MTkgNjcuNzQxNSA5Mi4wNDE1QzY0IDk0LjUyMjUgNjAuNzUwOCA5Ny40NiA1Ny45OTM4IDEwMC44NTRDNTYuNTM0NSAxMDIuNzIgNTUuMjU0NSAxMDQuNjU5IDU0LjE1MzkgMTA2LjY3MVYwSDEyNUMxNDQuMzMgMCAxNjAgMTUuNjY5OSAxNjAgMzVWMTI1QzE2MCAxNDQuMzMgMTQ0LjMzIDE2MCAxMjUgMTYwSDEyNFYxOEgxMDQuOTQ4QzEwMy41NjkgMjEuNjgxNiAxMDEuMjU1IDI1LjM2MjggOTguMDA2MiAyOS4wNDQ0Qzk0Ljg1NTQgMzIuNTk0MiA5MS4zMTA4IDM1LjY4NDEgODcuMzcyMyAzOC4zMTRDODMuNDMzOCA0MC44MTIgNzkuNjQzMSA0Mi4zODk2IDc2IDQzLjA0NzRWNzIuNjMwNEM4MC41MjkyIDcxLjQ0NzMgODQuNjE1NCA2OS42NzI0IDg4LjI1ODUgNjcuMzA1N0M5MiA2NC44MDc2IDk1LjI0OTIgNjEuODQ5MSA5OC4wMDYyIDU4LjQzMDdDOTkuNDY1NSA1Ni41NTEzIDEwMC43NDUgNTQuNTk4NiAxMDEuODQ2IDUyLjU3MjNWMTYwSDM1QzE1LjY3IDE2MCAwIDE0NC4zMyAwIDEyNVYzNVoiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4K)](https://studio1hq.com)
[![Built with SearchApi](https://img.shields.io/badge/Built_with_SearchApi-141414?style=for-the-badge)](https://www.searchapi.io)
[![Live demo](https://img.shields.io/badge/Live_demo-1c1917?style=for-the-badge&logo=vercel&logoColor=white)](https://diy-scraping-calculator.vercel.app)

[SearchApi docs](https://www.searchapi.io/docs) &nbsp;·&nbsp; [SearchApi](https://www.searchapi.io) &nbsp;·&nbsp; [More examples](https://github.com/Studio1HQ) &nbsp;·&nbsp; [studio1hq.com](https://studio1hq.com)

</div>

<br />

## Overview

An interactive cost calculator for developers and technical decision-makers. It compares the total cost of ownership of building and maintaining your own Google SERP scraping pipeline with using a managed API such as SearchApi. It shows where the break-even point sits: at what search volume a managed API becomes cheaper than the engineering time and infrastructure of a DIY setup.

The hidden cost it highlights is ongoing maintenance as Google changes its markup and selectors. Everything runs in the browser, with no backend and no API calls.

## Features

- **Live inputs**: monthly search volume (1K to 1M on a log scale), proxy tier cost ($2 to $9 per GB), CAPTCHA trigger rate (0 to 25%), engineer hourly rate, monthly maintenance hours and hosting cost.
- **Real-time comparison**: monthly and annual cost for DIY and for SearchApi, with no submit button.
- **Cost breakdown**: a stacked view of bandwidth, CAPTCHA, maintenance and hosting.
- **Volume chart**: a log-scale line chart of both cost curves over a fixed range, with a reference marker for the selected volume.
- **Recommendation**: a message that changes with your settings.
- **Accessible and responsive**: visible focus states, labeled inputs, a colorblind-safe palette and a layout that works down to 375px.

## Tech stack

| Layer | Tool |
| --- | --- |
| Framework | [Vite](https://vite.dev), [React](https://react.dev) 19, TypeScript |
| Styling | [Tailwind CSS](https://tailwindcss.com) with a custom dark theme |
| Charts | [Recharts](https://recharts.org) |
| Icons | [Lucide](https://lucide.dev) |
| Deployment | [Vercel](https://vercel.com) |

## Getting started

### Prerequisites

- Node.js 16 or later
- npm

### Installation

```bash
git clone https://github.com/Studio1HQ/diy-scraping-calculator.git
cd diy-scraping-calculator
npm install
```

There are no environment variables.

### Run

```bash
npm run dev
```

The app opens at [http://localhost:5174](http://localhost:5174), or the next free port.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with HMR |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint for TypeScript and React |

## How it works

```text
src/
  App.tsx            Calculator component: state, layout, interactivity
  calculations.ts    Pure cost functions
  types.ts           ProxyTier, CalculatorInputs, CostBreakdown and others
  index.css          Tailwind directives and component utilities
  main.tsx           React entry point
```

DIY monthly cost:

```text
bandwidthGB     = (searchVolume x 200KB x 1.25 retry multiplier) / 1,000,000,000
bandwidthCost   = bandwidthGB x proxyRatePerGB
captchaSolves   = searchVolume x captchaTriggerRate
captchaCost     = (captchaSolves / 1000) x $2.00
maintenanceCost = maintenanceHours x hourlyRate
diyMonthlyCost  = bandwidthCost + captchaCost + maintenanceCost + hostingCost
```

SearchApi side, with tiered pricing per 1,000 searches:

| Monthly volume up to | Rate per 1,000 |
| --- | --- |
| 10,000 | $4.00 |
| 50,000 | $2.50 |
| 500,000 | $1.80 |
| Above 500,000 | $1.00 |

Notes:

- The model assumes 200KB per search request and a 1.25x retry overhead.
- Proxy and CAPTCHA costs are typical rates. Your actual costs will vary.
- Maintenance hours default to 4 per month. Set them to match your team.
- The chart keeps a fixed benchmark scale and marks the current volume with a reference line.
- Currency is formatted with `Intl.NumberFormat`.

Ideas for later: export scenarios as CSV or PDF, share presets through URL parameters, multi-currency support, a breakdown by proxy provider and an ROI view for switching to a managed API.

## Resources

- [Live demo](https://diy-scraping-calculator.vercel.app): deployed calculator.
- [SearchApi](https://www.searchapi.io/): the managed SERP API used as the comparison.

<br />

---

<div align="center">

<a href="https://studio1hq.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Studio1HQ/website/main/brand/studio1-logo-on-dark.svg" />
    <img src="https://raw.githubusercontent.com/Studio1HQ/website/main/brand/studio1-logo-on-light.svg" alt="Studio1" width="160" />
  </picture>
</a>

Built by **[Studio1](https://studio1hq.com)**, the technical content and DevRel partner for devtool teams. Made with [SearchApi](https://www.searchapi.io).<br />
Browse more open-source examples at [github.com/Studio1HQ](https://github.com/Studio1HQ).

[![Website](https://img.shields.io/badge/studio1hq.com-0b0807?style=for-the-badge&logo=googlechrome&logoColor=white)](https://studio1hq.com)
[![Book a call](https://img.shields.io/badge/Book_a_strategy_call-f97316?style=for-the-badge&logo=googlecalendar&logoColor=white)](https://cal.com/studio1/collab)
[![X](https://img.shields.io/badge/%40Studio1HQ-141414?style=for-the-badge&logo=x&logoColor=white)](https://x.com/Studio1HQ)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/studio1hq/)

<sub><a href="https://studio1hq.com">studio1hq.com</a> · Technical content, docs, video and DevRel for devtools</sub>

</div>
