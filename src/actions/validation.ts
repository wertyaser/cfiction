"use server";

import { RegisterFormSchema } from "@/lib/rules";
import { db } from "@/db";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

export async function register(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;
    const confirmPassword = formData.get("confirmPassword") as string | null;

    // Ensure all fields are provided
    if (!email || !password || !confirmPassword) {
      return { errors: { form: ["All fields are required."] } };
    }

    // Validate input using Zod schema
    const validatedFields = RegisterFormSchema.safeParse({
      email,
      password,
      confirmPassword,
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    // Check if user already exists
    const existingUser = await db.execute({
      sql: "SELECT id FROM users WHERE email = ? LIMIT 1",
      args: [email],
    });

    if (existingUser.rows.length > 0) {
      return { errors: { email: ["Email is already registered."] } };
    }

    // Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    await db.execute({
      sql: "INSERT INTO users (id, email, password, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)",
      args: [randomUUID(), email, hashedPassword],
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { errors: { form: ["An unexpected error occurred."] } };
  }
}
