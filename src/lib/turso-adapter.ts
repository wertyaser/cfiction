import { Adapter, AdapterUser, AdapterSession } from "next-auth/adapters";
import { db } from "@/db";

export function TursoAdapter(): Adapter {
  return {
    async createUser(user) {
      await db.execute({
        sql: "INSERT INTO users (id, email, name) VALUES (?, ?, ?)",
        args: [user.id, user.email, user.name || null],
      });
      return user as AdapterUser;
    },

    async getUser(id) {
      const result = await db.execute({
        sql: "SELECT * FROM users WHERE id = ?",
        args: [id],
      });
      if (result.rows.length === 0) return null;

      const user = result.rows[0];
      return {
        id: user.id,
        email: user.email,
        name: user.name,
      } as AdapterUser;
    },

    async getUserByEmail(email) {
      const result = await db.execute({
        sql: "SELECT * FROM users WHERE email = ?",
        args: [email],
      });
      if (result.rows.length === 0) return null;

      const user = result.rows[0];
      return {
        id: user.id,
        email: user.email,
        name: user.name,
      } as AdapterUser;
    },

    async updateUser(user) {
      await db.execute({
        sql: "UPDATE users SET name = ?, email = ? WHERE id = ?",
        args: [user.name || null, user.email || null, user.id],
      });
      const result = await db.execute({
        sql: "SELECT * FROM users WHERE id = ?",
        args: [user.id],
      });
      if (result.rows.length === 0) return null;

      const updatedUser = result.rows[0];
      return {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
      } as AdapterUser;
    },

    async deleteUser(id) {
      await db.execute("DELETE FROM users WHERE id = ?", [id]);
      return null;
    },

    async getSessionAndUser(sessionToken) {
      const result = await db.execute({
        sql: `SELECT sessions.*, users.* 
         FROM sessions 
         JOIN users ON sessions.userId = users.id 
         WHERE sessions.sessionToken = ?`,
        args: [sessionToken],
      });
      if (result.rows.length === 0) return null;

      const session = {
        sessionToken: result.rows[0].sessionToken,
        userId: result.rows[0].userId,
        expires: new Date(result.rows[0].expires),
      } as AdapterSession;

      const user = {
        id: result.rows[0].id,
        email: result.rows[0].email,
        name: result.rows[0].name,
      } as AdapterUser;

      return { session, user };
    },

    async createSession(session) {
      await db.execute({
        sql: "INSERT INTO sessions (sessionToken, userId, expires) VALUES (?, ?, ?)",
        args: [
          session.sessionToken,
          session.userId,
          session.expires.toISOString(),
        ],
      });
      return session as AdapterSession;
    },

    async updateSession(session) {
      await db.execute({
        sql: "UPDATE sessions SET expires = ? WHERE sessionToken = ?",
        args: [session.expires.toISOString(), session.sessionToken],
      });
      return session as AdapterSession;
    },

    async deleteSession(sessionToken) {
      await db.execute({
        sql: "DELETE FROM sessions WHERE sessionToken = ?",
        args: [sessionToken],
      });
      return null;
    },
  };
}
