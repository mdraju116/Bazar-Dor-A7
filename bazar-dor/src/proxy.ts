
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    const signInUrl = new URL("/sign-in", request.url);

    signInUrl.searchParams.set("message", "login-required");
    signInUrl.searchParams.set(
      "callbackURL",
      request.nextUrl.pathname
    );

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile-info",
    "/category-details/:path*",
    "/product-details/:path*",
  ],
};





 /* set this to signin/page.tsx to show a toast 

"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function SignInPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("message") === "login-required") {
      toast.info("এই তথ্য দেখতে প্রথমে সাইন ইন করতে হবে।");
    }
  }, [searchParams]);

  return (
    // Keep your existing sign-in page JSX here
    <div>{/* Your sign-in form /}</div>
  );
}


*/