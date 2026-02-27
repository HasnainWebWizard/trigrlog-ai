import { auth } from "@/auth";
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { token } = await req.json();

  // Using upsert to force creation/update and capturing the error
  const { error } = await supabase
    .from('profiles')
    .upsert({ 
      id: session.user.id, 
      fcm_token: token 
    });

  if (error) {
    console.error("Supabase Update Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}