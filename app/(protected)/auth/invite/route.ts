import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") || "invite";
  const next = searchParams.get("next") || "/auth/invite/complete";

  if (token_hash && type === "invite") {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type: "invite",
      token_hash,
    });

    if (!error) {
      // Redirect to a complete registration page where the user sets their password
      redirect(next);
    }
  }

  // If OTP verification fails, redirect to an error page
  redirect("/login?message=Could not verify invitation link");
}
