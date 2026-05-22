"use client";

import { useState } from "react";
import { 
  MapPin, Phone, Mail, Clock, 
  CheckCircle, ArrowRight
} from "lucide-react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", city: "", message: "", systemType: "residential"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-32 relative bg-background border-t border-border/50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            Let&apos;s talk power.
          </h2>
          <p className="text-xl text-muted-foreground font-medium">
            Connect with our experts for a personalized solar consultation today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column: Form */}
          <div className="relative">
            <div className="relative h-full p-8 md:p-12 rounded-[2rem] bg-secondary/80 border border-border/50">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20">
                  <CheckCircle className="w-16 h-16 text-primary" />
                  <h3 className="text-3xl font-bold tracking-tight text-foreground">Quote Requested</h3>
                  <p className="text-muted-foreground max-w-sm text-lg font-medium">
                    Thank you for reaching out! Our consultants will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-2 group/input">
                      <label className="text-sm font-semibold text-foreground uppercase tracking-wider text-xs">Name</label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent border-b border-border/80 pb-3 text-lg text-foreground placeholder:text-muted-foreground/50 focus:border-primary transition-colors outline-none font-medium"
                      />
                    </div>
                    <div className="space-y-2 group/input">
                      <label className="text-sm font-semibold text-foreground uppercase tracking-wider text-xs">Phone</label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 9044555572"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-transparent border-b border-border/80 pb-3 text-lg text-foreground placeholder:text-muted-foreground/50 focus:border-primary transition-colors outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-2 group/input">
                      <label className="text-sm font-semibold text-foreground uppercase tracking-wider text-xs">Email</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent border-b border-border/80 pb-3 text-lg text-foreground placeholder:text-muted-foreground/50 focus:border-primary transition-colors outline-none font-medium"
                      />
                    </div>
                    <div className="space-y-2 group/input">
                      <label className="text-sm font-semibold text-foreground uppercase tracking-wider text-xs">City</label>
                      <input
                        required
                        type="text"
                        placeholder="Varanasi"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-transparent border-b border-border/80 pb-3 text-lg text-foreground placeholder:text-muted-foreground/50 focus:border-primary transition-colors outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-foreground uppercase tracking-wider text-xs block">Requirement</label>
                    <div className="grid grid-cols-3 gap-3">
                      {["residential", "commercial", "industrial"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, systemType: type })}
                          className={`py-3 px-4 rounded-2xl text-sm font-semibold capitalize border transition-all ${
                            formData.systemType === type
                            ? "bg-primary text-primary-foreground border-primary shadow-md"
                            : "bg-background text-muted-foreground border-border/50 hover:border-border hover:text-foreground"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 group/input">
                    <label className="text-sm font-semibold text-foreground uppercase tracking-wider text-xs">How can we help?</label>
                    <textarea
                      placeholder="Tell us about your energy needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={2}
                      className="w-full bg-transparent border-b border-border/80 pb-3 text-lg text-foreground placeholder:text-muted-foreground/50 focus:border-primary transition-colors outline-none resize-none font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full group rounded-full bg-primary text-primary-foreground font-semibold text-lg py-5 hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    Send Request <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Bento Grid Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 h-full">
            {/* Office Block */}
            <div className="sm:col-span-2 p-8 rounded-[2rem] bg-secondary/50 border border-border/50 hover:bg-secondary/80 transition-colors">
              <MapPin className="w-8 h-8 text-primary mb-6" />
              <h4 className="text-2xl font-bold text-foreground mb-2">Head Office</h4>
              <p className="text-muted-foreground leading-relaxed font-medium">
                SH16/114-15-K2, Sharvodaya Nagar<br/>
                Kadipur, Shivpur<br/>
                Varanasi 221003, Uttar Pradesh
              </p>
            </div>

            {/* Warehouse Block */}
            <div className="p-8 rounded-[2rem] bg-secondary/50 border border-border/50 hover:bg-secondary/80 transition-colors">
              <h4 className="text-xl font-bold text-foreground mb-2">Warehouse</h4>
              <p className="text-muted-foreground text-sm font-medium">
                SH15/243, Bharlai<br/>
                Shivpur, Varanasi
              </p>
            </div>

            {/* Hours Block */}
            <div className="p-8 rounded-[2rem] bg-secondary/50 border border-border/50 hover:bg-secondary/80 transition-colors">
              <Clock className="w-6 h-6 text-primary mb-4" />
              <h4 className="text-xl font-bold text-foreground mb-2">Hours</h4>
              <p className="text-muted-foreground text-sm font-medium">
                Mon - Sat: 9 AM - 7 PM<br/>
                Sunday: Closed
              </p>
            </div>

            {/* Contact Direct */}
            <div className="sm:col-span-2 p-8 rounded-[2rem] bg-foreground text-background flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-foreground/90 transition-colors">
              <div>
                <h4 className="text-2xl font-bold mb-2">Direct Contact</h4>
                <p className="text-background/70 font-medium">Available on WhatsApp & Phone</p>
              </div>
              <div className="flex flex-col gap-3">
                <a href="tel:+919044555572" className="flex items-center gap-3 text-background hover:text-primary-foreground text-xl font-medium transition-colors">
                  <Phone className="w-5 h-5 opacity-80" />
                  +91 9044555572
                </a>
                <a href="mailto:info@krishnanuja.com" className="flex items-center gap-3 text-background/70 hover:text-background text-sm transition-colors">
                  <Mail className="w-4 h-4 opacity-80" />
                  info@krishnanuja.com
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
