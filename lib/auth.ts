import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

if (!process.env.AUTH_SECRET) {
  console.warn("⚠️ AUTH_SECRET is not set. NextAuth will generate a new secret on every build, causing OAuth failures.");
}

const useSecureCookies = process.env.NODE_ENV === "production";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  trustHost: true, // Required for Vercel deployment
  cookies: {
    pkceCodeVerifier: {
      name: useSecureCookies ? "__Secure-authjs.pkce.code_verifier" : "authjs.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: useSecureCookies,
      },
    },
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user }) {
      // Add user id to session
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      // Track login event
      if (user.id) {
        try {
          await prisma.loginEvent.create({
            data: {
              userId: user.id,
            },
          });
        } catch (error) {
          console.error("Failed to log sign-in event:", error);
        }
      }
    },
  },
});

