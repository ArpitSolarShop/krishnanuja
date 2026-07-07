import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdvancedSystemBuilder from "@/components/system-builder/AdvancedSystemBuilder";

export const metadata: Metadata = {
  title: "Build Your Solar System | Krishnanuja Renewables",
  description: "Drag and drop to build your custom solar system and get an instant estimated quote.",
};

export default function BuildYourSystemPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 bg-background min-h-screen">
        <div className="w-full px-4 sm:px-6 lg:px-8 pt-6 pb-8">
          <div className="text-center max-w-3xl mx-auto mb-10 print:hidden">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Advanced System Builder
            </h1>
            <p className="text-xl text-muted-foreground">
              Build your solar system piece by piece. Drag core parts from the left and balance of system components from the right.
            </p>
          </div>
          
          <AdvancedSystemBuilder />
        </div>
      </main>
      <Footer />
    </>
  );
}
