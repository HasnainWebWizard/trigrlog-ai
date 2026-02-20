"use client";

import React from 'react';
import CommitCard from "@/components/dashboard/CommitCard";
import { Plus, Loader2 } from "lucide-react";

interface CommitsListProps {
  commits: any[];
  loading: boolean;
  repoName?: string;
}

export default function CommitsList({ commits, loading, repoName }: CommitsListProps) {
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <Loader2 className="animate-spin mb-4 text-cyan-500" size={32} />
        <p className="text-sm italic">Consulting the GitHub archives, My Lord...</p>
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
            id: commit.sha.substring(0, 7),
            repo: repoName || 'Unknown Repo',
            time: new Date(commit.date).toLocaleDateString(),
            title: commit.message,
            // We keep the draft empty for now, Phase 5 will fill this with AI
            draft: "Generating Imperial Draft..." 
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