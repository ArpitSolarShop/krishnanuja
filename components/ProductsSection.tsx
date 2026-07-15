"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Shield, Sun, Cpu, Settings2 } from "lucide-react";

const hardware = [
  {
    title: "Tier-1 Mono PERC Bifacial Panels",
    desc: "Maximize energy generation with high-efficiency bifacial technology that captures sunlight from both sides. Built to withstand extreme weather conditions.",
    icon: Sun,
    tags: ["25-Year Warranty", "Up to 550W+ Output", "Anti-PID Technology"],
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Smart On-Grid & Hybrid Inverters",
    desc: "Intelligent inverters that seamlessly convert DC to AC power with 98.6% efficiency. Monitor your energy generation in real-time via smartphone.",
    icon: Cpu,
    tags: ["10-Year Warranty", "Wi-Fi Enabled", "Surge Protection"],
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    title: "Galvanized Mounting Structures",
    desc: "Cyclone-proof, hot-dip galvanized iron (GI) structures engineered to withstand wind speeds up to 150 km/h without damaging your roof.",
    icon: Settings2,
    tags: ["Rust-Proof", "Zero Roof Damage", "Custom Engineered"],
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    title: "Advanced AC/DC Distribution",
    desc: "Industrial-grade safety boxes equipped with premium MCBs, SPDs, and fuses to protect your entire solar system from voltage fluctuations and lightning.",
    icon: Shield,
    tags: ["IP65 Waterproof", "Fire Retardant", "Lightning Protection"],
    color: "bg-red-500/10 text-red-600",
  }
];

export default function ProductsSection() {
  return (
    <section className="py-24 bg-secondary/30 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
            Premium Hardware. <br className="hidden sm:block"/>
            <span className="text-primary">Uncompromising Quality.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We don&apos;t cut corners. Krishnanuja Renewables exclusively partners with global Tier-1 brands to ensure your solar plant performs at peak efficiency for decades.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hardware.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border rounded-3xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${item.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                  {item.desc}
                </p>

                <div className="space-y-2 mt-auto">
                  {item.tags.map((tag) => (
                    <div key={tag} className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      {tag}
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-xl font-black text-slate-800">TATA POWER</div>
          <div className="text-xl font-black text-slate-800">RELIANCE</div>
          <div className="text-xl font-black text-slate-800">WAAREE</div>
          <div className="text-xl font-black text-slate-800">VIKRAM SOLAR</div>
          <div className="text-xl font-black text-slate-800">GROWATT</div>
        </div>

      </div>
    </section>
  );
}
