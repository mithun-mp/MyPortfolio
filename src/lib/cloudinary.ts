import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImageToCloudinary(fileBase64: string, folder = "mithun_portfolio"): Promise<string> {
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.warn("Cloudinary configuration missing. Returning base64/placeholder.");
    return fileBase64;
  }

  try {
    const result = await cloudinary.uploader.upload(fileBase64, {
      folder,
      resource_type: "image",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error;
  }
}
