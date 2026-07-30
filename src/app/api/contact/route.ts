import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendContactNotification } from "@/lib/resend";
import { connectToDatabase } from "@/db/connect";
import { ContactSubmissionModel } from "@/db/models";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
    
    // Rate Limiting Check (Max 3 submissions per hour per IP)
    const rateLimit = await checkRateLimit(ip, 3, 60 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Transmission limit reached for this hour. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Zod Schema Validation & Honeypot Check
    const parseResult = contactSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid form inputs", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, company, message, honeypot } = parseResult.data;

    if (honeypot && honeypot.trim() !== "") {
      // Silent honeypot reject
      return NextResponse.json({ success: true, message: "Transmission received" });
    }

    // Save to Database if connected
    const db = await connectToDatabase();
    if (db) {
      await ContactSubmissionModel.create({
        name,
        email,
        company,
        message,
        ipAddress: ip,
      });
    }

    // Send email notification via Resend
    await sendContactNotification({ name, email, company, message });

    return NextResponse.json({
      success: true,
      message: "Transmission received. Thank you for reaching out!",
    });
  } catch (error) {
    console.error("Contact API handler error:", error);
    return NextResponse.json({ error: "Failed to process transmission" }, { status: 500 });
  }
}
