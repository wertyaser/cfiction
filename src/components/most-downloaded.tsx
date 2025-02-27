import { topBooks } from "@/lib/top-books";

export default function MostDownloaded() {
  return (
    <div className="min-h-[50vh] mt-10">
      <h2 className="text-bold text-7xl text-center pb-6">Most Downloaded</h2>
      <div className="bg-primary text-white p-4">
        <ul className="flex flex-wrap justify-center space-x-4 animate-marquee">
          {topBooks.map((book) => (
            <li key={book.id} className="p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p>{book.downloads} downloads</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
