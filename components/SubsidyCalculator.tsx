"use client";

import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const PRESET_BILLS = [2000, 3500, 5000, 8000, 12000];

export default function SubsidyCalculator() {
  const [monthlyBill, setMonthlyBill] = useState(3500);

  // Calculations for estimation
  const calculations = useMemo(() => {
    // Approx 1kW saves around Rs 1,000 per month
    let systemSizeKW = Math.max(1, Math.ceil(monthlyBill / 1000));
    // Cap at 10kW for standard residential calc visualization
    systemSizeKW = Math.min(10, systemSizeKW);

    // Standard residential pricing approx 60k per kW
    const totalCost = systemSizeKW * 60000;

    // PM Surya Ghar Central Subsidy rules:
    // 1kW: Rs 30,000
    // 2kW: Rs 60,000
    // 3kW and above: Rs 78,000 (Max Central Subsidy)
    let centralSubsidy = 0;
    if (systemSizeKW === 1) centralSubsidy = 30000;
    else if (systemSizeKW === 2) centralSubsidy = 60000;
    else centralSubsidy = 78000;

    // Uttar Pradesh State Additional Subsidy:
    // UP gives Rs 15,000/kW up to max Rs 30,000
    const upStateSubsidy = Math.min(30000, systemSizeKW * 15000);

    const totalSubsidy = centralSubsidy + upStateSubsidy;
    const netCost = Math.max(0, totalCost - totalSubsidy);

    // EMI Calculation (9% interest over 5 years)
    const rate = 0.09 / 12;
    const months = 60;
    const emi =
      netCost > 0
        ? (netCost * rate * Math.pow(1 + rate, months)) /
          (Math.pow(1 + rate, months) - 1)
        : 0;

    const annualSavings = monthlyBill * 12;
    const lifetimeSavings25Yrs = annualSavings * 25 - netCost;
    const paybackYears = annualSavings > 0 ? (netCost / annualSavings).toFixed(1) : "0";

    // Environmental metrics
    const co2OffsetTonnes = (systemSizeKW * 1.3 * 25).toFixed(0);
    const treesEquivalent = Math.round(Number(co2OffsetTonnes) * 15);

    return {
      systemSizeKW,
      totalCost,
      centralSubsidy,
      upStateSubsidy,
      totalSubsidy,
      netCost,
      emi: Math.round(emi),
      annualSavings,
      lifetimeSavings25Yrs,
      paybackYears,
      co2OffsetTonnes,
      treesEquivalent,
    };
  }, [monthlyBill]);

  return (
    <section
      id="calculator"
      className="py-24 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden border-t border-border/50"
    >
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs border border-primary/20 shadow-xs">
            <Calculator className="w-4 h-4" />
            PM Surya Ghar: Muft Bijli Yojana &amp; UP State Subsidy
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">
            Calculate Your Solar{" "}
            <span className="text-primary">Subsidy &amp; 25-Year Savings</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed font-medium">
            Find out how much you can claim in government subsidies. See your recommended system size, net investment, and zero-down 0% EMI.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Input Side (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-card border border-border/80 shadow-xl shadow-primary/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-1 text-foreground">
                  Your Electricity Bill
                </h3>
                <p className="text-muted-foreground text-xs font-medium">
                  Select or slide your average monthly electricity expense.
                </p>
              </div>

              {/* Big Bill Display */}
              <div className="text-center py-4 bg-secondary/40 rounded-2xl border border-border/60 mb-6">
                <span className="text-4xl sm:text-5xl font-black text-primary">
                  ₹{monthlyBill.toLocaleString()}
                </span>
                <span className="text-muted-foreground text-sm font-semibold ml-2">/ month</span>
              </div>

              {/* Quick Preset Chips */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs font-bold text-muted-foreground mr-1">Quick Presets:</span>
                {PRESET_BILLS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setMonthlyBill(preset)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      monthlyBill === preset
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-secondary text-foreground hover:bg-secondary/80 border border-border/60"
                    }`}
                  >
                    ₹{preset.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Slider */}
              <div className="mb-8">
                <Slider
                  value={[monthlyBill]}
                  max={15000}
                  min={1000}
                  step={500}
                  onValueChange={(val) => setMonthlyBill(val[0])}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs font-semibold text-muted-foreground px-1 mt-2">
                  <span>₹1,000/mo</span>
                  <span>₹8,000/mo</span>
                  <span>₹15,000+/mo</span>
                </div>
              </div>
            </div>

            {/* Zero Cost EMI Callout */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex gap-3.5 items-start mt-4">
              <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-emerald-900 dark:text-emerald-400 text-sm">
                  0% EMI Financing Available
                </h4>
                <p className="text-xs text-emerald-800/80 dark:text-emerald-500/90 mt-0.5 leading-relaxed">
                  Go solar with zero upfront payment. Your electricity bill savings will pay for the easy monthly installment!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Results Side (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-card border border-border/80 shadow-xl shadow-primary/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div className="space-y-6">
              
              {/* Recommended System Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-secondary/40 border border-border/70">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Optimal System Size
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-black text-foreground">
                      {calculations.systemSizeKW} kW
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      Rooftop Solar Plant
                    </span>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Est. Monthly Generation
                  </span>
                  <p className="text-xl font-black text-foreground mt-0.5">
                    ~{calculations.systemSizeKW * 120} kWh / Mo
                  </p>
                </div>
              </div>

              {/* Subsidies Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20">
                  <p className="text-xs text-muted-foreground font-semibold">Central Subsidy</p>
                  <p className="text-xl font-bold text-primary mt-1">
                    ₹{calculations.centralSubsidy.toLocaleString()}
                  </p>
                  <span className="text-[10px] text-muted-foreground font-medium">PM Surya Ghar</span>
                </div>

                <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                  <p className="text-xs text-muted-foreground font-semibold">UP State Subsidy</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                    ₹{calculations.upStateSubsidy.toLocaleString()}
                  </p>
                  <span className="text-[10px] text-muted-foreground font-medium">UPNEDA Scheme</span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 col-span-2 sm:col-span-1">
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">Total Subsidy</p>
                  <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                    ₹{calculations.totalSubsidy.toLocaleString()}
                  </p>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Direct to Bank A/C</span>
                </div>
              </div>

              {/* Financial Metrics */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/60">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground">Est. Net Investment</p>
                  <p className="text-2xl sm:text-3xl font-black text-foreground">
                    ₹{calculations.netCost.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    (Gross ₹{calculations.totalCost.toLocaleString()} - Subsidy)
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground">Estimated Monthly EMI</p>
                  <p className="text-2xl sm:text-3xl font-black text-primary">
                    ₹{calculations.emi.toLocaleString()}
                    <span className="text-xs font-normal text-muted-foreground">/mo</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Less than your current electric bill!
                  </p>
                </div>
              </div>

              {/* Lifetime & Green Metrics */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-secondary/30 rounded-2xl border border-border/50 text-center">
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">25-Yr Savings</p>
                  <p className="text-sm sm:text-base font-extrabold text-foreground">
                    ₹{(calculations.lifetimeSavings25Yrs / 100000).toFixed(1)} Lakhs
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Payback Time</p>
                  <p className="text-sm sm:text-base font-extrabold text-foreground">
                    {calculations.paybackYears} Years
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">CO2 Cut / Trees</p>
                  <p className="text-sm sm:text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                    {calculations.co2OffsetTonnes}T / {calculations.treesEquivalent} 🌲
                  </p>
                </div>
              </div>

            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <Link href="/#get-quote" className="w-full block">
                <Button
                  size="lg"
                  className="w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-14 text-base shadow-lg gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Claim Up to ₹{calculations.totalSubsidy.toLocaleString()} Subsidy Now
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
