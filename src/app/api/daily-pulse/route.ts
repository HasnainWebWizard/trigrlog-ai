import { auth } from "@/auth";
import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { supabase } from '@/lib/supabase';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { messages } = await req.json(); // messages is now an array of {message, files}

    const { data: profile } = await supabase
      .from('profiles')
      .select('selected_tone, keywords, last_pulse_at')
      .eq('id', session.user.id)
      .single();

    // ... (Cooldown check remains the same)

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a World-Class Technical Content Creator and Strategist. 
  Your goal is to turn technical git activity into a high-engagement LinkedIn post.

  🏛️ THE REASONING ENGINE:
  1. NOISE REDUCTION: Ignore vague commit messages like "fix", "update", or "patch". 
  2. FILE-BASED INSIGHT: Use file paths (e.g., 'hooks/', 'api/', 'styles/') to deduce the technical impact. 
     - If you see API changes, talk about "Scalability" or "Efficiency".
     - If you see UI changes, talk about "User Experience" or "Polished Interface".
  3. THE TRUTH: If a commit is meaningful, prioritize it as the core achievement.

  ✍️ ENGAGEMENT STRUCTURE:
  - THE HOOK: Start with a punchy first line. Acknowledge a challenge, a milestone, or a "Lesson Learned" during this session.
  - THE BUILD: Use a bulleted list to show technical progress. Use action verbs (Architected, Refined, Engineered, Secured).
  - THE "SO WHAT?": Explain why this work matters for the end user or the project's future.
  - CALL TO ACTION (CTA): End with a brief, relevant question to invite comments (e.g., "How do you handle state management in production?").

  TONE: ${profile?.selected_tone || 'casual'}.
  KEYWORDS: ${profile?.keywords || ''}.
  STYLE: Clean, structured, using white space for readability. No generic corporate fluff.`
        },
        {
          role: "user",
          content: `Git Activity Summary: ${JSON.stringify(messages)}`
        }
      ],
      model: "llama-3.3-70b-versatile",
    });

    const draft = chatCompletion.choices[0]?.message?.content?.trim() || "";

    // Update Ledger
    await supabase
      .from('profiles')
      .update({ last_pulse_at: new Date().toISOString() })
      .eq('id', session.user.id);

    return NextResponse.json({ draft });

  } catch (error: any) {
    return NextResponse.json({ error: "Pulse Generation failed" }, { status: 500 });
  }
}