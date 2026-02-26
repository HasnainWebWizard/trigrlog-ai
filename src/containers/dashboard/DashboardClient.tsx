"use client";

import React, { useState, useEffect } from 'react';
import RepositoryCont from "./RepositoryCont";
import ContributionCont from "./ContributionCont";
import MainFeed from "./MainFeed";

export default function DashboardClient({ initialRepos }: { initialRepos: any[] }) {
    const [contributionRepos, setContributionRepos] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState(initialRepos[0] || null);

    // 🏛️ Summon the merged contributions on component mount
    useEffect(() => {
        async function fetchContributions() {
            try {
                const res = await fetch('/api/github/contributions');
                if (res.ok) {
                    const data = await res.json();
                    setContributionRepos(data);
                }
            } catch (err) {
                console.error("Failed to load the Alliance:", err);
            }
        }
        fetchContributions();
    }, []);

    return (
        <div className="flex flex-col gap-10">
            <div className="space-y-8">
                {/* 🛡️ Owned Repositories */}
                <RepositoryCont
                    repos={initialRepos}
                    selectedRepoId={selectedRepo?.id}
                    onSelect={(repo) => setSelectedRepo(repo)}
                />

                {/* 🛡️ Contribution Repositories (The "Deep Scan" results) */}
                <ContributionCont
                    repos={contributionRepos}
                    selectedRepoId={selectedRepo?.id}
                    onSelect={(repo) => setSelectedRepo(repo)}
                />
            </div>

            <hr className="border-white/5" />

            {/* 🛡️ Feed Analysis */}
            <MainFeed
                selectedRepo={selectedRepo}
                initialRepos={initialRepos}
            />
        </div>
    );
}