import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("authjs.session-token")?.value 
    || request.cookies.get("__Secure-authjs.session-token")?.value;
  
  const isLoggedIn = !!sessionToken;
  const isOnLoginPage = request.nextUrl.pathname === "/login";
  const isAuthRoute = request.nextUrl.pathname.startsWith("/api/auth");

  // Allow auth routes to pass through
  if (isAuthRoute) {
    return NextResponse.next();
  }

  // Redirect logged-in users away from login page
  if (isOnLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users to login page
  if (!isOnLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

