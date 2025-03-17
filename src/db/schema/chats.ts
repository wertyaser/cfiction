// id
// name
// created at

import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const chats = sqliteTable("chats", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});
