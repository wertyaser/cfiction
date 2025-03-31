import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/db";

export async function GET() {
  try {
    // Check if users table has isAdmin column
    try {
      await db.execute(`
        SELECT isAdmin FROM users LIMIT 1
      `);
    } catch (error) {
      // If error occurs, it means the column doesn't exist
      console.error(error, "isAdmin column doesn't exist, adding it now...");
      // If column doesn't exist, add it
      await db.execute(`
        ALTER TABLE users ADD COLUMN isAdmin INTEGER DEFAULT 0
      `);
    }

    // Check if admin user exists
    const adminExists = await db.execute({
      sql: "SELECT * FROM users WHERE email = ?",
      args: ["admin@rtu.edu.ph"],
    });

    // If admin doesn't exist, create it
    if (adminExists.rows.length === 0) {
      const userId = crypto.randomUUID();
      const hashedPassword = bcrypt.hashSync("admin", 10);

      await db.execute({
        sql: "INSERT INTO users (id, name, email, password, isAdmin) VALUES (?, ?, ?, ?, ?)",
        args: [userId, "Admin User", "admin@rtu.edu.ph", hashedPassword, 1],
      });
    } else {
      // If admin exists but isAdmin flag is not set, update it
      const admin = adminExists.rows[0];
      if (!admin.isAdmin) {
        await db.execute({
          sql: "UPDATE users SET isAdmin = ? WHERE id = ?",
          args: [1, admin.id],
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Admin setup completed successfully",
    });
  } catch (error) {
    console.error("Error setting up admin:", error);
    return NextResponse.json(
      { error: "Failed to set up admin", details: error },
      { status: 500 }
    );
  }
}
