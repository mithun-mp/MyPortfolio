"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  Cpu,
  Zap,
  Award,
  Image as ImageIcon,
  Settings,
  MessageSquare,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Overview", href: "/studio", icon: LayoutDashboard },
  { label: "Projects Deck", href: "/studio/projects", icon: FolderGit2 },
  { label: "Stack & Tools", href: "/studio/stack", icon: Cpu },
  { label: "Skills Reactor", href: "/studio/skills", icon: Zap },
  { label: "Achievements & Certs", href: "/studio/achievements", icon: Award },
  { label: "Media Gallery", href: "/studio/gallery", icon: ImageIcon },
  { label: "Site Telemetry", href: "/studio/settings", icon: Settings },
  { label: "Submissions Log", href: "/studio/messages", icon: MessageSquare },
];

export const StudioSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-space-bg/95 border-r border-space-border/60 flex flex-col justify-between p-4 h-screen sticky top-0 font-mono text-xs">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2.5 pb-6 border-b border-space-border/50 mb-6 px-2">
          <div className="w-8 h-8 rounded bg-signal-cyan/10 border border-signal-cyan/50 flex items-center justify-center text-signal-cyan">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="font-headline font-bold text-white tracking-wide text-sm">
              COMMAND STUDIO
            </div>
            <div className="text-[10px] text-signal-cyan/70">ADMIN // MITHUN-MP</div>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-md transition-all uppercase tracking-wider",
                  isActive
                    ? "bg-signal-cyan text-space-bg font-bold shadow-cyan-glow"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer link to public site */}
      <div className="border-t border-space-border/50 pt-4 px-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between p-2.5 rounded bg-white/5 border border-white/10 hover:border-signal-cyan/40 text-gray-300 hover:text-signal-cyan transition-colors"
        >
          <span className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-signal-cyan" />
            <span>PUBLIC PORTFOLIO</span>
          </span>
          <span className="text-[10px] text-signal-cyan">↗</span>
        </Link>
      </div>
    </aside>
  );
};
