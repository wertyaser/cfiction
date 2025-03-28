import { Adapter, AdapterUser } from "next-auth/adapters";
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
  };
}
