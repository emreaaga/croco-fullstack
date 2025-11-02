import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function authMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("access_token")?.value;

  // --- неавторизованный пользователь ---
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // --- залогинен, но пытается попасть на login/register ---
  if (token && (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register"))) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // --- проверка роли, если нужно ---
  if (token && pathname.startsWith("/dashboard/users")) {
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      console.log(payload.role);
      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard/forbidden", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
