import Link from "next/link";

export default function SideBarDocs() {
    const sections = [
        { 
            title: "Getting Started", 
            links: [
                { name: "Introduction", href: "#introduction" }, 
                { name: "Quick Start", href: "#quick-start" }
            ] 
        },
        { 
            title: "Core Concepts", 
            links: [
                { name: "How it Works", href: "#how-it-works" }, 
                { name: "AI Generation", href: "#ai" }
            ] 
        },
        { 
            title: "Configuration", 
            links: [
                { name: "GitHub Integration", href: "#github" }, 
                { name: "LinkedIn Setup", href: "#linkedin" }
            ] 
        },
    ];

    return (
        <aside className="fixed left-0 top-16 hidden h-[calc(100vh-4rem)] w-64 overflow-y-auto border-r border-white/5 bg-[#0d1117] p-6 md:block">
            <nav className="space-y-8">
                {sections.map((section) => (
                    <div key={section.title}>
                        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">{section.title}</h4>
                        <ul className="space-y-2">
                            {section.links.map((link) => (
                                <li key={link.href}>
                                    <Link 
                                        href={link.href} 
                                        className="text-sm text-gray-400 hover:text-cyan-400 transition-colors block py-1"
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