import {
  Adapter,
  AdapterUser,
  AdapterSession,
  AdapterAccount,
  VerificationToken,
} from "next-auth/adapters";
import { db } from "@/db";

interface DbUser {
  id: string;
  email: string;
  name: string | null;
  emailVerified: Date | null;
}

export function TursoAdapter(): Adapter {
  return {
    async createUser(user: AdapterUser): Promise<AdapterUser> {
      await db.execute({
        sql: "INSERT INTO users (id, email, name, emailVerified) VALUES (?, ?, ?, ?)",
        args: [
          user.id,
          user.email,
          user.name || null,
          user.emailVerified?.toISOString() || null,
        ],
      });
      return user;
    },

    async getUser(id: string): Promise<AdapterUser | null> {
      const result = await db.execute({
        sql: "SELECT * FROM users WHERE id = ?",
        args: [id],
      });
      if (result.rows.length === 0) return null;

      const user = result.rows[0] as unknown as DbUser;
      return {
        id: user.id,
        email: user.email,
        name: user.name || undefined,
        emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
      };
    },

    async getUserByEmail(email: string): Promise<AdapterUser | null> {
      const result = await db.execute({
        sql: "SELECT * FROM users WHERE email = ?",
        args: [email],
      });
      if (result.rows.length === 0) return null;

      const user = result.rows[0] as unknown as DbUser;
      return {
        id: user.id,
        email: user.email,
        name: user.name || undefined,
        emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
      };
    },

    async updateUser(
      user: Partial<AdapterUser> & Pick<AdapterUser, "id">
    ): Promise<AdapterUser> {
      await db.execute({
        sql: "UPDATE users SET name = ?, email = ?, emailVerified = ? WHERE id = ?",
        args: [
          user.name || null,
          user.email || null,
          user.emailVerified?.toISOString() || null,
          user.id,
        ],
      });
      const result = await db.execute({
        sql: "SELECT * FROM users WHERE id = ?",
        args: [user.id],
      });
      if (result.rows.length === 0) throw new Error("User not found");

      const updatedUser = result.rows[0] as unknown as DbUser;
      return {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name || undefined,
        emailVerified: updatedUser.emailVerified
          ? new Date(updatedUser.emailVerified)
          : null,
      };
    },

    async deleteUser(id: string): Promise<void> {
      await db.execute({
        sql: "DELETE FROM users WHERE id = ?",
        args: [id],
      });
    },

    async linkAccount(account: AdapterAccount): Promise<void> {
      // TODO: Implement account linking
      console.log("Account linking not implemented:", account);
    },

    async unlinkAccount(account: AdapterAccount): Promise<void> {
      // TODO: Implement account unlinking
      console.log("Account unlinking not implemented:", account);
    },

    async createSession(session: AdapterSession): Promise<AdapterSession> {
      // TODO: Implement session creation
      console.log("Session creation not implemented:", session);
      return session;
    },

    async getSessionAndUser(
      sessionToken: string
    ): Promise<{ session: AdapterSession; user: AdapterUser } | null> {
      // TODO: Implement session retrieval
      console.log("Session retrieval not implemented:", sessionToken);
      return null;
    },

    async updateSession(
      session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
    ): Promise<AdapterSession | null> {
      // TODO: Implement session update
      console.log("Session update not implemented:", session);
      return null;
    },

    async deleteSession(sessionToken: string): Promise<void> {
      // TODO: Implement session deletion
      console.log("Session deletion not implemented:", sessionToken);
    },

    async createVerificationToken(
      verificationToken: VerificationToken
    ): Promise<VerificationToken> {
      // TODO: Implement verification token creation
      console.log(
        "Verification token creation not implemented:",
        verificationToken
      );
      return verificationToken;
    },

    async useVerificationToken(params: {
      identifier: string;
      token: string;
    }): Promise<VerificationToken | null> {
      // TODO: Implement verification token usage
      console.log("Verification token usage not implemented:", params);
      return null;
    },
  };
}
