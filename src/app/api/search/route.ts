import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

// Define type for book data
interface Book {
  title: string;
  author: string;
  coverImage: string;
  bookUrl: string;
  bookId: string;
}

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    if (!query)
      return NextResponse.json({ error: "Query is required" }, { status: 400 });

    const url = `https://www.gutenberg.org/ebooks/search/?query=${encodeURIComponent(
      query
    )}`;
    const { data: html } = await axios.get<string>(url);
    const $ = cheerio.load(html);
    const books: Book[] = [];

    $(".booklink").each((index, element) => {
      const title = $(element).find(".title").text().trim();
      const author = $(element).find(".subtitle").text().trim();
      const bookId = $(element).attr("href")?.match(/\d+/)?.[0] || "";
      const coverImage = `https://www.gutenberg.org/cache/epub/${bookId}/pg${bookId}.cover.medium.jpg`;
      const bookUrl = `https://www.gutenberg.org/ebooks/${bookId}`;

      books.push({ title, author, coverImage, bookUrl, bookId });
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
