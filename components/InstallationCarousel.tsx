"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const images = [
  { src: "/assets/projects/c1.jpg", caption: "Mono PERC Bifacial Rooftop Installation, Varanasi" },
  { src: "/assets/projects/c2.jpg", caption: "Elevated Hot-Dip Galvanized Mounting Structure" },
  { src: "/assets/projects/c3.jpg", caption: "Commercial Industrial Rooftop Array, Ramnagar" },
  { src: "/assets/projects/c4.jpg", caption: "String Inverter & IP65 ACDB/DCDB Protection Box" },
  { src: "/assets/projects/c5.jpg", caption: "High-Rise Residential Terrace Solar Setup" },
  { src: "/assets/projects/c6.jpg", caption: "Precision Angle Tilt Alignment for Peak Solar Irradiance" },
  { src: "/assets/projects/c7.jpg", caption: "Zero Roof Damage Clamping & Chemical Anchoring" },
  { src: "/assets/projects/c8.jpg", caption: "Net-Metering Dual-Source Bi-Directional Synchronization" },
  { src: "/assets/projects/c9.jpg", caption: "Turnkey EPC Solar Commissioning Handover" },
];

export default function InstallationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomImg, setZoomImg] = useState<{ src: string; caption: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth;
      const itemWidth = scrollWidth / images.length;
      containerRef.current.scrollTo({
        left: currentIndex * itemWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className="w-full mt-24 relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 px-2">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Installation Glimpses</h3>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">Real moments captured directly from customer project sites</p>
        </div>

        {/* Desktop Carousel Controls */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border border-border/70 bg-card hover:bg-secondary flex items-center justify-center text-foreground transition-colors shadow-xs"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-border/70 bg-card hover:bg-secondary flex items-center justify-center text-foreground transition-colors shadow-xs"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-5 pb-6 px-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {images.map((item, idx) => (
          <div 
            key={idx} 
            onClick={() => setZoomImg(item)}
            className="snap-center shrink-0 w-72 sm:w-80 md:w-96 aspect-[3/4] relative rounded-3xl overflow-hidden shadow-md border border-border/60 cursor-pointer group bg-secondary/40"
          >
            <Image
              src={item.src}
              alt={item.caption}
              fill
              sizes="(max-width: 640px) 288px, (max-width: 768px) 320px, 384px"
              loading={idx === 0 ? "eager" : "lazy"}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Caption Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1">
                Project #{idx + 1}
              </span>
              <p className="text-white text-sm font-semibold leading-tight line-clamp-2">
                {item.caption}
              </p>
              <span className="text-[11px] text-white/70 flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-3.5 h-3.5" /> Click to enlarge
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination indicators */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-primary w-8" : "bg-primary/25 hover:bg-primary/50 w-2"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Zoom Dialog */}
      <Dialog open={!!zoomImg} onOpenChange={(open) => !open && setZoomImg(null)}>
        <DialogContent className="max-w-4xl p-2 sm:p-4 bg-black border-zinc-800">
          <DialogHeader className="p-2 text-left">
            <DialogTitle className="text-base sm:text-lg text-white font-bold">
              {zoomImg?.caption || "Installation Moment"}
            </DialogTitle>
          </DialogHeader>
          {zoomImg && (
            <div className="space-y-3">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden">
                <Image
                  src={zoomImg.src}
                  alt={zoomImg.caption}
                  fill
                  sizes="1000px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
