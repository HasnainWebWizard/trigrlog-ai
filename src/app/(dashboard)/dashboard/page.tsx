import CommitCard from '@/components/dashboard/CommitCard';
import RightSideBar from '@/containers/dashboard/RightSideBar';
import ToneSettings from '@/containers/dashboard/ToneSettings';
import { Sparkles, Terminal, Zap, Share2, Plus, Filter } from 'lucide-react';

export default function DashboardPage() {
    // In a real scenario, you'd fetch this from your database/GitHub API
    const mockCommits = [
        {
            id: 'abc1234',
            repo: 'trigrlog-ai-web',
            branch: 'main',
            time: '2 hours ago',
            title: 'Refactor JWT Authentication Flow',
            draft: "Just leveled up our security! 🛡️ I've officially refactored the auth flow to use JWT. This makes our session handling much more scalable and secure. #React #Security #WebDev"
        },
        {
            id: 'def5678',
            repo: 'ai-engine-v2',
            branch: 'develop',
            time: '5 hours ago',
            title: 'Optimize OpenAI stream response handling',
            draft: "Speed is a feature! ⚡ Just optimized our AI streaming logic, reducing TBT by 40%. The user experience feels incredibly snappy now. #AI #OpenAI #NextJS"
        }
    ];

    return (
        <div className="flex flex-col gap-8 lg:flex-row">

            {/* LEFT & MIDDLE: The Main Feed (Occupies most space) */}
            <div className="flex-1 space-y-6">
                {/* Feed Header */}
                <div className="flex flex-col justify-between gap-4 border-b border-white/5 pb-6 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">Developer Feed</h1>
                        <p className="text-gray-500">Transform your latest pushes into social gold.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-white/10 border border-white/10 transition-colors">
                            <Filter size={16} />
                            Filter
                        </button>
                        <button className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white hover:bg-cyan-500 shadow-[0_0_15px_rgba(8,145,178,0.3)] transition-all">
                            <Zap size={16} />
                            Sync GitHub
                        </button>
                    </div>
                </div>

                {/* The List of Commit Cards */}
                <div className="grid gap-6">
                    {mockCommits.map((commit) => (
                        <CommitCard key={commit.id} commit={commit} />
                    ))}

                    {/* Load More / Empty State Prompt */}
                    <button className="group flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/5 py-8 text-gray-500 transition-all hover:border-cyan-500/30 hover:text-cyan-400">
                        <Plus size={20} className="transition-transform group-hover:rotate-90" />
                        <span className="font-medium">Load older commits</span>
                    </button>
                </div>
            </div>

            {/* RIGHT SIDEBAR: Global AI Configuration */}
            <RightSideBar />

        </div>
    );
}