import { auth } from "@/auth";
import { getAdminRepos } from "@/lib/github";
import DashboardClient from "@/containers/dashboard/DashboardClient";
export default async function DashboardCTR() {
    const session = await auth();
    const initialRepos = session?.accessToken
        ? await getAdminRepos(session.accessToken as string)
        : [];

    return (
        <>
            <main className=" overflow-x-hidden flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-500/80">
                                System Active
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            TrigrLog<span className="text-cyan-500">AI</span> Dashboard
                        </h1>
                        <p className="text-gray-400 mt-2 max-w-2xl">
                            Transforming repository activity into high-impact professional updates through automated commit synthesis.
                        </p>
                    </header>

                    {/* 🏛️ The Orchestrator */}
                    <DashboardClient initialRepos={initialRepos} />
                </div>
            </main>
        </>
    )
}