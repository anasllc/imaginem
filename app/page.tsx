// app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  useEffect(() => {
    // Simulate a user object (set to null for logged-out state)
    const user = { username: "testuser", session: "active" }; // Replace with null to simulate logged-out

    if (user.session === "active") {
      // User is logged in, redirect to /dashboard
      router.push("/dashboard");
    } else {
      // User is not logged in, redirect to /login
      router.push("/login");
    }
  }, [router]);

  return null; // This component doesn't render any UI due to the redirection
}
