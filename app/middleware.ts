import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define the list of protected routes
const protectedRoutes = ["/dashboard", "/my_account"];

export function middleware(req: NextRequest) {
  // Retrieve the JWT token from cookies
  const authToken = req.cookies.get("authToken")?.value;

  // Get the pathname of the request
  const { pathname } = req.nextUrl;

  // Check if the route is protected
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!authToken) {
      // Return a 401 status to signal unauthenticated access
      return new NextResponse(
        JSON.stringify({ message: "Unauthenticated" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  // Allow the request to proceed if the token exists or the route isn't protected
  return NextResponse.next();
}

// Match routes that should be processed by this middleware
export const config = {
  matcher: [
    "/dashboard/:path*", // Protect /dashboard and its subroutes
    "/my_account/:path*", // Protect /profile and its subroutes
  ],
};
