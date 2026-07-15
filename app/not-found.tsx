import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import MarketingLayout from "@/components/layout/MarketingLayout";

export default function NotFound() {
  return (
    <MarketingLayout>
      <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-xl mx-auto">
          {/* 404 Visual */}
          <div className="relative mb-8 inline-block">
            <h1 className="text-9xl font-black text-primary/10 tracking-tighter">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="w-16 h-16 text-primary drop-shadow-md" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-foreground mb-4">Page Not Found</h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Oops! It seems the page you&apos;re looking for has been moved, deleted, or doesn&apos;t exist. Let&apos;s get you back on track to clean energy.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 h-12 w-full sm:w-auto shadow-sm">
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 w-full sm:w-auto">
              <Link href="/#get-quote">
                Get a Free Quote
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
