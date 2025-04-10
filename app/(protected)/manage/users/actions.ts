"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

// Invite a new user
export async function inviteUser(formData: FormData) {
  const supabase = await createClient();

  try {
    const email = formData.get("email") as string;
    const role = formData.get("role") as "writer" | "sm-manager" | "admin";

    if (!email || !role) {
      throw new Error("Email and role are required.");
    }

    // Invite the user
    const { data: invite, error: inviteError } =
      await supabase.auth.admin.inviteUserByEmail(email);

    if (inviteError) throw new Error(inviteError.message);

    // Check if the user has completed sign-up
    const { data: authUsers, error: fetchError } =
      await supabase.auth.admin.listUsers();
    if (fetchError) throw new Error(fetchError.message);

    const invitedUser = authUsers.find((user) => user.email === email);
    if (!invitedUser) {
      return {
        message: "User invited successfully, but sign-up is not yet complete.",
      };
    }

    // Insert into the users table
    const { error: dbError } = await supabase.from("users").insert([
      {
        id: invitedUser.id,
        email,
        role,
        img_gen_left_today: 0,
        total_img_gen: 0,
      },
    ]);
    if (dbError) throw new Error(dbError.message);

    return { success: true };
  } catch (error) {
    console.error("Error inviting user:", error);
    return { error: error.message };
  }
}

// Update user role
export async function updateUserRole(formData: FormData) {
  const supabase = await createClient();

  try {
    const userId = formData.get("userId") as string;
    const role = formData.get("role") as "writer" | "sm-manager" | "admin";

    if (!userId || !role) throw new Error("User ID and role are required.");

    const { error: dbError } = await supabase
      .from("users")
      .update({ role })
      .match({ id: userId });

    if (dbError) throw new Error(dbError.message);

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Error updating user role:", error);
    return { error: error.message };
  }
}

// Initiate password reset
export async function initiatePasswordReset(formData: FormData) {
  const supabase = await createClient();

  try {
    const email = formData.get("email") as string;

    if (!email) throw new Error("Email is required.");

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email
    );

    if (resetError) throw new Error(resetError.message);

    return { success: true };
  } catch (error) {
    console.error("Error initiating password reset:", error);
    return { error: error.message };
  }
}
