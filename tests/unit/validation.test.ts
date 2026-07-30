import { describe, it, expect } from "vitest";
import { contactSchema, projectSchema, siteSettingsSchema } from "../../src/lib/validation";

describe("Validation Schemas", () => {
  it("validates valid contact form submission", () => {
    const validData = {
      name: "Alex Mercer",
      email: "alex@example.com",
      company: "Cyber Systems",
      message: "Hello Mithun, I would like to discuss a software engineering opportunity.",
      honeypot: "",
    };

    const result = contactSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects contact form submission with short message or invalid email", () => {
    const invalidData = {
      name: "A",
      email: "invalid-email",
      message: "Too short",
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("detects honeypot spam payload", () => {
    const spamData = {
      name: "Bot Spammer",
      email: "bot@spam.com",
      message: "Check out this promotional link right now!",
      honeypot: "http://spambot.com",
    };

    const result = contactSchema.safeParse(spamData);
    expect(result.success).toBe(false);
  });

  it("validates project dossier schema", () => {
    const projectData = {
      slug: "synchronis",
      title: "Synchronis — Smart Attendance System",
      tagline: "Smart attendance platform",
      summary: "Full description of attendance monitoring system",
      problemSolved: "Eliminated proxy attendance using geofencing APIs and facial feature verification.",
      technologies: ["Python", "Django", "Flutter"],
      keyLearnings: ["REST API integration"],
      featured: true,
      order: 1,
      status: "published" as const,
      images: [{ url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4", caption: "Dashboard" }],
    };

    const result = projectSchema.safeParse(projectData);
    expect(result.success).toBe(true);
  });
});
