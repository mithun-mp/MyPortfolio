"use client";

import React, { useState, useEffect } from "react";
import { Terminal, CheckCircle2 } from "lucide-react";

export const BootSequence: React.FC = () => {
  const [booting, setBooting] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setBooting(false), 300);
          return 100;
        }
        return prev + 25;
      });
    }, 250);

    return () => clearInterval(timer);
  }, []);

  if (!booting) return null;

  return (
    <div className="fixed inset-0 z-50 bg-space-bg flex flex-col items-center justify-center p-6 font-mono">
      <div className="w-full max-w-md bg-space-card/90 border border-signal-cyan/50 rounded-lg p-6 shadow-cyan-glow">
        <div className="flex items-center justify-between border-b border-space-border pb-3 mb-4">
          <div className="flex items-center gap-2 text-signal-cyan text-xs tracking-widest uppercase">
            <Terminal className="w-4 h-4" />
            <span>SUPERCOMPUTER // BOOT_SEQUENCE</span>
          </div>
          <button
            onClick={() => setBooting(false)}
            className="text-[10px] text-gray-400 hover:text-signal-cyan underline uppercase"
          >
            [SKIP INTRO]
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div className="text-gray-300 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-signal-cyan" />
            INITIALIZING CORE MEMORY MATRIX... OK
          </div>
          <div className="text-gray-300 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-signal-cyan" />
            LOADING THREE.JS / R3F WORKSTATION ENGINE... OK
          </div>
          <div className="text-gray-300 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-signal-lime" />
            ESTABLISHING TELEMETRY PROTOCOLS... READY
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-[10px] text-signal-cyan mb-1">
            <span>SYSTEM ONLINE</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-space-bg rounded-full overflow-hidden border border-signal-cyan/30">
            <div
              className="h-full bg-gradient-to-r from-signal-cyan to-signal-violet transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
