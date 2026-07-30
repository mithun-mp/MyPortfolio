"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const CyberButton = React.forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant = "primary", size = "md", children, icon, ...props }, ref) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-mono font-medium tracking-wider uppercase transition-all duration-300 rounded-sm cursor-pointer border select-none focus:outline-none focus:ring-2 focus:ring-signal-cyan/50 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group";

    const variantStyles = {
      primary:
        "bg-signal-cyan/10 text-signal-cyan border-signal-cyan/50 hover:bg-signal-cyan hover:text-space-bg hover:shadow-cyan-glow",
      secondary:
        "bg-signal-violet/15 text-white border-signal-violet/40 hover:bg-signal-violet/40 hover:border-signal-violet hover:shadow-violet-glow",
      accent:
        "bg-signal-lime/10 text-signal-lime border-signal-lime/40 hover:bg-signal-lime hover:text-space-bg hover:shadow-lime-glow",
      outline:
        "bg-transparent text-gray-300 border-white/20 hover:border-signal-cyan/50 hover:text-signal-cyan hover:bg-signal-cyan/5",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-7 py-3.5 gap-3",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
        </span>
        <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 pointer-events-none" />
      </button>
    );
  }
);

CyberButton.displayName = "CyberButton";
