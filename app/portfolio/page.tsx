import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MapPin, Zap } from "lucide-react";
import { Metadata } from "next";
import MarketingLayout from "@/components/layout/MarketingLayout";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Our Solar Projects | Krishnanuja Renewables",
    description: "Browse our portfolio of residential, commercial, and industrial solar installations across India.",
};

export default async function PortfolioPage() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <MarketingLayout>
        <div className="min-h-screen bg-background pt-20">
            <div className="bg-secondary text-foreground py-20 border-b border-border/50">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">Our Installations</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        See how we are powering homes and businesses with clean, reliable solar energy.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 pb-24">
                {projects.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        <p className="text-xl font-medium">More projects coming soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <div key={project.id} className="group bg-secondary/20 rounded-3xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all hover:shadow-xl">
                                <div className="relative h-64 w-full overflow-hidden">
                                    <Image
                                        src={project.imageUrl}
                                        alt={project.title}
                                        fill
                                        unoptimized
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    {project.featured && (
                                        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground font-bold shadow-sm">
                                            Featured
                                        </Badge>
                                    )}
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <Badge variant="outline" className="text-xs bg-background">
                                            {project.category}
                                        </Badge>
                                        <div className="flex items-center text-primary font-bold gap-1 text-sm">
                                            <Zap className="w-4 h-4" /> {project.capacity}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                                        {project.description}
                                    </p>
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                                        <MapPin className="w-4 h-4" />
                                        {project.location}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
        </MarketingLayout>
    );
}
