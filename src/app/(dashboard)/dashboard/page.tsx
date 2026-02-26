import { auth } from "@/auth"; // 🏛️ Ensure this path matches your auth config
import { redirect } from "next/navigation";
import DashboardCTR from "@/components/dashboard/DashboardCTR";

export default function DashboardPage() {
    return (
        <DashboardGuard>
            <DashboardCTR />
        </DashboardGuard>
    );
}

async function DashboardGuard({ children }: { children: React.ReactNode }) {
    const session = await auth();

    // 🛡️ If no session exists, redirect to the home page immediately
    if (!session) {
        redirect("/");
    }

    return <>{children}</>;
}