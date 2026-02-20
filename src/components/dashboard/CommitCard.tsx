"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, Edit3, Check, RefreshCw, Eye, Copy, Loader2 } from 'lucide-react';
import PreviewModal from './PreviewModal';

interface CommitProps {
    commit: {
        id: string;      // The short SHA
        sha: string;     // Ensure this is the FULL SHA for the GitHub API
        owner: string;   // GitHub Username
        repo: string;    // Repo Name
        time: string;
        title: string;
        draft: string;
    };
}

export default function CommitCard({ commit }: CommitProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    // 🏛️ PERSISTENCE: Check LocalStorage first.
    const [draftText, setDraftText] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(`draft-${commit.id}`);
            if (saved) return saved;
        }
        return ""; 
    });

    // 🛡️ The Oracle Function: Now investigates files first
    const generateAIDraft = useCallback(async (force = false) => {
        if (isGenerating || (draftText !== "" && !force)) return;

        setIsGenerating(true);
        try {
            // 1. INVESTIGATION: Fetch the actual files changed from your new API bridge
            const detailRes = await fetch(`/api/github/details?owner=${commit.owner}&repo=${commit.repo}&sha=${commit.sha}`);
            const details = await detailRes.json();
            const fileNames = details?.files || [];

            // 2. SUMMON: Call the generation route with the evidence
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: commit.title,
                    repo: commit.repo,
                    files: fileNames, // 🏛️ Passing the 'Real Work'
                }),
            });

            // Handle Rate Limits (429) or Server Overload (503)
            if (response.status === 429 || response.status === 503) {
                setDraftText("The Oracle is replenishing its energy. Please wait a moment. ⏳");
                return;
            }

            const data = await response.json();

            if (data.draft) {
                setDraftText(data.draft);
                localStorage.setItem(`draft-${commit.id}`, data.draft);
            } else {
                throw new Error("Empty response from the Oracle");
            }

        } catch (error) {
            console.error("The Oracle failed, My Lord:", error);
            if (!draftText) setDraftText(commit.title);
        } finally {
            setIsGenerating(false);
        }
    }, [commit, draftText, isGenerating]);

    // 🏛️ STAGGERED AUTO-TRIGGER
    useEffect(() => {
        if (!draftText) {
            const staggerDelay = Math.random() * 2000;
            const timeoutId = setTimeout(() => {
                generateAIDraft();
            }, staggerDelay);

            return () => clearTimeout(timeoutId);
        }
    }, [draftText, generateAIDraft]);

    const handleCopy = () => {
        navigator.clipboard.writeText(draftText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="group relative rounded-2xl border border-white/10 bg-[#161b22] p-5 transition-all hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]">
            
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="rounded bg-cyan-500/10 px-2 py-1 text-[10px] font-mono font-bold text-cyan-400">
                        {commit.repo}
                    </span>
                    <span className="text-xs text-gray-500">{commit.time}</span>
                </div>
                <div className="text-[10px] font-mono text-gray-600">#{commit.id}</div>
            </div>

            <h3 className="mb-4 text-sm font-medium text-white/70 italic">
                "{commit.title}"
            </h3>

            <div className={`relative rounded-xl bg-black/40 border p-4 transition-all duration-500 ${
                isGenerating ? 'border-cyan-500/30 bg-cyan-500/5 animate-pulse' : 'border-white/5'
            }`}>
                <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-cyan-500">
                        {isGenerating ? (
                            <><Loader2 size={12} className="animate-spin" /> Investigating Work...</>
                        ) : (
                            <><Sparkles size={12} /> AI Post Ready</>
                        )}
                    </div>
                    <button
                        onClick={() => generateAIDraft(true)}
                        disabled={isGenerating}
                        className={`cursor-pointer text-gray-500 hover:text-white transition-all ${isGenerating ? 'animate-spin' : ''}`}
                    >
                        <RefreshCw size={14} />
                    </button>
                </div>

                {isEditing ? (
                    <textarea
                        value={draftText}
                        onChange={(e) => {
                            setDraftText(e.target.value);
                            localStorage.setItem(`draft-${commit.id}`, e.target.value);
                        }}
                        className="w-full bg-transparent text-sm leading-relaxed text-gray-300 outline-none focus:ring-0 resize-none h-24"
                        autoFocus
                    />
                ) : (
                    <div className="min-h-[60px]">
                        {isGenerating && !draftText ? (
                            <div className="flex flex-col gap-2 py-2">
                                <div className="h-3 w-3/4 rounded bg-white/5 animate-pulse" />
                                <div className="h-3 w-1/2 rounded bg-white/5 animate-pulse" />
                            </div>
                        ) : (
                            <p className="text-sm leading-relaxed text-gray-200 font-medium">
                                {draftText}
                            </p>
                        )}
                    </div>
                )}
            </div>

            <div className="mt-6 flex items-center gap-3">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-600 py-2.5 text-sm font-bold text-white hover:bg-cyan-500 active:scale-95 transition-all"
                >
                    <Eye size={16} /> Preview
                </button>

                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium transition-all ${
                        copied ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Copied" : "Copy"}
                </button>

                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`rounded-lg border border-white/10 p-2.5 transition-colors ${
                        isEditing ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                >
                    {isEditing ? <Check size={18} /> : <Edit3 size={18} />}
                </button>
            </div>

            <PreviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                content={draftText}
            />
        </div>
    );
}