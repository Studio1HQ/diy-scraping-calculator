import { useState } from "react";
import {
  calculateDIYCost,
  calculateSearchApiCost,
  getSearchApiTier,
  generateChartData,
  formatCurrency,
  formatPercentage,
  formatVolumeLabel,
} from "./calculations";
import type { ProxyTier, CalculatorInputs } from "./types";
import { PROXY_TIERS } from "./types";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  Calculator,
  Sliders,
  Server,
  ShieldAlert,
  Clock,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Zap,
  Info,
  BarChart3,
  ArrowUpRight,
  Cpu,
  Layers,
} from "lucide-react";

function App() {
  // State for all 5 input controls
  const [searchVolume, setSearchVolume] = useState(25_000);
  const [proxyTier, setProxyTier] = useState<ProxyTier>("mid");
  const [captchaTriggerRate, setCaptchaTriggerRate] = useState(0.1);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [maintenanceHours, setMaintenanceHours] = useState(4);
  const [hostingCost, setHostingCost] = useState(30);

  // Build inputs object for calculations
  const inputs: CalculatorInputs = {
    searchVolume,
    proxyTier,
    captchaTriggerRate,
    hourlyRate,
    maintenanceHours,
    hostingCost,
  };

  // Calculate costs
  const diyBreakdown = calculateDIYCost(inputs);
  const searchApiCost = calculateSearchApiCost(searchVolume);
  const chartData = generateChartData(inputs);

  // Determine which is cheaper
  const diyIsCheaper = diyBreakdown.totalMonthly < searchApiCost.monthly;

  // Log-scale value for volume slider
  const volumeMin = 1_000;
  const volumeMax = 1_000_000;

  // Quick preset buttons
  const volumePresets = [
    { label: "10K", value: 10_000 },
    { label: "50K", value: 50_000 },
    { label: "250K", value: 250_000 },
    { label: "1M", value: 1_000_000 },
  ];

  return (
    <div className="min-h-screen bg-ink text-paper py-10 px-4 md:px-8 selection:bg-buy/30 selection:text-paper">
      {/* Background glow ambient effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-buy/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-diy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-paper/10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-buy/10 text-buy text-xs font-semibold tracking-wide uppercase border border-buy/20">
              <Zap className="w-3.5 h-3.5" /> ROI & Cost Analysis Tool
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-paper flex items-center gap-3">
              <Calculator className="w-8 h-8 text-buy" />
              DIY vs. Buy: Google Scraping Costs
            </h1>
            <p className="text-sm md:text-base text-paper/60 max-w-2xl">
              Compare the hidden operational costs of building & maintaining
              your own SERP scraper against SearchApi's predictable,
              zero-maintenance scale.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-ink/90 border border-paper/10 rounded-xl p-4 shadow-xl backdrop-blur-xl">
            <div className="p-3 bg-buy/10 rounded-lg text-buy">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-paper/60">Recommendation</div>
              <div className="text-sm font-bold text-paper flex items-center gap-1.5 mt-0.5">
                {diyIsCheaper ? (
                  <span className="text-diy flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-diy" /> DIY is cheaper
                    at this scale
                  </span>
                ) : (
                  <span className="text-buy flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-buy" /> Buying
                    SearchApi saves time & money
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Settings Panel (5 cols) */}
          <div className="lg:col-span-5 bg-ink/80 backdrop-blur-xl border border-paper/10 rounded-2xl p-6 md:p-8 shadow-2xl space-y-7 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-buy/5 rounded-bl-full pointer-events-none" />

            <div className="flex items-center justify-between border-b border-paper/10 pb-4">
              <h2 className="text-lg font-bold text-paper flex items-center gap-2">
                <Sliders className="w-5 h-5 text-buy" />
                Calculator Parameters
              </h2>
              <span className="text-xs font-mono px-2.5 py-1 bg-paper/5 rounded-md text-paper/60 border border-paper/5">
                Live Estimates
              </span>
            </div>

            {/* Monthly search volume */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-300 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-buy" /> Monthly search
                  volume
                </label>
                <span className="font-mono text-base font-bold text-buy bg-buy/10 px-3 py-1 rounded-lg border border-buy/20">
                  {searchVolume.toLocaleString()} searches
                </span>
              </div>
              <div className="space-y-2">
                <input
                  type="range"
                  min={Math.log(volumeMin)}
                  max={Math.log(volumeMax)}
                  step={0.01}
                  value={Math.log(searchVolume)}
                  onChange={(e) =>
                    setSearchVolume(Math.exp(parseFloat(e.target.value)))
                  }
                  className="w-full h-2 bg-ink/40 rounded-lg cursor-pointer appearance-none accent-buy focus:ring-2 focus:ring-buy focus:outline-none"
                />
                <div className="flex justify-between text-xs font-mono text-paper/50">
                  <span>1K</span>
                  <span>50K</span>
                  <span>250K</span>
                  <span>1M+</span>
                </div>
              </div>
              {/* Quick Presets */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {volumePresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setSearchVolume(preset.value)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-mono font-medium transition-all border ${
                      searchVolume === preset.value
                        ? "bg-buy/20 text-buy border-buy/40 shadow-sm"
                        : "bg-paper/5 text-paper/60 border-paper/5 hover:bg-paper/10 hover:text-paper"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Proxy tier segmented control */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-300 flex items-center gap-1.5">
                <Server className="w-4 h-4 text-buy" /> Proxy tier quality
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(["budget", "mid", "enterprise"] as const).map((tier) => {
                  const tierConfig = PROXY_TIERS[tier];
                  const isSelected = proxyTier === tier;
                  return (
                    <button
                      key={tier}
                      onClick={() => setProxyTier(tier)}
                      className={`p-3 rounded-xl font-medium transition-all text-left flex flex-col justify-between border ${
                        isSelected
                          ? "bg-buy/20 border-buy text-paper shadow-lg shadow-buy/10"
                          : "bg-paper/5 border-paper/5 text-paper/60 hover:bg-paper/10 hover:text-paper/70"
                      } focus:outline-none`}
                    >
                      <div className="text-xs font-semibold text-paper mb-1">
                        {tierConfig.name}
                      </div>
                      <div className="text-xs font-mono text-buy">
                        ${tierConfig.costPerGB}/GB
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CAPTCHA trigger rate */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-300 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-diy" /> CAPTCHA trigger
                  rate
                </label>
                <span className="font-mono text-sm font-bold text-paper/70 bg-paper/5 px-2.5 py-0.5 rounded border border-paper/5">
                  {formatPercentage(captchaTriggerRate)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="0.25"
                step="0.001"
                value={captchaTriggerRate}
                onChange={(e) =>
                  setCaptchaTriggerRate(parseFloat(e.target.value))
                }
                className="w-full h-2 bg-ink/40 rounded-lg cursor-pointer appearance-none accent-diy focus:ring-2 focus:ring-diy focus:outline-none"
              />
              <div className="flex justify-between text-xs font-mono text-slate-500">
                <span>0% (Clean IP)</span>
                <span>12.5%</span>
                <span>25% (Heavy block)</span>
              </div>
            </div>

            {/* Engineer hourly rate & Maintenance hours */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" /> Hourly
                  rate ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-paper/50 text-sm font-mono">
                    $
                  </span>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) =>
                      setHourlyRate(Math.max(0, parseInt(e.target.value) || 0))
                    }
                    className="w-full pl-7 pr-3 py-2 bg-paper/5 border border-paper/10 rounded-xl text-paper font-mono text-sm placeholder:text-paper/40 focus:ring-2 focus:ring-buy focus:outline-none"
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> Maint.
                  hours/mo
                </label>
                <input
                  type="number"
                  value={maintenanceHours}
                  onChange={(e) =>
                    setMaintenanceHours(
                      Math.max(0, parseFloat(e.target.value) || 0),
                    )
                  }
                  className="w-full px-3 py-2 bg-paper/5 border border-paper/10 rounded-xl text-paper font-mono text-sm placeholder:text-paper/40 focus:ring-2 focus:ring-buy focus:outline-none"
                  min="0"
                  step="0.5"
                />
              </div>
            </div>

            {/* Hosting cost */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-slate-400" /> Monthly cloud
                hosting & infra cost ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-mono">
                  $
                </span>
                <input
                  type="number"
                  value={hostingCost}
                  onChange={(e) =>
                    setHostingCost(Math.max(0, parseFloat(e.target.value) || 0))
                  }
                  className="w-full pl-7 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-sm placeholder:text-slate-600 focus:ring-2 focus:ring-buy focus:outline-none"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Cost Display & Breakdown Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Dual Cost Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* DIY Cost Card */}
              <div
                className={`rounded-2xl p-6 md:p-7 backdrop-blur-xl transition-all relative overflow-hidden flex flex-col justify-between border ${
                  diyIsCheaper
                    ? "bg-gradient-to-br from-diy/15 via-ink to-ink border-2 border-diy shadow-xl shadow-diy/10"
                    : "bg-ink/80 border border-paper/10 shadow-lg"
                }`}
              >
                {diyIsCheaper && (
                  <div className="absolute top-4 right-4 bg-diy/20 border border-diy/40 text-diy text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> More Cost Effective
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-diy/10 rounded-lg text-diy">
                      <Layers className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-paper">
                      Build It Yourself (DIY)
                    </h3>
                  </div>

                  <div className="space-y-1 mb-5">
                    <div className="text-3xl md:text-4xl font-extrabold font-mono text-white tracking-tight">
                      {formatCurrency(diyBreakdown.totalMonthly)}
                    </div>
                    <div className="text-xs text-paper/60 font-medium">
                      Estimated monthly expenditure
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 bg-white/5 rounded-xl p-3 border border-white/5 mb-5 flex justify-between items-center">
                    <span className="text-slate-400">Annualized cost:</span>
                    <span className="font-mono font-bold text-white">
                      {formatCurrency(diyBreakdown.totalAnnual)}
                    </span>
                  </div>

                  {/* Stacked Breakdown Bar */}
                  <div className="space-y-2 pt-2 border-t border-paper/10">
                    <div className="text-xs font-semibold text-paper/60 flex justify-between">
                      <span>Cost Breakdown</span>
                      <span className="text-[10px] text-paper/50">
                        Bandwidth / CAPTCHA / Maint / Host
                      </span>
                    </div>

                    <div className="flex h-3.5 rounded-full overflow-hidden bg-ink/40 p-0.5 border border-paper/5">
                      <div
                        className="bg-diy h-full rounded-l-full transition-all"
                        style={{
                          width: `${(diyBreakdown.bandwidthCost / diyBreakdown.totalMonthly) * 100}%`,
                        }}
                        title="Bandwidth"
                      />
                      <div
                        className="bg-amber-500 h-full transition-all"
                        style={{
                          width: `${(diyBreakdown.captchaCost / diyBreakdown.totalMonthly) * 100}%`,
                        }}
                        title="CAPTCHA Solves"
                      />
                      <div
                        className="bg-orange-600 h-full transition-all"
                        style={{
                          width: `${(diyBreakdown.maintenanceCost / diyBreakdown.totalMonthly) * 100}%`,
                        }}
                        title="Maintenance Labor"
                      />
                      <div
                        className="bg-teal-600 h-full rounded-r-full transition-all"
                        style={{
                          width: `${(diyBreakdown.hostingCost / diyBreakdown.totalMonthly) * 100}%`,
                        }}
                        title="Hosting & Infra"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs pt-2">
                      <div className="flex justify-between text-slate-300">
                        <span className="text-paper/60 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-diy"></span>{" "}
                          Bandwidth
                        </span>
                        <span className="font-mono">
                          {formatCurrency(diyBreakdown.bandwidthCost)}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span className="text-paper/60 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>{" "}
                          CAPTCHA
                        </span>
                        <span className="font-mono">
                          {formatCurrency(diyBreakdown.captchaCost)}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span className="text-paper/60 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-orange-600"></span>{" "}
                          Maint.
                        </span>
                        <span className="font-mono">
                          {formatCurrency(diyBreakdown.maintenanceCost)}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span className="text-paper/60 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-teal-600"></span>{" "}
                          Hosting
                        </span>
                        <span className="font-mono">
                          {formatCurrency(diyBreakdown.hostingCost)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 pt-4 mt-4 border-t border-white/5 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-paper/60 shrink-0" />{" "}
                  Includes engineering hours, proxy bandwidth & retries.
                </div>
              </div>

              {/* SearchApi Cost Card */}
              <div
                className={`rounded-2xl p-6 md:p-7 backdrop-blur-xl transition-all relative overflow-hidden flex flex-col justify-between border ${
                  !diyIsCheaper
                    ? "bg-gradient-to-br from-buy/15 via-ink to-ink border-2 border-buy shadow-xl shadow-buy/10"
                    : "bg-ink/80 border border-paper/10 shadow-lg"
                }`}
              >
                {!diyIsCheaper && (
                  <div className="absolute top-4 right-4 bg-buy/20 border border-buy/40 text-buy text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Recommended Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-buy/10 rounded-lg text-buy">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-paper">
                      SearchApi Cloud
                    </h3>
                  </div>

                  <div className="space-y-1 mb-5">
                    <div className="text-3xl md:text-4xl font-extrabold font-mono text-white tracking-tight">
                      {formatCurrency(searchApiCost.monthly)}
                    </div>
                    <div className="text-xs text-paper/60 font-medium">
                      Predictable monthly billing
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 bg-white/5 rounded-xl p-3 border border-white/5 mb-5 flex justify-between items-center">
                    <span className="text-slate-400">Annualized cost:</span>
                    <span className="font-mono font-bold text-white">
                      {formatCurrency(searchApiCost.annual)}
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-paper/10">
                    <div className="text-xs font-semibold text-paper/60">
                      Key Benefits & Pricing Tiers
                    </div>
                    <div className="text-xs space-y-1.5 text-paper/80 bg-paper/5 p-3 rounded-xl border border-paper/5">
                      <div className="flex items-center gap-1.5 text-buy font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Zero proxies,
                        zero CAPTCHAs to manage
                      </div>
                      <div className="flex items-center gap-1.5 text-buy font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 99.9% uptime
                        SLA & fast JSON APIs
                      </div>
                      <div className="pt-1 text-[11px] text-paper/60 border-t border-paper/5 flex justify-between">
                        <span>Tier rate applied:</span>
                        <span className="font-mono text-paper font-semibold">
                          $
                          {getSearchApiTier(searchVolume).ratePer1000.toFixed(
                            2,
                          )}{" "}
                          / 1k requests
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 pt-4 mt-4 border-t border-white/5 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-paper/60 shrink-0" />{" "}
                  Pay-as-you-go volume pricing with instant scalability.
                </div>
              </div>
            </div>

            {/* Quick Summary Pill / Banner */}
            <div className="bg-ink/80 backdrop-blur-xl border border-paper/10 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-buy/10 text-buy rounded-xl">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-paper">
                    {diyIsCheaper
                      ? "DIY saves you money at this specific volume"
                      : "SearchApi saves engineering headaches & capital"}
                  </div>
                  <div className="text-xs text-slate-400">
                    Difference of{" "}
                    <span className="font-mono font-semibold text-paper">
                      {formatCurrency(
                        Math.abs(
                          diyBreakdown.totalMonthly - searchApiCost.monthly,
                        ),
                      )}{" "}
                      / month
                    </span>{" "}
                    in operational outlays.
                  </div>
                </div>
              </div>
              <a
                href="https://www.searchapi.io/?utm_source=Dev&utm_medium=Ambassador&utm_campaign=studio1hq.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-buy text-ink font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-buy/90 transition-all shadow-lg shadow-buy/20 shrink-0"
              >
                Explore SearchApi
              </a>
            </div>
          </div>
        </div>

        {/* Comparison Chart Section */}
        <div className="bg-ink/80 backdrop-blur-xl border border-paper/10 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-paper/10 pb-5">
            <div>
              <h2 className="text-xl font-bold text-paper flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-buy" />
                Cost Scaling Across Search Volumes
              </h2>
              <p className="text-sm text-paper/60 mt-0.5">
                Observe how DIY maintenance and proxy scaling costs diverge from
                SearchApi tiered pricing as query volume increases.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-diy"></span>
                <span className="text-paper/80">DIY Cost</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-buy"></span>
                <span className="text-paper/80">SearchApi</span>
              </div>
            </div>
          </div>

          <div className="w-full h-96 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255, 255, 255, 0.06)"
                />
                <ReferenceLine
                  x={searchVolume}
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeDasharray="5 5"
                  ifOverflow="extendDomain"
                />
                <XAxis
                  type="number"
                  dataKey="volume"
                  domain={[1_000, 1_000_000]}
                  scale="log"
                  tickFormatter={(value) => formatVolumeLabel(value)}
                  tick={{ fill: "#E9EDF2", fontSize: 12 }}
                  stroke="rgba(233, 237, 242, 0.1)"
                />
                <YAxis
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  tick={{ fill: "#E9EDF2", fontSize: 12 }}
                  stroke="rgba(233, 237, 242, 0.1)"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#12181F",
                    border: "1px solid rgba(233, 237, 242, 0.15)",
                    borderRadius: "12px",
                    boxShadow: "0 20px 25px -5px rgb(0 0 / 0.5)",
                  }}
                  labelStyle={{
                    color: "#E9EDF2",
                    fontWeight: "bold",
                    marginBottom: "4px",
                  }}
                  formatter={(value: number) => [formatCurrency(value), ""]}
                  wrapperStyle={{ outline: "none" }}
                />
                <Legend
                  wrapperStyle={{
                    paddingTop: "20px",
                    color: "#E9EDF2",
                    fontSize: "13px",
                  }}
                  iconType="circle"
                />
                <Line
                  type="monotone"
                  dataKey="diy"
                  stroke="#D98E4A"
                  name="DIY (Your Setup)"
                  dot={false}
                  strokeWidth={3}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="buy"
                  stroke="#3FB8AF"
                  name="SearchApi"
                  dot={false}
                  strokeWidth={3}
                  isAnimationActive={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer note */}
        <footer className="text-center text-xs text-paper/50 pb-6 border-t border-paper/5 pt-6 space-y-1">
          <p>
            Calculations are based on typical Google SERP scraping patterns,
            bandwidth overhead, and average engineering maintenance rates.
          </p>
          <p>
            © {new Date().getFullYear()} Scraping Calculator & ROI Analyzer.
            Built with React, Tailwind CSS & Recharts.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
