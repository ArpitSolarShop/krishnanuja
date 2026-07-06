"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBlogPost(formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const featuredImage = formData.get("featuredImage") as string;
    const tags = formData.get("tags") as string;
    const status = formData.get("status") as string;

    await prisma.blogPost.create({
        data: {
            title,
            slug,
            excerpt,
            content,
            featuredImage,
            tags,
            status,
        }
    });

    revalidatePath("/blog");
    redirect("/admin/blogs");
}

export async function deleteBlogPost(id: string) {
    await prisma.blogPost.delete({ where: { id } });
    revalidatePath("/blog");
    revalidatePath("/admin/blogs");
}
