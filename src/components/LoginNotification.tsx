"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { getToken } from "firebase/messaging";
import { messaging } from "@/lib/Firebase/firebase";

export default function LoginNotification() {
    const { status } = useSession();

    useEffect(() => {
        if (status !== "authenticated") {
            localStorage.removeItem("hasGreeted");
            return;
        }

        async function syncAndGreet() {
            if (!messaging) {
                console.warn("Messaging not initialized yet.");
                return;
            }

            try {
                // Now TypeScript knows messaging is not null
                const token = await getToken(messaging, {
                    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
                });

                if (token) {
                    await fetch('/api/notifications/save-token', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ token }),
                    });
                }

                // 2. Now trigger the Greeting
                const greeted = localStorage.getItem("hasGreeted");
                if (!greeted) {
                    await fetch("/api/notifications/greet", { method: "POST" });
                    localStorage.setItem("hasGreeted", "true");
                }
            } catch (err) {
                console.error("Initialization failed:", err);
            }
        }

        syncAndGreet();
    }, [status]);

    return null;
}