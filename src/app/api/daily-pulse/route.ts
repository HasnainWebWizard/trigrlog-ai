import { auth } from "@/auth";
import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { supabase } from '@/lib/supabase';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { messages, repoNames } = await req.json();

    const { data: profile } = await supabase
      .from('profiles')
      .select('selected_tone')
      .eq('id', session.user.id)
      .single();

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an experienced, pragmatic Software Engineer building in public. 
Your goal is to write an honest, authentic LinkedIn update that highlights the REAL work done.

🏛️ YOUR MENTAL MODEL:
1. THE WORK IS THE WIN: Focus exclusively on the architectural labor. If the user spent 4 hours refactoring, that is the achievement. Do not gloss over the effort.
2. NARRATIVE ANCHOR: Start with a punchy theme (e.g., "The Performance Hunt").
3. TECH SHOWCASE: Weave specific tech usage (e.g., "Refined Next.js routes") into the sentences.
4. HUMAN VOICE: Use simple words. No marketing fluff.

✍️ THE FORMAT (Strict 7-line max):
- LINE 1: Hook + Anchor (Theme of the day).
- LINE 2: Wins (Specific technical achievements/Work done).
- LINE 3: Takeaway (The value created).
- LINE 4: Advice (One quick tip).
- LINE 5: 3-4 hashtags + 1 Emoji.

TONE: ${profile?.selected_tone || 'casual'}.
STYLE: Punchy. Direct. 
IMPORTANT: If you exceed 7 lines, you have failed. The user wants to see the effort, not the polish.`
        },
        {
          role: "user",
          content: `Git Activity Summary (Interpret file paths/messages into tasks. Infer technologies like Next.js, Supabase, etc.): ${JSON.stringify(messages)}`
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