"use server";

import { db } from "@/db";
import type { Book } from "@/types/next-auth";

//function to save a book to the database
export async function saveBook(book: Book) {
  try {
    //Check if the book already exists
    const existingBook = await db.execute({
      sql: "SELECT bookId FROM books WHERE bookId = ?",
      args: [book.bookId],
    });

    if (existingBook.rows.length > 0) {
      // Update existing book
      await db.execute({
        sql: `
            UPDATE books 
            SET title = ?, author = ?, bookUrl = ?, downloadUrl = ?, created_at = CURRENT_TIMESTAMP
            WHERE bookId = ?
          `,
        args: [
          book.title,
          book.author,
          book.bookUrl,
          book.downloadUrl,
          book.bookId,
        ],
      });
    } else {
      // Insert new book
      await db.execute({
        sql: `
            INSERT INTO books (bookId, title, author, bookUrl, downloadUrl)
            VALUES (?, ?, ?, ?, ?)
          `,
        args: [
          book.bookId,
          book.title,
          book.author,
          book.bookUrl,
          book.downloadUrl,
        ],
      });
    }
    return { success: true };
  } catch (error) {
    console.error("Error saving book", error);
    return { success: false, error };
  }
}

// Function to get downloaded books
export async function getDownloadedBooks() {
  try {
    const result = await db.execute({
      sql: `
        SELECT bookId, title, downloadUrl 
        FROM books
        ORDER BY created_at DESC
      `,
      args: [],
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

// Function to get search history
export async function getSearchHistory() {
  try {
    const result = await db.execute({
      sql: `
        SELECT DISTINCT title, created_at
        FROM books
        ORDER BY created_at DESC
      `,
      args: [],
    });

    return result.rows.map((row) => ({
      title: row.title,
      created_at: row.created_at,
    }));
  } catch (error) {
    console.error("Error fetching search history:", error);
    return [];
  }
}
