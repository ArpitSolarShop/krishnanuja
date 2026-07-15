import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, Users } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-muted/40 flex">
            {/* Sidebar */}
            <div className="w-64 bg-background border-r border-border hidden md:block">
                <div className="p-6">
                    <h2 className="text-2xl font-black text-primary">Admin Panel</h2>
                </div>
                <nav className="space-y-2 px-4">
                    <Link href="/admin" className="flex items-center gap-3 bg-primary/10 text-primary font-bold px-4 py-3 rounded-xl transition-colors">
                        <Users className="w-5 h-5" />
                        Leads
                    </Link>
                    <Link href="/admin/blogs" className="flex items-center gap-3 hover:bg-secondary text-foreground font-medium px-4 py-3 rounded-xl transition-colors">
                        <LayoutDashboard className="w-5 h-5" />
                        Blog Manager
                    </Link>
                </nav>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <header className="bg-background border-b border-border p-4 md:px-8 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-foreground md:hidden">Admin Panel</h1>
                    <div className="flex items-center gap-4 ml-auto">
                        <span className="text-sm font-medium text-muted-foreground">Admin User</span>
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                            A
                        </div>
                        <form action={async () => {
                            "use server";
                            const { logout } = await import("@/app/actions/auth");
                            await logout();
                        }}>
                            <button type="submit" className="text-sm font-bold text-destructive hover:bg-destructive/10 px-3 py-2 rounded-xl transition-colors">
                                Logout
                            </button>
                        </form>
                    </div>
                </header>
                <main className="p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
