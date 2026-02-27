import NotificationRegister from '@/components/NotificationRegister';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import LoginNotification from '@/components/LoginNotification';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrigrLog AI",
  description: "TrigrLog AI - The Developer's Narrative Engine",
  icons: {
    icon: "/trigr-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
        <LoginNotification />
          <main>
            {children}
          </main>
          {/* <Footer /> */}
        </SessionProvider>
        <NotificationRegister />
      </body>
    </html>
  );
}
