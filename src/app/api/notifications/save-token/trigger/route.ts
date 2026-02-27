import { adminMessaging } from '@/lib/Firebase/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { token, title, body } = await req.json();

  const message = {
    notification: { title, body },
    token: token,
  };

  try {
    await adminMessaging.send(message);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}