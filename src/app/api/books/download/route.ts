import { NextResponse } from "next/server";
import { getDownloadedBooks } from "../books";

export async function GET() {
  try {
    const books = await getDownloadedBooks();

    return NextResponse.json(books);
  } catch (error) {
    console.error("Error in downloads API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
