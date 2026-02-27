"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function LoginNotification() {
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const greeted = localStorage.getItem("hasGreeted");
      if (!greeted) {
        fetch("/api/notifications/greet", { method: "POST" });
        localStorage.setItem("hasGreeted", "true");
      }
    } else {
      localStorage.removeItem("hasGreeted");
    }
  }, [status]);

  return null;
}