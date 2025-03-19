import { NextResponse } from "next/server";
import { db } from "@/db";

export async function GET(
  request: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const chatId = params.chatId;

    // Get all messages for the chat
    const result = await db.execute({
      sql: "SELECT * FROM messages WHERE chat_id = ? ORDER BY created_at ASC",
      args: [chatId],
    });

    return NextResponse.json({ messages: result.rows });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
