"use client";

import React from 'react';
import { GitMerge } from 'lucide-react';

interface Repository {
    id: string | number;
    name: string;
    owner: { login: string };
}

interface ContributionContProps {
    repos: Repository[];
    selectedRepoId: string | number | undefined;
    onSelect: (repo: Repository) => void;
}

export default function ContributionCont({ repos, selectedRepoId, onSelect }: ContributionContProps) {
    if (!repos || repos.length === 0) return null;

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2 px-1">
                <GitMerge size={14} className="text-purple-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    External Contributions (Merged PRs) ({repos.length})
                </span>
            </div>
            
            <div className="scrollbar-hide flex w-full items-center gap-3 overflow-x-auto pb-2 ">
                {repos.map((repo) => {
                    const isSelected = selectedRepoId === repo.id;
                    return (
                        <button
                            key={repo.id}
                            onClick={() => onSelect(repo)}
                            className={`flex items-center gap-2 shrink-0 rounded-full px-4 py-2 text-xs font-medium border transition-all duration-200 bg-[#161b22] ${
                                isSelected
                                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/40 ring-1 ring-purple-500/20'
                                    : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-gray-200'
                            }`}
                        >
                            <span className="opacity-40 text-[10px]">{repo.owner.login} /</span>
                            <span>{repo.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}