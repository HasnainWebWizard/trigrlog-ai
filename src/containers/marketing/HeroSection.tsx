"use client";
import { signIn, useSession } from "next-auth/react";
import { Github, ArrowRight, Zap, Code2, Share2, CheckCircle2 } from 'lucide-react';
import Link from "next/link";

export default function HeroSection() {
    const { data: session, status } = useSession();
    const isLoading = status === "loading";

    return (
        <section className="w-screen ml-[calc(50%-50vw)] relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-[#0d1117] py-20">

            {/* Background Decor */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            <div className="absolute top-1/4 left-1/2 -z-10 h-100 w-150 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]"></div>

            <div className="container relative z-10 mx-auto px-4 text-center">

                {/* The Hook */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 text-sm font-medium text-cyan-400">
                    <Zap size={14} className="fill-cyan-400" />
                    <span>Now in Public Beta for Devs</span>
                </div>

                <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl">
                    Your Commits, <br />
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                        Your Career.
                    </span>
                </h1>

                <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 md:text-xl">
                    TrigrLog AI turns your daily code pushes into recruiter-ready LinkedIn posts.
                    Stop ghosting your network; let your code speak for itself. **Automatically.**
                </p>

                {/* Primary Action - Logical UI/UX State */}
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    {session ? (
                        /* STATE: Already Authorized */
                        <Link href="/dashboard" className="group">
                            <button
                                className="flex items-center gap-3 rounded-xl bg-emerald-500/10 border border-emerald-500/50 px-8 py-4 text-lg font-bold text-emerald-400 transition-all hover:bg-emerald-500/20 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                                <CheckCircle2 size={22} className="text-emerald-400" />
                                GitHub Connected
                                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                            </button>
                            <p className="mt-2 text-xs text-gray-500">Welcome back, {session.user?.name}</p>
                        </Link>
                    ) : (
                        /* STATE: Not Authorized */
                        <button
                            disabled={isLoading}
                            onClick={() => signIn("github")}
                            className="flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-bold text-black transition-all hover:bg-cyan-400 hover:scale-105 active:scale-95 disabled:opacity-50">
                            {isLoading ? (
                                <span className="animate-spin">🌀</span>
                            ) : (
                                <Github size={22} />
                            )}
                            {isLoading ? "Checking Status..." : "Connect GitHub to Start"}
                            {!isLoading && <ArrowRight size={20} />}
                        </button>
                    )}
                </div>

                {/* Visual Animation Placeholder */}
                <div className="mt-20 flex w-full max-w-4xl flex-col items-center justify-between gap-8 rounded-2xl border border-white/10 bg-[#161b22] p-8 shadow-2xl md:flex-row mx-auto">
                    {/* Left Side: Git Push */}
                    <div className="flex flex-1 flex-col items-start gap-4 text-left">
                        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest">
                            <Code2 size={14} /> Local Terminal
                        </div>
                        <div className="w-full rounded-lg bg-black/50 p-4 font-mono text-sm text-green-400 border border-green-500/20">
                            <p>$ git add .</p>
                            <p>$ git commit -m "feat: auth flow refactor"</p>
                            <p className="animate-pulse">$ git push origin main _</p>
                        </div>
                    </div>

                    {/* Center: The Arrow */}
                    <div className="flex rotate-90 items-center justify-center text-cyan-500 md:rotate-0">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent via-cyan-500 to-transparent md:w-20" />
                        <Zap size={24} className="mx-2 fill-cyan-500" />
                        <div className="h-px w-12 bg-gradient-to-r from-cyan-500 via-cyan-500 to-transparent md:w-20" />
                    </div>

                    {/* Right Side: LinkedIn Post */}
                    <div className="flex flex-1 flex-col items-start gap-4 text-left">
                        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest">
                            <Share2 size={14} /> Generated Post
                        </div>
                        <div className="w-full rounded-lg bg-[#1d2226] p-4 text-sm text-white border border-white/5 shadow-lg">
                            <p className="font-semibold text-cyan-400">Ayakaa • Just now</p>
                            <p className="mt-2 text-gray-300">Just refactored the auth flow to use JWT, improving security and scalability... #React #WebDev</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}