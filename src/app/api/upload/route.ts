import { NextRequest, NextResponse } from "next/server";
import { checkIsAdmin } from "@/lib/auth";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { imageBase64, folder } = body;

    if (!imageBase64) {
      return NextResponse.json({ error: "Missing image payload" }, { status: 400 });
    }

    const url = await uploadImageToCloudinary(imageBase64, folder || "mithun_portfolio");
    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
