import { Metadata } from "next";
import { HeroGetQuote } from "@/components/forms/HeroGetQuote";
import { Badge } from "@/components/ui/badge";
import { Calculator, Zap, IndianRupee, LineChart } from "lucide-react";

export const metadata: Metadata = {
    title: "Solar ROI Calculator | Krishnanuja Renewables",
    description: "Calculate your potential solar savings, required system size, and 25-year Return on Investment (ROI) with our intelligent interactive calculator.",
};

export default function RoiCalculatorPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header Section */}
            <div className="bg-secondary/50 pt-32 pb-16 border-b border-border/50">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-0 px-4 py-2 font-bold text-sm shadow-sm rounded-full">
                        Free Interactive Tool
                    </Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight">
                        Calculate Your <span className="text-primary">Solar Savings</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Stop guessing. Find out exactly how many solar panels you need, how much they will cost, and watch your 25-year ROI unfold instantly.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-foreground">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                <IndianRupee className="w-4 h-4 text-emerald-600" />
                            </div>
                            Cost Estimate
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <Zap className="w-4 h-4 text-blue-600" />
                            </div>
                            System Size
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                                <LineChart className="w-4 h-4 text-purple-600" />
                            </div>
                            25-Year Projection
                        </div>
                    </div>
                </div>
            </div>

            {/* Calculator Section */}
            <div className="py-16 bg-background relative">
                {/* Decorative blobs */}
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-xl mx-auto">
                        {/* We use HeroGetQuote because it contains the entire logic and the new Recharts ROI graph */}
                        <HeroGetQuote />
                    </div>
                </div>
            </div>
            
            {/* FAQ / Info Section */}
            <div className="py-20 bg-secondary/30 border-t border-border/50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="text-center mb-12">
                        <Calculator className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-foreground">How it Works</h2>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="bg-background p-6 rounded-2xl border border-border/50">
                            <h3 className="text-lg font-bold mb-2">1. The Math Behind the Magic</h3>
                            <p className="text-muted-foreground">We take your current electricity bill and your state&apos;s average tariff to reverse-engineer your monthly unit consumption. From there, we calculate the exact kWp system size required to wipe out that bill.</p>
                        </div>
                        <div className="bg-background p-6 rounded-2xl border border-border/50">
                            <h3 className="text-lg font-bold mb-2">2. Roof Space & Feasibility</h3>
                            <p className="text-muted-foreground">By asking about your roof type and area, we ensure the recommended system physically fits on your property. Standard modules require about 60-80 sq.ft per kW.</p>
                        </div>
                        <div className="bg-background p-6 rounded-2xl border border-border/50">
                            <h3 className="text-lg font-bold mb-2">3. The 25-Year Projection</h3>
                            <p className="text-muted-foreground">Grid tariffs increase by an average of 5% every year. Our interactive chart plots this massive exponential cost against the flat, one-time investment of a solar plant, revealing your true long-term savings.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
