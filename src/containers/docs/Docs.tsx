"use client";

import React from 'react';
import {
    Info, Terminal, BrainCircuit, Sparkles, Zap, Github,
    Linkedin, Settings, ShieldCheck, Share2, Target, Lock,
    Database, Layers, GitCommit, Layout, FileText, Filter
} from "lucide-react";

export default function Docs() {
    return (
        <div className="mx-auto max-w-4xl space-y-16 px-4 pb-20 pt-8 sm:space-y-24 sm:px-6">

            {/* 1. Introduction & Hero */}
            <article id="introduction" className="prose prose-invert prose-cyan max-w-none scroll-mt-24">
                <div className="flex items-center gap-3 text-cyan-400 mb-2">
                    <Layout size={20} />
                    <span className="text-sm font-bold uppercase tracking-widest">Platform Overview</span>
                </div>
                <h1 className="text-3xl font-extrabold text-white sm:text-4xl mb-4 text-balance">
                    TrigrLog AI: The Developer's Narrative Engine
                </h1>
                <p className="text-base text-gray-400 sm:text-lg leading-relaxed">
                    TrigrLog AI is an autonomous branding platform that transforms raw technical output into professional LinkedIn presence. By bridging the gap between Git activity and social influence, we ensure your "Proof of Work" is never invisible.
                </p>
            </article>

            {/* 2. Feature Registry */}
            <article id="features" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                    <Layers className="text-cyan-400" /> Core Features
                </h2>

                <div className="grid gap-6">
                    {/* Feature: Atomic Commit */}
                    <div className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.04]">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                                <GitCommit size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white m-0">Atomic Commit (Standard)</h3>
                                <p className="text-xs text-blue-400/80 font-mono uppercase tracking-wider mt-1">Free Tier / Default</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mb-0">
                            The baseline engine designed for granular updates. It generates a single, punchy 2-sentence post for every push. Perfect for maintaining a steady "Build in Public" heartbeat.
                        </p>
                    </div>

                    {/* Feature: Daily Pulse */}
                    <div className="group rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 transition-all hover:border-cyan-500/40">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                                <Sparkles size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white m-0">Daily Pulse (Synthesis)</h3>
                                <p className="text-xs text-cyan-400/80 font-mono uppercase tracking-wider mt-1">High-Tier / 12h Cooldown</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mb-4">
                            The flagship intelligence feature. Daily Pulse scans your last 12 hours of commits to synthesize a "Big Picture" narrative. It looks past individual fixes to describe architectural evolution and engineering growth.
                        </p>
                        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400/80 bg-cyan-400/5 py-1 px-3 rounded-full w-fit">
                            <Lock size={12} /> Temporal Limit: 1 use per 12 hours
                        </div>
                    </div>

                    {/* Feature: Portfolio Archive */}
                    <div className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.04]">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                                <FileText size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white m-0">Portfolio Archive</h3>
                                <p className="text-xs text-purple-400/80 font-mono uppercase tracking-wider mt-1">Export / PDF</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mb-0">
                            Generate a comprehensive professional PDF of your repository footprint. Includes filtered views of owned and contributed projects, protected by our secure custom confirmation gatekeeper.
                        </p>
                    </div>
                </div>
            </article>

            {/* 3. Engineering Logic */}
            <article id="how-it-works" className="prose prose-invert prose-cyan max-w-none scroll-mt-24">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <BrainCircuit className="text-purple-400" /> Engineering Logic
                </h2>
                <p className="text-gray-400">
                    We ignore lazy commit messages. Our system prioritizes <strong>Modified File Paths</strong> to deduce impact, while our filtering engine manages your portfolio state:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
                    <div className="p-4 rounded-lg bg-black/40 border border-white/5">
                        <code className="text-xs text-cyan-300">/lib/supabase/*</code>
                        <p className="text-xs text-gray-500 mt-1">Deduces: Database architecture & persistence logic.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-black/40 border border-white/5">
                        <code className="text-xs text-cyan-300">/components/ui/*</code>
                        <p className="text-xs text-gray-500 mt-1">Deduces: Design system polish & UX refinement.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-black/40 border border-white/5">
                        <div className="flex items-center gap-2">
                            <Filter size={14} className="text-purple-400" />
                            <code className="text-xs text-purple-300">Repository Filtering</code>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Uses session context to map 'Owned' vs 'Contributed' projects dynamically.</p>
                    </div>
                </div>
            </article>

            {/* 4. Troubleshooting */}
            <article id="system-health" className="scroll-mt-24">
                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
                    <h3 className="text-red-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-4">
                        <Settings size={16} /> System Health & Constraints
                    </h3>
                    <ul className="space-y-3 m-0 p-0 list-none">
                        <li className="flex gap-3 text-sm text-gray-400">
                            <ShieldCheck size={18} className="text-red-500 shrink-0" />
                            <span><strong>Write Lock:</strong> Concurrent database updates may trigger a 500 error. Simply refresh and re-pulse.</span>
                        </li>
                        <li className="flex gap-3 text-sm text-gray-400">
                            <Zap size={18} className="text-red-500 shrink-0" />
                            <span><strong>Token Limits:</strong> Large diffs are truncated to respect Groq LPU context windows.</span>
                        </li>
                    </ul>
                </div>
            </article>
            {/* 5. Privacy & Security */}
            <article id="privacy" className="scroll-mt-24">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                    <h3 className="text-emerald-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-4">
                        <ShieldCheck size={16} /> Privacy & Security Guarantee
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">
                        Your intellectual property is sacred. TrigrLog AI is engineered with a strict "Metadata-Only" architecture:
                    </p>
                    <ul className="space-y-3 m-0 p-0 list-none text-sm text-gray-400">
                        <li className="flex gap-3">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span><strong>Zero Code Exposure:</strong> We never read, store, or process the contents of your source code files.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span><strong>Metadata-Only Analysis:</strong> We strictly limit inputs to commit messages, file paths, and timestamps.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span><strong>Transient Processing:</strong> Your context is used only for ephemeral synthesis; your logic remains private.</span>
                        </li>
                    </ul>
                </div>
            </article>

        </div>
    );
}