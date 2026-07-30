"use client";

import React from "react";
import { ExternalLink, Github, Linkedin, Code2, Award } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ISocialProfile } from "@/types";

interface ProfileTelemetryProps {
  profiles: ISocialProfile[];
}

export const ProfileTelemetry: React.FC<ProfileTelemetryProps> = ({ profiles }) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case "GitHub":
        return <Github className="w-6 h-6 text-signal-cyan" />;
      case "LeetCode":
        return <Code2 className="w-6 h-6 text-signal-lime" />;
      case "HackerRank":
        return <Award className="w-6 h-6 text-signal-violet" />;
      case "LinkedIn":
        return <Linkedin className="w-6 h-6 text-signal-cyan" />;
      default:
        return <Code2 className="w-6 h-6 text-signal-cyan" />;
    }
  };

  return (
    <section id="telemetry" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        systemCode="TELEMETRY_02"
        title="Coding Profiles & Telemetry"
        subtitle="Live platform snapshots reflecting active development, algorithmic problem solving, and professional connectivity."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {profiles.map((profile) => (
          <GlassCard key={profile.platform} className="flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-space-bg/80 border border-space-border/60">
                  {getIcon(profile.platform)}
                </div>
                <span className="font-mono text-xs text-signal-cyan/80 bg-signal-cyan/10 px-2.5 py-1 rounded-full border border-signal-cyan/30">
                  {profile.statSnapshot}
                </span>
              </div>

              <h3 className="text-xl font-headline font-bold text-white mb-1">
                {profile.platform}
              </h3>
              <p className="font-mono text-xs text-gray-400 mb-3">@{profile.handle}</p>
              <p className="text-sm text-gray-300 font-sans leading-relaxed mb-6">
                {profile.caption}
              </p>
            </div>

            <a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-md font-mono text-xs text-signal-cyan bg-signal-cyan/5 border border-signal-cyan/30 group-hover:bg-signal-cyan group-hover:text-space-bg transition-all duration-300"
            >
              <span>ACCESS PROFILE</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};
