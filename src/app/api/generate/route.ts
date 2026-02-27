import { auth } from "@/auth";
import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { supabase } from '@/lib/supabase'; 

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { title, repo, files } = await req.json();

    const { data: profile } = await supabase
      .from('profiles')
      .select('selected_tone')
      .eq('id', session.user.id)
      .single();

    // 🏛️ The Oracle's Hardened Logic (No File Names Allowed)
    const systemPrompt = `You are a Senior Engineer writing for LinkedIn.
    CRITICAL: Never mention raw file names or paths. Interpret the 'Modified Files' list to deduce the engineering work (e.g., 'Refined our auth flow' not 'Modified auth/login.ts').
    
    RULES:
    1. Sentence 1: Describe the task or struggle using a strong verb.
    2. Sentence 2: State the achievement and the technical value gained.
    3. Length: EXACTLY 2 sentences (140-190 chars).
    4. Style: No hashtags. Naturally weave in tech names (e.g., Next.js, Supabase).
    5. Sign-off: End with ONE relevant technical emoji.
    6. Tags: Add one relevant #hashtag (e.g., #react, #nextjs).`;

    const userContent = `Repo: ${repo}. Commit: "${title}". Modified Files (Interpret these, don't list them): ${files?.join(", ") || "None"}. Write the post.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 100
    });

    const draft = chatCompletion.choices[0]?.message?.content?.trim().replace(/^["']|["']$/g, '') || "";
    return NextResponse.json({ draft });

  } catch (error: any) {
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}