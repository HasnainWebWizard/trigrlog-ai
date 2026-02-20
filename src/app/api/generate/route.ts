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

    const { title, repo, files } = await req.json();

    const { data: profile } = await supabase
      .from('profiles')
      .select('selected_tone, keywords')
      .eq('id', session.user.id)
      .single();

    const userTone = profile?.selected_tone || 'tech';
    const userKeywords = profile?.keywords || '';

    const toneGuidelines: Record<string, string> = {
      tech: "Technical and deep-dive. Focus on specific architectural patterns and logic changes.",
      casual: "Casual and community-focused. Use approachable language as if sharing with peers.",
      job: "Professional and SEO-optimized for recruiters. Emphasize business value and career achievements."
    };

    // 🏛️ The Emperor's System Logic
    const systemPrompt = `You are an AI specialized in professional developer branding. 
    Your task is to write a LinkedIn-style status update based on code changes.
    
    TONE REQUIREMENT: ${toneGuidelines[userTone]}
    KEYWORDS TO INCLUDE (if applicable): ${userKeywords}

    CRITICAL INSTRUCTION:
    Developers are often lazy with commit messages (e.g., 'updates').
    You MUST prioritize the 'Modified Files' list to deduce what was actually built.
    
    GUIDELINES:
    1. Substance: Use filenames to describe the actual engineering impact.
    2. Length: Exactly 2 sentences (140-190 characters).
    3. Format: No hashtags. End with one relevant technical emoji.
    4. Vocabulary: Use strong verbs like 'Architected', 'Streamlined', or 'Implemented'.`;

    const userContent = `
    Repository: ${repo}
    Commit Message: "${title}"
    Modified Files: ${files && files.length > 0 ? files.join(", ") : "No file data available"}
    
    Summarize this work into a professional accomplishment following the specified tone.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent }
      ],
      // 🏛️ Using 8b-instant for speed, but keeping temperature low for strict guideline adherence
      model: "llama-3.1-8b-instant",
      temperature: 0.5, 
      max_tokens: 150
    });

    const draft = chatCompletion.choices[0]?.message?.content?.trim() || "";
    
    // Remove any accidental quotes the AI might wrap the response in
    const cleanDraft = draft.replace(/^["']|["']$/g, '');

    return NextResponse.json({ draft: cleanDraft });

  } catch (error: any) {
    console.error("❌ Oracle Error:", error);
    
    if (error?.status === 429) {
      return NextResponse.json(
        { error: "Rate limit reached. Please wait a moment." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    );
  }
}