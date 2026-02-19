import React from 'react';
import HeaderComp from '@/components/shared/HeaderComp';
import { SessionProvider } from 'next-auth/react';

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-[#0d1117]">
            <SessionProvider>
                {/* Simple Marketing Navigation */}
                <HeaderComp />
                {/* Main Hero Content */}
                <main className="flex-1">
                    {children}
                </main>
            </SessionProvider>

            {/* Minimal Footer */}
            <footer className="border-t border-white/5 py-10 text-center text-sm text-gray-500">
                © 2026 TrigrLog AI. Built for the modern developer.
            </footer>
        </div>
    );
}