import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { activeUser } from "./app/_lib/data";

export async function middleware(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = request.nextUrl.pathname;

  // Public routes that should be accessible without authentication
  const publicRoutes = ["/login", "/signup", "/"];

  // Check if the route starts with a protected group
  const isProtectedRoute = pathname.startsWith("/(protected)");

  // Check if the route is a public route
  const isPublicRoute = publicRoutes.includes(pathname);

  // If trying to access a protected route without authentication
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If authenticated user tries to access login/signup, redirect to dashboard
  if ((pathname === "/login" || pathname === "/signup") && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Restrict access to /manage for non-admin users
  if (pathname.startsWith("/manage")) {
    const user = await activeUser();

    if (!user || user.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url)); // Redirect to homepage or another page
    }
  }

  // Continue with the default session update
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Static files and images
     * Includes checking routes in the protected and public groups
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
