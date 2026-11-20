"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MapPin, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface LocationItem {
  slug: string;
  name: string;
  type: string;
  city: string;
  state: string;
  pincode: string;
  discom: string;
  subsidy: string;
  landmarks?: string;
  key_areas?: string;
}

interface LocationsDirectoryClientProps {
  locations: LocationItem[];
}

export default function LocationsDirectoryClient({
  locations,
}: LocationsDirectoryClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("All");

  // Get unique districts
  const districts = useMemo(() => {
    const list = Array.from(new Set(locations.map((loc) => loc.city))).filter(
      Boolean
    );
    return ["All", ...list.sort()];
  }, [locations]);

  // Filter locations
  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      const matchesDistrict =
        selectedDistrict === "All" || loc.city === selectedDistrict;

      const q = searchTerm.toLowerCase().trim();
      if (!q) return matchesDistrict;

      const matchesSearch =
        loc.name.toLowerCase().includes(q) ||
        loc.city.toLowerCase().includes(q) ||
        loc.pincode.includes(q) ||
        (loc.landmarks && loc.landmarks.toLowerCase().includes(q)) ||
        (loc.key_areas && loc.key_areas.toLowerCase().includes(q));

      return matchesDistrict && matchesSearch;
    });
  }, [locations, selectedDistrict, searchTerm]);

  // Group by district for display
  const groupedByDistrict = useMemo(() => {
    const map = new Map<string, LocationItem[]>();
    for (const loc of filteredLocations) {
      const district = loc.city || "Other Areas";
      if (!map.has(district)) {
        map.set(district, []);
      }
      map.get(district)!.push(loc);
    }
    return map;
  }, [filteredLocations]);

  return (
    <div className="space-y-12">
      {/* Search & Filter Bar */}
      <div className="bg-secondary/40 border border-border/50 rounded-3xl p-6 sm:p-8 shadow-sm max-w-4xl mx-auto space-y-6">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 h-6 w-6 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by neighborhood, city, or pincode (e.g. Lanka, Shivpur, 221003, Mughalsarai)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-14 bg-background text-foreground text-lg rounded-2xl border-border focus-visible:ring-primary"
          />
        </div>

        {/* District Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-sm font-bold text-muted-foreground mr-2">
            Filter District:
          </span>
          {districts.map((district) => (
            <button
              key={district}
              onClick={() => setSelectedDistrict(district)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedDistrict === district
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-background text-foreground hover:bg-secondary/70 border border-border/50"
              }`}
            >
              {district}{" "}
              {district !== "All" && (
                <span className="opacity-70 text-xs ml-1">
                  (
                  {locations.filter((l) => l.city === district).length}
                  )
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-muted-foreground text-sm font-medium px-2">
        <p>
          Showing{" "}
          <span className="text-foreground font-bold">
            {filteredLocations.length}
          </span>{" "}
          solar installation service locations
        </p>
        {(searchTerm || selectedDistrict !== "All") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm("");
              setSelectedDistrict("All");
            }}
            className="text-primary hover:text-primary/90 h-8 font-semibold"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Grouped Locations Grid */}
      {filteredLocations.length === 0 ? (
        <div className="text-center py-20 bg-secondary/20 rounded-3xl border border-border/40 p-8">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-2xl font-bold text-foreground mb-2">
            No Service Locations Found
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            We couldn&apos;t find an exact match for &quot;{searchTerm}&quot;. But don&apos;t worry — Krishnanuja serves all of Uttar Pradesh!
          </p>
          <Link href="/#get-quote">
            <Button size="lg" className="rounded-full px-8">
              Request Site Visit in Your Area
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-16">
          {Array.from(groupedByDistrict.entries()).map(([district, districtLocations]) => (
            <div key={district} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border/60 pb-3">
                <MapPin className="w-6 h-6 text-primary shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                  {district} Region
                </h2>
                <Badge variant="secondary" className="ml-auto font-bold bg-primary/10 text-primary">
                  {districtLocations.length} Locations
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {districtLocations.map((loc) => {
                  const formattedSubsidy = parseInt(loc.subsidy)
                    ? `₹${parseInt(loc.subsidy).toLocaleString("en-IN")}`
                    : `₹${loc.subsidy}`;

                  return (
                    <Link
                      key={loc.slug}
                      href={`/solar-installation/${loc.slug}`}
                      className="group"
                    >
                      <Card className="h-full bg-card hover:bg-secondary/30 border-border/50 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md rounded-2xl overflow-hidden flex flex-col justify-between">
                        <CardContent className="p-6 space-y-4">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                {loc.name}
                              </h3>
                              <p className="text-xs font-semibold text-muted-foreground mt-0.5">
                                {loc.city}, {loc.state} • PIN {loc.pincode}
                              </p>
                            </div>
                            <span className="text-xs font-bold px-2 py-1 bg-secondary rounded-md text-foreground/80 shrink-0">
                              {loc.type || "Area"}
                            </span>
                          </div>

                          <div className="pt-2 space-y-2 border-t border-border/40 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground flex items-center gap-1.5">
                                <Zap className="w-3.5 h-3.5 text-primary" /> DISCOM:
                              </span>
                              <span className="font-semibold text-foreground">
                                {loc.discom}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Max Subsidy:
                              </span>
                              <span className="font-bold text-emerald-600">
                                Up to {formattedSubsidy}
                              </span>
                            </div>
                          </div>

                          {loc.landmarks && (
                            <p className="text-xs text-muted-foreground line-clamp-1 italic pt-1">
                              Near: {loc.landmarks}
                            </p>
                          )}

                          <div className="pt-3 flex items-center justify-between text-sm font-bold text-primary group-hover:gap-2 transition-all">
                            <span>View Prices & Subsidies</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
