import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Solar Energy Blog - Krishnanuja Renewables",
    description: "Latest insights, news, and guides on solar energy and sustainability.",
};

import { prisma } from "@/lib/prisma";
import type { BlogPost } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
    const posts = await prisma.blogPost.findMany({
        where: { status: 'published' },
        orderBy: { publishedAt: 'desc' }
    });

    return (
        <div className="min-h-screen bg-background">
            <div className="bg-secondary text-foreground py-16 border-b border-border/50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Solar Energy Insights</h1>
                        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                            Guides, news, and expert tips on maximizing your solar investment.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {posts.map((post: BlogPost) => (
                        <Link key={post.id} href={`/blog/${post.slug}`}>
                            <Card className="h-full bg-secondary/20 hover:bg-secondary/40 border-border/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer group rounded-3xl overflow-hidden">
                                {post.featuredImage && (
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={post.featuredImage}
                                            alt={post.title}
                                            fill
                                            unoptimized
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                )}
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>

                                    <p className="text-muted-foreground mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 font-medium">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    {post.tags && (
                                        <div className="flex items-center gap-2 flex-wrap mb-4">
                                            <Tag className="w-4 h-4 text-muted-foreground" />
                                            {post.tags.split(',').map((tag: string, index: number) => (
                                                <Badge key={index} variant="secondary" className="text-xs bg-background">
                                                    {tag.trim()}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center text-primary font-bold group-hover:gap-2 transition-all">
                                        Read More
                                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
