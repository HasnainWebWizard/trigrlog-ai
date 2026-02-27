"use client";

import { useEffect } from 'react';
import { getToken } from 'firebase/messaging';
import { messaging } from '@/lib/Firebase/firebase';

export default function NotificationRegister() {
  useEffect(() => {
    const registerToken = async () => {
      try {
        if (!messaging) return;
        
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return;

        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY 
        });
        console.log("Token:", token);

        await fetch('/api/notifications/save-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
      } catch (err) {
        console.error("Token registration failed:", err);
      }
    };

    registerToken();
  }, []);

  return null;
}