"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data - in a real app, this would come from your API
const searchedBooks = [
  {
    id: "1",
    title: "1984",
    author: "George Orwell",
    searchCount: 245,
    source: "Project Gutenberg",
  },
  {
    id: "2",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    searchCount: 189,
    source: "Open Library",
  },
  {
    id: "3",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    searchCount: 156,
    source: "Internet Archive",
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    searchCount: 132,
    source: "Project Gutenberg",
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    searchCount: 98,
    source: "Open Library",
  },
  {
    id: "6",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    searchCount: 87,
    source: "Internet Archive",
  },
  {
    id: "7",
    title: "Animal Farm",
    author: "George Orwell",
    searchCount: 76,
    source: "Project Gutenberg",
  },
  {
    id: "8",
    title: "Lord of the Flies",
    author: "William Golding",
    searchCount: 65,
    source: "Open Library",
  },
  {
    id: "9",
    title: "The Alchemist",
    author: "Paulo Coelho",
    searchCount: 54,
    source: "Internet Archive",
  },
  {
    id: "10",
    title: "Brave New World",
    author: "Aldous Huxley",
    searchCount: 43,
    source: "Project Gutenberg",
  },
];

export default function BookSearchTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Book</TableHead>
            <TableHead>Source</TableHead>
            <TableHead className="text-right">Search Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {searchedBooks.map((book, index) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{book.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {book.author}
                  </div>
                </div>
              </TableCell>
              <TableCell>{book.source}</TableCell>
              <TableCell className="text-right">{book.searchCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
