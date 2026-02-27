import { NextResponse } from 'next/server';
import { adminMessaging } from '@/lib/Firebase/firebaseAdmin';

export async function POST(req: Request) {
  // 1. Runtime guard
  if (!adminMessaging) {
    return NextResponse.json({ error: 'SDK unavailable' }, { status: 500 });
  }

  // 2. Type guard for the compiler
  const localMessaging = adminMessaging!;

  try {
    const { message } = await req.json();
    
    // 3. Use the asserted constant
    await localMessaging.send(message);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    // 4. Stringify error to avoid serialization issues
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}