"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, MapPin, Phone, User, CheckCircle2 } from "lucide-react";
import { submitSiteVisit } from "@/app/actions/leads";

interface QuickSiteVisitFormProps {
    city: string;
    children: React.ReactNode;
}

export function QuickSiteVisitForm({ city, children }: QuickSiteVisitFormProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        location: city || "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {

            const result = await submitSiteVisit({
                name: formData.name,
                phone: formData.phone,
                location: formData.location || city
            });

            if (!result.success) {
                throw new Error("Failed to submit request");
            }

            setSuccess(true);

            // Auto-close after success message
            setTimeout(() => {
                setOpen(false);
                setSuccess(false);
                setFormData({ name: "", phone: "", location: city || "" });
            }, 2500);

        } catch (error) {
            console.error("Form submission error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-6 rounded-3xl bg-secondary border-none shadow-xl">
                <DialogHeader className="space-y-3">
                    <DialogTitle className="text-2xl font-bold text-center text-foreground">
                        {success ? "Request Received! 🎉" : `Get Free Site Visit in ${formData.location}`}
                    </DialogTitle>
                    <DialogDescription className="text-center text-muted-foreground">
                        {success
                            ? "Our expert will call you shortly to schedule the visit."
                            : "Enter your details below to schedule a free solar feasibility check at your home."}
                    </DialogDescription>
                </DialogHeader>

                {success ? (
                    <div className="py-8 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-300">
                        <CheckCircle2 className="w-16 h-16 text-primary" />
                        <p className="text-foreground font-medium">Thank you, {formData.name}!</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="grid gap-5 py-2">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-semibold text-foreground">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="name"
                                    placeholder="Enter your name"
                                    className="pl-10 h-12 bg-background border-border/50 focus:bg-background transition-colors rounded-xl"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-semibold text-foreground">WhatsApp Number</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="Enter WhatsApp number"
                                    className="pl-10 h-12 bg-background border-border/50 focus:bg-background transition-colors rounded-xl"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location" className="text-sm font-semibold text-foreground">Location / City</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="location"
                                    placeholder="Your City/Area"
                                    className="pl-10 h-12 bg-background border-border/50 focus:bg-background transition-colors rounded-xl"
                                    required
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl transition-all mt-2"
                        >
                            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Schedule Free Visit"}
                        </Button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
