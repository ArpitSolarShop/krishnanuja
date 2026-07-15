"use client";

import { useState, useEffect } from "react";
import { individualComponents, SolarComponent } from "@/lib/data/individualComponents";
import { Sun, FileText, Settings, Save, Trash2, Plus, Minus, CheckCircle, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { calculateSavings, defaultTerms } from "@/lib/companyDetails";
import { submitHeroLead } from "@/app/actions/leads";

// --- Types ---
interface CartItem {
  component: SolarComponent;
  quantity: number;
}

// --- Draggable Sidebar Card ---
function DraggableCard({ component, onAdd }: { component: SolarComponent, onAdd: () => void }) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("application/json", component.id);
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={onAdd}
      className={`bg-background border p-3 rounded-xl cursor-grab active:cursor-grabbing hover:border-primary/50 hover:shadow-md transition-all flex flex-col gap-2 border-border/50 relative`}
    >
      <div className="flex justify-between items-start pointer-events-none">
        <h4 className="font-semibold text-sm text-foreground leading-tight">
          {component.name}
        </h4>
        <span className="text-[10px] bg-secondary px-2 py-0.5 rounded-full font-medium text-muted-foreground whitespace-nowrap ml-2">
          {component.category}
        </span>
      </div>
      
      <p className="text-xs text-muted-foreground line-clamp-1 pointer-events-none mt-1">{component.spec}</p>
      <div className="mt-auto flex justify-between items-center pt-2 border-t border-border/50 pointer-events-none">
        <span className="font-bold text-sm">
          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(component.price)}
        </span>
        <span className="text-[10px] text-muted-foreground">/{component.unit}</span>
      </div>
    </div>
  );
}

// --- Main Builder Component ---
export default function AdvancedSystemBuilder() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [draftSaved, setDraftSaved] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Lead capture modal state
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadAddress, setLeadAddress] = useState("");
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [leadError, setLeadError] = useState("");

  // Category Filters
  const [coreFilter, setCoreFilter] = useState<string>("All");
  const [bosFilter, setBosFilter] = useState<string>("All");
  const [systemType, setSystemType] = useState<keyof typeof defaultTerms>("On-grid");

  // Load draft & set mounted
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    const saved = localStorage.getItem("solarDraft");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  // Split components
  // const primaryComponents = individualComponents.filter(c => ['Panel', 'Inverter', 'Battery'].includes(c.category));
  const bosComponents = individualComponents.filter(c => ['Structure', 'Electrical', 'Cable', 'Earthing', 'Service'].includes(c.category));

  // Math
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };
  const totalKwp = cart.reduce((acc, item) => acc + (item.component.kWp ? item.component.kWp * item.quantity : 0), 0);
  const calculateSubsidy = (kWp: number) => {
    if (kWp <= 0) return 0;
    if (kWp <= 2) return kWp * 30000;
    if (kWp > 2 && kWp <= 3) return 60000 + ((kWp - 2) * 18000);
    return 78000;
  };
  const basePrice = cart.reduce((acc, item) => acc + (item.component.price * item.quantity), 0);
  const gstAmount = cart.reduce((acc, item) => acc + ((item.component.price * item.quantity) * (item.component.gstRate / 100)), 0);
  const totalSubsidy = calculateSubsidy(totalKwp);
  const grandTotal = basePrice + gstAmount - totalSubsidy;
  const savings = calculateSavings(totalKwp, basePrice + gstAmount, totalSubsidy, 0);

  // const hasVFD = cart.some(item => item.component.name.includes("VFD") || item.component.spec.includes("VFD"));
  // const hasBattery = cart.some(item => item.component.category === 'Battery');
  // const hasPanels = cart.some(item => item.component.category === 'Panel');

  // Removed local systemType inference to use explicitly selected systemType from state

  // Actions
  const addToCart = (component: SolarComponent) => {
    setCart(prev => {
      const existing = prev.find(item => item.component.id === component.id);
      if (existing) {
        return prev.map(item => item.component.id === component.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { component, quantity: 1 }];
    });
    setDraftSaved(false);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.component.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
    setDraftSaved(false);
  };

  const saveDraft = () => {
    localStorage.setItem("solarDraft", JSON.stringify(cart));
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 3000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); 
    setIsOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const componentId = e.dataTransfer.getData("application/json");
    if (componentId) {
      const component = individualComponents.find(c => c.id === componentId);
      if (component) {
        addToCart(component);
      }
    }
  };

  if (!isMounted) {
    return <div className="min-h-[80vh] flex items-center justify-center text-muted-foreground animate-pulse">Loading Builder...</div>;
  }

  return (
    <div className="grid lg:grid-cols-12 gap-6 min-h-[80vh] print:block print:min-h-0">
        
        {/* LEFT COLUMN: Core Parts */}
        <div className="lg:col-span-3 bg-secondary/20 rounded-3xl p-5 border border-border/50 flex flex-col h-full max-h-[85vh] overflow-hidden print:hidden">
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Sun className="w-5 h-5 text-primary" /> Core Components
          </h2>

          <div className="mb-4">
            <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">System Type</label>
            <select 
              className="w-full border rounded-md px-3 py-2 text-sm font-medium bg-background shadow-sm"
              value={systemType}
              onChange={(e) => {
                setSystemType(e.target.value as keyof typeof defaultTerms);
                setCart([]); // Clear cart when system type changes
              }}
            >
              <option value="On-grid">On-grid System</option>
              <option value="Hybrid">Hybrid System</option>
              <option value="Off-grid">Off-grid System</option>
              <option value="VFD/Drive">VFD/Drive</option>
            </select>
          </div>
          
          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {['All', 'Panel', 'Inverter', 'Battery'].map(cat => (
              <button 
                key={cat}
                onClick={() => setCoreFilter(cat)}
                className={`text-[10px] px-3 py-1.5 rounded-full transition-colors font-medium border ${
                  coreFilter === cat 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-background hover:bg-secondary border-border'
                }`}
              >
                {cat === 'All' ? 'All' : cat + 's'}
              </button>
            ))}
          </div>

          <div className="overflow-y-auto pr-2 space-y-4 flex-grow hide-scrollbar">
            {['Panel', 'Inverter', 'Battery'].filter(cat => coreFilter === 'All' || coreFilter === cat).map(category => {
              // Hide Battery category completely if On-grid or VFD
              if (category === 'Battery' && (systemType === 'On-grid' || systemType === 'VFD/Drive')) return null;
              
              const filteredComponents = individualComponents
                .filter(c => c.category === category)
                .filter(c => {
                  if (c.category !== 'Inverter') return true;
                  // Filter inverters based on System Type
                  const spec = c.spec.toLowerCase();
                  if (systemType === 'On-grid') return spec.includes('on-grid');
                  if (systemType === 'Hybrid') return spec.includes('hybrid');
                  if (systemType === 'Off-grid') return spec.includes('off-grid') || spec.includes('pwm') || spec.includes('mppt');
                  if (systemType === 'VFD/Drive') return spec.includes('vfd');
                  return true;
                });

              if (filteredComponents.length === 0) return null;

              return (
                <div key={category} className="space-y-2">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider sticky top-0 bg-secondary/90 backdrop-blur py-1 z-10 rounded">{category}s</h3>
                  <div className="grid gap-2">
                    {filteredComponents.map(c => (
                      <DraggableCard key={c.id} component={c} onAdd={() => addToCart(c)} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-muted-foreground mt-4 text-center">Drag a card to the blueprint</p>
        </div>

        {/* CENTER COLUMN: The Blueprint Canvas */}
        <div 
          className="lg:col-span-6 flex flex-col h-full print:w-full"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Action Bar */}
          <div className="flex justify-between items-center mb-4 print:hidden">
            <h2 className="text-xl font-bold">System Blueprint</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setCart([])} disabled={cart.length === 0} className="text-destructive hover:text-destructive">
                <Trash2 className="w-4 h-4 mr-2" /> Clear
              </Button>
              <Button variant="outline" size="sm" onClick={saveDraft} disabled={cart.length === 0}>
                <Save className="w-4 h-4 mr-2" /> {draftSaved ? "Saved!" : "Save Draft"}
              </Button>
              <Button size="sm" onClick={() => setShowLeadModal(true)} disabled={cart.length === 0}>
                <Send className="w-4 h-4 mr-2" /> Get Your Free Quote
              </Button>
            </div>
          </div>

          {/* Drop Zone */}
          <div 
            className={`flex-grow min-h-[500px] border-2 rounded-3xl flex flex-col transition-all duration-300 overflow-hidden print:border-none print:p-0 ${
              isOver ? "border-primary border-dashed bg-primary/10 shadow-lg scale-[1.01]" : "border-border/50 bg-background shadow-sm"
            }`}
          >
            {cart.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center p-8 pointer-events-none text-muted-foreground transition-opacity">
                <Settings className={`w-12 h-12 mb-4 transition-all duration-500 ${isOver ? 'text-primary scale-125 animate-spin' : 'opacity-20'}`} />
                <p className={`text-lg font-medium ${isOver ? 'text-primary' : ''}`}>
                  {isOver ? "Drop to add to blueprint!" : "Your blueprint is empty"}
                </p>
                <p className="text-sm mt-2">Drag components from the sidebars into this area.</p>
              </div>
            ) : (
              <div className="flex flex-col h-full print:h-auto">
                {/* Items List */}
                <div className="flex-grow overflow-y-auto p-4 space-y-3 hide-scrollbar print:overflow-visible print:p-0">
                  <div className="hidden print:block mb-6 text-center">
                    <h1 className="text-3xl font-bold mb-2">Solar System Quotation</h1>
                    <p className="text-muted-foreground">Generated by Krishnanuja Renewables</p>
                  </div>

                  <div className="bg-secondary/30 rounded-xl p-4 mb-4 flex justify-between items-center print:bg-transparent print:border-b print:rounded-none">
                    <div>
                      <p className="text-sm text-muted-foreground">System Capacity</p>
                      <p className="text-2xl font-bold text-foreground">{totalKwp.toFixed(2)} kWp</p>
                    </div>
                    {totalSubsidy > 0 && (
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground flex items-center justify-end gap-1"><CheckCircle className="w-3 h-3 text-green-600"/> Est. PM Surya Ghar Subsidy</p>
                        <p className="text-xl font-bold text-green-600">{formatCurrency(totalSubsidy)}</p>
                      </div>
                    )}
                  </div>

                  <table className="w-full text-sm print:text-xs">
                    <thead className="text-muted-foreground border-b border-border text-left">
                      <tr>
                        <th className="pb-2 font-medium w-1/2">Item Description</th>
                        <th className="pb-2 font-medium text-center">Qty</th>
                        <th className="pb-2 font-medium text-right">Price</th>
                        <th className="pb-2 font-medium text-right print:hidden">GST</th>
                        <th className="pb-2 font-medium text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {cart.map(item => (
                        <tr key={item.component.id} className="group hover:bg-secondary/10 print:hover:bg-transparent transition-colors">
                          <td className="py-3">
                            <p className="font-semibold text-foreground">{item.component.name}</p>
                            <p className="text-xs text-muted-foreground">{item.component.brand} - {item.component.spec}</p>
                          </td>
                          <td className="py-3 text-center">
                            <div className="flex items-center justify-center gap-2 print:hidden">
                              <button onClick={() => updateQuantity(item.component.id, -1)} className="p-1 rounded bg-secondary hover:bg-border transition-colors"><Minus className="w-3 h-3" /></button>
                              <span className="w-6 text-center font-medium">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.component.id, 1)} className="p-1 rounded bg-secondary hover:bg-border transition-colors"><Plus className="w-3 h-3" /></button>
                            </div>
                            <span className="hidden print:inline">{item.quantity} {item.component.unit}</span>
                          </td>
                          <td className="py-3 text-right">{formatCurrency(item.component.price)}</td>
                          <td className="py-3 text-right text-muted-foreground text-xs print:hidden">{item.component.gstRate}%</td>
                          <td className="py-3 text-right font-medium">{formatCurrency(item.component.price * item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {/* Drag and Drop hint removed to keep UI clean */}
                  
                  {/* Savings & ROI Visual Block */}
                  {totalKwp > 0 && (
                    <div className="mt-8 bg-secondary/20 border border-border rounded-2xl p-5 print:mt-4 print:border-none print:p-0 print:bg-none">
                      <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Estimated Financials & Savings</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Daily Generation</p>
                          <p className="text-lg font-bold">{savings.unitsPerDay} <span className="text-sm font-normal text-muted-foreground">Units</span></p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Annual Generation</p>
                          <p className="text-lg font-bold">{savings.annualUnits} <span className="text-sm font-normal text-muted-foreground">Units</span></p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Annual Savings</p>
                          <p className="text-lg font-bold text-green-600">{formatCurrency(savings.annualSavings)}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Return on Investment</p>
                          <p className="text-lg font-bold text-primary">{savings.roiYears} <span className="text-sm font-normal text-muted-foreground">Years</span></p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Totals Footer */}
                <div className="bg-secondary/20 p-6 border-t border-border mt-auto print:bg-transparent print:border-t-2 print:border-foreground">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base Total</span>
                      <span className="font-medium">{formatCurrency(basePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated GST</span>
                      <span className="font-medium">{formatCurrency(gstAmount)}</span>
                    </div>
                    {totalSubsidy > 0 && (
                      <div className="flex justify-between text-green-600 font-medium">
                        <span>Subsidy Deduction</span>
                        <span>-{formatCurrency(totalSubsidy)}</span>
                      </div>
                    )}
                    <div className="pt-4 mt-2 border-t border-border flex justify-between items-center">
                      <span className="text-lg font-bold">Grand Total</span>
                      <span className="text-3xl font-black text-primary">{formatCurrency(grandTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions - Print Only Page 2 */}
                <div className="hidden print:block print:break-before-page pt-8">
                  <h2 className="text-2xl font-bold mb-6 border-b pb-2">Terms & Conditions ({systemType})</h2>
                  <ol className="list-decimal pl-5 space-y-3 text-sm text-foreground/80">
                    {defaultTerms[systemType].map((term, i) => (
                      <li key={i} className="pl-2">
                        <span className="font-semibold text-foreground">{term.split(':')[0]}:</span>
                        {term.split(':')[1]}
                      </li>
                    ))}
                  </ol>
                  <div className="mt-16 pt-8 border-t flex justify-between">
                    <div>
                      <p className="text-sm font-semibold">For Krishnanuja Renewables Pvt Ltd</p>
                      <div className="h-16 mt-2"></div>
                      <p className="text-xs text-muted-foreground">Authorized Signatory</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">Accepted By</p>
                      <div className="h-16 mt-2"></div>
                      <p className="text-xs text-muted-foreground">Customer Signature</p>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: BoS Components */}
        <div className="lg:col-span-3 bg-secondary/20 rounded-3xl p-5 border border-border/50 flex flex-col h-full max-h-[85vh] overflow-hidden print:hidden">
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" /> BoS & Services
          </h2>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {['All', 'Structure', 'Electrical', 'Cable', 'Earthing', 'Service'].map(cat => (
              <button 
                key={cat}
                onClick={() => setBosFilter(cat)}
                className={`text-[10px] px-3 py-1.5 rounded-full transition-colors font-medium border ${
                  bosFilter === cat 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-background hover:bg-secondary border-border'
                }`}
              >
                {cat === 'All' ? 'All' : cat === 'Electrical' ? 'Electrical' : cat + 's'}
              </button>
            ))}
          </div>

          <div className="overflow-y-auto pr-2 space-y-4 flex-grow hide-scrollbar">
            {['Structure', 'Electrical', 'Cable', 'Earthing', 'Service'].filter(cat => bosFilter === 'All' || bosFilter === cat).map(category => (
              <div key={category} className="space-y-2">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider sticky top-0 bg-background/95 backdrop-blur py-1 z-10 rounded">{category}s</h3>
                <div className="grid gap-2">
                  {bosComponents.filter(c => c.category === category).map(c => (
                    <DraggableCard key={c.id} component={c} onAdd={() => addToCart(c)} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-4 text-center">Drag a card to the blueprint</p>
        </div>

        {/* Lead Capture Modal */}
        <Dialog open={showLeadModal} onOpenChange={(open) => {
          setShowLeadModal(open);
          if (!open) {
            setLeadSuccess(false);
            setLeadError("");
          }
        }}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {leadSuccess ? "🎉 Quote Request Submitted!" : "Get Your Free Quote"}
              </DialogTitle>
            </DialogHeader>

            {leadSuccess ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-muted-foreground">
                  Thank you, <strong>{leadName}</strong>! Our solar experts will contact you shortly with a detailed quotation for your <strong>{totalKwp.toFixed(1)} kWp</strong> system.
                </p>
                <p className="text-sm text-muted-foreground">
                  Estimated system cost: <strong>{formatCurrency(grandTotal)}</strong>
                </p>
                <div className="flex gap-3 justify-center pt-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowLeadModal(false);
                      setLeadSuccess(false);
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      window.location.href = "/#get-quote";
                    }}
                  >
                    View ROI Calculator
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLeadSubmitting(true);
                  setLeadError("");

                  // Build system summary for the lead
                  const systemSummary = cart.map(item => `${item.component.name} x${item.quantity}`).join(", ");
                  const billSummary = `${totalKwp.toFixed(1)}kWp ${systemType} System | ${formatCurrency(grandTotal)} | Items: ${systemSummary}`;

                  try {
                    const result = await submitHeroLead({
                      name: leadName,
                      phone: leadPhone,
                      bill: billSummary,
                      timeline: "System Builder Quote",
                      address: leadAddress,
                    });

                    if (result.success) {
                      setLeadSuccess(true);
                    } else {
                      setLeadError("Something went wrong. Please try again.");
                    }
                  } catch {
                    setLeadError("Network error. Please check your connection.");
                  } finally {
                    setLeadSubmitting(false);
                  }
                }}
                className="space-y-4 pt-2"
              >
                <p className="text-sm text-muted-foreground">
                  Enter your details and our team will prepare a personalized quotation for your <strong>{totalKwp.toFixed(1)} kWp</strong> solar system.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Full Name *</label>
                    <Input
                      placeholder="Enter your full name"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">WhatsApp / Phone *</label>
                    <Input
                      placeholder="Enter your phone number"
                      type="tel"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      required
                      pattern="[0-9]{10}"
                      title="Please enter a 10-digit phone number"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Location / Address</label>
                    <Input
                      placeholder="City or full address"
                      value={leadAddress}
                      onChange={(e) => setLeadAddress(e.target.value)}
                    />
                  </div>
                </div>

                {/* System Summary */}
                <div className="bg-secondary/50 rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">System Size</span>
                    <span className="font-semibold">{totalKwp.toFixed(1)} kWp ({systemType})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Components</span>
                    <span className="font-semibold">{cart.length} items</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <span className="text-muted-foreground font-medium">Estimated Total</span>
                    <span className="font-bold text-primary">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>

                {leadError && (
                  <p className="text-sm text-red-500 font-medium">{leadError}</p>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-bold"
                  disabled={leadSubmitting || !leadName.trim() || !leadPhone.trim()}
                >
                  {leadSubmitting ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
                  ) : (
                    <><Send className="w-4 h-4 mr-2" /> Submit & Get Quote</>
                  )}
                </Button>

                <p className="text-[10px] text-muted-foreground text-center">
                  By submitting, you agree to be contacted by our team regarding your solar installation.
                </p>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
  );
}
