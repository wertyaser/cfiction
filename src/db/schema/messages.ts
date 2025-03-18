// id
// chat id
// role 'user' | 'assistant'
// content
// created at

// import { chats } from "./chats";
// export const messages = sqliteTable("messages", {
//   id: integer("id").primaryKey().notNull(),
//   chatId: text("chat_id")
//     .notNull()
//     .references(() => chats.id),
//   role: text("role", { enum: ["user", "assistant"] }).notNull(),
//   content: text("content").notNull(),
//   createdAt: text("created_at")
//     .default(sql`(CURRENT_TIMESTAMP)`)
//     .notNull(),
// });
