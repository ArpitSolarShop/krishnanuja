"use client";

import { useState } from "react";
import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);
        const res = await login(formData);
        if (res?.error) {
            setError(res.error);
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-background rounded-3xl shadow-xl border border-border/50 p-8">
                <div className="flex flex-col items-center mb-8">
                    <Image src="/logo.png" alt="Krishnanuja" width={60} height={60} className="mb-6" />
                    <h1 className="text-2xl font-black text-foreground text-center">Admin Access</h1>
                    <p className="text-muted-foreground text-center mt-2">Enter your secure passcode to access the Krishnanuja dashboard.</p>
                </div>

                {error && (
                    <div className="bg-destructive/10 text-destructive text-sm font-bold p-4 rounded-xl mb-6 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}

                <form action={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">Passcode</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="password"
                                name="passcode"
                                required
                                placeholder="Enter your passcode..."
                                className="pl-11 h-12 bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary rounded-xl"
                            />
                        </div>
                    </div>
                    
                    <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl font-bold text-base bg-primary text-primary-foreground hover:bg-primary/90">
                        {loading ? "Verifying..." : "Login to Dashboard"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
