"use server";

import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

export async function submitHeroLead(formData: {
  name: string;
  phone: string;
  bill: string;
  timeline: string;
  address: string;
}) {
  try {
    const lead = await prisma.quoteRequest.create({
      data: {
        name: formData.name,
        phone: formData.phone,
        bill: formData.bill,
        timeline: formData.timeline,
        address: formData.address,
      },
    });

    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Krishnanuja Alerts <onboarding@resend.dev>",
        to: process.env.ADMIN_EMAIL,
        subject: `New Lead: ${formData.name}`,
        html: `<p><strong>Name:</strong> ${formData.name}</p><p><strong>Phone:</strong> ${formData.phone}</p><p><strong>Bill:</strong> ${formData.bill}</p><p><strong>Address:</strong> ${formData.address}</p><p><strong>Timeline:</strong> ${formData.timeline}</p>`,
      });
    }

    console.log("New Lead Saved:", lead.id);
    return { success: true, id: lead.id };
  } catch (error) {
    console.error("Failed to save lead:", error);
    return { success: false, error: "Failed to save lead" };
  }
}

export async function submitSiteVisit(formData: {
  name: string;
  phone: string;
  location: string;
}) {
  try {
    const lead = await prisma.quoteRequest.create({
      data: {
        name: formData.name,
        phone: formData.phone,
        bill: "Not Specified (Site Visit Request)",
        timeline: "ASAP",
        address: formData.location,
      },
    });

    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Krishnanuja Alerts <onboarding@resend.dev>",
        to: process.env.ADMIN_EMAIL,
        subject: `New Site Visit Request: ${formData.name}`,
        html: `<p><strong>Name:</strong> ${formData.name}</p><p><strong>Phone:</strong> ${formData.phone}</p><p><strong>Location:</strong> ${formData.location}</p>`,
      });
    }

    console.log("New Site Visit Request Saved:", lead.id);
    return { success: true, id: lead.id };
  } catch (error) {
    console.error("Failed to save site visit:", error);
    return { success: false, error: "Failed to save site visit request" };
  }
}
