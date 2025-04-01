"use server";

import { db } from "@/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

// Define a type for the user update data
export type UserUpdateData = {
  email?: string;
  password?: string;
  name?: string;
};

async function getCurrentUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }
  return session.user.id;
}

export async function updateUser(userData: UserUpdateData) {
  try {
    // Get the current user ID
    const userId = await getCurrentUserId();

    // Check if the user exists
    const existingUser = await db.execute({
      sql: "SELECT * FROM users WHERE id = ?",
      args: [userId],
    });

    if (existingUser.rows.length === 0) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // Check if email is already in use by another user
    if (userData.email && userData.email !== existingUser.rows[0].email) {
      const emailCheck = await db.execute({
        sql: "SELECT * FROM users WHERE email = ? AND id != ?",
        args: [userData.email, userId],
      });

      if (emailCheck.rows.length > 0) {
        return {
          success: false,
          message: "Email already in use by another account",
        };
      }
    }

    // Build the update query dynamically based on provided fields
    const updateFields = [];
    const queryArgs = [];

    if (userData.email) {
      updateFields.push("email = ?");
      queryArgs.push(userData.email);
    }

    if (userData.name) {
      updateFields.push("name = ?");
      queryArgs.push(userData.name);
    }

    if (userData.password) {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      updateFields.push("password = ?");
      queryArgs.push(hashedPassword);
    }

    // If no fields to update, get current user data and return
    if (updateFields.length === 0) {
      const userData = await db.execute({
        sql: "SELECT id, email, name FROM users WHERE id = ?",
        args: [userId],
      });

      return {
        success: true,
        user: userData.rows[0],
      };
    }

    // Add the user ID to the query args
    queryArgs.push(userId);

    // Update the user record
    await db.execute({
      sql: `
        UPDATE users 
        SET ${updateFields.join(", ")}
        WHERE id = ?
      `,
      args: queryArgs,
    });

    // Get updated user data to return
    const updatedUser = await db.execute({
      sql: "SELECT id, email, name FROM users WHERE id = ?",
      args: [userId],
    });

    // Revalidate all pages to ensure they show updated data
    revalidatePath("/");

    return {
      success: true,
      user: updatedUser.rows[0],
    };
  } catch (error) {
    console.error("Error updating user", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
