"use client";

import { useState } from "react";
import { createBlogPost } from "@/app/actions/blogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export default function NewBlogPage() {
    const [loading, setLoading] = useState(false);

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h2 className="text-3xl font-black text-foreground">Create New Post</h2>
                <p className="text-muted-foreground mt-1">Publish a new article to the blog.</p>
            </div>

            <div className="bg-background rounded-3xl border border-border/50 p-6 shadow-sm">
                <form action={async (formData) => {
                    setLoading(true);
                    await createBlogPost(formData);
                }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Title</label>
                            <Input name="title" required className="bg-secondary/50 border-0 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Slug</label>
                            <Input name="slug" required className="bg-secondary/50 border-0 rounded-xl" placeholder="e.g. how-to-save" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold">Excerpt</label>
                        <Textarea name="excerpt" className="bg-secondary/50 border-0 rounded-xl" rows={2} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold">HTML Content</label>
                        <Textarea name="content" required className="bg-secondary/50 border-0 rounded-xl font-mono text-sm" rows={10} placeholder="<p>Write your HTML content here...</p>" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Featured Image URL</label>
                            <Input name="featuredImage" className="bg-secondary/50 border-0 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Tags (comma separated)</label>
                            <Input name="tags" className="bg-secondary/50 border-0 rounded-xl" />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Status</label>
                        <select name="status" className="w-full bg-secondary/50 border-0 rounded-xl h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground font-bold rounded-xl px-8">
                            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                            Publish Post
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
