import HeaderDashboard from "@/containers/dashboard/HeaderDashboard";
import SideBarDocs from "@/containers/docs/SideBarDocs";
import { SessionProvider } from "next-auth/react";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-[#0d1117] text-gray-300">
            <SessionProvider>
                <SideBarDocs />
                {/* Main Content Area */}
                <main className="flex-1 md:ml-64 px-6 pb-12 lg:px-12">
                    <HeaderDashboard />
                    <div className="mx-auto max-w-3xl pt-10">
                        {children}
                    </div>
                </main>
            </SessionProvider>
        </div>
    );
}