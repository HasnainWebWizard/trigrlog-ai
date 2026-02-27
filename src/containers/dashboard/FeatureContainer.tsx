"use client";

import React from 'react';
import { Filter, Zap } from 'lucide-react';
import DailyPulseContainer from './DailyPulseContainer';

interface FeatureContainerProps {
    activeCommits: any[];
    isFetching: boolean;
    filterEnabled: boolean;
    setFilterEnabled: (val: boolean) => void;
    onPulseGenerated: (draft: string) => void;
    repoName?: string;
}

export default function FeatureContainer({
    activeCommits,
    isFetching,
    filterEnabled,
    setFilterEnabled,
    onPulseGenerated,
    repoName
}: FeatureContainerProps) {
    return (
        <div className="w-full bg-[#161b22] border border-white/5 rounded-2xl p-4 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                {/* 🛡️ Branding Section */}
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        <Zap size={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-tight">AI Enhancement Suite</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Automate your documentation and synthesis.</p>
                    </div>
                </div>

                {/* 🛡️ Feature Injection Point */}
                <div className="flex flex-wrap items-center gap-3 md:justify-end">

                    {/* Feature 1: Filter Toggle */}
                    <button
                        onClick={() => setFilterEnabled(!filterEnabled)}
                        className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold border transition-all ${
                            filterEnabled
                                ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400'
                                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                        }`}
                    >
                        <Filter size={14} />
                        {filterEnabled ? 'Filter: Active' : 'Filter Feed'}
                    </button>

                    {/* Feature 2: Daily Pulse Logic (Decoupled) */}
                    <DailyPulseContainer 
                        activeCommits={activeCommits}
                        isFetching={isFetching}
                        repoName={repoName || ""}
                        onPulseGenerated={onPulseGenerated}
                    />

                </div>
            </div>
        </div>
    );
}