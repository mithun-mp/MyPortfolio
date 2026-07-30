import React from "react";
import { Navigation } from "@/components/public/Navigation";
import { BootSequence } from "@/components/public/BootSequence";
import { HeroSection } from "@/components/public/HeroSection";
import { ProfileTelemetry } from "@/components/public/ProfileTelemetry";
import { EngineeringTimeline } from "@/components/public/EngineeringTimeline";
import { ProjectsCommandDeck } from "@/components/public/ProjectsCommandDeck";
import { StackLab } from "@/components/public/StackLab";
import { SkillsReactor } from "@/components/public/SkillsReactor";
import { AchievementsCertificates } from "@/components/public/AchievementsCertificates";
import { MediaGallery } from "@/components/public/MediaGallery";
import { ContactSection } from "@/components/public/ContactSection";
import { CursorTrail } from "@/components/public/CursorTrail";

import { connectToDatabase } from "@/db/connect";
import {
  SiteSettingsModel,
  SocialProfileModel,
  ProjectModel,
  TechnologyModel,
  SkillModel,
  CertificationModel,
  AchievementModel,
  GalleryItemModel,
} from "@/db/models";
import {
  initialSiteSettings,
  initialSocialProfiles,
  initialProjects,
  initialTechnologies,
  initialSkillsNodes,
  initialCertifications,
  initialAchievements,
  initialGalleryItems,
} from "@/db/seedData";

export const revalidate = 60; // Revalidate every 60 seconds

async function getPortfolioData() {
  const db = await connectToDatabase();

  if (!db) {
    return {
      settings: initialSiteSettings,
      socials: initialSocialProfiles,
      projects: initialProjects,
      technologies: initialTechnologies,
      skills: initialSkillsNodes,
      certifications: initialCertifications,
      achievements: initialAchievements,
      gallery: initialGalleryItems,
    };
  }

  try {
    const settingsDoc = await SiteSettingsModel.findOne({});
    const settings = settingsDoc ? JSON.parse(JSON.stringify(settingsDoc)) : initialSiteSettings;

    const socialsDocs = await SocialProfileModel.find({});
    const socials = socialsDocs.length > 0 ? JSON.parse(JSON.stringify(socialsDocs)) : initialSocialProfiles;

    const projectDocs = await ProjectModel.find({ status: "published" }).sort({ order: 1 });
    const projects = projectDocs.length > 0 ? JSON.parse(JSON.stringify(projectDocs)) : initialProjects;

    const techDocs = await TechnologyModel.find({});
    const technologies = techDocs.length > 0 ? JSON.parse(JSON.stringify(techDocs)) : initialTechnologies;

    const skillDocs = await SkillModel.find({});
    const skills = skillDocs.length > 0 ? JSON.parse(JSON.stringify(skillDocs)) : initialSkillsNodes;

    const certDocs = await CertificationModel.find({});
    const certifications = certDocs.length > 0 ? JSON.parse(JSON.stringify(certDocs)) : initialCertifications;

    const achDocs = await AchievementModel.find({});
    const achievements = achDocs.length > 0 ? JSON.parse(JSON.stringify(achDocs)) : initialAchievements;

    const galleryDocs = await GalleryItemModel.find({}).sort({ order: 1 });
    const gallery = galleryDocs.length > 0 ? JSON.parse(JSON.stringify(galleryDocs)) : initialGalleryItems;

    return { settings, socials, projects, technologies, skills, certifications, achievements, gallery };
  } catch (error) {
    console.warn("Failed loading from database, using seed fallback:", error);
    return {
      settings: initialSiteSettings,
      socials: initialSocialProfiles,
      projects: initialProjects,
      technologies: initialTechnologies,
      skills: initialSkillsNodes,
      certifications: initialCertifications,
      achievements: initialAchievements,
      gallery: initialGalleryItems,
    };
  }
}

export default async function HomePage() {
  const data = await getPortfolioData();

  return (
    <div className="relative min-h-screen bg-space-bg text-gray-100 font-sans selection:bg-signal-cyan selection:text-space-bg overflow-x-hidden">
      {/* Desktop Particle Cursor Trail */}
      <CursorTrail />

      {/* Skippable 1.0-1.5s Boot Intro */}
      <BootSequence />

      {/* Glass Top Navigation */}
      <Navigation />

      <main>
        {/* Section 1: Hero */}
        <HeroSection settings={data.settings} />

        {/* Section 2: Profile Telemetry */}
        <ProfileTelemetry profiles={data.socials} />

        {/* Section 3: Engineering Timeline */}
        <EngineeringTimeline />

        {/* Section 4: Projects Command Deck */}
        <ProjectsCommandDeck projects={data.projects} />

        {/* Section 5: Stack Lab */}
        <StackLab technologies={data.technologies} />

        {/* Section 6: Skills Reactor */}
        <SkillsReactor skillNodes={data.skills} />

        {/* Section 7: Achievements & Certifications */}
        <AchievementsCertificates
          certifications={data.certifications}
          achievements={data.achievements}
        />

        {/* Section 8: Media Gallery */}
        <MediaGallery items={data.gallery} />

        {/* Section 9: Contact Transmission */}
        <ContactSection />
      </main>

      {/* Cyberpunk Footer */}
      <footer className="border-t border-space-border/60 py-10 px-4 text-center font-mono text-xs text-gray-400 bg-space-card/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-signal-cyan">
            <span className="w-2 h-2 rounded-full bg-signal-cyan animate-ping" />
            <span>MITHUN M P // COMMAND SYSTEM v1.0.0</span>
          </div>

          <p>© {new Date().getFullYear()} Mithun M P. Built with Next.js 14, Three.js, GSAP, & MongoDB.</p>

          <a href="#hero" className="hover:text-signal-cyan transition-colors uppercase">
            [RETURN TO TOP]
          </a>
        </div>
      </footer>
    </div>
  );
}
