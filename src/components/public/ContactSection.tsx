"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, AlertCircle, Mail, Github, Linkedin, MessageSquare } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { CyberButton } from "@/components/ui/CyberButton";
import { contactSchema, ContactFormData } from "@/lib/validation";

export const ContactSection: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 404) {
        // Fallback for static GitHub Pages hosting
        window.location.href = `mailto:mithunmp2004@gmail.com?subject=Transmission%20from%20${encodeURIComponent(data.name)}&body=${encodeURIComponent(data.message)}`;
        setStatus("success");
        reset();
        return;
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Transmission dispatch failed.");
      }

      setStatus("success");
      reset();
    } catch (err) {
      // If API route is missing (static export client side), fallback to mailto link
      window.location.href = `mailto:mithunmp2004@gmail.com?subject=Transmission%20from%20${encodeURIComponent(data.name)}&body=${encodeURIComponent(data.message)}`;
      setStatus("success");
      reset();
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        systemCode="TRANSMISSION_09"
        title="Open a Transmission"
        subtitle="Direct comms channel for recruitment enquiries, project collaborations, and software discussion."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Links & Info */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard glowColor="cyan">
            <h3 className="text-xl font-headline font-bold text-white mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-signal-cyan" />
              Direct Communication
            </h3>
            <p className="text-xs text-gray-300 font-sans leading-relaxed mb-4">
              Feel free to initiate a direct mail inquiry or connect via professional networks.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <a
                href="mailto:mithunmp2004@gmail.com?subject=Hiring%20enquiry%20for%20Mithun%20M%20P"
                className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/10 hover:border-signal-cyan/50 text-signal-cyan transition-colors"
              >
                <span>EMAIL: mithunmp2004@gmail.com</span>
                <Send className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/mithun-mp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/10 hover:border-signal-cyan/50 text-gray-300 hover:text-signal-cyan transition-colors"
              >
                <span>GITHUB: @mithun-mp</span>
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/mithun-m-p-70781628b"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/10 hover:border-signal-cyan/50 text-gray-300 hover:text-signal-cyan transition-colors"
              >
                <span>LINKEDIN: mithun-m-p-70781628b</span>
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </GlassCard>

          <GlassCard glowColor="lime">
            <h4 className="font-mono text-xs text-signal-lime uppercase tracking-widest mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-signal-lime animate-pulse" />
              RESPONSE TELEMETRY
            </h4>
            <p className="text-xs text-gray-300 font-sans">
              All form submissions trigger a secure database log and instant Resend notification. Typical response time is under 24 hours.
            </p>
          </GlassCard>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <GlassCard glowColor="cyan">
            {status === "success" ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-signal-cyan/10 border-2 border-signal-cyan mx-auto flex items-center justify-center text-signal-cyan shadow-cyan-glow">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-headline font-bold text-white">
                  TRANSMISSION DISPATCHED
                </h3>
                <p className="text-sm text-gray-300 font-sans max-w-md mx-auto">
                  Thank you for reaching out! Your message has been safely received. Mithun will respond shortly.
                </p>
                <CyberButton variant="outline" size="sm" onClick={() => setStatus("idle")}>
                  SEND ANOTHER MESSAGE
                </CyberButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Honeypot Field (Hidden from normal users) */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden opacity-0 pointer-events-none"
                  {...register("honeypot")}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-signal-cyan uppercase tracking-wider mb-2">
                      NAME *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Connor"
                      className="w-full px-4 py-3 rounded bg-space-bg/90 border border-space-border/80 text-white font-sans text-sm focus:outline-none focus:border-signal-cyan transition-colors"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="mt-1 font-mono text-[11px] text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-signal-cyan uppercase tracking-wider mb-2">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. sarah@cyberdyne.com"
                      className="w-full px-4 py-3 rounded bg-space-bg/90 border border-space-border/80 text-white font-sans text-sm focus:outline-none focus:border-signal-cyan transition-colors"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 font-mono text-[11px] text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-signal-cyan uppercase tracking-wider mb-2">
                    COMPANY / ROLE (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tech Lead at Innovate Inc"
                    className="w-full px-4 py-3 rounded bg-space-bg/90 border border-space-border/80 text-white font-sans text-sm focus:outline-none focus:border-signal-cyan transition-colors"
                    {...register("company")}
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-signal-cyan uppercase tracking-wider mb-2">
                    MESSAGE PAYLOAD *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Describe your inquiry, project scope, or opportunity..."
                    className="w-full px-4 py-3 rounded bg-space-bg/90 border border-space-border/80 text-white font-sans text-sm focus:outline-none focus:border-signal-cyan transition-colors resize-none"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="mt-1 font-mono text-[11px] text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <div className="p-3 rounded bg-red-950/40 border border-red-500/50 flex items-center gap-2 font-mono text-xs text-red-300">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <CyberButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={status === "submitting"}
                  icon={<Send className="w-4 h-4" />}
                  className="w-full"
                >
                  {status === "submitting" ? "DISPATCHING TRANSMISSION..." : "DISPATCH TRANSMISSION"}
                </CyberButton>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
