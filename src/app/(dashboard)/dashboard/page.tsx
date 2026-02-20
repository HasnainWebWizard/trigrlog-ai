import { auth } from "@/auth";
import { getAdminRepos } from "@/lib/github";
import MainFeed from '@/containers/dashboard/MainFeed';

export default async function DashboardPage() {
    const session = await auth();
    const initialRepos = session?.accessToken 
        ? await getAdminRepos(session.accessToken as string)
        : [];

    return (
        // Added overflow-hidden to prevent horizontal scroll issues 
        // and ensure it takes up the remaining space properly
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            <MainFeed initialRepos={initialRepos} />
        </main>
    );
}