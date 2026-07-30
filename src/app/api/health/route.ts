import { NextResponse } from "next/server";
import { connectToDatabase } from "@/db/connect";

export async function GET() {
  let dbStatus = "disconnected";
  try {
    const db = await connectToDatabase();
    if (db && db.connection.readyState === 1) {
      dbStatus = "connected";
    }
  } catch {
    dbStatus = "error";
  }

  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    db: dbStatus,
    service: "mithun-mp-portfolio",
    version: "1.0.0",
  });
}
