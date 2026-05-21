"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { 
  MapPin, Phone, Mail, Clock, Send, 
  CheckCircle, ArrowRight, Zap, Sun
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 20 }
    }
  };

  return (
    <section id="contact" className="py-32 relative bg-[#030712] overflow-hidden selection:bg-brand-gold/30 selection:text-brand-gold-light">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none mix-blend-overlay" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
      >
        <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-gold-light text-sm font-medium mb-6">
            <Zap className="w-4 h-4" /> Let's Talk Power
          </div>
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-6 font-space">
            Power Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-light to-brand-gold">Future.</span>
          </h2>
          <p className="text-xl text-white/50 font-light">
            Ready to reduce your energy bills? Connect with our experts for a personalized solar consultation today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column: Form */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute -inset-px bg-gradient-to-b from-white/10 to-transparent rounded-[2rem] blur-[2px] opacity-50 group-hover:opacity-100 transition duration-500" />
            <div className="relative h-full p-8 md:p-12 rounded-[2rem] bg-neutral-950/80 border border-white/10 backdrop-blur-xl">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
                    <CheckCircle className="w-16 h-16 text-green-400 relative z-10" />
                  </div>
                  <h3 className="text-3xl font-light tracking-tight text-white font-space">Quote Requested</h3>
                  <p className="text-white/50 max-w-sm text-lg">
                    Thank you for reaching out! Our energy consultants will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-2 group/input">
                      <label className="text-sm font-medium text-white/50 group-focus-within/input:text-brand-gold-light transition-colors uppercase tracking-wider text-xs">Name</label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent border-b border-white/20 pb-3 text-lg text-white placeholder:text-white/20 focus:border-brand-gold-light outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2 group/input">
                      <label className="text-sm font-medium text-white/50 group-focus-within/input:text-brand-gold-light transition-colors uppercase tracking-wider text-xs">Phone</label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 9044555572"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-transparent border-b border-white/20 pb-3 text-lg text-white placeholder:text-white/20 focus:border-brand-gold-light outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-2 group/input">
                      <label className="text-sm font-medium text-white/50 group-focus-within/input:text-brand-gold-light transition-colors uppercase tracking-wider text-xs">Email</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent border-b border-white/20 pb-3 text-lg text-white placeholder:text-white/20 focus:border-brand-gold-light outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2 group/input">
                      <label className="text-sm font-medium text-white/50 group-focus-within/input:text-brand-gold-light transition-colors uppercase tracking-wider text-xs">City</label>
                      <input
                        required
                        type="text"
                        placeholder="Varanasi"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-transparent border-b border-white/20 pb-3 text-lg text-white placeholder:text-white/20 focus:border-brand-gold-light outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium text-white/50 uppercase tracking-wider text-xs block">Requirement</label>
                    <div className="grid grid-cols-3 gap-3">
                      {["residential", "commercial", "industrial"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, systemType: type })}
                          className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 capitalize border ${
                            formData.systemType === type
                              ? "bg-brand-gold/10 text-brand-gold-light border-brand-gold/30 shadow-[0_0_20px_rgba(201,147,58,0.1)]"
                              : "bg-white/5 text-white/40 border-transparent hover:bg-white/10 hover:text-white/80"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 group/input">
                    <label className="text-sm font-medium text-white/50 group-focus-within/input:text-brand-gold-light transition-colors uppercase tracking-wider text-xs">How can we help?</label>
                    <textarea
                      placeholder="Tell us about your energy needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={2}
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-lg text-white placeholder:text-white/20 focus:border-brand-gold-light outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full group relative overflow-hidden rounded-xl bg-white text-black font-semibold text-lg py-5 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Send Request <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-brand-gold-light transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right Column: Bento Grid Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 h-full">
            {/* Office Block */}
            <motion.div variants={itemVariants} className="sm:col-span-2 p-8 rounded-[2rem] bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:bg-white/10 transition-colors duration-500">
              <MapPin className="w-8 h-8 text-brand-gold-light mb-6 opacity-80" />
              <h4 className="text-2xl font-light text-white mb-2 font-space">Head Office</h4>
              <p className="text-white/50 leading-relaxed font-light">
                SH16/114-15-K2, Sharvodaya Nagar<br/>
                Kadipur, Shivpur<br/>
                Varanasi 221003, Uttar Pradesh
              </p>
            </motion.div>

            {/* Warehouse Block */}
            <motion.div variants={itemVariants} className="p-8 rounded-[2rem] bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:bg-white/10 transition-colors duration-500">
              <Sun className="w-8 h-8 text-brand-blue-light mb-6 opacity-80" />
              <h4 className="text-xl font-light text-white mb-2 font-space">Warehouse</h4>
              <p className="text-white/50 text-sm font-light">
                SH15/243, Bharlai<br/>
                Shivpur, Varanasi
              </p>
            </motion.div>

            {/* Hours Block */}
            <motion.div variants={itemVariants} className="p-8 rounded-[2rem] bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:bg-white/10 transition-colors duration-500">
              <Clock className="w-8 h-8 text-brand-blue-light mb-6 opacity-80" />
              <h4 className="text-xl font-light text-white mb-2 font-space">Hours</h4>
              <p className="text-white/50 text-sm font-light">
                Mon - Sat: 9 AM - 7 PM<br/>
                Sunday: Closed
              </p>
            </motion.div>

            {/* Contact Direct */}
            <motion.div variants={itemVariants} className="sm:col-span-2 p-8 rounded-[2rem] bg-brand-gold/10 border border-brand-gold/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-brand-gold/15 transition-colors duration-500">
              <div>
                <h4 className="text-2xl font-light text-brand-gold-light mb-2 font-space">Direct Contact</h4>
                <p className="text-brand-gold-light/60 font-light">Available on WhatsApp & Phone</p>
              </div>
              <div className="flex flex-col gap-2">
                <a href="tel:+919044555572" className="flex items-center gap-3 text-white hover:text-brand-gold-light transition-colors text-xl font-light">
                  <Phone className="w-5 h-5 opacity-50" />
                  +91 9044555572
                </a>
                <a href="mailto:info@krishnanuja.com" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors text-sm">
                  <Mail className="w-4 h-4 opacity-50" />
                  info@krishnanuja.com
                </a>
              </div>
            </motion.div>
          </div>
          
        </div>
      </motion.div>
    </section>
  );
}
