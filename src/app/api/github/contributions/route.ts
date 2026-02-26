import { auth } from "@/auth";
import { NextResponse } from 'next/server';

export async function GET() {
    const session = await auth();
    const token = session?.accessToken;

    if (!token) return NextResponse.json([]);

    try {
        // 🏛️ 1. Determine the User's Identity
        const userRes = await fetch("https://api.github.com/user", {
            headers: { Authorization: `Bearer ${token}` }
        });
        const userData = await userRes.json();
        const username = userData.login;

        // 🏛️ 2. Fetch all Organizations the user is a part of
        const orgsRes = await fetch("https://api.github.com/user/orgs", {
            headers: { Authorization: `Bearer ${token}` }
        });
        const orgs = await orgsRes.json();

        // 🏛️ 3. Fetch Repositories from ALL Organizations (Universal)
        const orgReposPromises = orgs.map(async (org: any) => {
            const res = await fetch(`https://api.github.com/orgs/${org.login}/repos?type=all&per_page=100`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.ok ? res.json() : [];
        });

        // 🏛️ 4. Fetch Personal Collaborations (Direct Invites)
        const collabRes = await fetch("https://api.github.com/user/repos?affiliation=collaborator&per_page=100", {
            headers: { Authorization: `Bearer ${token}` }
        });
        const collabRepos = await collabRes.json();

        // 🏛️ 5. Fetch Public Contributions (Search for Merged PRs as a final net)
        const searchUrl = `https://api.github.com/search/issues?q=author:${username}+-user:${username}+is:merged&per_page=20`;
        const searchRes = await fetch(searchUrl, {
            headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github.v3+json" }
        });
        const searchData = await searchRes.json();
        
        // Extract unique URLs from search results
        const searchRepoUrls = [...new Set(searchData.items?.map((item: any) => item.repository_url) || [])] as string[];
        const searchRepos = await Promise.all(searchRepoUrls.map(async (url) => {
            const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
            return res.ok ? res.json() : null;
        }));

        // 🛡️ 6. The Great Merge: Combine all found territories
        const orgReposNested = await Promise.all(orgReposPromises);
        const allDiscovered = [
            ...orgReposNested.flat(), 
            ...collabRepos, 
            ...searchRepos.filter(Boolean)
        ];
        
        // 🛡️ 7. Filter out what the user OWNS and Deduplicate
        const uniqueFinalList = Array.from(
            new Map(
                allDiscovered
                    .filter((repo: any) => repo.owner.login.toLowerCase() !== username.toLowerCase())
                    .map((repo: any) => [repo.id, {
                        id: repo.id,
                        name: repo.name,
                        owner: { login: repo.owner.login },
                        full_name: repo.full_name,
                        role: 'Contributor'
                    }])
            ).values()
        );

        return NextResponse.json(uniqueFinalList);

    } catch (error) {
        console.error("❌ The Universal Scan failed:", error);
        return NextResponse.json([]);
    }
}