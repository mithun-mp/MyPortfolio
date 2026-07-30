"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { ShieldCheck, LogOut, User } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const StudioHeader: React.FC = () => {
  const { data: session } = useSession();
  const username = (session?.user as { username?: string })?.username || "mithun-mp";

  return (
    <header className="h-16 border-b border-space-border/60 bg-space-card/60 backdrop-blur-md px-6 flex items-center justify-between font-mono text-xs">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-signal-lime animate-pulse" />
        <span className="text-gray-400">STATUS:</span>
        <span className="text-signal-cyan font-bold">AUTHENTICATED_SESSION</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4 text-signal-lime" />
          <span className="text-gray-300">USER:</span>
          <span className="text-signal-lime font-bold">@{username}</span>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-red-500/30 bg-red-950/20 text-red-400 hover:bg-red-900/40 transition-colors uppercase"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>EXIT STUDIO</span>
        </button>
      </div>
    </header>
  );
};
