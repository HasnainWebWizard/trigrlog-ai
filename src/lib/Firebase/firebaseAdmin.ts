// lib/Firebase/firebaseAdmin.ts
import * as admin from 'firebase-admin';

export const getAdminApp = () => {
  // Use non-public variables only
  if (!process.env.FIREBASE_PROJECT_ID) {
    console.warn("Firebase Admin variables missing.");
    return null;
  }

  if (admin.apps.length === 0) {
    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Ensure your private key has escaped newlines: "-----BEGIN PRIVATE KEY-----\n..."
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }
  return admin.app();
};

const app = getAdminApp();
export const adminMessaging = app ? app.messaging() : null;