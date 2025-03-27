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
