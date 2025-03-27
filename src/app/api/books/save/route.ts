import { NextResponse } from "next/server";
import { saveBook } from "@/app/api/books/books";
import type { Book } from "@/types/next-auth";

export async function POST(req: Request) {
  try {
    const book: Book = await req.json();

    if (!book.bookId || !book.title || !book.bookUrl || !book.downloadUrl) {
      return NextResponse.json(
        { error: "Missing required book information" },
        { status: 400 }
      );
    }

    const result = await saveBook(book);

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Failed to save book" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in save book API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
