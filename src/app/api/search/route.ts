import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

// Define interface for book data
export interface Book {
  title: string;
  author: string;
  bookId: string;
  bookUrl: string;
  downloadUrl: string;
  coverUrl?: string;
  source?: string;
  fileFormat?: string;
}

export interface OpenLibraryDoc {
  key: string;
  title?: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  language?: string[];
  ebook_access?: string;
  ia?: string[];
}

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const sources = searchParams.get("sources") || "all";

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    let books: Book[] = [];
    const sourcesToSearch =
      sources === "all"
        ? ["gutenberg", "openlibrary", "archive"]
        : sources.split(",");

    const searchPromises = sourcesToSearch.map(async (source) => {
      switch (source) {
        case "gutenberg":
          return searchGutenberg(query);
        case "openlibrary":
          return searchOpenLibrary(query);
        case "archive":
          return searchInternetArchive(query);
        default:
          return Promise.resolve([]);
      }
    });

    const results = await Promise.all(searchPromises);
    books = results.flat();

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

// Search Project Gutenberg for books
async function searchGutenberg(query: string): Promise<Book[]> {
  try {
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
        source: "Project Gutenberg",
        coverUrl: `https://www.gutenberg.org/cache/epub/${bookId}/pg${bookId}.cover.medium.jpg`,
      });
    });
    return books;
  } catch (error) {
    console.error("Search Gutenberg error:", error);
    return [];
  }
}

//Search Open Library for books
async function searchOpenLibrary(query: string): Promise<Book[]> {
  try {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
      query
    )}&limit=10`;
    const { data } = await axios.get(url);
    const books: Book[] = [];

    if (data.docs && Array.isArray(data.docs)) {
      data.docs.slice(0, 10).forEach((book: OpenLibraryDoc) => {
        if (!book.key) return;

        const bookId = book.key.replace("/works/", "");
        const coverID = book.cover_i;

        books.push({
          title: book.title || "Unknown Title",
          author: book.author_name ? book.author_name[0] : "Unknown Author",
          bookId,
          bookUrl: `https://openlibrary.org${book.key}`,
          downloadUrl: `https://openlibrary.org${book.key}`,
          source: "Open Library",
          coverUrl: coverID
            ? `https://covers.openlibrary.org/b/id/${coverID}-M.jpg`
            : undefined,
        });
      });
    }
    return books;
  } catch (error) {
    console.error("Search Open Library error:", error);
    return [];
  }
}

// Search Internet Archive using their official API
async function searchInternetArchive(query: string): Promise<Book[]> {
  try {
    // Using Internet Archive's Advanced Search API
    // Documentation: https://archive.org/advancedsearch.php
    const searchUrl = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(
      `title:(${query}) AND mediatype:(texts)`
    )}&fl[]=identifier,title,creator,date,description,subject,mediatype,collection&rows=10&output=json`;

    const { data } = await axios.get(searchUrl);
    const books: Book[] = [];

    if (
      data &&
      data.response &&
      data.response.docs &&
      Array.isArray(data.response.docs)
    ) {
      for (const item of data.response.docs) {
        if (!item.identifier) continue;

        // Get metadata for this specific item to get download links
        const metadataUrl = `https://archive.org/metadata/${item.identifier}`;
        const metadataResponse = await axios.get(metadataUrl);
        const metadata = metadataResponse.data;

        // Find a suitable download format (prefer PDF, EPUB, or any available format)
        let downloadUrl = `https://archive.org/details/${item.identifier}`;
        let fileFormat = "";

        if (metadata && metadata.files && Array.isArray(metadata.files)) {
          // Look for PDF or EPUB files
          const pdfFile = metadata.files.find(
            (file: { name: string }) =>
              file.name.endsWith(".pdf") && !file.name.includes("_text")
          );

          const epubFile = metadata.files.find((file: { name: string }) =>
            file.name.endsWith(".epub")
          );

          if (pdfFile) {
            downloadUrl = `https://archive.org/download/${item.identifier}/${pdfFile.name}`;
            fileFormat = "PDF";
          } else if (epubFile) {
            downloadUrl = `https://archive.org/download/${item.identifier}/${epubFile.name}`;
            fileFormat = "EPUB";
          }
        }

        books.push({
          title: item.title || "Unknown Title",
          author: item.creator
            ? Array.isArray(item.creator)
              ? item.creator[0]
              : item.creator
            : "Unknown Author",
          bookId: item.identifier,
          bookUrl: `https://archive.org/details/${item.identifier}`,
          downloadUrl,
          source: "Internet Archive",
          coverUrl: `https://archive.org/services/img/${item.identifier}`,
          fileFormat,
        });
      }
    }

    return books;
  } catch (error) {
    console.error("Internet Archive search error:", error);
    // Return a fallback if the API call fails
    return [
      {
        title: "Search directly on Internet Archive",
        author: "For more results, visit Internet Archive",
        bookId: "archive-direct",
        bookUrl: `https://archive.org/search?query=${encodeURIComponent(
          query
        )}`,
        downloadUrl: `https://archive.org/search?query=${encodeURIComponent(
          query
        )}`,
        source: "Internet Archive",
        coverUrl: "https://archive.org/images/notfound.png",
      },
    ];
  }
}
