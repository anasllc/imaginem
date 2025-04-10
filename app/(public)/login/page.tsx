import { Metadata } from "next";
import LoginClient from "@/app/components/LoginForm";
import { fetchUnsplashImage } from "./actions";

export const metadata: Metadata = {
  title: "Login - ImÄginem",
};

export default async function LoginPage() {
  const bgImage = await fetchUnsplashImage();

  return <LoginClient initialBgImage={bgImage} />;
}
