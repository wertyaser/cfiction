import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

// Define interface for book data
interface Book {
  title: string;
  author: string;
  bookId: string;
  bookUrl: string;
  downloadUrl: string;
}

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const url = `https://www.gutenberg.org/ebooks/search/?query=${encodeURIComponent(
      query
    )}`;

    const { data: html } = await axios.get<string>(url);
    const $ = cheerio.load(html);
    const books: Book[] = [];

    $(".booklink").each((index: number, element) => {
      if (index >= 10) return false; // Limit results to 10 books

      const title: string = $(element).find(".title").text().trim();
      const author: string = $(element).find(".subtitle").text().trim();
      const bookHref = $(element).find("a").attr("href"); // Find actual <a> tag

      if (!bookHref) {
        console.error("Missing book link for:", title);
        return; // Skip entry if href is missing
      }

      // Extract only the numeric book ID
      const bookIdMatch = bookHref.match(/\/ebooks\/(\d+)/);
      const bookId = bookIdMatch ? bookIdMatch[1] : "";

      if (!bookId) {
        console.error("Failed to extract bookId for:", title);
        return; // Skip this book if ID is missing
      }

      books.push({
        title,
        author,
        bookId,
        bookUrl: `https://www.gutenberg.org/ebooks/${bookId}`,
        downloadUrl: `https://www.gutenberg.org/ebooks/${bookId}.epub.images`,
      });
    });

    return NextResponse.json(books);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
