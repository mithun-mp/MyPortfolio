"use client";

import React, { useState, useEffect } from "react";
import { StudioSidebar } from "@/components/studio/StudioSidebar";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { Settings, Save, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { CyberButton } from "@/components/ui/CyberButton";
import { ISiteSettings } from "@/types";
import { initialSiteSettings } from "@/db/seedData";

export default function StudioSettingsPage() {
  const [settings, setSettings] = useState<ISiteSettings>(initialSiteSettings);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  useEffect(() => {
    fetch("/api/studio/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.name) setSettings(data);
      })
      .catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");

    try {
      const res = await fetch("/api/studio/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (err) {
      console.error(err);
      setStatus("idle");
    }
  };

  return (
    <div className="flex min-h-screen bg-space-bg text-gray-100 font-sans">
      <StudioSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <StudioHeader />

        <main className="p-8 max-w-4xl w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-headline font-bold text-white tracking-tight flex items-center gap-3">
              <Settings className="w-8 h-8 text-signal-cyan" />
              SITE TELEMETRY & COPY SETTINGS
            </h1>
            <p className="font-mono text-xs text-signal-cyan mt-1">
              UPDATE HERO HEADLINE, ENGINEERING STATEMENT, AVAILABILITY STATUS, AND SOCIAL URLS
            </p>
          </div>

          <GlassCard glowColor="cyan">
            <form onSubmit={handleSave} className="space-y-6 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-signal-cyan mb-1">BRAND NAME</label>
                  <input
                    type="text"
                    value={settings.name}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                    className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-signal-cyan mb-1">CONTACT EMAIL</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-signal-cyan mb-1">HEADLINE</label>
                <input
                  type="text"
                  value={settings.headline}
                  onChange={(e) => setSettings({ ...settings, headline: e.target.value })}
                  className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-signal-cyan mb-1">AVAILABILITY STATUS INDICATOR</label>
                <input
                  type="text"
                  value={settings.availabilityStatus}
                  onChange={(e) => setSettings({ ...settings, availabilityStatus: e.target.value })}
                  className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-signal-cyan mb-1">ENGINEERING STATEMENT</label>
                <textarea
                  rows={4}
                  value={settings.statement}
                  onChange={(e) => setSettings({ ...settings, statement: e.target.value })}
                  className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                  required
                />
              </div>

              <div className="space-y-3 pt-4 border-t border-space-border">
                <h4 className="text-signal-lime uppercase tracking-wider">SOCIAL & TELEMETRY LINKS</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-1">GITHUB URL</label>
                    <input
                      type="url"
                      value={settings.githubUrl}
                      onChange={(e) => setSettings({ ...settings, githubUrl: e.target.value })}
                      className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">LINKEDIN URL</label>
                    <input
                      type="url"
                      value={settings.linkedinUrl}
                      onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                      className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">LEETCODE URL</label>
                    <input
                      type="url"
                      value={settings.leetcodeUrl}
                      onChange={(e) => setSettings({ ...settings, leetcodeUrl: e.target.value })}
                      className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">HACKERRANK URL</label>
                    <input
                      type="url"
                      value={settings.hackerrankUrl}
                      onChange={(e) => setSettings({ ...settings, hackerrankUrl: e.target.value })}
                      className="w-full p-2.5 rounded bg-space-bg border border-space-border text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-space-border">
                {status === "saved" ? (
                  <span className="text-signal-lime flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    TELEMETRY UPDATED SUCCESSFULLY
                  </span>
                ) : (
                  <span className="text-gray-400">SERVER-SIDE SYNC READY</span>
                )}

                <CyberButton
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={status === "saving"}
                  icon={<Save className="w-4 h-4" />}
                >
                  {status === "saving" ? "SAVING..." : "UPDATE TELEMETRY"}
                </CyberButton>
              </div>
            </form>
          </GlassCard>
        </main>
      </div>
    </div>
  );
}
