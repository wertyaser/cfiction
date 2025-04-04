"use server";

import { db } from "@/db";
// import type { Book } from "@/types/next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
// import { randomUUID } from "crypto";

async function getCurrentUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }
  return session.user.id;
}

interface Book {
  bookId: string;
  title: string;
  author: string;
  bookUrl: string;
  downloadUrl: string;
}
//function to save a book to the database
export async function saveBook(book: Book) {
  try {
    // Get the current user ID
    const userId = await getCurrentUserId();

    // Always insert a new book (allowing duplicates)
    await db.execute({
      sql: `
        INSERT INTO books (bookId, title, author, bookUrl, downloadUrl, userId, created_at)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `,
      args: [book.bookId, book.title, book.author, book.bookUrl, book.downloadUrl, userId],
    });

    return { success: true };
  } catch (error) {
    console.error("Error saving book:", error);
    return { success: false, error };
  }
}

// Function to get downloaded books
export async function getDownloadedBooks() {
  try {
    // Get the current user ID
    const userId = await getCurrentUserId();

    const result = await db.execute({
      sql: `
        SELECT bookId, title, downloadUrl 
        FROM books
        WHERE userId = ? 
        ORDER BY created_at DESC
      `,
      args: [userId],
    });

    return result.rows.map((row) => ({
      bookid: row.bookId,
      title: row.title,
      downloadurl: row.downloadUrl,
    }));
  } catch (error) {
    console.error("Error fetching downloaded books:", error);
    return [];
  }
}

// Function to save search query to history
export async function saveSearchQuery(query: string) {
  try {
    // Get current user ID
    const userId = await getCurrentUserId();

    // Generate a unique ID for the search history entry

    // Insert search query into the search_history table
    await db.execute({
      sql: `INSERT INTO search_history 
            (userId, query, created_at) 
            VALUES (?, ?, CURRENT_TIMESTAMP)`,
      args: [userId, query],
    });

    return { success: true };
  } catch (error) {
    console.error("Error saving search query", error);
    return { success: false, error };
  }
}

// Function to get search history
export async function getSearchHistory() {
  try {
    // Get the current user ID
    const userId = await getCurrentUserId();

    const result = await db.execute({
      sql: `
        SELECT DISTINCT id, query, created_at
        FROM search_history
        WHERE userId = ?
        ORDER BY created_at DESC
      `,
      args: [userId],
    });

    return result.rows.map((row) => ({
      id: row.id,
      query: row.query,
      created_at: row.created_at,
    }));
  } catch (error) {
    console.error("Error fetching search history:", error);
    return [];
  }
}
