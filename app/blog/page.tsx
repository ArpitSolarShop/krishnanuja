import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import type { BlogPost } from "@prisma/client";
import MarketingLayout from "@/components/layout/MarketingLayout";
import { createMetadata } from "@/lib/seo/metadata";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const revalidate = 3600; // Incremental Static Regeneration (ISR)

export const metadata: Metadata = createMetadata({
  title: "Solar Energy Insights, Subsidy Guides & News | Krishnanuja Renewables",
  description:
    "Expert articles on solar panel installation, PM Surya Ghar Muft Bijli Yojana subsidies, net metering, ROI calculation, and solar technology trends in India.",
  path: "/blog",
  keywords: [
    "solar blog India",
    "PM Surya Ghar subsidy guide",
    "solar panel cost breakdown",
    "solar net metering Uttar Pradesh",
    "rooftop solar ROI",
    "solar maintenance tips",
  ],
});

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <MarketingLayout>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ]}
      />
      <div className="min-h-screen bg-background pt-20">
        <div className="bg-secondary text-foreground py-16 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-primary/10 text-primary font-bold text-sm px-4 py-1.5 rounded-full border-0">
                Knowledge Center
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Solar Energy Insights & Guides
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-4">
                Guides, subsidy updates, and expert tips to maximize your solar energy investment.
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
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
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
                        <span>{new Date(post.createdAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}</span>
                      </div>
                    </div>

                    {post.tags && (
                      <div className="flex items-center gap-2 flex-wrap mb-4">
                        <Tag className="w-4 h-4 text-muted-foreground" />
                        {post.tags.split(",").map((tag: string, index: number) => (
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
    </MarketingLayout>
  );
}
