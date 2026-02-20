"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, RefreshCw, Lock, HelpCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useSession } from "next-auth/react";

export default function DailyPulseContainer({ activeCommits, isFetching, onPulseGenerated, repoName }: any) {
    const { data: session } = useSession();
    const [isPulseGenerating, setIsPulseGenerating] = useState(false);

    // 🏛️ Start locked to prevent flicker; verify via DB
    const [isPulseUsed, setIsPulseUsed] = useState(true);
    const [timeLeft, setTimeLeft] = useState<string>("");
    const [showInfo, setShowInfo] = useState(false);
    const [isLoadingStatus, setIsLoadingStatus] = useState(true);

    const checkPulseStatus = useCallback(async () => {
        if (!session?.user?.id) return;

        const { data } = await supabase
            .from('profiles')
            .select('last_pulse_at')
            .eq('id', session.user.id)
            .single();

        if (data?.last_pulse_at) {
            const lastUse = new Date(data.last_pulse_at).getTime();
            const now = new Date().getTime();

            // 🏛️ 12-Hour Temporal Gate
            const twelveHours = 12 * 60 * 60 * 1000;
            const diff = now - lastUse;

            if (diff < twelveHours) {
                setIsPulseUsed(true);
                const remaining = twelveHours - diff;
                const h = Math.floor(remaining / (1000 * 60 * 60));
                const m = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                setTimeLeft(`${h}h ${m}m`);
            } else {
                setIsPulseUsed(false);
            }
        } else {
            setIsPulseUsed(false);
        }
        setIsLoadingStatus(false);
    }, [session?.user?.id]);

    useEffect(() => {
        checkPulseStatus();
        const interval = setInterval(checkPulseStatus, 60000);
        return () => clearInterval(interval);
    }, [checkPulseStatus]);

    const handleDailyPulse = async () => {
        // 🏛️ Prevent unnecessary executions
        if (activeCommits.length === 0 || isPulseUsed || isPulseGenerating) return;

        setIsPulseGenerating(true);

        try {
            // 🏛️ Prepare "Deep Context": Mapping messages to their file history
            const commitContext = activeCommits.slice(0, 15).map((c: any) => ({
                message: c.message,
                // Extracting file paths if available, otherwise defaulting to a generic context
                files: c.files?.map((f: any) => f.filename).join(', ') || "source files"
            }));

            const response = await fetch('/api/daily-pulse', { // 🏛️ Renamed endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: commitContext, // 🏛️ Now sending enriched objects
                    repo: repoName
                }),
            });

            const data = await response.json();

            if (response.ok && data.draft) {
                onPulseGenerated(data.draft);

                // 🏛️ Immediate UI Lock to prevent double-spend
                setIsPulseUsed(true);

                // 🏛️ Sync with database to start the official 12h countdown
                await checkPulseStatus();
            } else {
                console.error("Pulse API rejected the request:", data.error);
            }
        } catch (error) {
            console.error("Pulse synthesis failed:", error);
        } finally {
            setIsPulseGenerating(false);
        }
    };

    return (
        <div className="flex flex-col items-end gap-1.5 relative">
            {showInfo && (
                <div className="absolute bottom-full right-0 mb-3 w-60 p-3 rounded-xl bg-[#0d1117] border border-cyan-500/30 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-[10px] text-gray-400 leading-relaxed">
                        <span className="text-cyan-400 font-bold">Daily Pulse:</span> AI synthesis limited to once every 12 hours.
                    </p>
                    <div className="absolute -bottom-1 right-4 w-2 h-2 bg-[#0d1117] border-r border-b border-cyan-500/30 rotate-45"></div>
                </div>
            )}

            <button
                onClick={handleDailyPulse}
                disabled={isPulseGenerating || isFetching || isPulseUsed || activeCommits.length === 0 || isLoadingStatus}
                className={`flex items-center gap-2.5 rounded-lg px-4 py-2 text-sm font-bold transition-all ${isPulseUsed || isLoadingStatus
                        ? 'bg-gray-800/50 border border-white/5 text-gray-500 cursor-not-allowed'
                        : 'bg-linear-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-500/20 active:scale-95'
                    }`}
            >
                {/* 🏛️ UI/UX: Icon on Left -> Name -> Badge */}
                {isPulseGenerating || isLoadingStatus ? (
                    <RefreshCw className="animate-spin" size={14} />
                ) : isPulseUsed ? (
                    <Lock size={14} />
                ) : (
                    <Sparkles size={14} />
                )}

                <span className="flex items-center gap-2">
                    Daily Pulse
                    {isPulseUsed && !isLoadingStatus && (
                        <span className="bg-black/40 px-1.5 py-0.5 rounded text-[10px] border border-white/5 font-mono text-cyan-500/80">
                            {timeLeft || "--h --m"}
                        </span>
                    )}
                </span>
            </button>

            <div
                className="flex items-center gap-1 px-1 cursor-help group"
                onMouseEnter={() => setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
            >
                <HelpCircle size={10} className="text-gray-600 group-hover:text-cyan-500 transition-colors" />
                <span className="text-[9px] text-gray-600 font-medium uppercase tracking-tighter">
                    {isLoadingStatus ? "Syncing..." : isPulseUsed ? "Locked" : "Available"}
                </span>
            </div>
        </div>
    );
}