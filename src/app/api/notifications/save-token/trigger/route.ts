import { NextResponse } from 'next/server';
import { adminMessaging } from '@/lib/Firebase/firebaseAdmin';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  // 1. Get the session directly from the incoming cookie
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Fetch the token from the database for this specific user
  const { data: profile } = await supabase
    .from('profiles')
    .select('fcm_token')
    .eq('id', session.user.id)
    .single();

  if (!profile?.fcm_token) {
    return NextResponse.json({ error: 'No token' }, { status: 404 });
  }

  // 3. Send notification
  const { title, body } = await req.json();
  await (adminMessaging as any).send({
    token: profile.fcm_token,
    notification: { title, body }
  });

  return NextResponse.json({ success: true });
}