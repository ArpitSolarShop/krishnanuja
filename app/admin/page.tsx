import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Phone, IndianRupee } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
    const leads = await prisma.quoteRequest.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-foreground">Leads Dashboard</h2>
                    <p className="text-muted-foreground mt-1">Manage and view all incoming quote requests and site visits.</p>
                </div>
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-bold">
                    Total Leads: {leads.length}
                </div>
            </div>

            <div className="bg-background rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
                            <tr>
                                <th className="px-6 py-4 font-bold">Customer</th>
                                <th className="px-6 py-4 font-bold">Contact</th>
                                <th className="px-6 py-4 font-bold">Location</th>
                                <th className="px-6 py-4 font-bold">Bill / Status</th>
                                <th className="px-6 py-4 font-bold">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground font-medium">
                                        No leads found yet. Once a user submits a form, it will appear here.
                                    </td>
                                </tr>
                            ) : leads.map((lead) => (
                                <tr key={lead.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                                    <td className="px-6 py-4 font-bold text-foreground">
                                        {lead.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-foreground font-medium">
                                            <Phone className="w-4 h-4 text-muted-foreground" />
                                            {lead.phone}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <MapPin className="w-4 h-4" />
                                            {lead.address}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2 items-start">
                                            {lead.bill.includes("Site Visit") ? (
                                                <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-sm">Site Visit</Badge>
                                            ) : (
                                                <div className="flex items-center gap-1 font-bold text-emerald-600">
                                                    <IndianRupee className="w-4 h-4" /> {lead.bill}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(lead.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
