import { auth } from "@/auth"; // Import the auth helper
import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    // 1. SECURITY CHECK: Verify the session
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, repo, tone } = await req.json();

    // 2. AI GENERATION
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a professional developer writing LinkedIn updates." },
        { role: "user", content: `Write a post for: ${title} in ${repo}. Tone: ${tone}.` }
      ],
      model: "llama-3.3-70b-versatile",
    });

    const draft = chatCompletion.choices[0]?.message?.content || "";
    return NextResponse.json({ draft });

  } catch (error: any) {
    return NextResponse.json({ draft: "🚀 Pushed updates to the repo!" });
  }
}