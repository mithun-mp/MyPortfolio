"use client";

import React, { useState } from "react";
import { Code, Cpu, Wrench, Layers, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ITechnology } from "@/types";
import { cn } from "@/lib/utils";

interface StackLabProps {
  technologies: ITechnology[];
}

export const StackLab: React.FC<StackLabProps> = ({ technologies }) => {
  const [activeTab, setActiveTab] = useState<"Languages" | "Technologies" | "Tools">("Languages");
  const [selectedTech, setSelectedTech] = useState<ITechnology | null>(null);

  const filteredTechs = technologies.filter((t) => t.category === activeTab);

  const getTabIcon = (cat: string) => {
    switch (cat) {
      case "Languages":
        return <Code className="w-4 h-4" />;
      case "Technologies":
        return <Cpu className="w-4 h-4" />;
      case "Tools":
        return <Wrench className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  return (
    <section id="stack" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        systemCode="STACK_LAB_05"
        title="Stack Lab & Orbit Laboratory"
        subtitle="Interactive technology grid revealing operational capabilities and project cross-references."
      />

      {/* Tab Controls */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1.5 rounded-full bg-space-card/90 border border-space-border shadow-glass">
          {(["Languages", "Technologies", "Tools"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedTech(null);
              }}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300",
                activeTab === tab
                  ? "bg-signal-cyan text-space-bg font-bold shadow-cyan-glow"
                  : "text-gray-400 hover:text-white"
              )}
            >
              {getTabIcon(tab)}
              <span>{tab}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Icons Grid */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredTechs.map((tech) => {
            const isSelected = selectedTech?.name === tech.name;
            return (
              <button
                key={tech.name}
                onClick={() => setSelectedTech(tech)}
                onFocus={() => setSelectedTech(tech)}
                onMouseEnter={() => setSelectedTech(tech)}
                className={cn(
                  "p-5 rounded-xl border transition-all duration-300 text-left flex flex-col justify-between group focus:outline-none focus:ring-2 focus:ring-signal-cyan",
                  isSelected
                    ? "bg-signal-cyan/15 border-signal-cyan shadow-cyan-glow text-white"
                    : "bg-space-card/80 border-space-border/60 hover:border-signal-cyan/50 text-gray-300"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-space-bg flex items-center justify-center font-mono font-bold text-signal-cyan border border-space-border text-sm group-hover:border-signal-cyan">
                    {tech.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="w-2 h-2 rounded-full bg-signal-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-base text-white">{tech.name}</h4>
                  <span className="font-mono text-[10px] text-gray-400">
                    {tech.relatedProjectSlugs.length} PROJECTS
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Capability Telemetry Dossier */}
        <div className="lg:col-span-5">
          <GlassCard className="sticky top-28 border-signal-cyan/40">
            {selectedTech ? (
              <div>
                <div className="flex items-center justify-between border-b border-space-border pb-4 mb-4">
                  <div>
                    <span className="font-mono text-[10px] text-signal-cyan tracking-widest uppercase">
                      TECH_INSPECTION // {selectedTech.category}
                    </span>
                    <h3 className="text-2xl font-headline font-bold text-white mt-1">
                      {selectedTech.name}
                    </h3>
                  </div>
                  <Badge variant="cyan">{selectedTech.category}</Badge>
                </div>

                <p className="text-sm text-gray-200 font-sans leading-relaxed mb-6">
                  {selectedTech.description}
                </p>

                <div>
                  <h4 className="font-mono text-xs text-signal-lime uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Related Projects Evidence
                  </h4>
                  {selectedTech.relatedProjectSlugs.length > 0 ? (
                    <div className="space-y-2">
                      {selectedTech.relatedProjectSlugs.map((slug) => (
                        <div
                          key={slug}
                          className="flex items-center gap-2 px-3 py-2 rounded bg-white/5 border border-white/10 font-mono text-xs text-signal-cyan"
                        >
                          <CheckCircle2 className="w-4 h-4 text-signal-lime shrink-0" />
                          <span className="capitalize">{slug.replace(/-/g, " ")}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="font-mono text-xs text-gray-400">
                      Core capability utilized across foundational systems.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <Cpu className="w-12 h-12 text-signal-cyan/40 mx-auto mb-4 animate-pulse" />
                <p className="font-mono text-xs text-signal-cyan tracking-widest uppercase">
                  HOVER OR CLICK ANY TECH NODE TO INSPECT CAPABILITY EVIDENCE
                </p>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
