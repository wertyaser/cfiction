import { createClient } from "@libsql/client";

export const db = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

// export interface Chat {
//   id: string;
//   name: string;
//   user_id: string;
//   created_at: string;
// }

// export interface Message {
//   id: string;
//   chat_id: string;
//   role: "user" | "assistant";
//   content: string;
//   created_at: string;
// }

// interface DbRow {
//   id?: string;
//   name?: string;
//   user_id?: string;
//   chat_id?: string;
//   role?: string;
//   content?: string;
//   created_at?: string;
// }

// export function mapRowToChat(row: DbRow): Chat | null {
//   if (!row?.id || !row?.name || !row?.user_id || !row?.created_at) {
//     return null;
//   }

//   return {
//     id: row.id,
//     name: row.name,
//     user_id: row.user_id,
//     created_at: row.created_at,
//   };
// }

// export function mapRowToMessage(row: DbRow): Message | null {
//   if (
//     !row?.id ||
//     !row?.chat_id ||
//     !row?.role ||
//     !row?.content ||
//     !row?.created_at
//   ) {
//     return null;
//   }

//   return {
//     id: row.id,
//     chat_id: row.chat_id,
//     role: row.role as "user" | "assistant",
//     content: row.content,
//     created_at: row.created_at,
//   };
// }
