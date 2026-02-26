"use client";

import { useState } from "react";
import { Github, LayoutDashboard, Menu, X } from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function HeaderComp() {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0d1117]/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Github className="text-cyan-400" size={24} />
                    <span className="text-xl font-bold tracking-tight text-white">
                        TrigrLog<span className="text-cyan-400">AI</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    {/* ONLY SHOW DASHBOARD IF LOGGED IN */}
                    {session && (
                        <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-gray-300 transition-colors hover:text-cyan-400 group">
                            <LayoutDashboard size={16} className="group-hover:rotate-45 transition-all "/>
                            Dashboard
                        </Link>
                    )}

                    <Link href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">
                        Features
                    </Link>

                    {session ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                                {session.user?.image && (
                                    <img
                                        src={session.user.image}
                                        alt="Profile"
                                        className="h-8 w-8 rounded-full border border-cyan-400/50"
                                    />
                                )}
                                <span className="text-sm font-medium text-gray-200">
                                    {session.user?.name}
                                </span>
                            </div>
                            <button
                                onClick={() => signOut()}
                                className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => signIn("github", { redirectTo: "/dashboard" })}
                            className="cursor-pointer rounded-full bg-white px-5 py-2 text-sm font-bold text-black hover:bg-cyan-400 transition-all"
                        >
                            Sign In
                        </button>
                    )}
                </div>

                {/* Mobile Toggle Button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-[#0d1117] border-b border-white/5 px-6 py-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
                    {session && (
                        <Link
                            href="/dashboard"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-2 text-lg text-gray-300 hover:text-cyan-400"
                        >
                            <LayoutDashboard size={20} />
                            Dashboard
                        </Link>
                    )}

                    <Link
                        href="#features"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-lg text-gray-300 hover:text-cyan-400"
                    >
                        Features
                    </Link>

                    <div className="h-px bg-white/5 w-full" />

                    {session ? (
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-3">
                                {session.user?.image && (
                                    <img
                                        src={session.user.image}
                                        alt="Profile"
                                        className="h-10 w-10 rounded-full border border-cyan-400/50"
                                    />
                                )}
                                <span className="text-lg font-medium text-white">
                                    {session.user?.name}
                                </span>
                            </div>
                            <button
                                onClick={() => signOut()}
                                className="cursor-pointer w-full rounded-xl border border-red-500/50 py-3 text-red-500 font-bold hover:bg-red-500/10"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => signIn("github", { redirectTo: "/dashboard" })} // Add the redirect here
                            className="rounded-full bg-white px-5 py-2 text-sm font-bold text-black hover:bg-cyan-400 transition-all"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
}