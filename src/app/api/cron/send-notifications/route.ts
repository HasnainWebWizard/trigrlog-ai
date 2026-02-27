import { NextResponse } from 'next/server';
import { adminMessaging } from '@/lib/Firebase/firebaseAdmin';
import { supabase } from '@/lib/supabase';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');

  // 1. Security Check
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Fetch all valid tokens
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('fcm_token')
    .not('fcm_token', 'is', null);

  if (error || !profiles) {
    return NextResponse.json({ error: 'Data fetch failed' }, { status: 500 });
  }

  // 3. Safety Guard for Firebase SDK
  if (!adminMessaging) {
    console.error("Firebase Admin SDK is not initialized.");
    return NextResponse.json({ error: 'Messaging unavailable' }, { status: 500 });
  }

  // 4. Dispatch using type assertion to satisfy TypeScript
  const message = {
    notification: {
      title: "DailyPulse Update",
      body: "Dear User, the DailyPulse is ready to use. Would you like to use it?"
    }
  };

  const promises = profiles.map(async (user) => {
    try {
      // We know adminMessaging is not null here due to the check above
      await (adminMessaging as any)!.send({
        token: user.fcm_token,
        ...message
      });
    } catch (e) {
      console.error(`Failed to send to ${user.fcm_token}:`, e);
    }
  });

  await Promise.all(promises);
  
  return NextResponse.json({ 
    success: true, 
    count: profiles.length 
  });
}