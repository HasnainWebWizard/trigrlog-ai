"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AiPernsonality from '@/containers/dashboard/AiPersonality';
import CommitsList from '@/containers/dashboard/CommitsList';
import FeatureContainer from '@/containers/dashboard/FeatureContainer';
import PulseModal from '@/components/dashboard/PulseModel';
import { getRecentCommits } from '@/lib/github';

interface MainFeedProps {
    selectedRepo: any;
    initialRepos: any[];
}

export default function MainFeed({ selectedRepo, initialRepos }: MainFeedProps) {
    const { data: session } = useSession();
    
    // Core Data State
    const [activeCommits, setActiveCommits] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    
    // UI & Feature State
    const [filterEnabled, setFilterEnabled] = useState(false);
    const [isPulseOpen, setIsPulseOpen] = useState(false);
    const [pulseContent, setPulseContent] = useState("");

    // 🏛️ SYNC LOGIC: Triggers whenever selectedRepo changes
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
                    console.error("Repository synchronization failed:", error);
                } finally {
                    setIsFetching(false);
                }
            }
        }
        syncCommits();
    }, [selectedRepo, session]);

    // Derived Logic for Filtering
    const displayCommits = filterEnabled
        ? activeCommits.filter((c: any) => 
            c.message.toLowerCase().includes('feat') || 
            c.message.toLowerCase().includes('fix'))
        : activeCommits;

    return (
        <div className="flex w-full max-w-[1600px] flex-col gap-8 lg:flex-row items-start">
            
            {/* 🛡️ Primary Feed Section */}
            <div className="md:flex-1 min-w-0 space-y-2">
                
                {/* 🏛️ Repo Title & Meta */}
                <div className="mb-6 px-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white uppercase italic">
                        {selectedRepo?.name || "Select Repository"}
                    </h1>
                    <p className="text-gray-500 text-xs mt-1 font-mono break-all">
                        {selectedRepo ? `PATH: github.com/${selectedRepo.owner.login}/${selectedRepo.name}` : "Awaiting repository selection..."}
                    </p>
                </div>

                {/* 🛡️ Feature Container (AI Tools & Filters) */}
                <FeatureContainer 
                    activeCommits={activeCommits}
                    isFetching={isFetching}
                    filterEnabled={filterEnabled}
                    setFilterEnabled={setFilterEnabled}
                    repoName={selectedRepo?.name}
                    onPulseGenerated={(draft) => {
                        setPulseContent(draft);
                        setIsPulseOpen(true);
                    }}
                />

                {/* 🏛️ The Commit Archive */}
                <CommitsList
                    commits={displayCommits}
                    loading={isFetching}
                    repoName={selectedRepo?.name}
                    owner={selectedRepo?.owner?.login}
                />
            </div>

            {/* 🛡️ Sticky Sidebar: Personality & Settings */}
            {/* <aside className="hidden lg:block w-[350px] sticky top-8 self-start">
                <AiPernsonality />
            </aside> */}

            {/* 🏛️ Overlays */}
            <PulseModal
                isOpen={isPulseOpen}
                onClose={() => setIsPulseOpen(false)}
                content={pulseContent}
                repoName={selectedRepo?.name}
            />
        </div>
    );
}