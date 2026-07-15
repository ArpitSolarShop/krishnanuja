"use client";

import { useState } from "react";
import { productCatalog, ProductCategory, ProductVariant } from "@/lib/data/productCatalog";
import type { Product } from "@/types/quote";
import { Zap, Shield, Sun, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSubsidyForCapacity } from "@/lib/companyDetails";

interface SelectedProduct extends Product {
  categoryName: string;
  variantName: string;
}

export default function SystemBuilder() {
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(productCatalog[0].category);

  // Helper for formatting currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateSubsidy = (product: SelectedProduct) => {
    if (product.isOffGrid || product.isVFD || product.isService || product.isNDCR) return 0;
    const subsidy = getSubsidyForCapacity(product.kWp);
    return subsidy.total;
  };

  // Drag Handlers
  const handleDragStart = (e: React.DragEvent, product: Product, category: ProductCategory, variant: ProductVariant) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ ...product, categoryName: category.category, variantName: variant.name }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovered(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovered(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovered(false);
    const data = e.dataTransfer.getData("application/json");
    if (data) {
      const product = JSON.parse(data) as SelectedProduct;
      setSelectedProduct(product);
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 min-h-[70vh]">
      
      {/* LEFT PANE: Inventory / Catalog */}
      <div className="lg:col-span-4 bg-secondary/30 rounded-3xl p-6 border border-border/50 flex flex-col h-full max-h-[80vh] overflow-hidden">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Sun className="w-6 h-6 text-primary" /> System Catalog
        </h2>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {productCatalog.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeCategory === cat.category 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-background text-muted-foreground hover:bg-background/80"
              }`}
            >
              {cat.category.split(" ")[0]} {/* Shorten name for tab */}
            </button>
          ))}
        </div>

        {/* Scrollable Product List */}
        <div className="overflow-y-auto pr-2 space-y-6 flex-grow hide-scrollbar">
          {productCatalog.filter(c => c.category === activeCategory).map((category) => (
            <div key={category.category} className="space-y-4">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{category.supplier}</p>
              
              {category.variants.map((variant) => (
                <div key={variant.name} className="space-y-3">
                  <h4 className="font-semibold text-foreground">{variant.name}</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {variant.products.map((product, idx) => (
                      <div
                        key={idx}
                        draggable
                        onDragStart={(e) => handleDragStart(e, product, category, variant)}
                        onClick={() => setSelectedProduct({ ...product, categoryName: category.category, variantName: variant.name })}
                        className="bg-background border border-border/50 p-4 rounded-2xl cursor-grab active:cursor-grabbing hover:border-primary/50 hover:shadow-md transition-all group flex flex-col justify-center min-h-[5rem]"
                      >
                        {product.customLabel ? (
                          <div className="text-lg font-bold text-foreground group-hover:text-primary transition-colors text-center">
                            {product.customLabel}
                          </div>
                        ) : (
                          <>
                            <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {product.kWp} <span className="text-sm font-normal text-muted-foreground">kWp</span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-2 flex justify-between items-center">
                              <span>{product.phase} Phase</span>
                              <Zap className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4">Drag a system or tap to select</p>
      </div>

      {/* CENTER PANE: Drop Zone & Summary */}
      <div className="lg:col-span-8 flex flex-col gap-8">
        
        {/* Drop Zone */}
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex-grow border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center transition-all duration-300 min-h-[300px] ${
            isHovered 
              ? "border-primary bg-primary/10 scale-[1.02]" 
              : selectedProduct 
                ? "border-primary/30 bg-primary/5"
                : "border-border bg-secondary/10"
          }`}
        >
          {!selectedProduct ? (
            <div className="text-center space-y-4 pointer-events-none">
              <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Sun className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Drag your system here</h3>
              <p className="text-muted-foreground">Select a system from the catalog to see detailed pricing.</p>
            </div>
          ) : (
            <div className="w-full max-w-2xl w-full animate-in fade-in zoom-in duration-300">
              <div className="bg-background rounded-2xl p-8 shadow-xl border border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-8 -mt-8 flex items-end justify-start p-6">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                
                <p className="text-primary font-semibold tracking-wider uppercase text-sm mb-2">{selectedProduct.categoryName}</p>
                <h3 className="text-4xl font-bold text-foreground mb-6">
                  {selectedProduct.customLabel ? (
                    selectedProduct.customLabel
                  ) : (
                    <>{selectedProduct.kWp} kWp <span className="text-2xl text-muted-foreground font-medium">System</span></>
                  )}
                </h3>
                
                {!selectedProduct.isService && (
                  <div className="grid sm:grid-cols-3 gap-6 mb-8">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Module Type</p>
                      <p className="font-semibold text-foreground">{selectedProduct.module} Wp</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Quantity</p>
                      <p className="font-semibold text-foreground">{selectedProduct.qty} Panels</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Phase</p>
                      <p className="font-semibold text-foreground">{selectedProduct.phase} Phase</p>
                    </div>
                  </div>
                )}

                <div className="bg-secondary/50 rounded-xl p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Base Price</span>
                    <span className="font-semibold">{formatCurrency(selectedProduct.price)}</span>
                  </div>
                  {calculateSubsidy(selectedProduct) > 0 && (
                    <div className="flex justify-between items-center text-green-600">
                      <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Estimated Subsidy</span>
                      <span className="font-semibold">-{formatCurrency(calculateSubsidy(selectedProduct))}</span>
                    </div>
                  )}
                  <div className="pt-4 border-t border-border flex justify-between items-end">
                    <div>
                      <p className="text-lg font-bold text-foreground">Estimated Total</p>
                      <p className="text-xs text-muted-foreground">Excludes GST & Out of City charges</p>
                    </div>
                    <span className="text-3xl font-black text-primary">
                      {formatCurrency(selectedProduct.price - calculateSubsidy(selectedProduct))}
                    </span>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Button size="lg" className="rounded-full px-8" onClick={() => {
                    window.location.href = "/#get-quote";
                  }}>
                    Get Your Free Quote
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
