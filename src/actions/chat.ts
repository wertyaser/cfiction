// app/actions/chat.ts
import { db } from "@/db";

export async function createChat(name: string) {
  const result = await db.execute({
    sql: "INSERT INTO chats (name, created_at) VALUES (?, ?)",
    args: [name, new Date().toISOString()],
  });
  return result;
}

export async function addMessage(
  chatId: string,
  role: "user" | "llama",
  content: string
) {
  const result = await db.execute({
    sql: "INSERT INTO messages (chat_id, role, content, created_at) VALUES (?, ?, ?, ?)",
    args: [chatId, role, content, new Date().toISOString()],
  });
  return result;
}

export async function getChatMessages(chatId: string) {
  const result = await db.execute({
    sql: "SELECT * FROM messages WHERE chat_id = ? ORDER BY created_at ASC",
    args: [chatId],
  });
  return result.rows;
}
