import { connectToDatabase } from "@/db/connect";
import mongoose from "mongoose";

const RateLimitSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true, index: true },
    count: { type: Number, default: 1 },
    resetAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const RateLimitModel =
  mongoose.models.RateLimit || mongoose.model("RateLimit", RateLimitSchema);

// In-memory fallback map for environments without database
const memoryStore = new Map<string, { count: number; resetAt: number }>();

export async function checkRateLimit(
  ip: string,
  limit = 3,
  windowMs = 60 * 60 * 1000
): Promise<{ allowed: boolean; remaining: number }> {
  const db = await connectToDatabase();
  const now = Date.now();

  if (!db) {
    // In-memory rate limiting fallback
    const record = memoryStore.get(ip);
    if (!record || now > record.resetAt) {
      memoryStore.set(ip, { count: 1, resetAt: now + windowMs });
      return { allowed: true, remaining: limit - 1 };
    }

    if (record.count >= limit) {
      return { allowed: false, remaining: 0 };
    }

    record.count += 1;
    memoryStore.set(ip, record);
    return { allowed: true, remaining: limit - record.count };
  }

  try {
    const existing = await RateLimitModel.findOne({ ip });

    if (!existing || now > existing.resetAt.getTime()) {
      await RateLimitModel.findOneAndUpdate(
        { ip },
        { count: 1, resetAt: new Date(now + windowMs) },
        { upsert: true, new: true }
      );
      return { allowed: true, remaining: limit - 1 };
    }

    if (existing.count >= limit) {
      return { allowed: false, remaining: 0 };
    }

    existing.count += 1;
    await existing.save();
    return { allowed: true, remaining: limit - existing.count };
  } catch (error) {
    console.error("Rate limit check error:", error);
    return { allowed: true, remaining: 1 };
  }
}
