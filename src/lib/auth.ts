// lib/auth.ts
import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
import { TursoAdapter } from "@/lib/turso-adapter";
import { db } from "@/db";
import bcrypt from "bcryptjs";

interface DbUser {
  id: string;
  email: string;
  password: string;
  name: string | null;
}

export const authOptions: AuthOptions = {
  adapter: TursoAdapter(),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
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

    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
};

export default NextAuth(authOptions);
