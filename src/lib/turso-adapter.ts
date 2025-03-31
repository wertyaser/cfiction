import { ResultSet, Value } from "@libsql/client";
import type { Adapter, AdapterUser } from "next-auth/adapters";
import { db } from "@/db";
import { DbUser } from "@/types/next-auth";

// Define the database user type

export function TursoAdapter(): Adapter {
  return {
    async createUser(user: Omit<AdapterUser, "id">): Promise<AdapterUser> {
      const userId = crypto.randomUUID();

      await db.execute({
        sql: "INSERT INTO users (id, email, name, emailVerified) VALUES (?, ?, ?, ?)",
        args: [
          userId,
          user.email,
          user.name || null,
          user.emailVerified?.toISOString() || null,
        ] as Value[],
      });

      return {
        id: userId,
        email: user.email,
        name: user.name || null,
        emailVerified: user.emailVerified || null,
        image: user.image || null,
      };
    },

    async getUser(id: string): Promise<AdapterUser | null> {
      const result: ResultSet = await db.execute({
        sql: "SELECT * FROM users WHERE id = ?",
        args: [id],
      });

      if (result.rows.length === 0) return null;

      const user = result.rows[0] as unknown as DbUser;

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
        image: user.image,
      };
    },

    async getUserByEmail(email: string): Promise<AdapterUser | null> {
      const result: ResultSet = await db.execute({
        sql: "SELECT * FROM users WHERE email = ?",
        args: [email],
      });

      if (result.rows.length === 0) return null;

      const user = result.rows[0] as unknown as DbUser;

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
        image: user.image,
      };
    },

    async updateUser(
      user: Partial<AdapterUser> & { id: string }
    ): Promise<AdapterUser> {
      await db.execute({
        sql: "UPDATE users SET name = ?, email = ?, emailVerified = ?, image = ? WHERE id = ?",
        args: [
          user.name || null,
          user.email || null,
          user.emailVerified?.toISOString() || null,
          user.image || null,
          user.id,
        ] as Value[],
      });

      const result: ResultSet = await db.execute({
        sql: "SELECT * FROM users WHERE id = ?",
        args: [user.id],
      });

      if (result.rows.length === 0) throw new Error("User not found");

      const updatedUser = result.rows[0] as unknown as DbUser;

      return {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        emailVerified: updatedUser.emailVerified
          ? new Date(updatedUser.emailVerified)
          : null,
        image: updatedUser.image,
      };
    },

    async deleteUser(userId: string): Promise<void> {
      await db.execute({
        sql: "DELETE FROM users WHERE id = ?",
        args: [userId],
      });
    },

    // Session management methods could be implemented if needed
  };
}
