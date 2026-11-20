"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  MapPin,
  Zap,
  Sparkles,
} from "lucide-react";

export interface HeroClip {
  src: string;
  title: string;
  location: string;
  system: string;
  highlight: string;
  poster: string;
}

const clips: HeroClip[] = [
  {
    src: "/videos/Solar_Video_Ready_Arpit_Solar.mp4",
    title: "Varanasi Rooftop Solar EPC Walkthrough",
    location: "Varanasi, Uttar Pradesh",
    system: "10 kW Bifacial Solar Plant",
    highlight: "Saves ₹12,000+/Month with Net Metering",
    poster: "/solar-farm.png",
  },
  {
    src: "/videos/Arpit_Solar_Shop_Installation_Video.mp4",
    title: "Precision Mounting & Structure Assembly",
    location: "Kadipur / Shivpur, Varanasi",
    system: "Hot-Dip Galvanized Iron Structure",
    highlight: "150 km/h Wind Resistance • Zero Roof Leakage",
    poster: "/commercial-solar.png",
  },
  {
    src: "/videos/Logo_T_Shirt_Video_Enhancement.mp4",
    title: "Krishnanuja Field Engineers & Commissioning",
    location: "Uttar Pradesh Projects",
    system: "Turnkey DISCOM Synchronization",
    highlight: "UPNEDA & PM Surya Ghar Approved Vendor",
    poster: "/hero-solar.png",
  },
];

export default function HeroVideoLoop() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeClip = clips[currentIndex];

  // Auto-play when clip index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay policy fallback: ensure muted
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        });
    }
  }, [currentIndex]);

  // Handle video end -> switch to next clip in seamless loop
  const handleVideoEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % clips.length);
  };

  // Time update for progress bar
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const pct =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(pct);
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Toggle audio
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Fullscreen
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Manual clip selector
  const selectClip = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(idx);
    setProgress(0);
  };

  return (
    <div
      ref={containerRef}
      onClick={togglePlay}
      className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-black shadow-2xl border border-border/70 cursor-pointer group select-none"
    >
      {/* Background Poster while loading */}
      {!isLoaded && (
        <Image
          src={activeClip.poster}
          alt={activeClip.title}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
          priority
        />
      )}

      {/* HTML5 Video Element */}
      <video
        ref={videoRef}
        src={activeClip.src}
        poster={activeClip.poster}
        playsInline
        autoPlay
        muted={isMuted}
        onLoadedData={() => setIsLoaded(true)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="w-full h-full object-cover transition-opacity duration-500"
      />

      {/* Subtle Gradient Overlays for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/50 pointer-events-none" />

      {/* Top Bar: Live Status & Project Badge */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none z-10">
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Project Tour</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 bg-black/50 backdrop-blur-md text-white/90 text-xs font-medium px-3 py-1.5 rounded-full border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>{activeClip.location}</span>
          </div>
        </div>

        <div className="bg-primary/90 backdrop-blur-md text-primary-foreground text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-primary/20">
          <Zap className="w-3.5 h-3.5 fill-primary-foreground" />
          <span>{activeClip.system}</span>
        </div>
      </div>

      {/* Center Play/Pause Indicator (Shown when Paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity z-20">
          <div className="w-20 h-20 rounded-full bg-primary/95 text-primary-foreground flex items-center justify-center shadow-2xl transition-transform hover:scale-110">
            <Play className="w-8 h-8 fill-primary-foreground ml-1" />
          </div>
        </div>
      )}

      {/* Bottom Info Bar & Playlist Controls */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-3 pointer-events-auto">
        {/* Title & Stat */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-primary mb-1">
              <Sparkles className="w-3 h-3" /> Clip {currentIndex + 1} of {clips.length}
            </span>
            <h3 className="text-white text-base sm:text-xl font-bold tracking-tight leading-snug drop-shadow-md">
              {activeClip.title}
            </h3>
            <p className="text-white/80 text-xs sm:text-sm font-medium drop-shadow-sm mt-0.5">
              {activeClip.highlight}
            </p>
          </div>

          {/* Action buttons (Mute, Fullscreen) */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {/* Audio Toggle */}
            <button
              onClick={toggleMute}
              className="px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 border border-white/15 transition-all shadow-md hover:scale-105"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-white/80" />
                  <span>Unmute</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Sound On</span>
                </>
              )}
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center border border-white/15 transition-all shadow-md hover:scale-105"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center border border-white/15 transition-all shadow-md hover:scale-105"
              aria-label="Toggle fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Segmented Story/Reel Progress Indicators */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {clips.map((clip, idx) => {
            const isCurrent = idx === currentIndex;
            const isCompleted = idx < currentIndex;

            return (
              <button
                key={clip.src}
                onClick={(e) => selectClip(idx, e)}
                className="group/seg text-left flex flex-col gap-1 focus:outline-none"
              >
                {/* Progress bar container */}
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden relative backdrop-blur-xs">
                  <div
                    className="h-full bg-primary transition-all duration-150 rounded-full"
                    style={{
                      width: isCurrent
                        ? `${progress}%`
                        : isCompleted
                        ? "100%"
                        : "0%",
                    }}
                  />
                </div>
                {/* Micro Label */}
                <span
                  className={`text-[10px] font-bold line-clamp-1 transition-colors ${
                    isCurrent
                      ? "text-primary drop-shadow-sm"
                      : "text-white/60 group-hover/seg:text-white/90"
                  }`}
                >
                  {clip.title.split(" ")[0]} {clip.title.split(" ")[1]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
