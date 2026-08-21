import { NextResponse } from "next/server";
import { auth } from "@/auth";

const vitalIngestPattern = /^\/api\/v1\/proto-seres\/[^/]+\/sinais-vitais\/?$/;

export default auth((request) => {
  const path = request.nextUrl.pathname;
  if (path.startsWith("/_next") || path === "/favicon.ico") return NextResponse.next();
  if (path === "/login" || path.startsWith("/api/auth") || path === "/api/v1/health") return NextResponse.next();
  if (request.method === "POST" && vitalIngestPattern.test(path)) return NextResponse.next();
  if ((process.env.AUTH_MODE ?? "demo") === "demo" && process.env.ALLOW_DEMO_AUTH === "true") return NextResponse.next();
  if (!request.auth) {
    if (path.startsWith("/api/")) return NextResponse.json({ error: { code: "PSD_UNAUTHORIZED", message: "Autenticação necessária." } }, { status: 401 });
    const login = new URL("/login", request.nextUrl.origin);
    login.searchParams.set("returnTo", path);
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
});

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
