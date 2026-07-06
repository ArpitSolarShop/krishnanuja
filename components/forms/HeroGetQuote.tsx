"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, IndianRupee, MapPin, PiggyBank, Timer, Zap, ShoppingCart, CheckCircle2, Loader2, TrendingUp } from "lucide-react";
import { submitHeroLead } from "@/app/actions/leads";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

type CustomerType = "Residential" | "Commercial";
type ProductSystem = { brand: string; size: number; phase: string; price?: number; mountingType?: string };
type QuoteFormData = { fullName: string; whatsappNumber: string; pinCode: string; companyName?: string; city: string; monthlyBill: string };
type EstimateData = { roofOwnership: "" | "Yes" | "No"; constructed: "" | "Yes" | "No"; roofType: "" | "Concrete" | "Metal" | "Brick"; terraceSize: string; powerCuts: "" | "Yes" | "No"; planning: "" | "Immediately" | "3 Months" | "6 Months"; fullAddress: string; landmark: string; latitude: number | null; longitude: number | null };
type Results = { systemSize: number; requiredRoofArea: number; monthlySavings: number; yearlySavings: number; fiveYearSavings: number; grossCost: number; netCost: number; paybackYears: number; co2Savings: number };

const BILL_RANGES = ["Less than ₹1500", "₹1500 - ₹2500", "₹2500 - ₹4000", "₹4000 - ₹8000", "More than ₹8000"];
const TOTAL_ESTIMATE_STEPS = 3;
const stateTariffs: Record<string, number> = { "Uttar Pradesh": 7.2, Delhi: 8, Maharashtra: 9, Gujarat: 7, Rajasthan: 8.5 };
const avgSolarGenerationPerKWMonth = 120;
const avgRoofAreaPerKW = 60;
const systemCostPerKW = 60000;
const co2SavingPerKWYear = 1.2;

const convertBillRangeToNumber = (range: string): number | null => {
    if (!range) return null;
    switch (range) {
        case "Less than ₹1500": return 1000;
        case "₹1500 - ₹2500": return 2000;
        case "₹2500 - ₹4000": return 3250;
        case "₹4000 - ₹8000": return 6000;
        case "More than ₹8000": return 9000;
        default: return Number.parseFloat(range) || null;
    }
};

const inputBase = "w-full rounded-xl border bg-background text-base sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary px-3 py-2 h-12 md:h-11";
const buttonBase = "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none";
const buttonPrimary = `${buttonBase} bg-primary text-primary-foreground hover:bg-primary/90 font-bold`;
const buttonOutline = `${buttonBase} border hover:bg-secondary`;
const chip = "rounded-xl border px-3 py-3 text-sm font-medium hover:bg-secondary transition-colors";

function useInlineToast() {
    const [msg, setMsg] = useState<{ title: string; desc?: string } | null>(null);
    useEffect(() => {
        if (!msg) return;
        const t = setTimeout(() => setMsg(null), 2800);
        return () => clearTimeout(t);
    }, [msg]);
    return { msg, setMsg };
}

function Stepper({ current, total }: { current: number; total: number }) {
    return (
        <div className="w-full">
            <ol className="flex items-center gap-2" aria-label="Progress">
                {Array.from({ length: total }).map((_, i) => {
                    const idx = i + 1;
                    const isActive = idx <= current;
                    return (
                        <li key={idx} className="flex-1">
                            <div className="flex items-center gap-2">
                                <div className={`h-8 w-8 shrink-0 rounded-full border flex items-center justify-center text-xs font-bold ${isActive ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground"}`}>
                                    {isActive ? <Check className="h-4 w-4" /> : idx}
                                </div>
                                {i < total - 1 && <div className={`h-1 w-full rounded-full ${i + 1 < current ? "bg-primary" : "bg-secondary"}`} />}
                            </div>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}

// Fallback catalog since we don't have a DB for products in this project yet
const defaultCatalog = {
    residential: [
        { brand: "Tata Power", size: 3, phase: "1Ph", price: 195000, mountingType: "Standard" },
        { brand: "Tata Power", size: 5, phase: "1Ph", price: 310000, mountingType: "Elevated" },
        { brand: "Reliance", size: 5, phase: "1Ph", price: 305000, mountingType: "Standard" },
        { brand: "Reliance", size: 10, phase: "3Ph", price: 580000, mountingType: "High-Rise" },
    ],
    commercial: [
        { brand: "Tata Power", size: 20, phase: "3Ph", price: 1100000, mountingType: "Industrial" },
        { brand: "Reliance", size: 50, phase: "3Ph", price: 2600000, mountingType: "Industrial" },
    ]
};

export function HeroGetQuote() {
    const { msg, setMsg } = useInlineToast();
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [customerType, setCustomerType] = useState<CustomerType>("Residential");
    const [agreed, setAgreed] = useState(false);
    const [submittingProductId, setSubmittingProductId] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState<QuoteFormData>({ fullName: "", whatsappNumber: "", pinCode: "", companyName: "", city: "", monthlyBill: "" });
    const [estimateData, setEstimateData] = useState<EstimateData>({ roofOwnership: "", constructed: "", roofType: "", terraceSize: "", powerCuts: "", planning: "", fullAddress: "", landmark: "", latitude: null, longitude: null });
    const [results, setResults] = useState<Results>({ systemSize: 0, requiredRoofArea: 0, monthlySavings: 0, yearlySavings: 0, fiveYearSavings: 0, grossCost: 0, netCost: 0, paybackYears: 0, co2Savings: 0 });
    const [recommendedProducts, setRecommendedProducts] = useState<ProductSystem[]>([]);

    const updateForm = (k: keyof QuoteFormData, v: string) => setFormData(p => ({ ...p, [k]: v }));
    const updateEstimate = (k: keyof EstimateData, v: EstimateData[typeof k]) => setEstimateData(p => ({ ...p, [k]: v }));

    const detailsValid = Boolean(formData.fullName.trim() && formData.whatsappNumber.trim() && (customerType === "Residential" ? formData.pinCode.trim() : true) && (customerType === "Commercial" ? formData.companyName?.trim() : true) && formData.monthlyBill.trim() && agreed);
    const progressPct = step > 0 && step < 4 ? Math.round((step / TOTAL_ESTIMATE_STEPS) * 100) : step === 4 ? 100 : 0;

    const getStepTitle = () => {
        switch (step) {
            case 1: return "Quick Estimates (Step 1/3)";
            case 2: return "Quick Estimates (Step 2/3)";
            case 3: return "Quick Estimates (Step 3/3)";
            case 4: return "Your Solar Estimate";
            default: return "Get a Free Solar Quote";
        }
    };



    const handleSubmitDetails = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!detailsValid) return setMsg({ title: "Please complete required fields" });
        setLoading(true);
        try {
            await submitHeroLead({
                name: formData.fullName,
                phone: formData.whatsappNumber,
                bill: formData.monthlyBill,
                timeline: "Initial Estimate Stage",
                address: formData.city || "Not provided",
            });
            setMsg({ title: "Details saved", desc: "Let’s get a quick estimate." });
            setStep(1);
        } catch (err: unknown) {
            console.error('Submit failed', err);
            setMsg({ title: "Could not save details", desc: (err as Error)?.message ?? 'Proceeding anyway' });
            setStep(1);
        } finally {
            setLoading(false);
        }
    };

    const handleCalculate = async () => {
        setLoading(true);
        try {
            const actualMonthlyBill = convertBillRangeToNumber(formData.monthlyBill) || 0;
            const tariff = stateTariffs[formData.city] || stateTariffs["Uttar Pradesh"] || 7.2;
            const estimatedMonthlyConsumption = actualMonthlyBill > 0 && tariff > 0 ? actualMonthlyBill / tariff : 0;
            const systemSizeRaw = estimatedMonthlyConsumption > 0 ? Math.ceil(estimatedMonthlyConsumption / avgSolarGenerationPerKWMonth / 0.9) : 1;
            const systemSize = Math.max(1, Math.min(systemSizeRaw, 100));

            const source = customerType === 'Residential' ? defaultCatalog.residential : defaultCatalog.commercial;
            const recommendations: ProductSystem[] = [];
            const brands = [...new Set(source.map(p => p.brand))];
            brands.forEach(brand => {
                const brandProducts = source.filter(p => p.brand === brand);
                if (brandProducts.length > 0) {
                    const closestProduct = brandProducts.reduce((prev, curr) => (Math.abs(curr.size - systemSize) < Math.abs(prev.size - systemSize) ? curr : prev));
                    recommendations.push(closestProduct);
                }
            });
            setRecommendedProducts(recommendations);

            let grossCost = systemSize * systemCostPerKW;
            if (recommendations.length > 0) {
                const validPrices = recommendations.filter(r => r.price && r.price > 0).map(r => r.price!);
                if (validPrices.length > 0) {
                    const avgPrice = validPrices.reduce((a, b) => a + b, 0) / validPrices.length;
                    const avgSize = recommendations.filter(r => r.price && r.price > 0).reduce((a, b) => a + b.size, 0) / validPrices.length;
                    grossCost = avgSize > 0 ? Math.round((avgPrice / avgSize) * systemSize) : avgPrice;
                }
            }
            
            const getExpectedSubsidy = (kw: number) => {
                if (kw < 2) return 0;
                if (kw >= 3) return 108000;
                return 90000;
            };
            const applicableSubsidy = customerType === 'Residential' ? getExpectedSubsidy(systemSize) : 0;
            const netCost = Math.max(0, grossCost - applicableSubsidy);
            const monthlySavings = Math.round(estimatedMonthlyConsumption * tariff * 0.9);

            setResults({
                systemSize,
                requiredRoofArea: Math.round(systemSize * avgRoofAreaPerKW),
                monthlySavings,
                yearlySavings: monthlySavings * 12,
                fiveYearSavings: monthlySavings * 60,
                grossCost,
                netCost,
                paybackYears: netCost > 0 && monthlySavings > 0 ? Number.parseFloat((netCost / (monthlySavings * 12)).toFixed(1)) : 0,
                co2Savings: Number.parseFloat((systemSize * co2SavingPerKWYear).toFixed(1))
            });

            setStep(4);
        } catch (err: unknown) {
            console.error('Calculation error', err);
            setMsg({ title: "Calculation error", desc: "Please check details and try again." });
        } finally {
            setLoading(false);
        }
    };

    const handleDirectQuote = async (product: ProductSystem) => {
        const id = `${product.brand}-${product.size}-${product.mountingType ?? 'default'}`;
        setSubmittingProductId(id);
        try {
            await submitHeroLead({
                name: formData.fullName,
                phone: formData.whatsappNumber,
                bill: formData.monthlyBill,
                timeline: estimateData.planning || "Immediately",
                address: `${estimateData.fullAddress} ${formData.city} ${formData.pinCode}`,
            });
            setIsSuccess(true);
        } catch (err: unknown) {
            console.error('Direct quote failed', err);
            setMsg({ title: "Submission Failed", desc: (err as Error)?.message ?? 'Please try again later.' });
        } finally {
            setSubmittingProductId(null);
        }
    };

    const handleShareLocation = () => {
        if (!navigator.geolocation) return setMsg({ title: "Geolocation not supported" });
        navigator.geolocation.getCurrentPosition((pos) => {
            updateEstimate('latitude', pos.coords.latitude);
            updateEstimate('longitude', pos.coords.longitude);
            setMsg({ title: "Location shared" });
        }, () => setMsg({ title: "Location error", desc: "Try manual address" }));
    };

    if (isSuccess) {
        return (
            <section className="w-full max-w-xl mx-auto px-4 sm:px-0">
                <div className="rounded-3xl border border-border/50 bg-background shadow-xl p-10 text-center flex flex-col items-center justify-center space-y-6">
                    <CheckCircle2 className="w-20 h-20 text-primary animate-in zoom-in" />
                    <h2 className="text-3xl font-bold text-foreground">Quote Requested!</h2>
                    <p className="text-lg text-muted-foreground">Thank you {formData.fullName}. Our team will contact you shortly with the customized quotation for your {results.systemSize}kW system.</p>
                    <button onClick={() => { setIsSuccess(false); setStep(0); }} className={buttonOutline}>Calculate Another System</button>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full max-w-xl mx-auto px-4 sm:px-0">
            <div className="rounded-3xl border border-border/50 bg-background shadow-xl overflow-hidden">
                <div className="p-6 border-b border-border/50 bg-secondary/20">
                    <div className="flex items-center justify-between gap-3">
                        {step > 0 && step < 4 ? (<button type="button" className={`${buttonOutline} h-10 w-10 p-0 rounded-full`} onClick={() => setStep(s => Math.max(0, s - 1))} aria-label="Go back"><ArrowLeft className="h-5 w-5" /></button>) : <div />}
                        <h2 className="text-xl font-bold text-foreground">{getStepTitle()}</h2>
                        <div className="text-sm font-semibold text-primary">{progressPct}%</div>
                    </div>
                    {step > 0 && step < 4 && (<div className="mt-6"><Stepper current={step} total={TOTAL_ESTIMATE_STEPS} /></div>)}
                </div>

                <div className="p-6">
                    <AnimatePresence>
                        {msg && (<motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mb-4 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm" role="status" aria-live="polite" ><p className="font-bold text-primary">{msg.title}</p>{msg.desc && <p className="text-muted-foreground mt-1">{msg.desc}</p>}</motion.div>)}
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25, ease: "easeOut" }}>

                            {step === 0 && (
                                <form onSubmit={handleSubmitDetails} className="space-y-6">
                                    <div className="bg-secondary rounded-xl p-1.5 grid grid-cols-2 gap-1">
                                        {(["Residential", "Commercial"] as CustomerType[]).map((type) => (
                                            <button key={type} type="button" onClick={() => { setCustomerType(type); setFormData({ fullName: "", whatsappNumber: "", pinCode: "", companyName: "", city: "", monthlyBill: "" }); }} className={`h-11 rounded-lg text-sm font-semibold transition-all ${customerType === type ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:bg-background/50"}`} aria-pressed={customerType === type}>{type}</button>
                                        ))}
                                    </div>

                                    <div className="space-y-2"><label htmlFor="fullName" className="text-sm font-semibold text-foreground">Full Name <span className="text-destructive">*</span></label><input id="fullName" required className={inputBase} value={formData.fullName} onChange={(e) => updateForm('fullName', e.target.value)} placeholder="e.g. Rahul Sharma" /></div>

                                    {customerType === 'Commercial' ? (
                                        <>
                                            <div className="space-y-2"><label htmlFor="companyName" className="text-sm font-semibold text-foreground">Company Name <span className="text-destructive">*</span></label><input id="companyName" required className={inputBase} value={formData.companyName ?? ''} onChange={(e) => updateForm('companyName', e.target.value)} placeholder="e.g. Acme Corp" /></div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <div className="space-y-2"><label htmlFor="city" className="text-sm font-semibold text-foreground">City <span className="text-destructive">*</span></label><input id="city" required className={inputBase} value={formData.city} onChange={(e) => updateForm('city', e.target.value)} placeholder="e.g. Varanasi" /></div>
                                                <div className="space-y-2"><label htmlFor="pinCommercial" className="text-sm font-semibold text-foreground">PIN Code</label><input id="pinCommercial" className={inputBase} value={formData.pinCode} onChange={(e) => updateForm('pinCode', e.target.value)} placeholder="221001" /></div>
                                            </div>
                                            <div className="space-y-2"><label htmlFor="wa" className="text-sm font-semibold text-foreground">WhatsApp Number <span className="text-destructive">*</span></label><input id="wa" type="tel" required className={inputBase} value={formData.whatsappNumber} onChange={(e) => updateForm('whatsappNumber', e.target.value)} placeholder="10-digit number" /></div>
                                            <div className="space-y-2"><label htmlFor="bill" className="text-sm font-semibold text-foreground">Average Monthly Bill <span className="text-destructive">*</span></label><input id="bill" type="number" required className={inputBase} placeholder="Enter amount in ₹" value={formData.monthlyBill} onChange={(e) => updateForm('monthlyBill', e.target.value)} /></div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="space-y-2"><label htmlFor="wa" className="text-sm font-semibold text-foreground">WhatsApp Number <span className="text-destructive">*</span></label><input id="wa" type="tel" required className={inputBase} value={formData.whatsappNumber} onChange={(e) => updateForm('whatsappNumber', e.target.value)} placeholder="10-digit number" /></div>
                                            <div className="space-y-2"><label htmlFor="pin" className="text-sm font-semibold text-foreground">PIN Code <span className="text-destructive">*</span></label><input id="pin" required className={inputBase} value={formData.pinCode} onChange={(e) => updateForm('pinCode', e.target.value)} placeholder="221001" /></div>
                                            <div className="space-y-2">
                                                <span className="text-sm font-semibold text-foreground mb-2 block">Average monthly bill? <span className="text-destructive">*</span></span>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{BILL_RANGES.map((range) => (<button key={range} type="button" onClick={() => updateForm('monthlyBill', range)} className={`${chip} ${formData.monthlyBill === range ? "bg-primary text-primary-foreground border-primary" : ""}`} aria-pressed={formData.monthlyBill === range}>{range}</button>))}</div>
                                            </div>
                                        </>
                                    )}

                                    <div className="flex items-start gap-3 pt-4"><input id="agree" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 h-5 w-5 rounded border accent-primary" /><label htmlFor="agree" className="text-sm text-muted-foreground leading-relaxed">I agree to receive marketing communications and agree to the <a href="/terms-and-conditions" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">Terms</a> and <a href="/privacy-policy" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">Privacy Policy</a>.</label></div>

                                    <button type="submit" disabled={loading} className={`${buttonPrimary} w-full h-14 text-lg mt-4`}>{loading ? <Loader2 className="animate-spin h-6 w-6" /> : "Calculate My Savings"}</button>
                                </form>
                            )}

                            {step === 1 && (
                                <div className="space-y-8">
                                    <div className="space-y-3"><span className="text-base font-semibold text-foreground">Do you have roof ownership?</span><div className="grid grid-cols-2 gap-3">{(["Yes", "No"] as const).map((v) => (<button key={v} type="button" onClick={() => updateEstimate('roofOwnership', v)} className={`${chip} ${estimateData.roofOwnership === v ? "bg-primary text-primary-foreground border-primary" : ""}`}>{v}</button>))}</div></div>
                                    <div className="space-y-3"><span className="text-base font-semibold text-foreground">Is your house fully constructed?</span><div className="grid grid-cols-2 gap-3">{(["Yes", "No"] as const).map((v) => (<button key={v} type="button" onClick={() => updateEstimate('constructed', v)} className={`${chip} ${estimateData.constructed === v ? "bg-primary text-primary-foreground border-primary" : ""}`}>{v}</button>))}</div></div>
                                    <div className="space-y-3"><span className="text-base font-semibold text-foreground">Select the roof type</span><div className="grid grid-cols-1 gap-3">{(["Concrete", "Metal", "Brick"] as const).map((v) => (<button key={v} type="button" onClick={() => updateEstimate('roofType', v)} className={`${chip} ${estimateData.roofType === v ? "bg-primary text-primary-foreground border-primary" : ""}`}>{v} Roof</button>))}</div></div>
                                    <button onClick={() => setStep(2)} className={`${buttonPrimary} w-full h-14 text-lg mt-4`}>Continue <ArrowLeft className="w-5 h-5 ml-2 rotate-180" /></button>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-8">
                                    <div className="space-y-3"><label htmlFor="terrace" className="text-base font-semibold text-foreground">Approx. Terrace Size (in Sq. ft)</label><input id="terrace" type="number" min={0} className={inputBase} placeholder="e.g. 1000" value={estimateData.terraceSize} onChange={(e) => updateEstimate('terraceSize', e.target.value)} /></div>
                                    <div className="space-y-3"><span className="text-base font-semibold text-foreground">Do you face regular power cuts?</span><div className="grid grid-cols-2 gap-3">{(["Yes", "No"] as const).map((v) => (<button key={v} type="button" onClick={() => updateEstimate('powerCuts', v)} className={`${chip} ${estimateData.powerCuts === v ? "bg-primary text-primary-foreground border-primary" : ""}`}>{v}</button>))}</div></div>
                                    <div className="space-y-3"><span className="text-base font-semibold text-foreground">When are you planning to get Solar?</span><div className="grid grid-cols-1 gap-3">{(["Immediately", "3 Months", "6 Months"] as const).map((v) => (<button key={v} type="button" onClick={() => updateEstimate('planning', v)} className={`${chip} ${estimateData.planning === v ? "bg-primary text-primary-foreground border-primary" : ""}`}>{v === "Immediately" ? "Immediately" : `In ${v}`}</button>))}</div></div>
                                    <button onClick={() => setStep(3)} className={`${buttonPrimary} w-full h-14 text-lg mt-4`}>Continue <ArrowLeft className="w-5 h-5 ml-2 rotate-180" /></button>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6">
                                    <button onClick={handleShareLocation} className={`${buttonOutline} w-full h-12 bg-secondary`} type="button"><span className="inline-flex items-center gap-2 font-semibold text-foreground"><MapPin className="h-5 w-5 text-primary" /> Share my current location automatically</span></button>
                                    <div className="relative"><div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border/50" /></div><div className="relative flex justify-center text-xs font-bold uppercase"><span className="bg-background px-4 text-muted-foreground">or type manually</span></div></div>
                                    <div className="space-y-2"><label htmlFor="addr" className="text-sm font-semibold text-foreground">Enter your full address</label><input id="addr" className={inputBase} placeholder="House No, Street Name" value={estimateData.fullAddress} onChange={(e) => updateEstimate('fullAddress', e.target.value)} /></div>
                                    <div className="space-y-2"><label htmlFor="landmark" className="text-sm font-semibold text-foreground">Landmark</label><input id="landmark" className={inputBase} placeholder="Near..." value={estimateData.landmark} onChange={(e) => updateEstimate('landmark', e.target.value)} /></div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="space-y-2"><label className="text-sm font-semibold text-foreground">PIN Code</label><input className={inputBase} value={formData.pinCode} readOnly /></div>
                                        <div className="space-y-2"><label className="text-sm font-semibold text-foreground">City</label><input className={inputBase} value={formData.city || "Varanasi"} onChange={(e) => updateForm('city', e.target.value)} /></div>
                                        <div className="space-y-2"><label className="text-sm font-semibold text-foreground">State</label><input className={inputBase} value="Uttar Pradesh" readOnly /></div>
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <button onClick={() => setStep(2)} className={`${buttonOutline} h-14 px-6`} type="button">Back</button>
                                        <button onClick={handleCalculate} disabled={loading} className={`${buttonPrimary} flex-1 h-14 text-lg`}>{loading ? <Loader2 className="animate-spin h-6 w-6" /> : "Calculate Now!"}</button>
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                                    <div className="text-center space-y-2"><h3 className="text-2xl font-bold text-foreground">Your Solar Estimate</h3><p className="text-base text-muted-foreground">Based on your ₹{formData.monthlyBill} bill in {formData.city}</p></div>

                                    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 grid grid-cols-2 gap-6 text-center shadow-inner">
                                        <div><p className="text-sm font-medium text-muted-foreground mb-2">Required System Size</p><p className="text-3xl font-black text-foreground inline-flex items-center justify-center gap-2"><Zap className="h-6 w-6 text-yellow-500 fill-yellow-500" />{results.systemSize} kW</p></div>
                                        <div><p className="text-sm font-medium text-muted-foreground mb-2">Approx. Roof Area</p><p className="text-2xl font-bold text-foreground">{results.requiredRoofArea} sq. ft.</p></div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-bold mb-4 text-foreground">Estimated Savings</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                            <div className="rounded-2xl border border-border/50 bg-secondary p-5 text-center shadow-sm"><p className="text-sm font-medium text-muted-foreground mb-2">Monthly</p><p className="text-2xl font-black text-primary inline-flex items-center justify-center gap-1"><IndianRupee className="h-5 w-5" />{results.monthlySavings.toLocaleString('en-IN')}</p></div>
                                            <div className="rounded-2xl border border-border/50 bg-secondary p-5 text-center shadow-sm"><p className="text-sm font-medium text-muted-foreground mb-2">Yearly</p><p className="text-2xl font-black text-primary inline-flex items-center justify-center gap-1"><IndianRupee className="h-5 w-5" />{results.yearlySavings.toLocaleString('en-IN')}</p></div>
                                            <div className="rounded-2xl border border-primary bg-primary p-5 text-center shadow-lg"><p className="text-sm font-medium text-primary-foreground/80 mb-2">5-Year Saving</p><p className="text-3xl font-black text-primary-foreground inline-flex items-center justify-center gap-1"><IndianRupee className="h-6 w-6" />{results.fiveYearSavings.toLocaleString('en-IN')}</p></div>
                                        </div>

                                        <div className="rounded-2xl border border-border/50 bg-background p-6 shadow-sm mb-8">
                                            <h4 className="text-lg font-bold mb-6 inline-flex items-center gap-2 text-foreground"><TrendingUp className="h-5 w-5 text-primary" /> 25-Year Cost Projection</h4>
                                            <div className="h-[300px] w-full">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart
                                                        data={Array.from({ length: 26 }, (_, i) => ({
                                                            year: `Year ${i}`,
                                                            withoutSolar: i * results.yearlySavings * (1 + 0.05 * i), // Assuming 5% tariff hike
                                                            withSolar: i === 0 ? results.netCost : results.netCost,
                                                        }))}
                                                        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                                                    >
                                                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                                                        <XAxis dataKey="year" tick={{ fontSize: 12 }} strokeOpacity={0.5} tickFormatter={(val) => val.replace('Year ', '')} />
                                                        <YAxis tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`} tick={{ fontSize: 12 }} strokeOpacity={0.5} />
                                                        <Tooltip 
                                                            formatter={(value: any) => [`₹${(value || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, undefined]}
                                                            contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                                        />
                                                        <Legend />
                                                        <Line type="monotone" dataKey="withoutSolar" name="Cost Without Solar (Grid)" stroke="#ef4444" strokeWidth={3} dot={false} />
                                                        <Line type="monotone" dataKey="withSolar" name="Cost With Solar (One-time)" stroke="#10b981" strokeWidth={3} dot={false} />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                            <p className="text-xs text-muted-foreground text-center mt-4">Assumes a 5% annual increase in grid electricity tariffs.</p>
                                        </div>
                                    </div>

                                    {!!recommendedProducts.length && (
                                        <div>
                                            <h4 className="text-lg font-bold mb-4 inline-flex items-center gap-2 text-foreground"><ShoppingCart className="h-5 w-5 text-primary" /> Recommended Systems</h4>
                                            <div className={`grid grid-cols-1 ${recommendedProducts.length > 1 ? "md:grid-cols-2" : ""} gap-4`}>
                                                {recommendedProducts.map((p) => {
                                                    const id = `${p.brand}-${p.size}-${p.mountingType ?? 'default'}`;
                                                    const isSubmitting = submittingProductId === id;
                                                    return (
                                                        <div key={id} className="rounded-2xl border border-border/50 bg-background shadow-md p-5 flex flex-col hover:border-primary/50 transition-colors">
                                                            <div className="flex-1 space-y-3">
                                                                <div><p className="text-sm font-medium text-muted-foreground">Brand</p><p className="text-lg font-bold text-foreground">{p.brand}</p></div>
                                                                <div className="grid grid-cols-2 gap-3">
                                                                    <div><p className="text-sm font-medium text-muted-foreground">System Size</p><p className="font-semibold text-foreground">{p.size} kWp</p></div>
                                                                    <div><p className="text-sm font-medium text-muted-foreground">Phase</p><p className="font-semibold text-foreground">{p.phase}</p></div>
                                                                </div>
                                                                {p.mountingType && (<div><p className="text-sm font-medium text-muted-foreground">Mounting Type</p><p className="font-semibold text-foreground">{p.mountingType}</p></div>)}
                                                                {p.price ? (<div className="pt-4 mt-2 border-t border-border/50"><p className="text-sm font-medium text-muted-foreground mb-1">Est. Price (Before Subsidy)</p><p className="text-2xl font-black text-foreground">₹{p.price.toLocaleString('en-IN')}</p></div>) : null}
                                                            </div>
                                                            <button className={`${buttonPrimary} mt-5 h-12 w-full text-base`} onClick={() => handleDirectQuote(p)} disabled={isSubmitting}>{isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : "Request this Quote"}</button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    <div className="rounded-2xl border border-border/50 bg-secondary/50 p-6 space-y-4">
                                        <div className="flex items-center justify-between pb-4 border-b border-border/50">
                                            <p className="flex items-center gap-3 text-base text-foreground"><PiggyBank className="h-5 w-5 text-emerald-500" /><span className="font-semibold">Gross System Cost:</span></p>
                                            <p className="font-bold text-lg">₹{results.grossCost.toLocaleString('en-IN')}</p>
                                        </div>
                                        <div className="flex items-center justify-between pb-4 border-b border-border/50">
                                            <p className="flex items-center gap-3 text-base text-foreground"><IndianRupee className="h-5 w-5 text-amber-500" /><span className="font-semibold">Net Cost (after subsidy):</span></p>
                                            <p className="font-black text-xl text-primary">₹{results.netCost.toLocaleString('en-IN')}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="flex items-center gap-3 text-base text-foreground"><Timer className="h-5 w-5 text-orange-500" /><span className="font-semibold">Estimated Payback:</span></p>
                                            <p className="font-bold text-lg">{results.paybackYears} years</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                        <button onClick={() => setStep(0)} className={`${buttonOutline} flex-1 h-12 font-semibold`} type="button">Start New Estimate</button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
