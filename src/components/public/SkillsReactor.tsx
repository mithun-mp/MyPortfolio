"use client";

import React, { useState } from "react";
import { Cpu, Zap, CheckCircle2, Award, Code } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ISkillNode } from "@/types";
import { cn } from "@/lib/utils";

interface SkillsReactorProps {
  skillNodes: ISkillNode[];
}

export const SkillsReactor: React.FC<SkillsReactorProps> = ({ skillNodes }) => {
  const [activeNodeId, setActiveNodeId] = useState<string>(skillNodes[0]?.id || "full-stack");

  const activeNode = skillNodes.find((n) => n.id === activeNodeId) || skillNodes[0];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        systemCode="REACTOR_06"
        title="Skills Reactor & Capability Constellation"
        subtitle="Interconnected matrix mapping core software capabilities to languages, certifications, and real project evidence."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Reactor Core Control Panel (Semantic Accessible Nodes) */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skillNodes.map((node) => {
            const isActive = activeNodeId === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setActiveNodeId(node.id)}
                className={cn(
                  "p-6 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-signal-cyan",
                  isActive
                    ? "bg-gradient-to-br from-signal-cyan/20 via-space-card to-signal-violet/20 border-signal-cyan shadow-cyan-glow"
                    : "bg-space-card/80 border-space-border/60 hover:border-signal-cyan/40"
                )}
                aria-pressed={isActive}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-lg bg-space-bg border border-space-border text-signal-cyan">
                    <Zap className={cn("w-5 h-5", isActive && "animate-bounce text-signal-lime")} />
                  </div>
                  <span className="font-mono text-[10px] text-signal-cyan/80">
                    {node.category}
                  </span>
                </div>
                <h3 className="font-headline font-bold text-lg text-white mb-2">{node.label}</h3>
                <p className="text-xs text-gray-300 font-sans line-clamp-2">{node.description}</p>

                {isActive && (
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-signal-cyan to-signal-violet" />
                )}
              </button>
            );
          })}
        </div>

        {/* Reactor Telemetry Output (Illuminated Connections) */}
        <div className="lg:col-span-6">
          <GlassCard className="sticky top-28 border-signal-violet/50">
            {activeNode && (
              <div className="space-y-6">
                <div className="border-b border-space-border pb-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-signal-lime mb-1">
                    <span className="w-2 h-2 rounded-full bg-signal-lime animate-ping" />
                    <span>NODE_ILLUMINATED // {activeNode.category}</span>
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-white">
                    {activeNode.label}
                  </h3>
                  <p className="mt-2 text-sm text-gray-200 leading-relaxed font-sans">
                    {activeNode.description}
                  </p>
                </div>

                {/* Associated Languages & Tools */}
                <div>
                  <h4 className="font-mono text-xs text-signal-cyan uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Illuminated Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeNode.relatedTechs.map((tech) => (
                      <Badge key={tech} variant="cyan">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Associated Certifications */}
                <div>
                  <h4 className="font-mono text-xs text-signal-violet uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4 text-signal-violet" />
                    Verified Certifications
                  </h4>
                  <div className="space-y-1.5">
                    {activeNode.relatedCerts.map((cert) => (
                      <div
                        key={cert}
                        className="flex items-center gap-2 px-3 py-2 rounded bg-signal-violet/10 border border-signal-violet/30 text-xs font-mono text-violet-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-signal-violet shrink-0" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Evidence */}
                <div>
                  <h4 className="font-mono text-xs text-signal-lime uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-signal-lime" />
                    Project Implementations
                  </h4>
                  <div className="space-y-1.5">
                    {activeNode.relatedProjects.map((p) => (
                      <div
                        key={p}
                        className="flex items-center gap-2 px-3 py-2 rounded bg-signal-lime/10 border border-signal-lime/30 text-xs font-mono text-signal-lime"
                      >
                        <CheckCircle2 className="w-4 h-4 text-signal-lime shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
