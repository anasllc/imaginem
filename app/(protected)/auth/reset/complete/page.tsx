"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
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
      router.push("/login?message=Password reset successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Reset Password</h1>
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
      <button type="submit">Reset Password</button>
    </form>
  );
}

{
  /* <input
              name="password"
              type="password"
              placeholder={
                isEditing ? "Change password if needed" : "Enter password"
              }
              value={formData.password}
              onChange={handleChange("password")}
              className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            /> */
}
