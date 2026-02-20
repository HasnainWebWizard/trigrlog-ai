"use client";

import React from 'react';
import { FolderGit2 } from 'lucide-react';

interface Repository {
    id: string;
    name: string;
    // Add other properties if needed
}

interface RepositoryContProps {
    repos: Repository[];
    selectedRepoId: string | number | undefined;
    onSelect: (repo: Repository) => void;
}

export default function RepositoryCont({ repos, selectedRepoId, onSelect }: RepositoryContProps) {
    return (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {repos.map((repo) => (
                <button
                    key={repo.id}
                    onClick={() => onSelect(repo)}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                        selectedRepoId === repo.id
                            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                            : 'bg-white/5 text-gray-500 border border-white/5 hover:bg-white/10'
                    }`}
                >
                    <FolderGit2 size={14} />
                    {repo.name}
                </button>
            ))}
        </div>
    );
}