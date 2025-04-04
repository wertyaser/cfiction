// app/api/users/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";

interface User {
  id: string;
  name: string;
  email: string;
  registeredAt: string;
  adminStatus: "admin" | "user";
}

export async function GET() {
  try {
    const result = await db.execute({
      sql: `
        SELECT 
          id,
          name,
          email,
          created_at AS registeredAt,
          isAdmin
        FROM users
        ORDER BY created_at DESC
      `,
      args: [],
    });

    const users: User[] = result.rows.map((row) => ({
      id: String(row.id),
      name: row.name as string,
      email: row.email as string,
      registeredAt: row.registeredAt as string,
      adminStatus: row.isAdmin ? "admin" : "user",
    }));

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
