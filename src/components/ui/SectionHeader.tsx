"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  systemCode: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  systemCode,
  title,
  subtitle,
  align = "left",
  className,
}) => {
  return (
    <div className={cn("mb-12 relative", align === "center" && "text-center", className)}>
      <div
        className={cn(
          "inline-flex items-center gap-2 font-mono text-xs text-signal-cyan tracking-widest uppercase mb-2",
          align === "center" && "justify-center"
        )}
      >
        <span className="w-2 h-2 rounded-full bg-signal-cyan animate-pulse" />
        <span>SYS_MODULE // {systemCode}</span>
      </div>
      <h2 className="text-3xl md:text-5xl font-headline font-bold text-white tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base md:text-lg text-gray-400 max-w-2xl font-sans leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "h-0.5 w-16 bg-gradient-to-r from-signal-cyan to-signal-violet mt-4",
          align === "center" && "mx-auto"
        )}
      />
    </div>
  );
};
