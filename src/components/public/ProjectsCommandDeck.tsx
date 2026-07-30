"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ExternalLink, Github, Layers, Info, CheckCircle2, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { CyberButton } from "@/components/ui/CyberButton";
import { Modal } from "@/components/ui/Modal";
import { IProject } from "@/types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsCommandDeckProps {
  projects: IProject[];
}

export const ProjectsCommandDeck: React.FC<ProjectsCommandDeckProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run GSAP horizontal pin sequence on desktop (>=1280px) without reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (window.innerWidth < 1280 || mediaQuery.matches) return;

    const track = scrollTrackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const totalScrollWidth = track.scrollWidth - window.innerWidth + 100;

    const animation = gsap.to(track, {
      x: () => -totalScrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => `+=${totalScrollWidth}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [projects]);

  return (
    <section id="projects" ref={containerRef} className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          systemCode="COMMAND_DECK_04"
          title="Projects Command Deck"
          subtitle="Engineered mission dossiers detailing software solutions, technical architectures, and problem-solving outcomes."
        />
      </div>

      {/* Horizontal Scroll Track Container */}
      <div className="w-full overflow-x-auto xl:overflow-x-hidden no-scrollbar px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollTrackRef}
          className="flex flex-col xl:flex-row gap-8 w-full xl:w-max pb-8"
        >
          {projects.map((project) => (
            <div
              key={project.slug}
              className="w-full xl:w-[680px] shrink-0 bg-space-card/80 border border-space-border/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between backdrop-blur-xl shadow-glass group hover:border-signal-cyan/60 hover:shadow-cyan-glow transition-all duration-300"
            >
              <div>
                {/* 16:9 Image Preview */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6 border border-space-border/40 group-hover:border-signal-cyan/40">
                  {project.images && project.images[0] ? (
                    <Image
                      src={project.images[0].url}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-space-bg via-space-card to-[#0a0f24] flex items-center justify-center font-mono text-xs text-signal-cyan">
                      MISSION_IMAGE_PLACEHOLDER
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex gap-2">
                    {project.featured && <Badge variant="lime">FEATURED</Badge>}
                    <Badge variant="cyan">MISSION #{project.order}</Badge>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-headline font-bold text-white mb-2 group-hover:text-signal-cyan transition-colors">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-signal-cyan/90 mb-4">{project.tagline}</p>
                <p className="text-sm text-gray-300 font-sans line-clamp-2 mb-6">
                  {project.summary}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[11px] font-mono rounded bg-white/5 border border-white/10 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-2 py-1 text-[10px] font-mono rounded bg-signal-cyan/10 text-signal-cyan">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between border-t border-space-border/40 pt-4 mt-2">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-2 font-mono text-xs text-signal-cyan hover:text-white transition-colors"
                >
                  <Info className="w-4 h-4" />
                  <span>OPEN FULL DOSSIER</span>
                </button>

                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded bg-space-bg border border-space-border text-gray-300 hover:text-signal-cyan"
                      title="View Source Code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded bg-space-bg border border-space-border text-gray-300 hover:text-signal-lime"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Project Lightbox Dossier Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
        maxWidth="4xl"
      >
        {selectedProject && (
          <div className="space-y-6">
            <div className="font-mono text-xs text-signal-cyan flex items-center gap-2">
              <Badge variant="cyan">MISSION DOSSIER</Badge>
              <span>{selectedProject.tagline}</span>
            </div>

            {/* Gallery Images */}
            {selectedProject.images && selectedProject.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedProject.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-video rounded-lg overflow-hidden border border-space-border"
                  >
                    <Image src={img.url} alt={img.caption} fill className="object-cover" />
                    <div className="absolute bottom-0 inset-x-0 bg-space-bg/80 backdrop-blur-sm p-2 text-[10px] font-mono text-gray-300">
                      {img.caption}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Problem Solved */}
            <div className="bg-space-card border border-signal-cyan/30 rounded-lg p-5">
              <h4 className="font-mono text-xs text-signal-cyan uppercase tracking-widest mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Problem Statement & Architecture
              </h4>
              <p className="text-sm text-gray-200 leading-relaxed font-sans">
                {selectedProject.problemSolved}
              </p>
            </div>

            {/* Key Learnings */}
            <div>
              <h4 className="font-mono text-xs text-signal-lime uppercase tracking-widest mb-3">
                Key Engineering Learnings
              </h4>
              <div className="space-y-2">
                {selectedProject.keyLearnings.map((learning, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs font-mono text-gray-300 bg-white/5 p-3 rounded border border-white/10"
                  >
                    <CheckCircle2 className="w-4 h-4 text-signal-lime shrink-0 mt-0.5" />
                    <span>{learning}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* All Technologies */}
            <div>
              <h4 className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-2">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((t) => (
                  <Badge key={t} variant="cyan">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Footer Action Links */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-space-border pt-4">
              <CyberButton variant="outline" size="sm" onClick={() => setSelectedProject(null)}>
                CLOSE DOSSIER
              </CyberButton>

              <div className="flex items-center gap-3">
                {selectedProject.githubUrl && (
                  <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                    <CyberButton variant="secondary" size="sm" icon={<Github className="w-4 h-4" />}>
                      VIEW REPOSITORY
                    </CyberButton>
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                    <CyberButton variant="primary" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                      LAUNCH DEMO
                    </CyberButton>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
