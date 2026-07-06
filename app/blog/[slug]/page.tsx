import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({ where: { slug } });

    if (!post) {
        return { title: 'Blog Post Not Found' };
    }

    return {
        title: `${post.title} | Krishnanuja Renewables`,
        description: post.excerpt ?? undefined,
        openGraph: {
            title: post.title,
            description: post.excerpt ?? undefined,
            images: post.featuredImage ? [{ url: post.featuredImage }] : [],
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({ where: { slug } });

    if (!post) {
        notFound();
    }

    const publishDate = new Date(post.createdAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section with Featured Image */}
            {post.featuredImage && (
                <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
                    <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        unoptimized
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="container mx-auto max-w-4xl">
                            {post.tags && post.tags.length > 0 && (
                                <div className="flex items-center gap-2 flex-wrap mb-4">
                                    {post.tags.split(',').map((tag: string, index: number) => (
                                        <Badge key={index} className="bg-primary text-primary-foreground border-0 text-sm py-1 px-3">
                                            {tag.trim()}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-4">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-6 text-sm text-muted-foreground font-medium">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    {publishDate}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    3 min read
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4 py-12 pb-24">
                <div className="max-w-4xl mx-auto">
                    {/* TL;DR Box */}
                    {post.excerpt && (
                        <div className="mb-10 bg-secondary/30 border border-border rounded-3xl p-8">
                            <div className="flex items-start gap-4">
                                <div className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm flex-shrink-0">
                                    TL;DR
                                </div>
                                <p className="text-foreground text-lg leading-relaxed font-medium">{post.excerpt}</p>
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    <div 
                        className="prose prose-lg dark:prose-invert max-w-none text-foreground/90"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* CTA Section */}
                    <div className="mt-16 bg-secondary rounded-3xl p-10 text-center border border-border/50 shadow-xl">
                        <h3 className="text-3xl font-bold mb-4 text-foreground">
                            Ready to Switch to Solar?
                        </h3>
                        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
                            Get a free consultation and customized quote for your rooftop solar installation. 
                            Find out exactly how much you can save!
                        </p>
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            <Link href="/quote">
                                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 h-14 rounded-xl text-lg">
                                    Get Free Quote
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button size="lg" variant="outline" className="font-bold px-8 h-14 rounded-xl text-lg">
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="text-center mt-12">
                        <Link href="/blog">
                            <Button variant="ghost" size="lg" className="gap-2 font-semibold">
                                <ArrowLeft className="w-5 h-5" />
                                Back to All Articles
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
