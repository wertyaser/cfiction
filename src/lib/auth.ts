// lib/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { TursoAdapter } from "@/lib/turso-adapter";
import { db } from "@/db";
import bcrypt from "bcryptjs";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

export const authOptions = {
  adapter: TursoAdapter(),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: { email: string; password: string }) {
        const user = await db.execute({
          sql: "SELECT * FROM users WHERE email = ?",
          args: [credentials.email],
        });

        if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) token.id = user.id;
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/sign-in",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
