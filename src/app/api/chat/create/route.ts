// /app/api/chat/create/route.ts
import { db } from "@/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name = "New Chat", user_id = "1" } = await request.json();

    // Insert new chat with user_id
    const result = await db.execute({
      sql: "INSERT INTO chats (name, user_id, created_at) VALUES (?, ?, ?) RETURNING id, name, created_at",
      args: [name, user_id, new Date().toISOString()],
    });

    return NextResponse.json({
      success: true,
      chat: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating chat:", error);
    return NextResponse.json(
      {
        error: `Failed to create chat: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
