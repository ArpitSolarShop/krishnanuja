"use client";

import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowRight, Zap, PiggyBank, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SubsidyCalculator() {
  const [monthlyBill, setMonthlyBill] = useState(3000);

  // Core logic for estimation
  const calculations = useMemo(() => {
    // Approx 1kW saves around Rs 1,000 per month
    let systemSizeKW = Math.max(1, Math.ceil(monthlyBill / 1000));
    // Cap at 10kW for standard residential calc visualization
    systemSizeKW = Math.min(10, systemSizeKW);

    // Standard residential pricing approx 60k per kW
    const totalCost = systemSizeKW * 60000;

    // PM Surya Ghar Subsidy rules (approximate)
    // Up to 2kW: Rs 30,000/kW
    // Additional 1kW (up to 3kW): Rs 18,000
    // Max subsidy is Rs 78,000 for 3kW and above.
    let subsidy = 0;
    if (systemSizeKW <= 2) {
      subsidy = systemSizeKW * 30000;
    } else if (systemSizeKW >= 3) {
      subsidy = 78000;
    } else {
      subsidy = (2 * 30000) + ((systemSizeKW - 2) * 18000);
    }

    const netCost = totalCost - subsidy;

    // EMI Calculation (e.g. 9% interest over 5 years)
    const rate = 0.09 / 12;
    const months = 60;
    const emi = (netCost * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);

    const annualSavings = monthlyBill * 12;
    const roiYears = netCost / annualSavings;

    return {
      systemSizeKW,
      totalCost,
      subsidy,
      netCost,
      emi: Math.round(emi),
      annualSavings,
      roiYears: roiYears.toFixed(1)
    };
  }, [monthlyBill]);

  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl mix-blend-multiply pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20 shadow-sm">
            <Calculator className="w-4 h-4" />
            PM Surya Ghar Yojana
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 tracking-tight">
            Calculate Your Solar <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Subsidy & Savings</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Find out how much you can save with India&apos;s largest rooftop solar subsidy scheme. Instantly see your recommended system size and easy 0% EMI options.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Input Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-card border shadow-xl shadow-primary/5 rounded-3xl p-8 flex flex-col justify-center"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Your Average Electricity Bill</h3>
              <p className="text-muted-foreground text-sm">Move the slider to match your monthly electricity expense.</p>
            </div>

            <div className="text-center mb-8">
              <span className="text-5xl font-black text-primary">
                ₹{monthlyBill.toLocaleString()}
              </span>
              <span className="text-muted-foreground ml-2">/ month</span>
            </div>

            <Slider
              defaultValue={[3000]}
              max={15000}
              min={1000}
              step={500}
              onValueChange={(val) => setMonthlyBill(val[0])}
              className="mb-8 cursor-pointer"
            />

            <div className="flex justify-between text-xs font-semibold text-muted-foreground px-1 mb-8">
              <span>₹1,000</span>
              <span>₹15,000+</span>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 flex gap-4 items-start">
              <ShieldCheck className="w-8 h-8 text-green-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-green-900 dark:text-green-400 mb-1">0% EMI Available</h4>
                <p className="text-sm text-green-800/80 dark:text-green-500/80">
                  Switch to solar with zero upfront cost. Let your electricity bill savings pay your EMI!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Results Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-primary text-primary-foreground rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col"
          >
            {/* Decorative bg */}
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Zap className="w-64 h-64" />
            </div>

            <h3 className="text-2xl font-bold mb-8 relative z-10">Your Estimated Solar Plan</h3>
            
            <div className="grid grid-cols-2 gap-4 md:gap-8 mb-8 relative z-10">
              <div className="bg-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10">
                <p className="text-primary-foreground/70 text-sm font-medium mb-1">Recommended System</p>
                <p className="text-3xl font-black">{calculations.systemSizeKW} kW</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10">
                <p className="text-primary-foreground/70 text-sm font-medium mb-1">Govt. Subsidy (Approx)</p>
                <p className="text-3xl font-black text-green-400">₹{calculations.subsidy.toLocaleString()}</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10">
                <p className="text-primary-foreground/70 text-sm font-medium mb-1">Net System Cost</p>
                <p className="text-3xl font-black">₹{calculations.netCost.toLocaleString()}</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10">
                <p className="text-primary-foreground/70 text-sm font-medium mb-1">Estimated EMI (5 Yrs)</p>
                <p className="text-3xl font-black">₹{calculations.emi.toLocaleString()}/mo</p>
              </div>
            </div>

            <div className="mt-auto bg-black/20 rounded-2xl p-6 border border-white/10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-primary-foreground/80 font-medium mb-1 flex items-center gap-2">
                  <PiggyBank className="w-5 h-5" /> Expected Annual Savings
                </p>
                <p className="text-2xl font-bold text-green-400">₹{calculations.annualSavings.toLocaleString()} / year</p>
                <p className="text-sm mt-1 text-primary-foreground/60">Recovers cost in ~{calculations.roiYears} years</p>
              </div>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full font-bold shadow-lg w-full md:w-auto h-14 px-8">
                <Link href="/#get-quote">
                  Get Exact Quote <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>

          </motion.div>
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
          * Note: Calculations are approximations based on standard industry rates and average sunlight conditions in your area. Actual system sizes, costs, and subsidies may vary slightly based on roof size, structure type, and exact state-level policies.
        </p>

      </div>
    </section>
  );
}
