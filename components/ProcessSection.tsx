"use client";

import { motion, Variants } from "framer-motion";
import { ClipboardCheck, Compass, Wrench, BarChart3, Zap, Settings, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    step: "01",
    title: "Free Consultation",
    description: "Our solar experts visit your location for a comprehensive energy assessment. We analyze your consumption and roof space.",
    color: "from-blue-500/20 to-blue-500/0",
    iconColor: "text-blue-500"
  },
  {
    icon: Compass,
    step: "02",
    title: "Custom Design",
    description: "We create a tailored solar system design using advanced modeling to optimize panel placement and maximize your energy output.",
    color: "from-amber-500/20 to-amber-500/0",
    iconColor: "text-amber-500"
  },
  {
    icon: Wrench,
    step: "03",
    title: "Expert Installation",
    description: "Our certified technicians install your solar system with precision and quality assurance. We handle all electrical work seamlessly.",
    color: "from-green-500/20 to-green-500/0",
    iconColor: "text-green-500"
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Monitoring & Care",
    description: "Enjoy 24/7 remote monitoring of your system's performance. Our team provides regular support to ensure peak efficiency.",
    color: "from-purple-500/20 to-purple-500/0",
    iconColor: "text-purple-500"
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 md:py-32 relative bg-background overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4"
          >
            <Zap className="w-4 h-4 fill-primary" />
            Simple 4-Step Process
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight"
          >
            Going solar. <br /> <span className="text-primary">Simplified.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground font-medium"
          >
            From consultation to commissioning, we make going solar seamless and hassle-free in four simple steps.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Central connecting line (desktop only) */}
          <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-border/40 -translate-x-1/2 hidden md:block rounded-full" />

          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={step.step} 
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16 md:mb-24 last:mb-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                
                {/* Content Side */}
                <div className={`flex-1 text-center md:text-left ${!isEven && 'md:text-right'}`}>
                  <h3 className="text-3xl font-bold text-foreground mb-4 tracking-tight flex flex-col md:inline-flex">
                    <span className={`text-6xl font-black mb-2 opacity-20 ${step.iconColor}`}>
                      {step.step}
                    </span>
                    {step.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto md:mx-0">
                    {step.description}
                  </p>
                </div>

                {/* Center Icon */}
                <div className="relative shrink-0 z-10 flex items-center justify-center">
                  <div className={`w-24 h-24 rounded-full bg-background border border-border shadow-xl flex items-center justify-center relative z-10 group hover:scale-110 transition-transform duration-500`}>
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-b ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <step.icon className={`w-10 h-10 ${step.iconColor}`} />
                  </div>
                  {/* Connecting dot for the line */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/5 rounded-full -z-10 animate-pulse" />
                </div>

                {/* Empty Side for layout balance */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Stats Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: Zap, text: "1-2 Days Installation" },
            { icon: ShieldCheck, text: "25+ Years Warranty" },
            { icon: Settings, text: "₹0 Maintenance" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center justify-center gap-3 bg-secondary/50 border border-border/50 py-4 px-6 rounded-2xl">
              <stat.icon className="w-6 h-6 text-primary" />
              <span className="font-bold text-foreground">{stat.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
