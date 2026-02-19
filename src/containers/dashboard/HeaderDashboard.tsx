"use client";

import React, { useState } from 'react';
import { Github, Bell, Crown, Menu, X, LayoutDashboard, History, BookOpen, Settings } from 'lucide-react';
import Link from 'next/link';
import { useSession } from "next-auth/react";

export default function HeaderDashboard() {
    const { data: session } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0d1117]/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">

                {/* Left Section: Mobile Toggle & Logo */}
                <div className="flex items-center gap-4">
                    <button 
                        onClick={toggleMenu}
                        className="p-2 text-gray-400 hover:text-white md:hidden transition-colors"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                            <Github className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">
                            TrigrLog<span className="text-cyan-400">AI</span>
                        </span>
                    </Link>
                </div>

                {/* Center Section: Desktop Navigation */}
                <nav className="hidden items-center gap-6 text-sm font-medium text-gray-400 md:flex">
                    <Link href="/dashboard" className="transition-colors hover:text-white">Dashboard</Link>
                    <Link href="/docs" className="transition-colors hover:text-white">Docs</Link>
                </nav>

                {/* Right Section: Actions & Profile */}
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="hidden items-center gap-1 rounded-full border border-yellow-500/50 bg-yellow-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-yellow-500 lg:flex">
                        <Crown size={12} /> Pro
                    </div>

                    <button className="p-2 text-gray-400 hover:text-white">
                        <Bell size={20} />
                    </button>

                    <div className="h-8 w-px bg-white/10 mx-1" />

                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-semibold text-white leading-none mb-1">
                                {session?.user?.name || "Ayakaa"}
                            </p>
                            <p className="text-[10px] text-cyan-500 uppercase font-bold tracking-tighter">
                                {session?.user ? "Active" : "Guest"}
                            </p>
                        </div>
                        <img
                            src={session?.user?.image || "https://github.com/identicons/profile.png"}
                            alt="Profile"
                            className="h-9 w-9 rounded-full border-2 border-cyan-500/30 object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* --- Mobile Dropdown Menu (Autonomous) --- */}
            {isMobileMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-[#0d1117] border-b border-white/10 p-4 md:hidden animate-in slide-in-from-top duration-200">
                    <nav className="flex flex-col gap-4">
                        <Link href="/dashboard" onClick={toggleMenu} className="flex items-center gap-3 text-gray-300 hover:text-cyan-400">
                            <LayoutDashboard size={18} /> Dashboard
                        </Link>
                        <Link href="/dashboard/history" onClick={toggleMenu} className="flex items-center gap-3 text-gray-300 hover:text-cyan-400">
                            <History size={18} /> Post History
                        </Link>
                        <Link href="/docs" onClick={toggleMenu} className="flex items-center gap-3 text-gray-300 hover:text-cyan-400">
                            <BookOpen size={18} /> Documentation
                        </Link>
                        <Link href="/dashboard/settings" onClick={toggleMenu} className="flex items-center gap-3 text-gray-300 hover:text-cyan-400">
                            <Settings size={18} /> Settings
                        </Link>
                        <div className="pt-4 mt-2 border-t border-white/5">
                            <button className="w-full rounded-lg bg-yellow-500 py-2 text-xs font-bold text-black">
                                Upgrade to Pro
                            </button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}