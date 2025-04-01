import { NextResponse } from "next/server";
import { updateUser } from "@/app/api/user/update-user";
import { z } from "zod";

// Create a schema for user update validation
const userUpdateSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  name: z.string().min(1).optional(),
});

export async function POST(req: Request) {
  try {
    const userData = await req.json();

    // Validate the input data
    const result = userUpdateSchema.safeParse(userData);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid user data", details: result.error.format() },
        { status: 400 }
      );
    }

    // At least one field should be provided for update
    if (!userData.email && !userData.password && !userData.name) {
      return NextResponse.json(
        { error: "At least one field must be provided for update" },
        { status: 400 }
      );
    }

    const updateResult = await updateUser(userData);

    if (updateResult.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: updateResult.message || "Failed to update user" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in update user API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
