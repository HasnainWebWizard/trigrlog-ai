"use client";

import React, { useState } from 'react';
import RepositoryCont from "./RepositoryCont";
import MainFeed from "./MainFeed";

export default function DashboardClient({ initialRepos }: { initialRepos: any[] }) {
    // 🏛️ The Throne of State: Managing the selected realm
    const [selectedRepo, setSelectedRepo] = useState(initialRepos[0] || null);

    return (
        <div className="flex flex-col gap-8">
            {/* 🛡️ Repository Selection */}
            <RepositoryCont
                repos={initialRepos}
                selectedRepoId={selectedRepo?.id}
                onSelect={(repo) => setSelectedRepo(repo)}
            />

            {/* 🛡️ The Activity Feed: Passing down the 'Evidence' (owner/repo) */}
            <MainFeed
                selectedRepo={selectedRepo}
                initialRepos={initialRepos}
            />
        </div>
    );
}