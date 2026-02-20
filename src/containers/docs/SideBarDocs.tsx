import Link from "next/link";

export default function SideBarDocs() {
    const sections = [
        { 
            title: "Getting Started", 
            links: [
                { name: "Introduction", href: "#introduction" }, 
                { name: "Core Features", href: "#features" },      // 🏛️ New: Direct access to Feature Registry
                { name: "AI Personality", href: "#personality" }
            ] 
        },
        { 
            title: "Core Mechanics", 
            links: [
                { name: "How it Works", href: "#how-it-works" },    // 🏛️ Re-added: Engineering logic section
                { name: "Daily Pulse Logic", href: "#daily-pulse" }, 
                { name: "Generation Rules", href: "#constraints" }  
            ] 
        },
        { 
            title: "Operations", 
            links: [
                { name: "Professional Sync", href: "#linkedin" }, 
                { name: "System Health", href: "#system-health" }  
            ] 
        },
    ];

    return (
        <aside className="fixed left-0 top-16 hidden h-[calc(100vh-4rem)] w-64 overflow-y-auto border-r border-white/5 bg-[#0d1117] p-6 md:block scrollbar-hide">
            <nav className="space-y-8">
                {sections.map((section) => (
                    <div key={section.title}>
                        <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500/80">
                            {section.title}
                        </h4>
                        <ul className="space-y-1">
                            {section.links.map((link) => (
                                <li key={link.href}>
                                    <Link 
                                        href={link.href} 
                                        className="text-[13px] text-gray-400 hover:text-cyan-400 hover:translate-x-1 transition-all duration-200 block py-1.5"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>
        </aside>
    );
}