import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/db";

// type UpdateData = {
//   email?: string;
//   password?: string;
//   name?: string;
// };

export async function PATCH(req: Request) {
  try {
    const { email, name, newEmail, newPassword, confirmPassword } =
      await req.json();

    // Validate required fields
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!name && !newEmail && !newPassword) {
      return NextResponse.json(
        {
          error:
            "At least one field (name, email, or password) must be provided to update",
        },
        { status: 400 }
      );
    }

    // Check if user exists
    const result = await db.execute({
      sql: "SELECT * FROM users WHERE email = ?",
      args: [email],
    });
    const user = result.rows[0];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Validate password if provided
    if (newPassword) {
      if (!confirmPassword || newPassword !== confirmPassword) {
        return NextResponse.json(
          { error: "New password and confirmation do not match" },
          { status: 400 }
        );
      }
    }

    // Prepare update fields
    const updatedFields: string[] = [];
    const args: string[] = [];

    if (name) {
      updatedFields.push("name = ?");
      args.push(name);
    }
    if (newEmail) {
      updatedFields.push("email = ?");
      args.push(newEmail);
    }
    if (newPassword) {
      const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
      updatedFields.push("password = ?");
      args.push(hashedNewPassword);
    }

    // Only proceed with update if there are fields to update
    if (updatedFields.length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided for update" },
        { status: 400 }
      );
    }

    args.push(email);

    await db.execute({
      sql: `UPDATE users SET ${updatedFields.join(", ")} WHERE email = ?`,
      args: args.filter((arg) => arg !== undefined),
    });

    return NextResponse.json(
      { message: "User information updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
