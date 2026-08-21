import { NextResponse } from "next/server";
import { auth } from "@/auth";

const publicPrefixes = [
  "/login",
  "/api/auth",
  "/api/v1/health",
  "/api/v1/proto-seres/",
];

export default auth((request) => {
  const path = request.nextUrl.pathname;
  if (path.startsWith("/_next") || path === "/favicon.ico") return NextResponse.next();
  if (publicPrefixes.some((prefix) => path.startsWith(prefix))) return NextResponse.next();
  if ((process.env.AUTH_MODE ?? "demo") === "demo" && process.env.ALLOW_DEMO_AUTH === "true") {
    return NextResponse.next();
  }
  if (!request.auth) {
    const login = new URL("/login", request.nextUrl.origin);
    login.searchParams.set("returnTo", path);
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
