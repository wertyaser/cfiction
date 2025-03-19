// lib/auth.ts
import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { TursoAdapter } from "@/lib/turso-adapter";
import { db } from "@/db";
import bcrypt from "bcryptjs";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import type { User } from "next-auth";

interface DbUser {
  id: string;
  email: string;
  password: string;
  name: string | null;
}

interface ExtendedSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export const authOptions: AuthOptions = {
  adapter: TursoAdapter(),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const result = await db.execute({
          sql: "SELECT * FROM users WHERE email = ?",
          args: [credentials.email],
        });

        if (result.rows.length === 0) return null;

        const user = result.rows[0] as unknown as DbUser;
        if (!bcrypt.compareSync(credentials.password, user.password)) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name || undefined,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt" as const,
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) token.id = user.id;
      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<ExtendedSession> {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
  },

  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/sign-in",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
