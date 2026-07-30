import mongoose, { Schema, model, models } from "mongoose";

const SiteSettingsSchema = new Schema(
  {
    name: { type: String, required: true, default: "Mithun M P" },
    headline: { type: String, required: true },
    statement: { type: String, required: true },
    availabilityStatus: { type: String, required: true },
    contactEmail: { type: String, required: true },
    resumeUrl: { type: String, required: true },
    githubUrl: { type: String, required: true },
    linkedinUrl: { type: String, required: true },
    leetcodeUrl: { type: String, required: true },
    hackerrankUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const SocialProfileSchema = new Schema(
  {
    platform: { type: String, required: true, enum: ["GitHub", "LeetCode", "HackerRank", "LinkedIn"] },
    handle: { type: String, required: true },
    url: { type: String, required: true },
    statSnapshot: { type: String, required: true },
    caption: { type: String, required: true },
  },
  { timestamps: true }
);

const ProjectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    summary: { type: String, required: true },
    problemSolved: { type: String, required: true },
    technologies: [{ type: String }],
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    keyLearnings: [{ type: String }],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published", "archived"], default: "published" },
    images: [{ url: String, caption: String }],
  },
  { timestamps: true }
);

const TechnologySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true, enum: ["Languages", "Technologies", "Tools"] },
    iconName: { type: String, required: true },
    description: { type: String, required: true },
    relatedProjectSlugs: [{ type: String }],
  },
  { timestamps: true }
);

const SkillSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    relatedTechs: [{ type: String }],
    relatedCerts: [{ type: String }],
    relatedProjects: [{ type: String }],
  },
  { timestamps: true }
);

const CertificationSchema = new Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    grade: { type: String, required: true },
    date: { type: String, required: true },
    credentialUrl: { type: String, default: "" },
    isElite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const AchievementSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, default: "" },
  },
  { timestamps: true }
);

const GalleryItemSchema = new Schema(
  {
    title: { type: String, required: true },
    caption: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ContactSubmissionSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, default: "" },
    message: { type: String, required: true },
    status: { type: String, enum: ["unread", "read", "archived"], default: "unread" },
    ipAddress: { type: String },
  },
  { timestamps: true }
);

const ResumeAssetSchema = new Schema(
  {
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const SiteSettingsModel = models.SiteSettings || model("SiteSettings", SiteSettingsSchema);
export const SocialProfileModel = models.SocialProfile || model("SocialProfile", SocialProfileSchema);
export const ProjectModel = models.Project || model("Project", ProjectSchema);
export const TechnologyModel = models.Technology || model("Technology", TechnologySchema);
export const SkillModel = models.Skill || model("Skill", SkillSchema);
export const CertificationModel = models.Certification || model("Certification", CertificationSchema);
export const AchievementModel = models.Achievement || model("Achievement", AchievementSchema);
export const GalleryItemModel = models.GalleryItem || model("GalleryItem", GalleryItemSchema);
export const ContactSubmissionModel = models.ContactSubmission || model("ContactSubmission", ContactSubmissionSchema);
export const ResumeAssetModel = models.ResumeAsset || model("ResumeAsset", ResumeAssetSchema);
