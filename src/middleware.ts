import { NextRequest, NextResponse } from "next/server";

export default function middelware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/')) {
    return NextResponse.rewrite(new URL('/home', req.url));
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
