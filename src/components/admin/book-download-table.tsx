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
const downloadedBooks = [
  {
    id: "1",
    title: "1984",
    author: "George Orwell",
    downloadCount: 187,
    source: "Project Gutenberg",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    downloadCount: 143,
    source: "Internet Archive",
  },
  {
    id: "3",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    downloadCount: 121,
    source: "Open Library",
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    downloadCount: 98,
    source: "Project Gutenberg",
  },
  {
    id: "5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    downloadCount: 76,
    source: "Internet Archive",
  },
  {
    id: "6",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    downloadCount: 65,
    source: "Open Library",
  },
  {
    id: "7",
    title: "Animal Farm",
    author: "George Orwell",
    downloadCount: 54,
    source: "Project Gutenberg",
  },
  {
    id: "8",
    title: "Lord of the Flies",
    author: "William Golding",
    downloadCount: 43,
    source: "Open Library",
  },
  {
    id: "9",
    title: "Brave New World",
    author: "Aldous Huxley",
    downloadCount: 32,
    source: "Project Gutenberg",
  },
  {
    id: "10",
    title: "The Alchemist",
    author: "Paulo Coelho",
    downloadCount: 21,
    source: "Internet Archive",
  },
];

export default function BookDownloadTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Book</TableHead>
            <TableHead>Source</TableHead>
            <TableHead className="text-right">Download Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {downloadedBooks.map((book, index) => (
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
              <TableCell className="text-right">{book.downloadCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
