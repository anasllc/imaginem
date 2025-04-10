"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function CompleteInvite() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const supabase = createClient();

    const { error: resetError } = await supabase.auth.updateUser({
      password,
    });

    if (resetError) {
      setError(resetError.message);
    } else {
      router.push("/login?message=Invite complete! Please login.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Complete Registration</h1>
      {error && <p className="error">{error}</p>}
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <button type="submit">Set Password</button>
    </form>
  );
}
