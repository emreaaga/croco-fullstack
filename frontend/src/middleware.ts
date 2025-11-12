import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (pathname.startsWith("/auth/login")) {
    const response = NextResponse.next();
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  }

  if (pathname.startsWith("/dashboard")) {
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (!accessToken && refreshToken) {
      try {
        const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
          method: "GET",
          credentials: "include",
          headers: {
            Cookie: `refresh_token=${refreshToken}`,
          },
        });

        if (refreshRes.ok) {
          const setCookieHeader = refreshRes.headers.get("set-cookie");
          const response = NextResponse.next();

          if (setCookieHeader) {
            const cookies = setCookieHeader.split(",");
            cookies.forEach((cookie) => {
              const [nameValue] = cookie.trim().split(";");
              const [name, value] = nameValue.split("=");
              if (name && value) {
                response.cookies.set(name.trim(), value.trim(), {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "lax",
                  path: "/",
                });
              }
            });
          }

          return response;
        }

        const res = NextResponse.redirect(new URL("/auth/login", req.url));
        res.cookies.delete("access_token");
        res.cookies.delete("refresh_token");
        return res;
      } catch (error) {
        console.error("Refresh token error:", error);
        const res = NextResponse.redirect(new URL("/auth/login", req.url));
        res.cookies.delete("access_token");
        res.cookies.delete("refresh_token");
        return res;
      }
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/auth") && pathname !== "/auth/login" && accessToken) {
    return NextResponse.redirect(new URL("/dashboard/default", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
