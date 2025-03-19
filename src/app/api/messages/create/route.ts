import { NextResponse } from "next/server";
import { db } from "@/db";

export async function POST(request: Request) {
  try {
    const { chat_id, role, content } = await request.json();

    // Insert new message
    const result = await db.execute({
      sql: "INSERT INTO messages (chat_id, role, content, created_at) VALUES (?, ?, ?, ?) RETURNING id",
      args: [chat_id, role, content, new Date().toISOString()],
    });

    return NextResponse.json({ success: true, messageId: result.rows[0].id });
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}
