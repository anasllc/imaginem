import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") || "recovery";
  const next = searchParams.get("next") || "/auth/reset/complete";

  if (token_hash && type === "recovery") {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type: "recovery",
      token_hash,
    });

    if (!error) {
      redirect(next); // Redirect to reset password form
    }
  }

  redirect("/login?message=Could not verify reset password link");
}
