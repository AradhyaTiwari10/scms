import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Define public routes
  const isPublicRoute = pathname === "/login" || pathname === "/signup" || pathname === "/";
  
  // Define protected routes (everything else that isn't public or a static asset)
  const isProtectedRoute = !isPublicRoute && !pathname.startsWith("/_next") && !pathname.includes(".");

  if (isProtectedRoute && !token) {
    // Redirect to login if trying to access a protected route without a token
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }

  if (isPublicRoute && token && pathname !== "/") {
    // Redirect to dashboard if already logged in and trying to access login/signup
    const url = new URL("/dashboard", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
