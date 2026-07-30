"use client";

import React, { useState, useEffect } from "react";
import { StudioSidebar } from "@/components/studio/StudioSidebar";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { Plus, Edit2, Trash2, Award } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { CyberButton } from "@/components/ui/CyberButton";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { ICertification, IAchievement } from "@/types";

export default function StudioAchievementsPage() {
  const [certifications, setCertifications] = useState<ICertification[]>([]);
  const [achievements, setAchievements] = useState<IAchievement[]>([]);

  useEffect(() => {
    fetch("/api/studio/certifications")
      .then((res) => res.json())
      .then((data) => setCertifications(Array.isArray(data) ? data : []))
      .catch(() => {});

    fetch("/api/studio/achievements")
      .then((res) => res.json())
      .then((data) => setAchievements(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  return (
    <div className="flex min-h-screen bg-space-bg text-gray-100 font-sans">
      <StudioSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <StudioHeader />

        <main className="p-8 max-w-6xl w-full space-y-12">
          {/* Section 1: Certifications */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-headline font-bold text-white tracking-tight flex items-center gap-3">
                <Award className="w-6 h-6 text-signal-cyan" />
                VERIFIED CERTIFICATIONS
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((c, i) => (
                <GlassCard key={i} glowColor="cyan" className="flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-xs text-signal-cyan">{c.issuer}</span>
                      {c.isElite && <Badge variant="lime">ELITE</Badge>}
                    </div>
                    <h3 className="font-headline font-bold text-white text-base mb-1">{c.title}</h3>
                    <p className="font-mono text-xs text-gray-300">GRADE: {c.grade}</p>
                  </div>
                  <div className="mt-4 font-mono text-[10px] text-gray-400">ISSUED: {c.date}</div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Section 2: Achievements */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-headline font-bold text-white tracking-tight flex items-center gap-3">
                <Award className="w-6 h-6 text-signal-lime" />
                KEY ACHIEVEMENTS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((a, i) => (
                <GlassCard key={i} glowColor="lime">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-headline font-bold text-white text-base">{a.title}</h3>
                    {a.date && <span className="font-mono text-xs text-signal-lime">{a.date}</span>}
                  </div>
                  <p className="text-xs text-gray-300 font-sans leading-relaxed">{a.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
