import { NextResponse } from 'next/server';
import { adminMessaging } from '@/lib/Firebase/firebaseAdmin';
import { auth } from '@/auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST() {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Guard clause for Supabase
    if (!supabaseAdmin) {
        return NextResponse.json({ error: 'Database client not initialized' }, { status: 500 });
    }

    const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('fcm_token')
        .eq('id', session.user.id)
        .single();

    if (profile?.fcm_token) {
        await (adminMessaging as any).send({
            token: profile.fcm_token,
            notification: {
                title: "Welcome back to TrigrLog Ai",
                body: "Your workspace is ready for your next contribution."
            }
        });
    }

    return NextResponse.json({ success: true });
}