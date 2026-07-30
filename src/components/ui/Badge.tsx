"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "cyan" | "violet" | "lime" | "gray";
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "cyan", className, ...props }) => {
  const variantStyles = {
    cyan: "bg-signal-cyan/10 text-signal-cyan border-signal-cyan/30",
    violet: "bg-signal-violet/10 text-violet-300 border-signal-violet/30",
    lime: "bg-signal-lime/10 text-signal-lime border-signal-lime/30",
    gray: "bg-white/5 text-gray-300 border-white/10",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-mono tracking-wider border rounded-full uppercase",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
