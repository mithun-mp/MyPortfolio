import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const siteSettingsSchema = z.object({
  name: z.string().min(2),
  headline: z.string().min(5),
  statement: z.string().min(10),
  availabilityStatus: z.string().min(2),
  contactEmail: z.string().email(),
  resumeUrl: z.string().url().or(z.string().startsWith("#")),
  githubUrl: z.string().url(),
  linkedinUrl: z.string().url(),
  leetcodeUrl: z.string().url(),
  hackerrankUrl: z.string().url(),
});

export const projectSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(3),
  tagline: z.string().min(5),
  summary: z.string().min(10),
  problemSolved: z.string().min(10),
  technologies: z.array(z.string()).min(1, "At least one technology chip is required"),
  liveUrl: z.string().url().or(z.literal("")).optional(),
  githubUrl: z.string().url().or(z.literal("")).optional(),
  keyLearnings: z.array(z.string()),
  featured: z.boolean(),
  order: z.number().int(),
  status: z.enum(["draft", "published", "archived"]),
  images: z.array(
    z.object({
      url: z.string().url(),
      caption: z.string(),
    })
  ),
});

export const technologySchema = z.object({
  name: z.string().min(1),
  category: z.enum(["Languages", "Technologies", "Tools"]),
  iconName: z.string().min(1),
  description: z.string().min(5),
  relatedProjectSlugs: z.array(z.string()),
});

export const certificationSchema = z.object({
  title: z.string().min(3),
  issuer: z.string().min(2),
  grade: z.string().min(1),
  date: z.string().min(2),
  credentialUrl: z.string().url().or(z.literal("")).optional(),
  isElite: z.boolean().optional(),
});

export const achievementSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  date: z.string().optional(),
});

export const galleryItemSchema = z.object({
  title: z.string().min(2),
  caption: z.string().min(5),
  category: z.string().min(2),
  imageUrl: z.string().url(),
  isFeatured: z.boolean(),
  order: z.number().int(),
});
