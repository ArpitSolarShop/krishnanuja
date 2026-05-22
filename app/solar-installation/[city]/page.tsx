import { Metadata } from "next";
import Image from "next/image";
import locations from "@/data/locations.json";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";

interface Props {
    params: Promise<{
        city: string;
    }>;
}

export async function generateStaticParams() {
    return locations.map((location) => ({
        city: location.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { city } = await params;
    const location = locations.find((l) => l.slug === city);

    if (!location) {
        return {
            title: "Solar Installation | Krishnanuja Renewables",
        };
    }

    return {
        title: `Solar Panel Price & Installation in ${location.name} | Krishnanuja Renewables`,
        description: `Looking for solar panels in ${location.name}? Krishnanuja Renewables offers premium installation with subsidies under PM Surya Ghar Yojana. Get the best solar systems in ${location.name}.`,
        keywords: [
            `Solar Panel Price in ${location.name}`,
            `Solar Panel Installation ${location.name}`,
            `Solar Company in ${location.name}`,
            `Rooftop Solar ${location.name}`,
            `Solar Subsidy ${location.name}`,
            `PM Surya Ghar Yojana ${location.name}`,
            `Best Solar Dealer in ${location.name}`,
            `Solar System Installation ${location.name}`,
            `Top Solar Company in ${location.name}`,
        ],
        openGraph: {
            title: `Premium Solar Panel Installer in ${location.name} | Krishnanuja Renewables`,
            description: `Get subsidies for Solar in ${location.name}. Trusted by families and businesses. Official Partner.`,
        },
        alternates: {
            canonical: `/solar-installation/${location.slug}`,
        },
    };
}

export default async function LocationPage({ params }: Props) {
    const { city } = await params;
    const location = locations.find((l) => l.slug === city);

    if (!location) return null;

    return (
        <div className="bg-background min-h-screen text-foreground">
            <Navbar />

            {/* Location Hero (Modified Krishnanuja Hero) */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-background">
                <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                        Solar Installation in <br />
                        <span className="text-primary">{location.name}</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium">
                        Premium solar solutions with up to ₹{location.subsidy} subsidy from {location.discom}.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg w-full sm:w-auto shadow-sm">
                            <Link href="/quote">
                                Get Your Quote <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* 2. Key Benefits / Why Choose Us in City */}
            <section className="py-20 px-4 max-w-7xl mx-auto bg-background">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-8">Why Choose Krishnanuja in {location.name}?</h2>

                        <div className="space-y-6 mb-10">
                            <div className="flex gap-4 items-start">
                                <CheckCircle2 className="w-6 h-6 text-primary mt-1 shrink-0" />
                                <div>
                                    <h3 className="font-bold text-xl text-foreground mb-1">Subsidy Available</h3>
                                    <p className="text-muted-foreground text-lg">Get up to ₹{location.subsidy} subsidy from {location.discom}.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <CheckCircle2 className="w-6 h-6 text-primary mt-1 shrink-0" />
                                <div>
                                    <h3 className="font-bold text-xl text-foreground mb-1">Local Service</h3>
                                    <p className="text-muted-foreground text-lg">Fast installation and premium support directly in {location.name}.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <CheckCircle2 className="w-6 h-6 text-primary mt-1 shrink-0" />
                                <div>
                                    <h3 className="font-bold text-xl text-foreground mb-1">Pincode Covered</h3>
                                    <p className="text-muted-foreground text-lg">Service available in {location.pincode} and surrounding areas.</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Us Section */}
                        <div className="bg-secondary/30 rounded-3xl p-8 mb-8">
                            <h3 className="font-bold text-2xl mb-4 text-foreground">Contact Us</h3>
                            <div className="space-y-3">
                                <p className="text-lg text-foreground"><strong>Phone:</strong> <a href="tel:+919509624540" className="hover:text-primary transition-colors">+91 95096 24540</a></p>
                                <p className="text-lg text-foreground"><strong>Service Area:</strong> {location.name}, {location.discom} Region</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="relative h-full min-h-[600px] rounded-[2rem] overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 flex items-end p-10">
                            <p className="text-white font-bold text-3xl">Powering {location.city}</p>
                        </div>
                        <div className="absolute inset-0 bg-secondary/20 z-0"></div>
                        <Image
                            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop"
                            alt={`Solar Installation in ${location.name}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </section>

            {/* Pricing Section (Apple Style) */}
            <section className="py-20 bg-secondary/30">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                            Solar Panel Price in {location.name}
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            The price of a solar panel system in {location.name} includes the PM Surya Ghar Yojana Subsidy for residential consumers in {location.state}.
                        </p>
                    </div>

                    <div className="bg-background rounded-3xl overflow-hidden shadow-sm border border-border/50">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-secondary/50 border-b border-border/50">
                                        <th className="px-8 py-6 font-semibold text-foreground text-lg">System Size</th>
                                        <th className="px-8 py-6 font-semibold text-foreground text-lg">Market Price</th>
                                        <th className="px-8 py-6 font-semibold text-primary text-lg">Total Subsidy</th>
                                        <th className="px-8 py-6 font-bold text-foreground text-lg">Effective Cost</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/30">
                                    <tr className="hover:bg-secondary/20 transition-colors">
                                        <td className="px-8 py-6 text-lg font-medium">2 kW System</td>
                                        <td className="px-8 py-6 text-lg text-muted-foreground">₹1,45,000</td>
                                        <td className="px-8 py-6 text-lg text-primary font-medium">₹90,000</td>
                                        <td className="px-8 py-6 text-xl font-bold">₹55,000*</td>
                                    </tr>
                                    <tr className="hover:bg-secondary/20 transition-colors">
                                        <td className="px-8 py-6 text-lg font-medium">3 kW System</td>
                                        <td className="px-8 py-6 text-lg text-muted-foreground">₹1,95,000</td>
                                        <td className="px-8 py-6 text-lg text-primary font-medium">₹1,08,000</td>
                                        <td className="px-8 py-6 text-xl font-bold">₹87,000*</td>
                                    </tr>
                                    <tr className="hover:bg-secondary/20 transition-colors">
                                        <td className="px-8 py-6 text-lg font-medium">5 kW System</td>
                                        <td className="px-8 py-6 text-lg text-muted-foreground">₹3,10,000</td>
                                        <td className="px-8 py-6 text-lg text-primary font-medium">₹1,08,000</td>
                                        <td className="px-8 py-6 text-xl font-bold">₹2,02,000*</td>
                                    </tr>
                                    <tr className="hover:bg-secondary/20 transition-colors">
                                        <td className="px-8 py-6 text-lg font-medium">10 kW System</td>
                                        <td className="px-8 py-6 text-lg text-muted-foreground">₹5,80,000</td>
                                        <td className="px-8 py-6 text-lg text-primary font-medium">₹1,08,000</td>
                                        <td className="px-8 py-6 text-xl font-bold">₹4,72,000*</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Standard Components */}
            <ServicesSection />
            <ProcessSection />
            <TestimonialsSection />
            <FAQSection />

            {/* Service Areas (Hyper-Local SEO coverage) */}
            <section className="py-20 bg-background border-t border-border/50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-10 text-center">Serving All Major Areas in {location.state}</h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {locations
                            .filter(l => l.slug !== location.slug)
                            .slice(0, 15) // Limit to top 15 to keep it clean
                            .map((area) => (
                                <Link
                                    key={area.slug}
                                    href={`/solar-installation/${area.slug}`}
                                    className="px-6 py-3 bg-secondary/50 hover:bg-secondary border border-border/50 rounded-full text-foreground hover:text-primary transition-all font-medium"
                                >
                                    📍 {area.name}
                                </Link>
                            ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 bg-foreground text-background text-center rounded-t-[3rem]">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-5xl md:text-6xl font-bold mb-8">Ready to go Solar in {location.name}?</h2>
                    <p className="text-2xl mb-12 text-muted max-w-2xl mx-auto text-muted-foreground">Get a free site survey and quotation today. Start saving on your electricity bills.</p>
                    <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xl px-12 py-8 rounded-full">
                        <Link href="/quote">
                            Get Your Free Solar Quote
                        </Link>
                    </Button>
                </div>
            </section>

            <Footer />
        </div>
    );
}
