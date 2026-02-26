"use client";

import {
    LayoutDashboard,
    History,
    Settings,
    Crown,
    Github,
    LogOut,
    BookOpen // Added for Docs access
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from "next-auth/react";

export default function Sidebar() {
    const { data: session } = useSession();
    const pathname = usePathname();

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/dashboard' },
        { icon: <History size={20} />, label: 'Post History', href: '/dashboard/history' },
        { icon: <Github size={20} />, label: 'Connected Repos', href: '/dashboard/repos' },
        { icon: <BookOpen size={20} />, label: 'Documentation', href: '/docs' },
        { icon: <Settings size={20} />, label: 'Settings', href: '/dashboard/settings' },
    ];

    return (
        <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-white/10 bg-[#0d1117] p-4 text-gray-400 z-50 overflow-y-auto">

            {/* User Profile Section */}
            <div className="mb-8 flex items-center gap-3 px-2 py-4">
                <div className="relative">
                    <img
                        src={session?.user?.image || "https://github.com/identicons/user.png"}
                        alt={session?.user?.name || "User"}
                        className="h-12 w-12 rounded-full border-2 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                    />
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0d1117] bg-green-500"></div>
                </div>
                <div>
                    <h3 className="text-sm font-bold text-white truncate max-w-[120px]">
                        {session?.user?.name || "My Lord"}
                    </h3>
                    <p className="text-[10px] uppercase tracking-wider text-cyan-500 font-semibold">
                        {session?.user ? 'Pro Member' : 'Guest'}
                    </p>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 transition-all duration-200 group ${isActive
                                    ? 'bg-cyan-500/10 text-cyan-400'
                                    : 'hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                {item.icon}
                                <span className="text-sm font-medium">{item.label}</span>
                            </div>
                            {isActive && (
                                <div className="h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,1)]"></div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Pro Upgrade Card */}
            <div className="mb-4 rounded-xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-transparent p-4">
                <div className="mb-2 flex items-center gap-2 text-yellow-500">
                    <Crown size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">Upgrade to Pro</span>
                </div>
                <p className="mb-3 text-[11px] text-gray-400 leading-relaxed">
                    Unlock unlimited AI generations and custom branding.
                </p>
                <button className="w-full rounded-lg bg-yellow-500 py-2 text-xs font-bold text-black transition-all hover:bg-yellow-400 hover:scale-[1.02] active:scale-95 shadow-lg shadow-yellow-500/10">
                    Go Gold
                </button>
            </div>

            {/* Logout */}
            <button 
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-3 border-t border-white/5 px-3 py-4 text-sm transition-colors hover:text-red-400 w-full"
            >
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </aside>
    );
}