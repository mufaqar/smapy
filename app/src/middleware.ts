import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookieOptions } from "./utils/cookie-options";

export async function middleware(req: NextRequest) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next();
  // Create authenticated Supabase Client
  const supabase = createMiddlewareSupabaseClient(
    { req, res },
    { cookieOptions }
  );
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check auth condition
  if (session?.user.id /*email?.endsWith('@gmail.com') */) {
    // Authentication successful, forward request to protected route.
    return res;
  }

  console.log(`muly:middleware ${req.nextUrl}`, {});

  // Auth condition not met, redirect to home page.
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/signin";
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
  redirectUrl.searchParams.set(
    `user`,
    req.nextUrl.pathname.includes("/advisor") ? "advisor" : "customer"
  );
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/(advisor|customer)/(.*)", "/(advisor|customer)"],
};
