"use client";

const partners = [
  { name: "Reliance Solar" },
  { name: "Tata Power Solar" },
  { name: "Waaree Energies" },
  { name: "Adani Solar" },
];

export default function PartnersSection() {
  return (
    <section className="py-20 relative bg-background border-t border-border/50 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Premium products.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto font-medium">
            We partner with and provide world-class solar equipment from India&apos;s most trusted brands.
          </p>
        </div>

        {/* Partners marquee */}
        <div className="relative overflow-hidden py-8">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          <div className="flex gap-16 items-center w-max animate-marquee">
            {[...partners, ...partners, ...partners, ...partners, ...partners].map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="shrink-0 px-8 py-4 rounded-full border border-border/50 bg-secondary/30 hover:bg-foreground hover:text-background transition-colors group"
              >
                <p className="text-xl font-bold whitespace-nowrap text-muted-foreground group-hover:text-background transition-colors">
                  {partner.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
}
