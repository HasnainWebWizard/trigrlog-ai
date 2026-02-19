import { Info, Terminal, BrainCircuit, Sparkles, Zap, Github, Linkedin, Settings, ShieldCheck, Share2 } from "lucide-react";

export default function Docs() {
    return (
        <div className="space-y-24 pb-20">
            {/* 1. Introduction */}
            <article id="introduction" className="prose prose-invert prose-cyan max-w-none scroll-mt-24">
                <h1 className="text-4xl font-extrabold text-white mb-4">Introduction</h1>
                <p className="text-lg text-gray-400">
                    Welcome to TrigrLog AI. This platform is designed to bridge the gap between your hard work in the terminal and your professional presence on LinkedIn.
                </p>

                <div className="my-8 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 flex gap-4">
                    <Info className="text-cyan-400 shrink-0" />
                    <p className="text-sm text-cyan-100/80 m-0">
                        TrigrLog AI uses the Groq LPU™ Inference Engine to generate high-quality posts in milliseconds.
                    </p>
                </div>
            </article>

            {/* 2. Quick Start */}
            <article id="quick-start" className="prose prose-invert prose-cyan max-w-none scroll-mt-24">
                <h2 className="text-3xl font-bold text-white mb-6">Quick Start</h2>
                <p className="text-gray-400 font-medium">Step 1: Install the CLI</p>
                <div className="rounded-lg bg-black p-4 font-mono text-sm text-green-400 border border-white/10 mb-4">
                    <div className="flex gap-2">
                        <Terminal size={16} />
                        <span>npm install trigrlog-ai@latest</span>
                    </div>
                </div>
                <p className="text-gray-400 font-medium">Step 2: Initialize your project</p>
                <div className="rounded-lg bg-black p-4 font-mono text-sm text-cyan-400 border border-white/10">
                    <div className="flex gap-2">
                        <Terminal size={16} />
                        <span>trigr init</span>
                    </div>
                </div>
            </article>

            {/* 3. How it Works */}
            <article id="how-it-works" className="prose prose-invert prose-cyan max-w-none scroll-mt-24">
                <h2 className="text-3xl font-bold text-white mb-6">How it Works</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {[
                        { title: "Connect", desc: "Link GitHub securely via OAuth.", icon: <Github size={20}/> },
                        { title: "Fetch", desc: "Retrieve latest commits & diffs.", icon: <Terminal size={20}/> },
                        { title: "Analyze", desc: "AI interprets logical changes.", icon: <BrainCircuit size={20}/> },
                        { title: "Post", desc: "Generate polished LinkedIn updates.", icon: <Linkedin size={20}/> },
                    ].map((step, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/5">
                            <div className="text-cyan-400 mt-1">{step.icon}</div>
                            <div>
                                <strong className="text-white block">{step.title}</strong>
                                <span className="text-gray-400 text-sm">{step.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </article>

            {/* 4. AI Generation */}
            <article id="ai" className="prose prose-invert prose-cyan max-w-none scroll-mt-24">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <Sparkles className="text-cyan-400" /> AI Generation
                </h2>
                <p className="text-gray-400">
                    TrigrLog AI uses Large Language Models to convert technical jargon into human-readable stories.
                </p>

                <div className="my-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
                    <div className="flex items-center gap-2 text-amber-400 mb-2 font-bold uppercase tracking-tight text-xs">
                        <Zap size={14} /> Powered by Groq LPU™
                    </div>
                    <p className="text-sm text-amber-100/80 m-0 leading-relaxed">
                        Llama 3 runs on Groq's specialized hardware, ensuring your post is ready in under 1 second.
                    </p>
                </div>
            </article>

            {/* 5. GitHub Integration (New) */}
            <article id="github" className="prose prose-invert prose-cyan max-w-none scroll-mt-24">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <Github className="text-white" /> GitHub Integration
                </h2>
                <p className="text-gray-400">
                    To automate your logging, you must grant TrigrLog AI access to your repository metadata.
                </p>
                <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                        <div className="bg-white/10 p-2 rounded text-cyan-400"><ShieldCheck size={20}/></div>
                        <p className="text-sm text-gray-300 m-0"><strong>Permissions:</strong> We only request read-access to your commits and repository names. We never see your private code contents unless you explicitly analyze a diff.</p>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="bg-white/10 p-2 rounded text-cyan-400"><Settings size={20}/></div>
                        <p className="text-sm text-gray-300 m-0"><strong>Webhook Setup:</strong> TrigrLog automatically installs a webhook to listen for <code>push</code> events, triggering a post generation instantly.</p>
                    </div>
                </div>
            </article>

            {/* 6. LinkedIn Setup (New) */}
            <article id="linkedin" className="prose prose-invert prose-cyan max-w-none scroll-mt-24">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <Linkedin className="text-blue-400" /> LinkedIn Setup
                </h2>
                <p className="text-gray-400">
                    Finalize your profile to share your journey with your professional network.
                </p>
                <div className="rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 p-6">
                    <h4 className="text-white mt-0 mb-4 flex items-center gap-2">
                        <Share2 size={18} className="text-blue-400" /> Auto-Post vs Draft
                    </h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                        <li><strong>Draft Mode (Default):</strong> AI generates the post and waits for your approval in the dashboard.</li>
                        <li><strong>Auto-Pilot:</strong> Posts are published directly to your LinkedIn feed upon every successful GitHub push.</li>
                    </ul>
                </div>
            </article>
        </div>
    );
}