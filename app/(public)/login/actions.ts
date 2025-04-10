"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

interface UnsplashImage {
  url: string;
  photographer: string;
  photographerLink: string;
}

export async function fetchUnsplashImage(): Promise<UnsplashImage | null> {
  const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  const UNSPLASH_URL = `https://api.unsplash.com/photos/random?query=technology&orientation=portrait&client_id=${UNSPLASH_ACCESS_KEY}`;

  try {
    const response = await fetch(UNSPLASH_URL);
    if (response.ok) {
      const data = await response.json();
      return {
        url: data.urls.full,
        photographer: data.user.name,
        photographerLink: data.user.links.html,
      };
    } else {
      console.error("Failed to fetch image from Unsplash:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/login?message=error login in");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/login?message=error signing up");
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
