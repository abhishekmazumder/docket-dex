import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const ADMIN_ROLE = "ADMIN";

function redirectToSignIn(req: NextRequest) {
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/api/auth/signin";
  redirectUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
}

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || "",
  });

  const path = req.nextUrl.pathname;

  if (path.startsWith("/users")) {
    if (!token || token.role !== ADMIN_ROLE) {
      return redirectToSignIn(req);
    }
    return NextResponse.next();
  }

  if (path.startsWith("/tickets")) {
    if (!token) {
      return redirectToSignIn(req);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/users/:path*", "/tickets/:path*"],
};
