import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { deleteBlogPost } from "@/app/actions/blogs";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
    const blogs = await prisma.blogPost.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-foreground">Blog Manager</h2>
                    <p className="text-muted-foreground mt-1">Manage your SEO articles and news.</p>
                </div>
                <Link href="/admin/blogs/new">
                    <Button className="bg-primary text-primary-foreground font-bold rounded-xl gap-2">
                        <Plus className="w-5 h-5" /> New Post
                    </Button>
                </Link>
            </div>

            <div className="bg-background rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
                            <tr>
                                <th className="px-6 py-4 font-bold">Title</th>
                                <th className="px-6 py-4 font-bold">Status</th>
                                <th className="px-6 py-4 font-bold">Date</th>
                                <th className="px-6 py-4 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground font-medium">
                                        No blog posts found.
                                    </td>
                                </tr>
                            ) : blogs.map((post) => (
                                <tr key={post.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                                    <td className="px-6 py-4 font-bold text-foreground">
                                        {post.title}
                                        <div className="text-xs font-normal text-muted-foreground mt-1">/{post.slug}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge className={post.status === 'published' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-orange-500 hover:bg-orange-600'}>
                                            {post.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="outline" size="sm" className="rounded-xl">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <form action={async () => {
                                                "use server";
                                                await deleteBlogPost(post.id);
                                            }}>
                                                <Button type="submit" variant="destructive" size="sm" className="rounded-xl">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </form>
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
