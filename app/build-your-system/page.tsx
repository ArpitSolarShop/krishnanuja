import { Metadata } from "next";
import AdvancedSystemBuilder from "@/components/system-builder/AdvancedSystemBuilder";
import MarketingLayout from "@/components/layout/MarketingLayout";

export const metadata: Metadata = {
  title: "Build Your Solar System | Custom Solar Panel Configurator",
  description: "Design your custom solar system with our interactive drag-and-drop builder. Select panels, inverters, batteries and more to get an instant personalized quote.",
};

export default function BuildYourSystemPage() {
  return (
    <MarketingLayout>
      <main className="pt-24 pb-16 bg-background min-h-screen">
        <div className="w-full px-4 sm:px-6 lg:px-8 pt-6 pb-8">
          <div className="text-center max-w-3xl mx-auto mb-10 print:hidden">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Build Your Solar System
            </h1>
            <p className="text-xl text-muted-foreground">
              Drag and drop solar components to design your custom system. Get a personalized quote from our experts instantly.
            </p>
          </div>
          
          <AdvancedSystemBuilder />
        </div>
      </main>
    </MarketingLayout>
  );
}
