import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const result = await db.execute({
      sql: "SELECT * FROM users WHERE email = ?",
      args: [email],
    });
    const existingUser = result.rows[0]; // Assuming `rows` contains the query results

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    // Hash password and create user
    const hashedPassword = bcrypt.hashSync(password, 10);
    await db.execute({
      sql: "INSERT INTO users (id, email, password) VALUES (?, ?, ?)",
      args: [crypto.randomUUID(), email, hashedPassword],
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
