import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function authMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const access = req.cookies.get("access_token")?.value;
  const refresh = req.cookies.get("refresh_token")?.value;

  if (pathname.startsWith("/dashboard") && !access && !refresh) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (access) {
    try {
      const { payload } = await jwtVerify(access, new TextEncoder().encode(process.env.JWT_SECRET!));

      if (pathname.startsWith("/dashboard/users") && payload.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard/forbidden", req.url));
      }

      return NextResponse.next();
    } catch {
      if (refresh) {
        const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
          headers: { cookie: `refresh_token=${refresh}` },
        });

        if (refreshRes.ok) return NextResponse.next();

        const res = NextResponse.redirect(new URL("/auth/login", req.url));
        res.cookies.set("access_token", "", { expires: new Date(0), path: "/" });
        res.cookies.set("refresh_token", "", { expires: new Date(0), path: "/" });
        return res;
      } else {
        const res = NextResponse.redirect(new URL("/auth/login", req.url));
        res.cookies.set("access_token", "", { expires: new Date(0), path: "/" });
        res.cookies.set("refresh_token", "", { expires: new Date(0), path: "/" });
        return res;
      }
    }
  }

  if (pathname.startsWith("/auth") && access) {
    try {
      await jwtVerify(access, new TextEncoder().encode(process.env.JWT_SECRET!));
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } catch {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
