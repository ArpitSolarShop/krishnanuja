"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
    const passcode = formData.get("passcode") as string;
    
    // Check against env variable
    if (passcode === process.env.ADMIN_PASSWORD) {
        // Set a secure cookie
        (await cookies()).set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });
        
        redirect("/admin");
    }
    
    return { error: "Invalid passcode" };
}

export async function logout() {
    (await cookies()).delete("admin_session");
    redirect("/login");
}
