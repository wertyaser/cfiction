import { NextResponse } from "next/server";
import { db } from "@/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { token, newPassword, confirmPassword } = await request.json();

    if (!token || !newPassword || !confirmPassword) {
      return NextResponse.json({ error: "Token and passwords are required" }, { status: 400 });
    }
    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Verify token
    const tokenResult = await db.execute({
      sql: "SELECT user_id FROM password_reset_tokens WHERE token = ? AND expires_at > ?",
      args: [token, new Date().toISOString()],
    });
    if (tokenResult.rows.length === 0) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }
    const userId = tokenResult.rows[0].user_id as string;

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.execute({
      sql: "UPDATE users SET password = ? WHERE id = ?",
      args: [hashedPassword, userId],
    });

    // Delete used token
    await db.execute({
      sql: "DELETE FROM password_reset_tokens WHERE token = ?",
      args: [token],
    });

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in reset-password:", error);
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 });
  }
}
