"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: "cyan" | "violet" | "lime" | "none";
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glowColor = "cyan",
  hoverEffect = true,
  ...props
}) => {
  const glowStyles = {
    cyan: "hover:border-signal-cyan/50 hover:shadow-cyan-glow",
    violet: "hover:border-signal-violet/50 hover:shadow-violet-glow",
    lime: "hover:border-signal-lime/50 hover:shadow-lime-glow",
    none: "",
  };

  return (
    <div
      className={cn(
        "relative backdrop-blur-xl bg-space-card/80 border border-space-border/50 rounded-lg p-6 transition-all duration-300 shadow-glass",
        hoverEffect && "hover:-translate-y-1",
        hoverEffect && glowStyles[glowColor],
        className
      )}
      {...props}
    >
      {/* Subtle corner tech indicators */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-signal-cyan/40" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-signal-cyan/40" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-signal-cyan/40" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-signal-cyan/40" />
      {children}
    </div>
  );
};
