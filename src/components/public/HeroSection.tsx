"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Mail, ArrowDownRight, FileText, Github, Linkedin, Code2, Award, Cpu } from "lucide-react";
import { CyberButton } from "@/components/ui/CyberButton";
import { Badge } from "@/components/ui/Badge";
import { ISiteSettings } from "@/types";

// Dynamically import 3D Hero scene without blocking SSR
const HeroCanvas = dynamic(() => import("@/components/canvas/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-space-card/60 rounded-2xl border border-space-border/40 p-8">
      <div className="flex flex-col items-center gap-3">
        <Cpu className="w-10 h-10 text-signal-cyan animate-spin" />
        <span className="font-mono text-xs text-signal-cyan/80">LOADING 3D CORE...</span>
      </div>
    </div>
  ),
});

interface HeroSectionProps {
  settings: ISiteSettings;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings }) => {
  const hireMailto = `mailto:${settings.contactEmail}?subject=Hiring%20enquiry%20for%20Mithun%20M%20P`;

  return (
    <section
      id="hero"
      className="relative min-h-svh pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden"
    >
      {/* Deep space background grid */}
      <div className="absolute inset-0 bg-cyber-grid bg-[size:40px_40px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-signal-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-signal-violet/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Text Overlay & Actions */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Status Indicator */}
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-space-card/90 border border-signal-lime/40 text-signal-lime text-xs font-mono tracking-wider shadow-lime-glow">
            <span className="w-2 h-2 rounded-full bg-signal-lime animate-pulse" />
            <span>{settings.availabilityStatus}</span>
          </div>

          {/* Name & Headline */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-headline font-extrabold text-white tracking-tight leading-[1.08] mb-4">
            MITHUN <span className="text-transparent bg-clip-text bg-gradient-to-r from-signal-cyan via-white to-signal-violet">M P</span>
          </h1>

          <div className="text-lg sm:text-xl font-mono text-signal-cyan/90 mb-6 font-medium tracking-wide">
            {settings.headline}
          </div>

          <p className="text-base sm:text-lg text-gray-300 font-sans leading-relaxed max-w-2xl mb-8">
            {settings.statement}
          </p>

          {/* Primary & Secondary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a href={hireMailto}>
              <CyberButton variant="primary" size="lg" icon={<Mail className="w-5 h-5" />}>
                HIRE ME
              </CyberButton>
            </a>

            <a href="#projects">
              <CyberButton variant="secondary" size="lg" icon={<ArrowDownRight className="w-5 h-5" />}>
                VIEW PROJECTS
              </CyberButton>
            </a>

            <a
              href={settings.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-sm font-mono text-xs text-gray-300 hover:text-signal-cyan border border-white/10 hover:border-signal-cyan/40 bg-white/5 hover:bg-signal-cyan/5 transition-all"
            >
              <FileText className="w-4 h-4 text-signal-cyan" />
              <span>RÉSUMÉ</span>
            </a>
          </div>

          {/* Interactive Social Dock */}
          <div className="flex items-center gap-3 pt-6 border-t border-space-border/50 w-full">
            <span className="font-mono text-xs text-gray-400 tracking-wider uppercase mr-2">
              TELEMETRY DOCK:
            </span>
            <a
              href={settings.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-space-card/80 border border-space-border text-gray-300 hover:text-signal-cyan hover:border-signal-cyan hover:shadow-cyan-glow transition-all"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={settings.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-space-card/80 border border-space-border text-gray-300 hover:text-signal-cyan hover:border-signal-cyan hover:shadow-cyan-glow transition-all"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={settings.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-space-card/80 border border-space-border text-gray-300 hover:text-signal-lime hover:border-signal-lime hover:shadow-lime-glow transition-all"
              aria-label="LeetCode Profile"
            >
              <Code2 className="w-5 h-5" />
            </a>
            <a
              href={settings.hackerrankUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-space-card/80 border border-space-border text-gray-300 hover:text-signal-violet hover:border-signal-violet hover:shadow-violet-glow transition-all"
              aria-label="HackerRank Profile"
            >
              <Award className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right Column: 3D Workstation Core Scene (16:9 contained box) */}
        <div className="lg:col-span-5 h-[380px] sm:h-[450px] lg:h-[500px] w-full">
          <HeroCanvas />
        </div>
      </div>
    </section>
  );
};
