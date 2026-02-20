"use client";

import React, { useState, useEffect } from 'react';
import AiPernsonality from '@/containers/dashboard/AiPersonality';
import { Zap, Filter, FolderGit2 } from 'lucide-react';
import CommitsList from '@/containers/dashboard/CommitsList';
import { getRecentCommits } from '@/lib/github';
import { useSession } from 'next-auth/react';

export default function MainFeed({ initialRepos }: { initialRepos: any[] }) {
    const { data: session } = useSession();
    const [selectedRepo, setSelectedRepo] = useState<any>(initialRepos[0] || null);
    const [activeCommits, setActiveCommits] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    
    // Filter State
    const [filterEnabled, setFilterEnabled] = useState(false);

    useEffect(() => {
        async function syncCommits() {
            const accessToken = (session as any)?.accessToken;
            if (selectedRepo && accessToken) {
                setIsFetching(true);
                try {
                    const data = await getRecentCommits(
                        accessToken,
                        selectedRepo.owner.login,
                        selectedRepo.name
                    );
                    setActiveCommits(data);
                } catch (error) {
                    console.error("Sync Error:", error);
                } finally {
                    setIsFetching(false);
                }
            }
        }
        syncCommits();
    }, [selectedRepo, session]);

    // Apply filtering logic
    const displayCommits = filterEnabled 
        ? activeCommits.filter((c: any) => c.message.toLowerCase().startsWith('feat'))
        : activeCommits;

    return (
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 lg:flex-row">
            <div className="flex-1 min-w-0 space-y-6">
                
                {/* Repository Quick Selector - Scrollbar hidden via globals.css */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {initialRepos.map((repo) => (
                        <button
                            key={repo.id}
                            onClick={() => setSelectedRepo(repo)}
                            className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                                selectedRepo?.id === repo.id
                                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                                    : 'bg-white/5 text-gray-500 border border-white/5 hover:bg-white/10'
                            }`}
                        >
                            <FolderGit2 size={14} />
                            {repo.name}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col justify-between gap-4 border-b border-white/5 pb-6 md:flex-row md:items-center">
                    <div className="min-w-0 flex-1">
                        <h1 className="truncate text-3xl font-bold tracking-tight text-white">
                            {selectedRepo?.name || "Developer Feed"}
                        </h1>
                        <p className="text-gray-500">Transform your latest pushes into social gold.</p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                        {/* Filter Toggle */}
                        <button 
                            onClick={() => setFilterEnabled(!filterEnabled)}
                            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium border transition-all ${
                                filterEnabled 
                                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' 
                                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                            }`}
                        >
                            <Filter size={16} />
                            {filterEnabled ? 'Showing Feats' : 'Filter'}
                        </button>

                        {/* Sync GitHub - Re-triggers useEffect */}
                        <button 
                            onClick={() => setSelectedRepo({...selectedRepo})} 
                            disabled={isFetching}
                            className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white hover:bg-cyan-500 shadow-[0_0_15px_rgba(8,145,178,0.3)] active:scale-95 transition-all disabled:opacity-50"
                        >
                            <Zap size={16} className={isFetching ? "animate-pulse" : ""} />
                            {isFetching ? "Syncing..." : "Sync GitHub"}
                        </button>
                    </div>
                </div>

                <CommitsList
                    commits={displayCommits}
                    loading={isFetching}
                    repoName={selectedRepo?.name}
                />
            </div>

            <aside className="w-full shrink-0 lg:w-[350px]">
                <AiPernsonality />
            </aside>
        </div>
    );
}