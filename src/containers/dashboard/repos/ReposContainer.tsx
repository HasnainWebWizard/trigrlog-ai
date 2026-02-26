"use client";

import React, { useState, useEffect, useMemo } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Globe, Lock, Search, Code2, GitMerge, FileText, AlertCircle, X } from 'lucide-react';
import { useSession } from "next-auth/react";
import ConfirmationModal from '@/components/ConfirmationModal';

interface Repository {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    private: boolean;
    owner: { login: string };
    role?: string;
}

export default function ReposContainer({ initialPersonal }: { initialPersonal: Repository[] }) {
    const { data: session } = useSession();
    const [contributed, setContributed] = useState<Repository[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [view, setView] = useState<'all' | 'owned' | 'contributed'>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const currentUser = session?.user?.name || "";

    // Fetch external contributions
    useEffect(() => {
        fetch('/api/github/contributions')
            .then(res => res.json())
            .then(data => setContributed(data))
            .catch(err => console.error("Error fetching contributions:", err));
    }, []);

    // Filter Logic
    const filtered = useMemo(() => {
        const allRepos = [...initialPersonal, ...contributed];
        const uniqueRepos = Array.from(new Map(allRepos.map(item => [item.id, item])).values());

        return uniqueRepos.filter(repo => {
            const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                repo.full_name.toLowerCase().includes(searchTerm.toLowerCase());

            const isOwnedByMe = repo.owner.login.toLowerCase() === currentUser.toLowerCase();

            if (view === 'owned') return matchesSearch && isOwnedByMe;
            if (view === 'contributed') return matchesSearch && !isOwnedByMe;
            return matchesSearch;
        });
    }, [initialPersonal, contributed, searchTerm, view, currentUser]);

    // PDF Generation Engine
    const generatePDF = () => {
        const doc = new jsPDF();
        const platformName = "TrigrLog AI";

        // Title
        doc.setFontSize(18);
        doc.text("Repository Portfolio", 14, 22);

        // Subtitle / Date
        doc.setFontSize(10);
        doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 30);

        // Table setup
        const tableColumns = ["Repository Name", "Full Name", "Role", "Visibility"];
        const tableRows = filtered.map(repo => [
            repo.name,
            repo.full_name,
            repo.owner.login.toLowerCase() === currentUser.toLowerCase() ? "Owner" : "Contributor",
            repo.private ? "Private" : "Public"
        ]);

        autoTable(doc, {
            head: [tableColumns],
            body: tableRows,
            startY: 40,
            styles: { fontSize: 10 },
            headStyles: { fillColor: [76, 29, 149] } // Classic Purple Theme
        });

        // Branding Footer
        const pageCount = (doc as any).internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.text(
                `Managed by ${platformName} | Page ${i} of ${pageCount}`,
                105, 290, { align: 'center' }
            );
        }

        doc.save("my-portfolio.pdf");
        setIsModalOpen(false); // Close modal after action
    };
    return (
        <div className="space-y-6">
            {/* Confirmation Modal */}
            {isModalOpen && (
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={generatePDF}
                    title="Generate Report"
                    message="Export your repository portfolio as a professional PDF document. This will include all current filtered data."
                />
            )}

            <header className="mb-10">
                <h1 className="text-3xl font-extrabold text-white tracking-tight">Repository Archive</h1>
                <p className="text-gray-400 mt-2">A comprehensive collection of your owned projects and external code contributions.</p>
            </header>

            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0d1117] p-4 rounded-xl border border-white/5">
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
                    <input
                        placeholder="Search repositories..."
                        value={searchTerm}
                        className="text-white w-full bg-[#161b22] border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-purple-500 transition-all"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 bg-[#161b22] p-1 rounded-lg border border-white/5">
                    {(['all', 'owned', 'contributed'] as const).map((v) => (
                        <button
                            key={v}
                            onClick={() => setView(v)}
                            className={`px-4 py-1.5 text-xs rounded-md capitalize transition-colors ${view === v ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            {v}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="cursor-pointer flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-all"
                >
                    <FileText size={16} /> Download PDF
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((repo) => {
                    const isOwnedByMe = repo.owner.login.toLowerCase() === currentUser.toLowerCase();
                    return (
                        <div key={repo.id} className="bg-[#0d1117] border border-white/5 p-5 rounded-2xl hover:border-purple-500/30 transition-all group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="p-2 bg-purple-500/10 rounded-lg">
                                    {!isOwnedByMe ? <GitMerge className="text-purple-400" size={20} /> : <Code2 className="text-blue-400" size={20} />}
                                </div>
                                <span className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border ${repo.private ? 'border-amber-500/20 text-amber-500 bg-amber-500/5' : 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5'}`}>
                                    {repo.private ? <Lock size={10} /> : <Globe size={10} />}
                                    {repo.private ? 'Private' : 'Public'}
                                </span>
                            </div>
                            <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors truncate">{repo.name}</h3>
                            <p className="text-xs text-gray-500 mt-1 truncate">{repo.full_name}</p>
                            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                                <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
                                    {isOwnedByMe ? 'Owner' : 'Contributor'}
                                </span>
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-500 hover:underline">View Source →</a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}