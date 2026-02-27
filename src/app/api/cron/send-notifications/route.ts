import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { adminMessaging } from '@/lib/Firebase/firebaseAdmin';

// Define the shape of your data outside the function
interface UpdateItem {
  summary: string | null;
  profiles: { fcm_token: string } | null;
}

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Cast the Supabase data to your interface
  const { data: updates } = await supabase
    .from('daily_updates') 
    .select('summary, profiles(fcm_token)')
    .eq('status', 'pending');

  const typedUpdates = (updates as unknown as UpdateItem[]) || [];

  const promises = typedUpdates.map(async (update) => {
    // Check if the profile and token exist
    if (!update.profiles?.fcm_token) return;

    try {
      await adminMessaging.send({
        token: update.profiles.fcm_token,
        notification: {
          title: 'Daily Pulse: Update Ready',
          body: update.summary || 'A new update awaits, Dear User.'
        }
      });
    } catch (e) {
      console.error('Dispatch failed:', e);
    }
  });

  await Promise.all(promises || []);
  return NextResponse.json({ success: true });
}