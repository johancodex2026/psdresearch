import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { UserRole } from "@/lib/domain";

function splitCsv(value?: string): string[] {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function roleForEmail(email?: string | null): UserRole {
  const normalized = email?.toLowerCase() ?? "";
  const founderEmails = splitCsv(process.env.AUTH_FOUNDER_EMAILS ?? process.env.AUTH_ALLOWED_EMAILS);
  const reviewerEmails = splitCsv(process.env.AUTH_REVIEWER_EMAILS);
  const observerEmails = splitCsv(process.env.AUTH_OBSERVER_EMAILS);
  if (founderEmails.includes(normalized)) return "FOUNDER";
  if (reviewerEmails.includes(normalized)) return "REVIEWER";
  if (observerEmails.includes(normalized)) return "OBSERVER";
  return "OPERATOR";
}

export function isAllowedGoogleIdentity(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.toLowerCase();
  const allowedEmails = splitCsv(process.env.AUTH_ALLOWED_EMAILS);
  const allowedDomains = splitCsv(process.env.AUTH_ALLOWED_DOMAINS);
  if (!allowedEmails.length && !allowedDomains.length) return false;
  if (allowedEmails.includes(normalized)) return true;
  const domain = normalized.split("@")[1] ?? "";
  return allowedDomains.includes(domain);
}

const googleConfigured = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  pages: { signIn: "/login" },
  providers: googleConfigured
    ? [
        Google({
          clientId: process.env.AUTH_GOOGLE_ID!,
          clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
      ]
    : [],
  callbacks: {
    async signIn({ user }) {
      if ((process.env.AUTH_MODE ?? "demo") !== "google") return false;
      return isAllowedGoogleIdentity(user.email);
    },
    async jwt({ token, user }) {
      if (user?.email) token.role = roleForEmail(user.email);
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.role = (token.role as UserRole | undefined) ?? "OBSERVER";
      return session;
    },
  },
});
