import { auth } from "@/auth";
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { token } = await req.json();

  await supabase
    .from('profiles')
    .update({ fcm_token: token })
    .eq('id', session.user.id);

  return NextResponse.json({ success: true });
}