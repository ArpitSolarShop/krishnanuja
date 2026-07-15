"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw } from "lucide-react";
import MarketingLayout from "@/components/layout/MarketingLayout";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <MarketingLayout>
      <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-xl mx-auto">
          <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-500" />
          </div>
          
          <h2 className="text-3xl font-bold text-foreground mb-4">Something went wrong!</h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            We apologize, but an unexpected error has occurred. Our technical team has been notified.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => reset()}
              className="rounded-full px-8 h-12 w-full sm:w-auto bg-primary text-primary-foreground shadow-sm"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Try Again
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 w-full sm:w-auto">
              <Link href="/">
                Return Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
