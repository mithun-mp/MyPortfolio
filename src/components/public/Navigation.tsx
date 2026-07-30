"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Terminal, Menu, X, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "Profile", href: "#telemetry" },
  { label: "Projects", href: "#projects" },
  { label: "Stack Lab", href: "#stack" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section highlight logic
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      for (const sectionId of sections.reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-4 px-4 sm:px-8",
        scrolled
          ? "bg-space-bg/85 backdrop-blur-md border-b border-space-border/50 shadow-glass"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="#hero"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-signal-cyan/10 border border-signal-cyan/40 flex items-center justify-center text-signal-cyan group-hover:bg-signal-cyan group-hover:text-space-bg transition-all duration-300 shadow-cyan-glow">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="font-headline font-bold text-white tracking-wider text-base sm:text-lg flex items-center gap-2">
              MITHUN M P
              <span className="w-1.5 h-1.5 rounded-full bg-signal-lime animate-ping" />
            </div>
            <div className="font-mono text-[10px] text-signal-cyan/70 uppercase tracking-widest">
              SYS.CMD // MCA
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-space-card/60 backdrop-blur-lg border border-space-border/60 rounded-full px-4 py-1.5 shadow-glass">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-mono tracking-wider transition-all duration-300 rounded-full uppercase",
                  isActive
                    ? "bg-signal-cyan text-space-bg font-bold shadow-cyan-glow"
                    : "text-gray-300 hover:text-signal-cyan hover:bg-white/5"
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Studio Admin Quick Link */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/studio"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-signal-violet/80 border border-signal-violet/30 rounded-md hover:bg-signal-violet/20 hover:text-white transition-all"
            title="Admin Command Studio"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-signal-violet" />
            <span>STUDIO</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-md bg-space-card border border-space-border text-signal-cyan hover:bg-white/5"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[73px] bg-space-bg/95 backdrop-blur-2xl border-b border-space-border p-6 shadow-2xl flex flex-col gap-3">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 text-sm font-mono tracking-wider text-gray-200 border-b border-white/5 hover:text-signal-cyan hover:bg-signal-cyan/10 rounded-md uppercase"
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/studio"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 px-4 py-3 text-sm font-mono text-signal-violet bg-signal-violet/10 border border-signal-violet/40 rounded-md uppercase"
          >
            <ShieldAlert className="w-4 h-4" />
            ADMIN STUDIO ACCESS
          </Link>
        </div>
      )}
    </header>
  );
};
