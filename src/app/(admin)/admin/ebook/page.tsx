"use client";
import { useState } from "react";
import { Book } from "@/types/next-auth";
import { Search, FileText, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { saveSearchQuery } from "@/app/api/books/books";
// import { useRouter } from "next/navigation";

export default function BookSearch() {
  const [query, setQuery] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedSources, setSelectedSources] = useState<string[]>([
    "gutenberg",
    "openlibrary",
    "archive",
  ]);
  //   const router = useRouter();

  const searchBooks = async (): Promise<void> => {
    if (!query.trim()) return;

    try {
      setIsLoading(true);
      const sourcesParam = selectedSources.join(",");

      // Save the search query to history
      await saveSearchQuery(query);

      const res = await fetch(
        `/api/search?query=${encodeURIComponent(query)}&sources=${sourcesParam}`
      );
      const data = await res.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Search error:", error);
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookClick = async (book: Book): Promise<void> => {
    try {
      //save the book to the database
      const response = await fetch("/api/books/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      if (response.ok) {
        toast({
          title: "Book saved",
          description: `"${book.title}" has been saved to your downloads.`,
        });
      } else {
        console.error("Failed to save book");
      }

      // Open the download URL in a new tab
      window.open(book.downloadUrl, "_blank");
    } catch (error) {
      console.error("Error saving book", error);
      toast({
        title: "Error",
        description: "Failed to save the book. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSourceToggle = (source: string) => {
    setSelectedSources((prev) =>
      prev.includes(source) ? prev.filter((s) => s !== source) : [...prev, source]
    );
  };

  function getSourceVariant(
    source: string | undefined
  ): "default" | "outline" | "secondary" | "destructive" {
    switch (source) {
      case "Project Gutenberg":
        return "default";
      case "Open Library":
        return "outline";
      case "Internet Archive":
        return "destructive";
      default:
        return "default";
    }
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Ctrl+Fiction: Multi-Source EBook Search</h1>
      <div className="space-y-4 mb-8">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="gutenberg"
              checked={selectedSources.includes("gutenberg")}
              onCheckedChange={() => handleSourceToggle("gutenberg")}
            />
            <Badge variant={"default"}>
              <Label htmlFor="gutenberg">Project Gutenberg</Label>
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="openlibrary"
              checked={selectedSources.includes("openlibrary")}
              onCheckedChange={() => handleSourceToggle("openlibrary")}
            />
            <Badge variant={"outline"}>
              <Label htmlFor="openlibrary">Open Library</Label>
            </Badge>
          </div>

          {/* For Internet archive */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="archive"
              checked={selectedSources.includes("archive")}
              onCheckedChange={() => handleSourceToggle("archive")}
            />
            <Badge variant={"destructive"}>
              <Label htmlFor="archive">Internet Archive</Label>
            </Badge>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for ebooks..."
              className="pl-8"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchBooks()}
            />
          </div>
          <Button onClick={searchBooks} disabled={isLoading || !query.trim()}>
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="flex h-full">
                <div className="w-1/3 p-3">
                  <Skeleton className="h-40 w-full" />
                </div>
                <div className="w-2/3 p-4 space-y-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book, index) => (
            <Card
              key={`${book.source || "unknown"}-${book.bookId || index}`}
              className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleBookClick(book)}>
              <CardContent className="p-0">
                <div className="flex h-full">
                  <div className="w-1/3 bg-muted flex items-center justify-center p-3">
                    {book.coverUrl ? (
                      <Image
                        width={200}
                        height={300}
                        src={book.coverUrl || "/placeholder.svg"}
                        alt={`Cover for ${book.title}`}
                        className="max-h-40 object-contain"
                      />
                    ) : (
                      <div className="w-full h-40 bg-muted-foreground/10 flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">No Cover</span>
                      </div>
                    )}
                  </div>
                  <div className="w-2/3 p-4">
                    <Badge variant={getSourceVariant(book.source)} className="mb-2">
                      {book.source || "Unknown Source"}
                    </Badge>
                    <h3 className="text-lg font-bold line-clamp-2 mb-1">{book.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                    {book.fileFormat && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <FileText className="h-3 w-3 mr-1" />
                              {book.fileFormat}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Available in {book.fileFormat} format</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 py-2 px-4 text-xs text-primary flex justify-between items-center">
                <span>Click to download</span>
                <Download className="h-3 w-3" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        query && (
          <p className="text-center py-8 text-muted-foreground">
            No books found. Try a different search term.
          </p>
        )
      )}
    </div>
  );
}
