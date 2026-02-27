"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, RefreshCw, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useSession } from "next-auth/react";

interface DailyPulseProps {
    activeCommits: any[];
    isFetching: boolean;
    onPulseGenerated: (draft: string) => void;
}

export default function DailyPulseContainer({ activeCommits, isFetching, onPulseGenerated }: DailyPulseProps) {
    const { data: session } = useSession();
    const [isPulseGenerating, setIsPulseGenerating] = useState(false);
    const [isPulseUsed, setIsPulseUsed] = useState(true);
    const [timeLeft, setTimeLeft] = useState<string>("");
    const [showInfo, setShowInfo] = useState(false);
    const [isLoadingStatus, setIsLoadingStatus] = useState(true);

    const checkPulseStatus = useCallback(async () => {
        if (!session?.user?.id) return;
        const { data } = await supabase.from('profiles').select('last_pulse_at').eq('id', session.user.id).single();
        if (data?.last_pulse_at) {
            const lastUse = new Date(data.last_pulse_at).getTime();
            const now = new Date().getTime();
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
        if (activeCommits.length === 0 || isPulseUsed || isPulseGenerating) return;
        setIsPulseGenerating(true);
        try {
            const commitContext = activeCommits.slice(0, 20).map((c: any) => ({
                message: c.message,
                repo: c.repo_name || "Unknown Repo",
                files: c.files?.map((f: any) => f.filename).join(', ') || "source files"
            }));
            const uniqueRepos = Array.from(new Set(activeCommits.map(c => c.repo_name)));
            const response = await fetch('/api/daily-pulse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: commitContext, repoNames: uniqueRepos }),
            });
            const data = await response.json();
            if (response.ok && data.draft) {
                onPulseGenerated(data.draft);
                setIsPulseUsed(true);
                await checkPulseStatus();
            }
        } catch (error) {
            console.error("Pulse failed:", error);
        } finally {
            setIsPulseGenerating(false);
        }
    };

    return (
        <div className="relative flex flex-col items-end cursor-pointer">
            {/* Tooltip */}
            {showInfo && (
                <div className="absolute bottom-full right-0 mb-3 w-64 p-3 rounded-xl bg-[#0d1117] border border-cyan-500/30 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                        <strong className="text-cyan-400">Daily Pulse:</strong> Synthesizes 12h of git activity into a professional post.
                        <br /><br />
                        <span className="text-gray-500">• Zero code exposure (metadata only)</span>
                        <p>Don't just build in silence—show the world your progress.</p>
                    </p>
                </div>
            )}
            
            {/* Main Button */}
            <button
                onMouseEnter={() => setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
                onClick={handleDailyPulse}
                disabled={isPulseGenerating || isFetching || isPulseUsed || activeCommits.length === 0 || isLoadingStatus}
                className={`cursor-pointer flex items-center gap-2.5 rounded-lg px-4 py-2 text-sm font-bold transition-all ${isPulseUsed || isLoadingStatus ? 'bg-gray-800/50 border border-white/5 text-gray-500 cursor-not-allowed' : 'bg-linear-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-500/20 active:scale-95'}`}
            >
                {isPulseGenerating || isLoadingStatus ? <RefreshCw className="animate-spin" size={14} /> : isPulseUsed ? <Lock size={14} /> : <Sparkles size={14} />}
                <span className="flex items-center gap-2">
                    Daily Pulse
                    {isPulseUsed && !isLoadingStatus && <span className="bg-black/40 px-1.5 py-0.5 rounded text-[10px] border border-white/5 font-mono text-cyan-500/80">{timeLeft || "--h --m"}</span>}
                </span>
            </button>
        </div>
    );
}