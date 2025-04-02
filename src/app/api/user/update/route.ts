import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    // Get the current session to verify the user
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { name, email, password } = await req.json();

    // Start building the SQL query and arguments
    let sql = "UPDATE users SET";
    const args: (string | number)[] = [];
    const updates: string[] = [];

    // Add name update if provided
    if (name) {
      updates.push(" name = ?");
      args.push(name);
    }

    // Add email update if provided
    if (email) {
      // Check if email is already in use by another user
      const emailCheck = await db.execute({
        sql: "SELECT id FROM users WHERE email = ? AND id != ?",
        args: [email, userId],
      });

      if (emailCheck.rows.length > 0) {
        return NextResponse.json(
          { success: false, message: "Email already in use" },
          { status: 400 }
        );
      }

      updates.push(" email = ?");
      args.push(email);
    }

    // Add password update if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push(" password = ?");
      args.push(hashedPassword);
    }

    // If no updates, return early
    if (updates.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No updates provided",
      });
    }

    // Complete the SQL query
    sql += updates.join(",") + " WHERE id = ?";
    args.push(userId);

    // Execute the update
    await db.execute({
      sql,
      args,
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update profile" },
      { status: 500 }
    );
  }
}
