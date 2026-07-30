"use client";

import React from "react";
import { Award, ShieldCheck, ExternalLink, Medal, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ICertification, IAchievement } from "@/types";

interface AchievementsCertificatesProps {
  certifications: ICertification[];
  achievements: IAchievement[];
}

export const AchievementsCertificates: React.FC<AchievementsCertificatesProps> = ({
  certifications,
  achievements,
}) => {
  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        systemCode="HONORS_07"
        title="Achievements & Certifications"
        subtitle="Verified credentials, competition awards, and key engineering milestones."
      />

      {/* Achievements Medal Grid */}
      <div className="mb-16">
        <h3 className="font-mono text-xs text-signal-lime uppercase tracking-widest mb-6 flex items-center gap-2">
          <Medal className="w-4 h-4" />
          Key Achievements & Recognitions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, idx) => (
            <GlassCard key={idx} glowColor="lime" className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-signal-lime/10 border border-signal-lime/40 text-signal-lime shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-headline font-bold text-white text-base">{item.title}</h4>
                  {item.date && (
                    <span className="font-mono text-[10px] text-signal-lime">{item.date}</span>
                  )}
                </div>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* A4 Ratio Certificate Cards Grid */}
      <div>
        <h3 className="font-mono text-xs text-signal-cyan uppercase tracking-widest mb-6 flex items-center gap-2">
          <Award className="w-4 h-4" />
          Verified Technical Certifications
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <GlassCard
              key={idx}
              glowColor={cert.isElite ? "lime" : "cyan"}
              className="flex flex-col justify-between aspect-[1.41/1] relative overflow-hidden"
            >
              {cert.isElite && (
                <div className="absolute top-0 right-0 bg-signal-lime text-space-bg font-mono text-[10px] font-bold px-3 py-0.5 rounded-bl uppercase">
                  ELITE SILVER
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck
                    className={`w-6 h-6 ${cert.isElite ? "text-signal-lime" : "text-signal-cyan"}`}
                  />
                  <span className="font-mono text-xs text-gray-400">{cert.issuer}</span>
                </div>

                <h4 className="text-lg font-headline font-bold text-white mb-2 leading-snug">
                  {cert.title}
                </h4>

                <p className="font-mono text-xs text-signal-cyan mb-4">
                  GRADE / RESULT: <span className="text-white font-bold">{cert.grade}</span>
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-space-border/50 pt-3">
                <span className="font-mono text-[10px] text-gray-400">ISSUED: {cert.date}</span>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-signal-cyan hover:underline"
                  >
                    <span>VERIFY</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
