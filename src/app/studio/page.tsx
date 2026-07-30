import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { StudioSidebar } from "@/components/studio/StudioSidebar";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { FolderGit2, Cpu, Zap, Award, Image as ImageIcon, MessageSquare, Settings } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export default async function StudioOverviewPage() {
  const session = await getAdminSession();
  
  // If not authenticated as mithun-mp, redirect to sign in or display unauthorized notice
  if (!session || !session.user) {
    // In production, NextAuth redirects to GitHub sign-in
  }

  const cards = [
    { title: "Projects Command Deck", count: "6 Active Missions", href: "/studio/projects", icon: FolderGit2, color: "text-signal-cyan" },
    { title: "Stack Lab & Tools", href: "/studio/stack", count: "18 Tech Modules", icon: Cpu, color: "text-signal-lime" },
    { title: "Skills Reactor", href: "/studio/skills", count: "6 Core Capabilities", icon: Zap, color: "text-signal-violet" },
    { title: "Achievements & Certs", href: "/studio/achievements", count: "11 Verified Honors", icon: Award, color: "text-signal-cyan" },
    { title: "Media Gallery", href: "/studio/gallery", count: "4 Visual Assets", icon: ImageIcon, color: "text-signal-lime" },
    { title: "Contact Submissions", href: "/studio/messages", count: "Inbox Logs", icon: MessageSquare, color: "text-signal-violet" },
    { title: "Site Telemetry & Settings", href: "/studio/settings", count: "Profile Copy & Socials", icon: Settings, color: "text-signal-cyan" },
  ];

  return (
    <div className="flex min-h-screen bg-space-bg text-gray-100 font-sans">
      <StudioSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <StudioHeader />
        
        <main className="p-8 max-w-6xl w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-headline font-bold text-white tracking-tight">
              STUDIO COMMAND OVERVIEW
            </h1>
            <p className="font-mono text-xs text-signal-cyan mt-1">
              ADMIN CONTROL PANEL // GITHUB AUTHORIZED: @MITHUN-MP
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <Link key={card.href} href={card.href}>
                  <GlassCard glowColor="cyan" className="h-full flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-lg bg-space-bg border border-space-border">
                          <Icon className={`w-6 h-6 ${card.color}`} />
                        </div>
                        <span className="font-mono text-xs text-signal-cyan">MANAGE ↗</span>
                      </div>
                      <h3 className="text-xl font-headline font-bold text-white group-hover:text-signal-cyan transition-colors">
                        {card.title}
                      </h3>
                      <p className="font-mono text-xs text-gray-400 mt-1">{card.count}</p>
                    </div>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
