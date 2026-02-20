import { auth } from "@/auth";
import { getCommitDetails } from "@/lib/github";
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const session = await auth();
    if (!session?.accessToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const owner = searchParams.get('owner');
    const repo = searchParams.get('repo');
    const sha = searchParams.get('sha');

    if (!owner || !repo || !sha) return NextResponse.json({ error: "Missing parameters" }, { status: 400 });

    const details = await getCommitDetails(session.accessToken as string, owner, repo, sha);
    return NextResponse.json(details);
}