import { NextResponse } from 'next/server';
import { adminMessaging } from '@/lib/Firebase/firebaseAdmin';

export async function GET() {
  if (!adminMessaging) {
    return NextResponse.json({ error: 'SDK unavailable' }, { status: 500 });
  }

  // Define the message manually here
  // Since we have no DB, we hardcode the target token
  const message = {
    token: "YOUR_DEVICE_FCM_TOKEN_HERE", 
    notification: {
      title: "Daily Reminder",
      body: "Dear User, TrigrLog Ai is ready with a new post."
    }
  };

  try {
    await adminMessaging.send(message);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}