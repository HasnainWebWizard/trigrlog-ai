import { NextResponse } from 'next/server';
import { adminMessaging } from '@/lib/Firebase/firebaseAdmin';
import { supabase } from '@/lib/supabase';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 1. Fetch all tokens from your users table
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('fcm_token')
    .not('fcm_token', 'is', null);

  if (error || !profiles) return NextResponse.json({ error: 'Data fetch failed' }, { status: 500 });

  // 2. Prepare the message payload
  const message = {
    notification: {
      title: "DailyPulse Update",
      body: "Dear User, the DailyPulse is ready to use. Would you like to use it?"
    }
  };

  // 3. Dispatch to all tokens
  const promises = profiles.map(async (user) => {
    try {
      await adminMessaging.send({ 
        token: user.fcm_token, 
        ...message 
      });
    } catch (e) {
      console.error(`Failed to send to ${user.fcm_token}:`, e);
    }
  });

  await Promise.all(promises);
  return NextResponse.json({ success: true, count: profiles.length });
}