"use client";

import React from 'react';
import CommitCard from "@/components/dashboard/CommitCard";
import { Plus, Loader2 } from "lucide-react";

interface CommitsListProps {
  commits: any[];
  loading: boolean;
  repoName?: string;
  owner?: string; // 🏛️ Added: We need the owner to fetch commit details
}

export default function CommitsList({ commits, loading, repoName, owner }: CommitsListProps) {

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-cyan-500/50">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p className="text-sm font-mono tracking-widest uppercase">Scanning the Archives...</p>
      </div>
    );
  }

  if (commits.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-white/5 py-20 text-center">
        <p className="text-gray-500 text-sm">No recent activity found in {repoName || 'this sector'}.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {commits.map((commit) => (
        <CommitCard 
          key={commit.sha} 
          commit={{
            id: commit.sha.substring(0, 7), // Short version for display
            sha: commit.sha,                // 🏛️ FULL SHA: Crucial for the GitHub Detail API
            owner: owner || '',             // 🏛️ OWNER: Crucial for the GitHub Detail API
            repo: repoName || 'Unknown',
            time: new Date(commit.date).toLocaleDateString(),
            title: commit.message,
            draft: "" 
          }} 
        />
      ))}

      <button className="group flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/5 py-8 text-gray-500 transition-all hover:border-cyan-500/30 hover:text-cyan-400">
        <Plus size={20} className="transition-transform group-hover:rotate-90" />
        <span className="font-medium">Sync latest updates</span>
      </button>
    </div>
  );
}