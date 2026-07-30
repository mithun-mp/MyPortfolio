"use client";

import React from "react";
import { GraduationCap, Rocket, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";

export const EngineeringTimeline: React.FC = () => {
  const milestones = [
    {
      year: "2025 – 2027",
      status: "PURSUING",
      title: "Master of Computer Applications (MCA)",
      institution: "Government Engineering College Thrissur (GECT)",
      description:
        "Advanced computer science coursework, distributed computing, database management, and full-stack software development.",
      highlights: [
        "Focus on system design, database architecture, and real-time computing.",
        "Developing campus communication platform GECT Connect.",
      ],
      icon: <GraduationCap className="w-5 h-5 text-signal-cyan" />,
      badgeVariant: "cyan" as const,
    },
    {
      year: "2022 – 2025",
      status: "COMPLETED",
      title: "Bachelor of Science in Computer Science (B.Sc. CS)",
      institution: "IHRD College of Applied Science Cheemeni",
      description:
        "Core computer science foundation including data structures, object-oriented programming, database systems, web tech, and software engineering.",
      highlights: [
        "Graduated with CGPA: 7.187 / 10",
        "Built Synchronis smart attendance platform as major software project.",
        "Built Computer Based Test Platform and Sports Scoreboard System.",
      ],
      icon: <GraduationCap className="w-5 h-5 text-signal-lime" />,
      badgeVariant: "lime" as const,
    },
    {
      year: "2025 – PRESENT",
      status: "ACTIVE FOCUS",
      title: "Current Technical Trajectory",
      institution: "Full-Stack Software Engineering",
      description:
        "Focused on full-stack web applications, reactive user interfaces, real-time system architectures, problem solving, and continuous engineering expansion.",
      highlights: [
        "Next.js App Router, React, Python Django, Flutter, and MongoDB.",
        "Competitive algorithmic problem solving on LeetCode & HackerRank.",
      ],
      icon: <Rocket className="w-5 h-5 text-signal-violet" />,
      badgeVariant: "violet" as const,
    },
  ];

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <SectionHeader
        systemCode="TIMELINE_03"
        title="Engineering Timeline"
        subtitle="Academic milestones, technical degree trajectory, and continuous software engineering expansion."
      />

      <div className="relative border-l-2 border-space-border/60 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
        {milestones.map((m, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline node icon marker */}
            <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-10 h-10 rounded-full bg-space-bg border-2 border-signal-cyan flex items-center justify-center shadow-cyan-glow transition-transform duration-300 group-hover:scale-110">
              {m.icon}
            </div>

            <GlassCard className="relative">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs text-signal-cyan font-semibold tracking-wider">
                  [{m.year}]
                </span>
                <Badge variant={m.badgeVariant}>{m.status}</Badge>
              </div>

              <h3 className="text-xl sm:text-2xl font-headline font-bold text-white mb-1">
                {m.title}
              </h3>
              <p className="font-mono text-sm text-signal-cyan/90 mb-4">{m.institution}</p>
              <p className="text-gray-300 text-sm font-sans leading-relaxed mb-4">
                {m.description}
              </p>

              <div className="space-y-2 border-t border-space-border/40 pt-4">
                {m.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs font-mono text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-signal-cyan shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        ))}
      </div>
    </section>
  );
};
