"use client";

import React from 'react';
import { FolderGit2 } from 'lucide-react';

interface Repository {
    id: string;
    name: string;
}

interface RepositoryContProps {
    repos: Repository[];
    selectedRepoId: string | number | undefined;
    onSelect: (repo: Repository) => void;
}

export default function RepositoryCont({ repos, selectedRepoId, onSelect }: RepositoryContProps) {
    return (
        <div className="relative w-full space-y-2">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 px-1">
                My Projects ({repos.length})
            </h2>
            {/* MOBILE: Horizontal scroll with hidden scrollbar
               DESKTOP: Flex-wrap behavior
            */}
            <div className="scrollbar-hide flex w-full items-center gap-3 overflow-x-auto pb-2  sm:pb-0">
                {repos.map((repo) => (
                    <button
                        key={repo.id}
                        onClick={() => onSelect(repo)}
                        className={`flex items-center gap-2 shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-all ${selectedRepoId === repo.id
                                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 ring-1 ring-cyan-500/20'
                                : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-gray-200'
                            }`}
                    >
                        <FolderGit2 size={14} className={selectedRepoId === repo.id ? "animate-pulse" : ""} />
                        {repo.name}
                    </button>
                ))}
            </div>

            {/* 🏛️ Optional: Subtle gradient fade to indicate more items on mobile */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-[#0d1117] to-transparent sm:hidden" />
        </div>
    );
}