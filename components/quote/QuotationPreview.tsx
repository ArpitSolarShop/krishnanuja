"use client";

import React, { forwardRef, useEffect, useState } from "react";
import type { QuotationComponent, ServiceItem } from "@/types/quote";
import { companies } from "@/lib/companyDetails";

type Company = (typeof companies)[number];

type QuoteCalculations = {
  originalBasePrice: number;
  gstAmount: number;
  totalAmount: number;
  effectiveCost: number;
  totalSubsidy: number;
  centralSubsidy: number;
  stateSubsidy: number;
  annualUnits: number;
  annualSavings: number;
  roiYears: number;
};

type ExtraCosts = {
  structureCost: number;
  panelsCost: number;
  wireCost: number;
};

const emptyCalculations: QuoteCalculations = {
  originalBasePrice: 0,
  gstAmount: 0,
  totalAmount: 0,
  effectiveCost: 0,
  totalSubsidy: 0,
  centralSubsidy: 0,
  stateSubsidy: 0,
  annualUnits: 0,
  annualSavings: 0,
  roiYears: 0,
};

const emptyExtraCosts: ExtraCosts = { structureCost: 0, panelsCost: 0, wireCost: 0 };

export interface QuotationPreviewProps {
  activeCompany: Company;
  isServiceMode: boolean;
  currentDate: string;
  serviceRefNumber?: string;
  serviceProposalTitle?: string;
  customerName: string;
  customerAddress?: string;
  customerPhone?: string;
  serviceItems?: ServiceItem[];
  serviceSubtotal?: number;
  serviceGst?: number;
  serviceGstAmount?: number;
  serviceGrandTotal?: number;
  serviceTerms?: string[];
  quoteNumber?: string;
  actualSystemSize?: number;
  phase?: number;
  effectivePanelBrand?: string;
  panelWattage?: number;
  panelType?: string;
  panelWarranty?: string;
  effectiveInverterBrand?: string;
  inverterModel?: string;
  inverterWarranty?: string;
  effectiveBatteryWarranty?: string;
  selectedSystemType?: string;
  components?: QuotationComponent[];
  calculations?: QuoteCalculations;
  extraCosts?: ExtraCosts;
  extraPanelCount?: number;
  extraWireLength?: number;
  gstRate?: number;
  terms?: string[];
}

export const QuotationPreview = forwardRef<HTMLDivElement, QuotationPreviewProps>((props, ref) => {
  const {
    activeCompany,
    isServiceMode,
    currentDate,
    serviceRefNumber,
    serviceProposalTitle,
    customerName,
    customerAddress,
    customerPhone,
    serviceItems = [],
    serviceSubtotal = 0,
    serviceGst = 18,
    serviceGstAmount = 0,
    serviceGrandTotal = 0,
    serviceTerms = [],
    quoteNumber,
    actualSystemSize,
    phase,
    effectivePanelBrand,
    panelWattage,
    panelType,
    panelWarranty,
    effectiveInverterBrand,
    inverterModel,
    inverterWarranty,
    effectiveBatteryWarranty,
    selectedSystemType,
    components = [],
    calculations = emptyCalculations,
    extraCosts = emptyExtraCosts,
    extraPanelCount,
    extraWireLength,
    gstRate,
    terms = [],
  } = props;

  const [origin, setOrigin] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN').format(Math.round(amount || 0));
  };

  return (
    <div 
      ref={ref} 
      className="print-page bg-white text-slate-800"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "15mm",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        fontFamily: "'Segoe UI', sans-serif",
        fontSize: "11px",
        boxSizing: "border-box"
      }}
    >
      {isServiceMode ? (
        <>
          {/* Service Header */}
          <div className="flex justify-between items-start border-b-[4px] border-blue-800 pb-3 mb-3">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={origin ? `${origin}${activeCompany.logo}` : activeCompany.logo} alt="Logo" className="max-h-20" />
              <div>
                <h1 className={`font-black text-blue-800 tracking-tight leading-tight uppercase ${activeCompany.name.length > 25 ? 'text-base' : 'text-2xl'}`}>
                  {activeCompany.name}
                </h1>
                <p className="text-[10px] font-semibold text-slate-500 mt-1 tracking-widest uppercase">{activeCompany.tagline}</p>
                <div className="text-[9px] text-slate-500 mt-2">
                  <p className="text-blue-800 font-bold mb-1">GSTIN: {activeCompany.gstin}{activeCompany.cin ? ` | CIN: ${activeCompany.cin}` : ''}</p>
                  <p><strong>Office:</strong> {activeCompany.headOffice}</p>
                  {activeCompany.warehouse && <p><strong>Warehouse:</strong> {activeCompany.warehouse}</p>}
                  <p>📞 +91 {activeCompany.phone}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-blue-800 text-white px-4 py-1.5 text-[11px] font-black rounded mb-2 uppercase tracking-widest inline-block">Service Proposal</div>
              <p className="text-[11px] text-slate-500 font-bold">Date: {currentDate}</p>
              <p className="text-[10px] text-slate-400">Reference: {serviceRefNumber}</p>
            </div>
          </div>

          <div className="text-center mb-6 py-3 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="text-base font-black text-blue-800 uppercase tracking-widest">{serviceProposalTitle}</h2>
          </div>

          <div className="mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200 break-inside-avoid">
            <h3 className="font-bold text-blue-800 mb-2 uppercase text-[10px] tracking-widest border-b border-slate-200 pb-1">Prepared For</h3>
            <p className="font-black text-blue-900 text-base">{customerName || "________________"}</p>
            {customerAddress && <p className="text-slate-600 font-medium text-[11px] italic mt-1">{customerAddress}</p>}
            {customerPhone && <p className="text-slate-600 font-medium text-[11px] mt-1">📞 {customerPhone}</p>}
          </div>

          <div className="mb-2">
            <h3 className="font-black text-blue-800 uppercase text-[11px] tracking-widest mb-2 border-b-2 border-blue-800 pb-1 inline-block">Commercial Details</h3>
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200 mb-6">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="bg-blue-50 text-blue-800 border-b-2 border-blue-200">
                  <th className="p-2.5 text-center w-10">S.No.</th>
                  <th className="p-2.5 text-left">Description</th>
                  <th className="p-2.5 text-center w-20">HSN/SAC</th>
                  <th className="p-2.5 text-center w-10">Qty</th>
                  <th className="p-2.5 text-center w-[60px]">Unit</th>
                  <th className="p-2.5 text-right w-[110px]">Rate (INR)</th>
                  <th className="p-2.5 text-right w-[110px]">Amount (INR)</th>
                </tr>
              </thead>
              <tbody>
                {serviceItems.map((item, i) => (
                  <tr key={i} className={`border-b border-slate-200 ${i % 2 === 1 ? 'bg-slate-50' : 'bg-white'}`}>
                    <td className="p-2.5 text-center font-bold">{item.sno}</td>
                    <td className="p-2.5 font-semibold">
                      {item.description}
                      {item.unit === "Month" ? (
                        <><br /><span className="text-[9px] text-slate-500">(Rate: ₹{formatCurrency(item.rate)}/Month)</span></>
                      ) : item.monthlyRate ? (
                        <><br /><span className="text-[9px] text-slate-500">(Monthly Rate: ₹{formatCurrency(item.monthlyRate)})</span></>
                      ) : null}
                    </td>
                    <td className="p-2.5 text-center text-slate-500">{item.hsnSac}</td>
                    <td className="p-2.5 text-center font-bold">{item.qty}</td>
                    <td className="p-2.5 text-center">{item.unit === "Month" ? "Per Month" : item.unit}</td>
                    <td className="p-2.5 text-right font-semibold">{formatCurrency(item.rate)}</td>
                    <td className="p-2.5 text-right font-bold">{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mb-6 break-inside-avoid">
            <div className="w-1/2 border border-slate-200 rounded-lg overflow-hidden">
              <div className="flex justify-between p-2.5 border-b border-slate-200 bg-slate-50">
                <span className="text-[11px] font-semibold">Sub Total:</span>
                <span className="text-[11px] font-bold">₹ {formatCurrency(serviceSubtotal)}</span>
              </div>
              <div className="flex justify-between p-2.5 border-b border-slate-200">
                <span className="text-[11px] font-semibold">{serviceGst}% GST:</span>
                <span className="text-[11px] font-bold">₹ {formatCurrency(serviceGstAmount)}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-blue-800 text-white">
                <span className="text-[13px] font-black">Grand Total:</span>
                <span className="text-[13px] font-black">₹ {formatCurrency(serviceGrandTotal)}</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] border-t border-slate-200 pt-4 mb-6 break-inside-avoid">
            <h3 className="font-black text-blue-800 uppercase mb-2 tracking-widest text-[11px]">Terms & Conditions</h3>
            <ol className="pl-6 text-slate-600 m-0 space-y-1 list-decimal">
              {serviceTerms.map((term, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: term.replace(/^([^:]+):/, '<strong>$1:</strong>') }} />
              ))}
            </ol>
          </div>

          <div className="mt-10 flex justify-between items-end px-4 break-inside-avoid">
            <div className="text-center">
              <p className="text-[10px] font-bold text-blue-900 mb-1">Client Acceptance</p>
              <div className="w-40 h-16"></div>
              <div className="w-40 h-[1px] bg-slate-300 mx-auto mb-1"></div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Authorized Signatory</p>
              <p className="text-[9px] text-slate-600 font-semibold mt-1">{customerName || "Client"}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-blue-800 underline underline-offset-4">For {activeCompany.name}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={origin ? `${origin}${activeCompany.signature || '/signature.png'}` : (activeCompany.signature || '/signature.png')} alt="Signature" className="w-48 h-20 object-contain ml-auto my-2" />
              <div className="w-48 h-[1px] bg-slate-300 ml-auto mb-1"></div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Authorized Signatory</p>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Solar Header */}
          <div className="flex justify-between items-start border-b-[4px] border-yellow-500 pb-3 mb-3">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={origin ? `${origin}${activeCompany.logo}` : activeCompany.logo} alt="Logo" className="max-h-20" />
              <div>
                <h1 className={`font-black text-slate-800 tracking-tight leading-none uppercase ${activeCompany.name.length > 25 ? 'text-lg' : 'text-[26px]'}`}>
                  {activeCompany.name}
                </h1>
                <p className="text-[10px] font-semibold text-slate-500 mt-1 tracking-widest uppercase">{activeCompany.tagline}</p>
                <div className="text-[10px] text-slate-500 mt-2">
                  <p className="text-blue-700 font-bold mb-1">GSTIN: {activeCompany.gstin}{activeCompany.cin ? ` | CIN: ${activeCompany.cin}` : ''}</p>
                  <p><strong>HO:</strong> {activeCompany.headOffice}</p>
                  {activeCompany.warehouse && <p><strong>WH:</strong> {activeCompany.warehouse}</p>}
                  <p><strong>Contact:</strong> {activeCompany.phone}{activeCompany.email ? ` | Email: ${activeCompany.email}` : ''}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-yellow-500 text-white px-4 py-1.5 text-base font-black rounded mb-2 uppercase tracking-widest inline-block">Quotation</div>
              <p className="text-[12px] text-slate-500 font-bold">Date: {currentDate}</p>
              {quoteNumber && <p className="text-[10px] text-slate-400">Quote No: {quoteNumber}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6 break-inside-avoid">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 overflow-hidden">
              <h3 className="font-bold text-slate-800 mb-2 uppercase text-[10px] tracking-widest border-b border-slate-200 pb-1">Customer Details</h3>
              <p className="font-black text-blue-800 text-base break-words">{customerName || "________________"}</p>
              {customerAddress && <p className="text-slate-600 font-medium text-[11px] italic mt-1 break-words">{customerAddress}</p>}
              {customerPhone && <p className="text-slate-600 font-medium text-[11px] mt-1">Mo No: {customerPhone}</p>}
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 overflow-hidden">
              <h3 className="font-bold text-slate-800 mb-2 uppercase text-[10px] tracking-widest border-b border-slate-200 pb-1">System Overview</h3>
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between"><span className="text-slate-600">System Size:</span> <strong className="text-right">{actualSystemSize} KW ({phase === 1 ? "Single Phase" : "Three Phase"})</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Modules:</span> <strong className="text-right max-w-[60%] break-words">{effectivePanelBrand} {panelWattage}Wp ({panelType})</strong></div>
                <div className="flex justify-between text-slate-600"><span>Module Warranty:</span> <strong>{panelWarranty}</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Inverter:</span> <strong className="text-right max-w-[60%] break-words">{effectiveInverterBrand} {inverterModel}</strong></div>
                <div className="flex justify-between text-slate-600"><span>Inverter Warranty:</span> <strong>{inverterWarranty}</strong></div>
                {(selectedSystemType === "Hybrid" || selectedSystemType === "Off-grid") && (
                  <div className="flex justify-between text-slate-600"><span>Battery Warranty:</span> <strong>{effectiveBatteryWarranty}</strong></div>
                )}
                <div className="flex justify-between"><span className="text-slate-600">Type:</span> <strong>{selectedSystemType}</strong></div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200 mb-6">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                  <th className="p-2.5 text-center w-[30px]">S.N</th>
                  <th className="p-2.5 text-left w-1/4">Components</th>
                  <th className="p-2.5 text-left">Description</th>
                  <th className="p-2.5 text-center w-[60px]">Qty</th>
                  <th className="p-2.5 text-center w-[80px]">Make</th>
                </tr>
              </thead>
              <tbody>
                {components.map((comp, index) => (
                  <tr key={index} className={`border-b border-slate-200 ${index % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}`}>
                    <td className="p-2 text-center font-bold text-slate-500">{index + 1}</td>
                    <td className="p-2 font-bold text-slate-800">{comp.name}</td>
                    <td className={`p-2 ${index < 2 ? 'text-slate-800 font-semibold' : 'text-slate-600'}`}>{comp.description}</td>
                    <td className="p-2 text-center font-bold text-slate-700">{comp.quantity}</td>
                    <td className="p-2 text-center font-bold text-blue-800">{comp.make}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6 break-inside-avoid">
            <div>
              {calculations.totalSubsidy > 0 && (
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                  <h3 className="font-black text-green-800 text-[10px] uppercase mb-2 tracking-widest">PM Surya Ghar Subsidy</h3>
                  <div className="flex justify-between text-[12px] py-1 border-b border-green-200"><span className="text-green-700">Central Subsidy:</span><strong className="text-green-900">₹ {formatCurrency(calculations.centralSubsidy || 0)}/-</strong></div>
                  <div className="flex justify-between text-[12px] py-1 border-b border-green-200"><span className="text-green-700">State Subsidy:</span><strong className="text-green-900">₹ {formatCurrency(calculations.stateSubsidy || 0)}/-</strong></div>
                  <div className="flex justify-between text-[14px] pt-3 font-black text-green-800 uppercase"><span>Total Benefit:</span><span className="text-[18px]">₹ {formatCurrency(calculations.totalSubsidy)}/-</span></div>
                </div>
              )}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-[10px]">
                <h3 className="font-black text-slate-800 uppercase mb-2 border-b border-blue-200 pb-1">Bank Details</h3>
                <p className="my-1"><strong>A/c Name:</strong> {activeCompany.bank.accountName}</p>
                {activeCompany.bank.accountNumber && <p className="my-1"><strong>A/c No:</strong> {activeCompany.bank.accountNumber} | <strong>IFSC:</strong> {activeCompany.bank.ifsc}</p>}
                {activeCompany.bank.name && <p className="my-1"><strong>Bank:</strong> {activeCompany.bank.name}{activeCompany.bank.branch ? `, ${activeCompany.bank.branch}` : ''}</p>}
                <div className="mt-3 pt-2 border-t border-dashed border-slate-300 text-center">
                  <p className="font-bold text-slate-800 text-[10px] mb-1">Scan to Pay</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={origin ? `${origin}/payment.png` : "/payment.png"} alt="Payment QR" className="w-24 h-24 object-contain mix-blend-multiply mx-auto block" />
                  <p className="text-[8px] text-slate-500 mt-1">Click or Scan with UPI App</p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-5 rounded-lg border border-blue-200 flex flex-col">
              <h3 className="font-bold text-slate-800 text-[10px] uppercase mb-3 tracking-widest border-b border-blue-200 pb-1">Investment Summary</h3>
              <div className="flex justify-between text-[11px] py-1 text-slate-600"><span>Base Price:</span><span>₹ {formatCurrency(calculations.originalBasePrice || 0)}</span></div>
              {extraCosts?.structureCost > 0 && <div className="flex justify-between text-[11px] py-1 text-amber-600"><span>+ Extra Structure:</span><span>₹ {formatCurrency(extraCosts.structureCost)}</span></div>}
              {extraCosts?.panelsCost > 0 && <div className="flex justify-between text-[11px] py-1 text-amber-600"><span>+ Extra Panels ({extraPanelCount}):</span><span>₹ {formatCurrency(extraCosts.panelsCost)}</span></div>}
              {extraCosts?.wireCost > 0 && <div className="flex justify-between text-[11px] py-1 text-amber-600"><span>+ Extra Wire ({extraWireLength}m):</span><span>₹ {formatCurrency(extraCosts.wireCost)}</span></div>}
              <div className="flex justify-between text-[11px] py-1 text-slate-600 border-b border-slate-200 pb-2 mb-1"><span>GST (@ {gstRate}%):</span><span>₹ {formatCurrency(calculations.gstAmount || 0)}</span></div>
              <div className="flex justify-between text-base font-black text-slate-800 pt-2"><span className="text-[11px] uppercase self-center">Total Amount:</span><span className="text-blue-800">₹ {formatCurrency(calculations.totalAmount || 0)}</span></div>
              
              <div className="mt-auto pt-4">
                <div className="p-3 bg-blue-100 border border-blue-300 rounded-lg text-center">
                  <p className="text-[9px] text-blue-800 uppercase font-black tracking-widest mb-1">{calculations.totalSubsidy > 0 ? "Effective Cost After Subsidy" : "Effective Cost"}</p>
                  <p className="text-2xl font-black text-green-600 tracking-tight">₹ {formatCurrency(calculations.effectiveCost || 0)}*</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden mb-6">
            <h3 className="font-bold text-slate-800 text-[10px] uppercase mb-2 tracking-widest border-b border-slate-200 pb-1">Breakdown of Savings & Financials</h3>
            <table className="w-full text-[11px] border-collapse border border-slate-200 rounded-lg">
              <thead>
                <tr className="bg-slate-50 text-slate-500">
                  <th className="p-2 text-center border-b border-slate-200 w-10">S.No</th>
                  <th className="p-2 text-left border-b border-slate-200">Content</th>
                  <th className="p-2 text-right border-b border-slate-200">Amount / Details</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 text-center border-b border-slate-200">1</td><td className="p-2 border-b border-slate-200">Proposed Solar Plant Size</td><td className="p-2 text-right font-bold border-b border-slate-200">{actualSystemSize} KW</td></tr>
                <tr><td className="p-2 text-center border-b border-slate-200">2</td><td className="p-2 border-b border-slate-200">Annual Units Generation (approx.)</td><td className="p-2 text-right font-bold border-b border-slate-200">{calculations.annualUnits} Units</td></tr>
                <tr><td className="p-2 text-center border-b border-slate-200">3</td><td className="p-2 border-b border-slate-200">Average Grid Electricity Rate</td><td className="p-2 text-right font-bold border-b border-slate-200">Rs. 6.5 / Unit</td></tr>
                <tr><td className="p-2 text-center border-b border-slate-200">4</td><td className="p-2 border-b border-slate-200"><strong>Annual Savings</strong></td><td className="p-2 text-right font-bold text-green-600 border-b border-slate-200">Rs. {formatCurrency(calculations.annualSavings)}</td></tr>
                {calculations.totalSubsidy > 0 && (
                  <tr className="bg-green-50"><td className="p-2 text-center border-b border-slate-200">5</td><td className="p-2 border-b border-slate-200"><strong>Subsidy Applicable</strong> (Central + State)</td><td className="p-2 text-right font-bold text-green-800 border-b border-slate-200">Total: ₹ {formatCurrency(calculations.totalSubsidy)}</td></tr>
                )}
                <tr><td className="p-2 text-center">6</td><td className="p-2"><strong>Return on Investment (ROI)</strong></td><td className="p-2 text-right font-bold text-orange-600">{calculations.roiYears} Years</td></tr>
              </tbody>
            </table>
          </div>

          <div className="text-[10px] border-t border-slate-200 pt-4 break-inside-avoid">
            <h3 className="font-black text-slate-800 uppercase mb-2 tracking-widest">Terms and Conditions</h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-1 pl-4 text-slate-500 m-0 list-disc">
              {terms.map((term, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: term.replace(/^([^:]+):/, '<strong class="text-slate-700">$1:</strong>') }} />
              ))}
            </ul>
          </div>

          <div className="mt-12 flex justify-between items-end px-4 break-inside-avoid">
            <div className="text-center">
              <div className="w-40 h-[1px] bg-slate-300 mx-auto mb-1"></div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Customer Signature</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-slate-800 underline underline-offset-4 decoration-yellow-500">For {activeCompany.name}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={origin ? `${origin}${activeCompany.signature || '/signature.png'}` : (activeCompany.signature || '/signature.png')} alt="Authorized Signatory" className="w-48 h-20 object-contain ml-auto my-2" />
              <div className="w-48 h-[1px] bg-slate-300 ml-auto mb-1"></div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Authorized Signatory</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

QuotationPreview.displayName = "QuotationPreview";
