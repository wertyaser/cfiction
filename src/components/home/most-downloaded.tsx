import { getPopularBooks } from "@/lib/admin";

export default async function MostDownloaded() {
  return (
    <div className="min-h-[45vh] mt-10 mb-16">
      <h2 className="text-bold text-7xl text-center pb-6">Most Downloaded</h2>
      <TopBooks />
    </div>
  );
}

async function TopBooks() {
  const topBooks = await getPopularBooks();
  return topBooks.length > 0 ? (
    <div className="bg-foreground text-background p-4 sm:p-6 md:p-8 shadow-md">
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
        {topBooks.map((book, index) => (
          <li
            key={index}
            className="flex flex-col items-center transition-all duration-300 hover:transform hover:scale-105 group">
            <div
              className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-primary/10 rounded-full 
                            flex items-center justify-center mb-3 group-hover:bg-muted-foreground transition-colors border">
              <span className="font-bold text-xl sm:text-2xl md:text-3xl text-background">
                {index + 1}
              </span>
              {index < 3 && (
                <span
                  className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-background text-xs font-bold 
                                rounded-full flex items-center justify-center">
                  {["1st", "2nd", "3rd"][index]}
                </span>
              )}
            </div>
            <div className="text-center mt-2 w-full">
              <h3 className="font-semibold text-base sm:text-lg truncate max-w-full px-2">
                {book.title}
              </h3>
              <p className="text-sm text-background/70 truncate max-w-full px-2">{book.author}</p>
              <p className="text-sm text-background/70 truncate max-w-full px-2">
                {book.downloads} downloads
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="bg-foreground text-background p-8 rounded-lg shadow-md text-center">
      <p className="text-lg text-background/70">No popular books available</p>
    </div>
  );
}
