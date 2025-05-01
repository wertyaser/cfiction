import { getPopularBooks, getPopularAuthors } from "@/lib/admin";
import { BookOpen, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Book {
  title: string;
  author: string;
  downloads: number;
}

interface Author {
  author: string;
  bookCount: number;
  downloads: number;
}

export default async function Trending() {
  const topBooks = await getPopularBooks();
  const allAuthors = await getPopularAuthors();
  const topAuthors = allAuthors.filter((author) => author.author !== "Unknown Author");

  return (
    <div className="min-h-[45vh] mt-10 mb-16 container mx-auto px-4">
      <div className="relative mb-12 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-muted-foreground/20"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-background px-6 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Trending
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Discover the most popular books and authors our students are enjoying right now
            </p>
          </div>
        </div>
      </div>

      {/* Desktop view - side by side */}
      <div className="hidden md:grid md:grid-cols-2 gap-8">
        <TrendingBooks books={topBooks} />
        <TrendingAuthors authors={topAuthors} />
      </div>

      {/* Mobile view - tabs */}
      <div className="md:hidden">
        <Tabs defaultValue="books" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="books" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Popular Books</span>
            </TabsTrigger>
            <TabsTrigger value="authors" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Popular Authors</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="books">
            <TrendingBooks books={topBooks} />
          </TabsContent>
          <TabsContent value="authors">
            <TrendingAuthors authors={topAuthors} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function TrendingBooks({ books }: { books: Book[] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-5 w-5 text-primary" />
        <h3 className="text-2xl font-bold">Popular Books</h3>
      </div>

      {books.length > 0 ? (
        <div className="bg-gradient-to-br from-foreground to-foreground/90 text-background p-6 rounded-xl shadow-lg">
          <ul className="grid grid-cols-2 gap-6">
            {books.slice(0, 6).map((book, index) => (
              <li
                key={index}
                className="flex flex-col items-center transition-all duration-300 hover:scale-105 group">
                <div
                  className="relative w-20 h-20 bg-primary/10 rounded-full 
                  flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors 
                  border-2 border-primary/20 shadow-inner">
                  <span className="font-bold text-2xl text-background">{index + 1}</span>
                  {index < 3 && (
                    <span
                      className="absolute -top-2 -right-2 w-7 h-7 bg-primary text-background text-xs font-bold 
                      rounded-full flex items-center justify-center shadow-md animate-pulse">
                      {["1st", "2nd", "3rd"][index]}
                    </span>
                  )}
                </div>
                <div className="text-center mt-2 w-full">
                  <h3 className="font-semibold text-lg truncate max-w-full px-2">{book.title}</h3>
                  <p className="text-sm text-background/80 truncate max-w-full px-2">
                    {book.author}
                  </p>
                  <div className="mt-2 bg-background/10 rounded-full px-3 py-1 text-xs font-medium inline-flex items-center">
                    {book.downloads} downloads
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-foreground text-background p-8 rounded-xl shadow-md text-center h-full flex flex-col items-center justify-center min-h-[300px]">
          <BookOpen className="h-12 w-12 text-background/40 mb-4" />
          <p className="text-lg text-background/70">No popular books available yet</p>
          <p className="text-sm text-background/50 mt-2">Check back soon for trending titles</p>
        </div>
      )}
    </div>
  );
}

function TrendingAuthors({ authors }: { authors: Author[] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <User className="h-5 w-5 text-primary" />
        <h3 className="text-2xl font-bold">Popular Authors</h3>
      </div>

      {authors.length > 0 ? (
        <div className="bg-gradient-to-br from-foreground to-foreground/90 text-background p-6 rounded-xl shadow-lg">
          <ul className="grid grid-cols-2 gap-6">
            {authors.slice(0, 6).map((author, index) => (
              <li
                key={index}
                className="flex flex-col items-center transition-all duration-300 hover:scale-105 group">
                <div
                  className="relative w-20 h-20 bg-primary/10 rounded-full 
                  flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors 
                  border-2 border-primary/20 shadow-inner">
                  <span className="font-bold text-2xl text-background">{index + 1}</span>
                  {index < 3 && (
                    <span
                      className="absolute -top-2 -right-2 w-7 h-7 bg-primary text-background text-xs font-bold 
                      rounded-full flex items-center justify-center shadow-md animate-pulse">
                      {["1st", "2nd", "3rd"][index]}
                    </span>
                  )}
                </div>
                <div className="text-center mt-2 w-full">
                  <h3 className="font-semibold text-lg truncate max-w-full px-2">
                    {author.author}
                  </h3>
                  <p className="text-sm text-background/80 truncate max-w-full px-2">
                    {author.bookCount} {author.bookCount === 1 ? "book" : "books"}
                  </p>
                  <div className="mt-2 bg-background/10 rounded-full px-3 py-1 text-xs font-medium inline-flex items-center">
                    {author.downloads} downloads
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-foreground text-background p-8 rounded-xl shadow-md text-center h-full flex flex-col items-center justify-center min-h-[300px]">
          <User className="h-12 w-12 text-background/40 mb-4" />
          <p className="text-lg text-background/70">No popular authors available yet</p>
          <p className="text-sm text-background/50 mt-2">Check back soon for trending authors</p>
        </div>
      )}
    </div>
  );
}
