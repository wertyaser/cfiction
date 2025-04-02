"use server";

import { RegisterFormSchema } from "@/lib/rules";
import { db } from "@/db";
import bcrypt from "bcryptjs";
// import { z } from "zod";
// import { randomUUID } from "crypto";

export interface RegisterState {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    form?: string[];
  };
  success?: boolean;
}

export interface EmailState {
  errors?: {
    email?: string[];
    form?: string[];
  };
  success?: boolean;
}

export async function register(
  prevState: RegisterState | undefined,
  formData: FormData
): Promise<RegisterState> {
  try {
    const firstName = formData.get("firstName") as string | null;
    const lastName = formData.get("lastName") as string | null;
    const name = firstName + " " + lastName;
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;
    const confirmPassword = formData.get("confirmPassword") as string | null;

    // Ensure all fields are provided
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return { errors: { form: ["All fields are required."] } };
    }

    // Validate input using Zod schema
    const validatedFields = RegisterFormSchema.safeParse({
      firstName,
      lastName,
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
      sql: "INSERT INTO users (email, password, name,  created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)",
      args: [email, hashedPassword, name],
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    if (error instanceof Error) {
      return { errors: { form: [error.message] } };
    }
    return { errors: { form: ["An unexpected error occurred."] } };
  }
}

// const userUpdateSchema = z.object({
//   firstName: z.string().min(2).max(128).optional(),
//   email: z.string().email().min(8).max(128).optional(),
// });

// export async function updateUser(userId: string, data: object) {
//   // Type assertion for Turso client

//   try {
//     // Validate the input data using zod
//     const validationResult = userUpdateSchema.safeParse(data);
//     if (!validationResult.success) {
//       return {
//         success: false,
//         message: validationResult.error.errors[0].message,
//       };
//     }

//     // Check if the user exists
//     const existingUser = await db.execute({
//       sql: "SELECT * FROM users WHERE id = ?",
//       args: [userId],
//     });

//     if (existingUser.rows.length === 0) {
//       return { success: false, message: "User not found" };
//     }

//     // Prepare update query
//     const updates = Object.entries(data)
//       .filter(([_, value]) => value !== undefined)
//       .map(([key]) => `${key} = ?`)
//       .join(", ");

//     if (!updates) {
//       return { success: false, message: "No fields to update" };
//     }

//     const values = Object.values(data).filter((value) => value !== undefined);

//     // Update the user in the database
//     await db.execute({
//       sql: `UPDATE users SET ${updates} WHERE id = ?`,
//       args: [...values, userId],
//     });

//     return { success: true, message: "User updated successfully" };
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return { success: false, message: "Server error, please try again later" };
//   }
// }

export async function forgotPassword(
  prevState: EmailState | undefined,
  formData: FormData
): Promise<EmailState> {
  try {
    const email = formData.get("email") as string | null;

    // Ensure email is provided
    if (!email) {
      return { errors: { form: ["Email is required."] } };
    }

    // Validate input using Zod schema
    const validatedFields = RegisterFormSchema.safeParse({
      email,
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    // Check if user exists
    const existingUser = await db.execute({
      sql: "SELECT id FROM users WHERE email = ? LIMIT 1",
      args: [email],
    });

    if (existingUser.rows.length === 0) {
      return { errors: { email: ["Email is not registered."] } };
    }

    return { success: true };
  } catch (error) {
    console.error("Forgot password error:", error);
    if (error instanceof Error) {
      return { errors: { form: [error.message] } };
    }
    return { errors: { form: ["An unexpected error occurred."] } };
  }
}
