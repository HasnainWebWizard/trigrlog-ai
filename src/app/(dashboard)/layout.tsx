import Sidebar from '@/components/shared/SideBar';
import HeaderDashboard from '@/containers/dashboard/HeaderDashboard';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#0d1117]">
            {/* 1. Sidebar: Stationary on the left */}
            {/* Ensure your Sidebar component DOES NOT have the 'fixed' class anymore */}
            <div className="hidden md:flex h-full w-64 flex-none">
                <Sidebar />
            </div>

            {/* 2. Main Wrapper: Takes up all remaining space */}
            <div className="flex flex-1 flex-col min-w-0">

                {/* 3. Header: Glued to the top of the content area */}
                <HeaderDashboard />

                {/* 4. Content Area: The only part that scrolls */}
                <main className="flex-1 overflow-y-auto">
                    {/* Changed max-w-400 to max-w-7xl (standard Tailwind) */}
                    <div className="mx-auto max-w-7xl p-6 md:p-8 lg:p-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}