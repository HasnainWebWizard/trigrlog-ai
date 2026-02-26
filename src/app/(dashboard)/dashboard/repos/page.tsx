import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ReposContainer from "@/containers/dashboard/repos/ReposContainer";

export default async function ReposPage() {
    const session = await auth();
    if (!session?.accessToken) redirect("/login");

    // 🏛️ One simple, direct call to GitHub. No internal API needed.
    const res = await fetch("https://api.github.com/user/repos?sort=updated&per_page=100", {
        headers: { Authorization: `Bearer ${session.accessToken}` },
    });

    const allRepos = res.ok ? await res.json() : [];

    return (
        <>
            < ReposContainer initialPersonal={allRepos} />
        </>
    );
}