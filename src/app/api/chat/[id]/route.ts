// /app/api/chat/[id]/route.ts
import { db } from "@/db";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name } = await request.json();
    const chatId = params.id;

    // Update chat name
    await db.execute({
      sql: "UPDATE chats SET name = ? WHERE id = ?",
      args: [name, chatId],
    });

    return NextResponse.json({
      success: true,
      message: "Chat updated successfully",
    });
  } catch (error) {
    console.error("Error updating chat:", error);
    return NextResponse.json(
      {
        error: `Failed to update chat: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
