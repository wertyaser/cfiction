"use client";
import { useState } from "react";
// import { useRouter } from "next/navigation";

// Define Book interface
interface Book {
  title: string;
  author: string;
  bookId: string;
  downloadUrl: string;
}

export default function BookSearch() {
  const [query, setQuery] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const router = useRouter();

  const searchBooks = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = (await res.json()) as Book[];
      setBooks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Search error:", error);
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookClick = (book: Book): void => {
    console.log("Clicked Book:", book); // Log the full book object
    console.log(`Downloading: ${book.title}, ID: ${book.bookId}`);

    if (!book.bookId) {
      console.error("Error: bookId is missing!");
      return;
    }

    window.open(book.downloadUrl, "_blank");
  };

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Search for books..."
        className="border p-2 w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && searchBooks()}
      />
      <button
        onClick={searchBooks}
        className="bg-blue-500 text-white p-2 mt-2"
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {books.map((book) => (
          <div
            key={book.bookId || book.title}
            className="border p-2 cursor-pointer"
            onClick={() => handleBookClick(book)}
          >
            <h3 className="text-lg font-bold">{book.title}</h3>
            <p className="text-sm">{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
