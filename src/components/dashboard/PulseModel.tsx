"use client";

import React from 'react';
import { X, Copy, Check, Sparkles, Share2, Calendar } from 'lucide-react';

interface PulseModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: string;
    repoName: string;
}

export default function PulseModal({ isOpen, onClose, content, repoName }: PulseModalProps) {
    const [copied, setCopied] = React.useState(false);

    if (!isOpen) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            {/* Modal Container: Max height 90% of screen to ensure it never bleeds off */}
            <div className="relative flex flex-col w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0d1117] shadow-2xl animate-in zoom-in-95 duration-300">
                
                {/* Hero Background Glows */}
                <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />

                {/* Header: Fixed at top */}
                <div className="relative shrink-0 border-b border-white/5 p-5 md:p-6 flex justify-between items-center bg-[#0d1117]/50 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 p-2.5 shadow-lg shadow-cyan-500/20">
                            <Sparkles className="text-white" size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">Daily Pulse</h2>
                            <p className="text-[10px] md:text-xs text-gray-500 flex items-center gap-1">
                                <Calendar size={12} /> {new Date().toLocaleDateString()} • {repoName}
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="rounded-full p-2 text-gray-500 hover:bg-white/5 hover:text-white transition-all"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body: Scrollable area */}
                <div className="relative flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar">
                    <div className="group relative rounded-3xl bg-black/40 border border-white/5 p-5 md:p-7 transition-all hover:border-cyan-500/30">
                        <div className="absolute -top-3 left-6 bg-[#0d1117] px-2 text-[10px] font-bold uppercase tracking-widest text-cyan-500">
                            The Synthesis
                        </div>
                        <p className="text-base md:text-lg leading-relaxed text-gray-200 whitespace-pre-wrap font-medium">
                            {content || "The Oracle is crafting your summary..."}
                        </p>
                    </div>

                    <p className="mt-6 text-center text-[11px] md:text-xs text-gray-500 italic px-4">
                        "This summary synthesizes your engineering velocity from the last 24 hours into a high-impact narrative, Dear User"
                    </p>
                </div>

                {/* Footer: Fixed at bottom */}
                <div className="relative shrink-0 border-t border-white/5 p-5 md:p-6 bg-white/[0.02] backdrop-blur-md flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={handleCopy}
                        className={`flex-[2] flex items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold transition-all active:scale-95 ${
                            copied 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-white text-black hover:bg-gray-100'
                        }`}
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        {copied ? "Copied to Clipboard" : "Copy for Social Media"}
                    </button>
                    
                    {/* <button className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-6 py-4 text-sm font-bold text-white hover:bg-white/5 transition-all active:scale-95">
                        <Share2 size={18} />
                        <span className="sm:hidden lg:inline">Share</span>
                    </button> */}
                </div>
            </div>
        </div>
    );
}