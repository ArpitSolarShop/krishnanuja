"use client";

import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is a solar rooftop system and how does it work?",
    answer: "A solar rooftop system converts sunlight into usable electricity using photovoltaic (PV) panels installed on your roof. The panels generate DC power, which is converted to AC by an inverter for use in your home or business. Excess power can be exported to the grid through net metering, earning you credits on your electricity bill.",
  },
  {
    question: "How much can I save on electricity bills with solar?",
    answer: "Most homeowners and businesses save between 70-90% on their electricity bills from Day 1 of solar installation. The exact savings depend on your system size, energy consumption pattern, and local electricity tariff. With rising electricity prices, your savings grow every year, making solar one of the best investments.",
  },
  {
    question: "What is the cost of installing a solar panel system?",
    answer: "The cost varies based on system size and configuration. Residential systems typically cost ₹50,000 to ₹75,000 per kW. With government subsidies (up to ₹78,000 for residential), the effective cost is significantly lower. Commercial systems offer even better economics at scale. Contact us for a personalized quote.",
  },
  {
    question: "Are government subsidies available for solar installation?",
    answer: "Yes! Under the PM Surya Ghar scheme, residential consumers can avail subsidies of up to ₹78,000 for systems up to 3kW, and ₹78,000 for systems between 3-10kW. Krishnanuja Renewables handles the entire subsidy application and disbursement process for you at no extra charge.",
  },
  {
    question: "How long does solar panel installation take?",
    answer: "For residential systems, installation is typically completed in 1-2 days. Commercial and industrial installations may take 1-4 weeks depending on the system size. The complete process from site survey to commissioning usually takes 2-3 weeks for residential and 4-8 weeks for commercial projects.",
  },
  {
    question: "What is the lifespan and warranty of solar panels?",
    answer: "High-quality solar panels last 25-30 years or more with minimal degradation. We use Tier-1 panels that come with a 25-year performance warranty guaranteeing at least 80% output. Inverters typically carry a 5-10 year warranty. We also offer extended maintenance contracts for worry-free solar ownership.",
  },
  {
    question: "Do solar panels work during monsoon and cloudy weather?",
    answer: "Yes, solar panels generate electricity even on cloudy and rainy days, though at reduced efficiency (typically 10-25% of peak output). This is factored into our energy generation estimates. With net metering, excess power generated on sunny days compensates for lower output during monsoon.",
  },
  {
    question: "What maintenance is required for solar panels?",
    answer: "Solar panels require minimal maintenance. We recommend cleaning panels 1-2 times a month with water to remove dust. Krishnanuja Renewables provides comprehensive annual maintenance contracts that include quarterly cleaning, electrical inspection, performance optimization, and 24/7 remote monitoring.",
  },
  {
    question: "What is On-Grid vs Off-Grid vs Hybrid solar system?",
    answer: "On-Grid systems are connected to the utility grid, allowing you to export excess power and earn credits. Off-Grid systems use batteries for complete energy independence, ideal for areas with no grid. Hybrid systems combine both – grid connection plus battery backup for uninterrupted power during outages.",
  },
  {
    question: "Can solar panels damage my roof?",
    answer: "No. Krishnanuja Renewables uses non-penetrating mounting structures and waterproofing solutions that preserve your roof's integrity. Our certified installation ensures zero damage. In fact, solar panels protect your roof from direct sun and rain, potentially extending its lifespan.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 solar-grid-pattern" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-brand-blue/10 text-brand-blue border-brand-blue/20 mb-4">
            <HelpCircle className="w-3 h-3 mr-1" />
            FAQ
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy leading-tight mb-6">
            Frequently Asked
            <span className="gradient-text"> Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about going solar with Krishnanuja Renewables.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-brand-blue/8 rounded-xl px-6 bg-card/50 backdrop-blur-sm hover:border-brand-blue/15 transition-colors duration-200 data-[state=open]:border-brand-blue/20 data-[state=open]:shadow-lg data-[state=open]:shadow-brand-blue/5"
            >
              <AccordionTrigger className="text-left font-semibold text-brand-navy hover:text-brand-blue py-5 text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
