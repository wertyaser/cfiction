// export default function EbookFinder() {
//   // const [messages, setMessages] = useState<{ role: string; content: string }[]>(
//   //   []
//   // );
//   // const [inputValue, setInputValue] = useState("");
//   // const [loading, setLoading] = useState(false);

//   return (
//     <div className="flex justify-center items-center mt-5 border border-foreground rounded-lg">
//       <Card className=" h-[90vh] w-full max-w-5xl md:w-[1000px] sm:w-[900px] shadow-xl bg-background">
//         <CardContent className="p-6 h-full flex flex-col">
//           {/* Scrollable message list */}
//           <div className="flex-1 overflow-y-auto">
//             {/* <ChatMessageList>
//               <ChatBubble>
//                 <ChatBubbleAvatar />
//                 <ChatBubbleMessage></ChatBubbleMessage>
//               </ChatBubble>

//               <ChatBubble variant="received">
//                 <ChatBubbleAvatar fallback="AI" />
//                 <ChatBubbleMessage isLoading />
//               </ChatBubble>
//             </ChatMessageList> */}
//           </div>

//           <Separator className="my-2" />

//           {/* Chat Input */}
//           <div className="flex items-center">
//             <ChatInput
//               placeholder="Type your message here!"
//               className="flex-grow rounded-r-none min-h-12 resize-none bg-background border-0 p-4 shadow-none focus-visible:ring-0"
//             />

//             <Button className="ml-auto gap-1.5 h-full">
//               Send
//               <SendHorizontal className="h-5 w-5" />
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { fetchBooks, Book } from "../lib/fetch-ebooks";

export default function EbookFinder() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!query) {
      setResults([]);
      return;
    }
    setLoading(true);
    const books = await fetchBooks(query);
    setResults(books);
    setLoading(false);
  };

  // useEffect(() => {
  //   if (!query) {
  //     setResults([]);
  //     return;
  //   }

  //   setLoading(true);
  //   const handler = setTimeout(async () => {
  //     const books = await fetchBooks(query);
  //     setResults(books);
  //     setLoading(false);
  //   }, 1000); // Debounce time

  //   return () => clearTimeout(handler);
  // }, [query]);

  const ensureAbsoluteUrl = (url: string | undefined): string => {
    if (!url) return "";
    if (url.startsWith("//")) return `https:${url}`;
    return url;
  };

  return (
    <div className="flex justify-center items-center mt-5 border border-foreground rounded-lg">
      <Card className="w-full max-w-5xl md:w-[1000px] sm:w-[900px] shadow-xl bg-background">
        <div className="flex flex-col p-6 text-center">
          <h1 className="text-2xl font-bold">Ebook Finder</h1>
          <span>Instructios: </span>
        </div>
        <Separator orientation="horizontal" className="bg-foreground" />
        <div className="flex gap-2 p-4">
          <input
            type="text"
            className="border p-2 w-full rounded-md"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-muted text-foreground px-4 py-2 rounded-md"
          >
            Find
          </button>
        </div>

        <div className="flex justify-center items-center">
          {loading && <p className="mt-2">Loading...</p>}
          {/* {!loading && query && results.length === 0 && (
            <h1 className="mt-4 text-xl font-bold text-center text-gray-500">
              Sorry, cannot find it
            </h1>
          )} */}
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map((match, index) => (
            <Link
              key={index}
              href={`https://openlibrary.org${match.edition?.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block border p-2 rounded-md hover:shadow-md"
            >
              {match.edition?.cover_url ? (
                <Image
                  width={200}
                  height={300}
                  src={ensureAbsoluteUrl(match.edition.cover_url)}
                  alt="Book Cover"
                  className="w-full h-auto rounded-md"
                />
              ) : (
                <p>No Image</p>
              )}
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
