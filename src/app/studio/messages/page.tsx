"use client";

import React, { useState, useEffect } from "react";
import { StudioSidebar } from "@/components/studio/StudioSidebar";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { MessageSquare, Mail, Calendar, Trash2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { IContactSubmission } from "@/types";
import { formatDate } from "@/lib/utils";

export default function StudioMessagesPage() {
  const [submissions, setSubmissions] = useState<IContactSubmission[]>([]);

  useEffect(() => {
    fetch("/api/studio/messages")
      .then((res) => res.json())
      .then((data) => setSubmissions(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Delete submission record?")) return;
    try {
      await fetch(`/api/studio/messages?id=${id}`, { method: "DELETE" });
      setSubmissions(submissions.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-space-bg text-gray-100 font-sans">
      <StudioSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <StudioHeader />

        <main className="p-8 max-w-6xl w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-headline font-bold text-white tracking-tight flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-signal-cyan" />
              CONTACT SUBMISSIONS INBOX
            </h1>
            <p className="font-mono text-xs text-signal-cyan mt-1">
              LOGGED PORTFOLIO TRANSMISSIONS VIA &ldquo;OPEN A TRANSMISSION&rdquo; CONTACT FORM
            </p>
          </div>

          {submissions.length === 0 ? (
            <GlassCard className="text-center py-12 text-gray-400 font-mono text-xs">
              NO TRANSMISSION SUBMISSIONS RECORDED YET.
            </GlassCard>
          ) : (
            <div className="space-y-4">
              {submissions.map((sub) => (
                <GlassCard key={sub._id || sub.email} glowColor="cyan" className="flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-space-border/50 pb-3 mb-3">
                      <div>
                        <h3 className="font-headline font-bold text-white text-lg">{sub.name}</h3>
                        <div className="font-mono text-xs text-signal-cyan flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5" />
                          <span>{sub.email}</span>
                          {sub.company && <span className="text-gray-400">({sub.company})</span>}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 font-mono text-xs text-gray-400">
                        {sub.createdAt && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(sub.createdAt)}
                          </span>
                        )}
                        <button
                          onClick={() => handleDelete(sub._id)}
                          className="p-1.5 rounded bg-space-bg border border-space-border text-red-400 hover:bg-red-950/40"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-200 font-sans leading-relaxed whitespace-pre-wrap">
                      {sub.message}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
