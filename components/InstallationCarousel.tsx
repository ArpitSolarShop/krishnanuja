"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const images = [
  "/assets/projects/c1.jpg",
  "/assets/projects/c2.jpg",
  "/assets/projects/c3.jpg",
  "/assets/projects/c4.jpg",
  "/assets/projects/c5.jpg",
  "/assets/projects/c6.jpg",
  "/assets/projects/c7.jpg",
  "/assets/projects/c8.jpg",
  "/assets/projects/c9.jpg",
];

export default function InstallationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

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

  return (
    <div className="w-full mt-24">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-foreground mb-4">Installation Glimpses</h3>
        <p className="text-muted-foreground text-lg">Moments captured from real customer sites</p>
      </div>
      
      <div 
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8 px-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {images.map((src, idx) => (
          <div 
            key={idx} 
            className="snap-center shrink-0 w-72 sm:w-80 md:w-96 aspect-[3/4] relative rounded-3xl overflow-hidden shadow-lg border border-border/50"
          >
            <Image
              src={src}
              alt={`Installation moment ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        ))}
      </div>
      
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              idx === currentIndex ? "bg-primary w-8" : "bg-primary/30"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
