"use client";

import React, { useState } from 'react';
import { Sparkles, Edit3, Check, RefreshCw, Eye, Copy } from 'lucide-react';
import PreviewModal from './PreviewModal';

interface CommitProps {
    commit: {
        id: string;
        repo: string;
        time: string;
        title: string;
        draft: string;
    };
}


export default function CommitCard({ commit }: CommitProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [draftText, setDraftText] = useState(commit.draft);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false); // State for AI loading

    const handleCopy = () => {
        navigator.clipboard.writeText(draftText);
        setCopied(true);
        // Visual feedback reset after 2 seconds
        setTimeout(() => setCopied(false), 2000);
    };

    // THE CONNECTION LOGIC
    const handleRegenerate = async () => {
        setIsGenerating(true);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: commit.title,
                    repo: commit.repo,
                    // We can hardcode 'Professional' for now or pull from a global state later
                    tone: 'Professional',
                }),
            });

            const data = await response.json();

            if (data.draft) {
                setDraftText(data.draft);
            } else {
                console.error("The AI returned a void, My Lord.");
            }
        } catch (error) {
            console.error("Communication with the Oracle failed:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="group relative rounded-2xl border border-white/10 bg-[#161b22] p-5 transition-all hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]">

            {/* Top Row: Meta Info */}
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="rounded bg-cyan-500/10 px-2 py-1 text-[10px] font-mono font-bold text-cyan-400">
                        {commit.repo}
                    </span>
                    <span className="text-xs text-gray-500">{commit.time}</span>
                </div>
                <div className="text-[10px] font-mono text-gray-600">#{commit.id}</div>
            </div>

            {/* Commit Title */}
            <h3 className="mb-4 text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                {commit.title}
            </h3>

            {/* AI Content Area */}
            <div className="relative rounded-xl bg-black/40 border border-white/5 p-4 transition-all">
                <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-cyan-500">
                        <Sparkles size={12} /> AI Suggested Post
                    </div>
                    <button
                        onClick={handleRegenerate}
                        disabled={isGenerating}
                        className={`cursor-pointer text-gray-500 hover:text-white transition-all ${isGenerating ? 'animate-spin text-cyan-400' : ''}`}
                    >
                        <RefreshCw size={14} />
                    </button>
                </div>

                {isEditing ? (
                    <textarea
                        value={draftText}
                        onChange={(e) => setDraftText(e.target.value)}
                        className="w-full bg-transparent text-sm leading-relaxed text-gray-300 outline-none focus:ring-0 resize-none h-24"
                        autoFocus
                    />
                ) : (
                    <p className="text-sm leading-relaxed text-gray-300">
                        {draftText}
                    </p>
                )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex items-center gap-3">
                {/* Primary Action: Preview */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-600 py-2.5 text-sm font-bold text-white hover:bg-cyan-500 active:scale-95 transition-all shadow-lg shadow-cyan-900/20"
                >
                    <Eye size={16} />
                    Preview
                </button>

                {/* Secondary Action: Copy to Clipboard */}
                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium transition-all ${copied ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Copied" : "Copy"}
                </button>

                {/* Tertiary Action: Edit */}
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`rounded-lg border border-white/10 p-2.5 transition-colors ${isEditing
                        ? 'bg-green-500/20 border-green-500/50 text-green-400'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
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