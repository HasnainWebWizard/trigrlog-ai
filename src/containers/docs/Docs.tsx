"use client";

import React from 'react';
import { 
    Info, Terminal, BrainCircuit, Sparkles, Zap, Github, 
    Linkedin, Settings, ShieldCheck, Share2, Target, Lock, Database 
} from "lucide-react";

export default function Docs() {
    return (
        <div className="space-y-24 pb-20">
            {/* 1. Executive Summary */}
            <article id="introduction" className="prose prose-invert prose-cyan max-w-none scroll-mt-24">
                <h1 className="text-4xl font-extrabold text-white mb-4">The TrigrLog Ecosystem</h1>
                <p className="text-lg text-gray-400">
                    TrigrLog AI is an autonomous branding engine. It bridges the gap between raw terminal activity and professional storytelling by analyzing your GitHub metadata in real-time.
                </p>

                <div className="my-8 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 flex gap-4">
                    <Info className="text-cyan-400 shrink-0" />
                    <p className="text-sm text-cyan-100/80 m-0">
                        <strong>The Core Mission:</strong> High-impact social presence with zero manual writing effort.
                    </p>
                </div>
            </article>

            {/* 2. AI Personality (The Brain) */}
            <article id="personality" className="prose prose-invert prose-cyan max-w-none scroll-mt-24">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <BrainCircuit className="text-purple-400" /> AI Personality Engine
                </h2>
                <p className="text-gray-400">
                    The generation engine is calibrated via the <strong>AI Personality</strong> settings. This defines how the Llama 3 models interpret your work.
                </p>
                <div className="grid gap-4 md:grid-cols-3 mt-6">
                    {[
                        { name: "Technical", desc: "Focuses on architecture and logic.", icon: <Zap size={18}/> },
                        { name: "Casual", desc: "Peers-focused, approachable language.", icon: <Share2 size={18}/> },
                        { name: "Job Hunter", desc: "SEO-optimized for recruiters.", icon: <Target size={18}/> },
                    ].map((tone, i) => (
                        <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="text-cyan-400 mb-2">{tone.icon}</div>
                            <strong className="text-white block text-sm">{tone.name}</strong>
                            <span className="text-gray-500 text-xs">{tone.desc}</span>
                        </div>
                    ))}
                </div>
            </article>

            {/* 3. Daily Pulse (The Credit System) */}
            <article id="daily-pulse" className="prose prose-invert prose-cyan max-w-none scroll-mt-24">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <Sparkles className="text-amber-400" /> Daily Pulse Logic
                </h2>
                <p className="text-gray-400">
                    The Daily Pulse is a high-value synthesis of your last 12-15 commits. It is governed by a strict temporal cooldown.
                </p>
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
                    <ul className="text-sm text-amber-100/80 space-y-3 m-0 list-none">
                        <li className="flex items-center gap-2"><Lock size={14}/> <strong>12-Hour Cooldown:</strong> Credits reset exactly 12 hours after the last generation.</li>
                        <li className="flex items-center gap-2"><Database size={14}/> <strong>Deep Scan:</strong> If commit messages are vague, the AI scans file paths (e.g., <code>/api</code> or <code>/hooks</code>) to determine impact.</li>
                        <li className="flex items-center gap-2"><Zap size={14}/> <strong>LPU Inference:</strong> Powered by Groq for sub-second generation times.</li>
                    </ul>
                </div>
            </article>

            {/* 4. Generation Constraints (The Rules) */}
            <article id="constraints" className="prose prose-invert prose-cyan max-w-none scroll-mt-24">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <ShieldCheck className="text-green-400" /> Generation Rules
                </h2>
                <p className="text-gray-400">Every post generated follows the "Imperial Logic" for maximum LinkedIn engagement:</p>
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 text-left">
                            <th className="py-2 text-cyan-400">Constraint</th>
                            <th className="py-2 text-cyan-400">Logic</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300">
                        <tr className="border-b border-white/5"><td className="py-2 font-mono">Length</td><td className="py-2">Exactly 2 sentences (140-190 chars).</td></tr>
                        <tr className="border-b border-white/5"><td className="py-2 font-mono">Format</td><td className="py-2">No hashtags. 1 Technical Emoji at the end.</td></tr>
                        <tr className="border-b border-white/5"><td className="py-2 font-mono">Priority</td><td className="py-2">Modified Files {'>'} Commit Message.</td></tr>
                        <tr><td className="py-2 font-mono">Verbs</td><td className="py-2">Architected, Streamlined, Implemented.</td></tr>
                    </tbody>
                </table>
            </article>

            {/* 5. System Health & Database */}
            <article id="system-health" className="prose prose-invert prose-cyan max-w-none scroll-mt-24">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <Settings className="text-gray-400" /> System Troubleshooting
                </h2>
                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 text-sm">
                    <p className="text-red-200 font-bold mb-2 flex items-center gap-2">
                        <Terminal size={14} /> Write Batch Active Error
                    </p>
                    <p className="text-red-100/70 m-0">
                        If the terminal shows <code>Persisting failed</code>, the local Supabase instance is undergoing compaction. 
                        <strong>Solution:</strong> Restart your dev environment with <code>npx supabase stop && npx supabase start</code>.
                    </p>
                </div>
            </article>

            {/* 6. LinkedIn Integration */}
            <article id="linkedin" className="prose prose-invert prose-cyan max-w-none scroll-mt-24">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <Linkedin className="text-blue-400" /> Professional Sync
                </h2>
                <p className="text-gray-400">
                    Once a draft is generated, it remains in your <strong>Drafts Dashboard</strong> until you manually push it to LinkedIn via the OAuth2 connector.
                </p>
            </article>
        </div>
    );
}