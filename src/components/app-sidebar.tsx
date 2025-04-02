"use client";

import { useState } from "react";
import { Files, LogOut, Search, LibraryBig } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import ThemeSwitch from "./ui/theme-switch";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { DownloadedBook, SearchHistoryItem } from "@/types/next-auth";
import { useToast } from "@/hooks/use-toast";

const items = [
  {
    title: "Downloads",
    icon: Files,
    content: "Here you can view and manage your downloads.",
  },
  {
    title: "Search History",
    icon: Search,
    content: "Your recent searches will be displayed here.",
  },
  {
    title: "Sources Description",
    icon: LibraryBig,
    content: "Here you can find the details about the sources of your books.",
  },
];

const sources = [
  {
    name: "Project Gutenberg",
    description:
      "Project Gutenberg provides a direct link to the EPUB file and grants access to the title, author, and cover image.",
  },
  {
    name: "Open Library",
    description:
      "Open Library offers a website link where users can read books online, though login is required. It also provides links to purchase the original copy, but not all results include a direct download link. Users can still access the title, author, and cover image.",
  },
  {
    name: "Internet Archive",
    description:
      "Internet Archive provides a direct link to EPUB or PDF files, though some ebooks may not have a direct download link. In such cases, it redirects users to a details page where they can manually download the file. It also grants access to the title, author, and cover image.",
  },
];

export default function AppSidebar() {
  const { toast } = useToast();
  const [openSheet, setOpenSheet] = useState<string | null>(null);

  // State for downloaded books and search history
  const [downloadedBooks, setDownloadedBooks] = useState<DownloadedBook[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState({
    downloads: false,
    history: false,
  });

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const handleSheetOpen = async (title: string) => {
    setOpenSheet(title);

    // Fetch data when opening specific sheets
    if (title === "Downloads") {
      await fetchDownloadedBooks();
    } else if (title === "Search History") {
      await fetchSearchHistory();
    }
  };

  const handleSheetClose = () => {
    setOpenSheet(null);
  };

  // Fetch downloaded books
  const fetchDownloadedBooks = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, downloads: true }));
      const response = await fetch("/api/books/download");
      if (response.ok) {
        const data = await response.json();
        setDownloadedBooks(data);
      } else {
        console.error("Failed to fetch downloaded books");
        toast({
          title: "Error",
          description: "Failed to fetch downloaded books",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching downloaded books:", error);
      toast({
        title: "Error",
        description: "Error fetching downloaded books",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, downloads: false }));
    }
  };

  // Fetch search history
  const fetchSearchHistory = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, history: true }));
      const response = await fetch("/api/books/history");
      if (response.ok) {
        const data = await response.json();
        setSearchHistory(data);
      } else {
        console.error("Failed to fetch search history");
        toast({
          title: "Error",
          description: "Failed to fetch search history",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching search history:", error);
      toast({
        title: "Error",
        description: "Error fetching search history",
        variant: "destructive",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, history: false }));
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Theme</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <div className="flex items-center px-2 py-1.5 justify-between">
                <h1>Select theme: </h1>
                <ThemeSwitch />
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
          <Separator className="my-3" />
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Sheet
                  key={item.title}
                  open={openSheet === item.title}
                  onOpenChange={(open) => {
                    if (open) {
                      handleSheetOpen(item.title);
                    } else {
                      handleSheetClose();
                    }
                  }}>
                  <SheetTrigger asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <button className="flex w-full items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>{item.title}</SheetTitle>
                      <SheetDescription>
                        <p>{item.content}</p>
                        {item.title === "Downloads" && (
                          <>
                            {isLoading.downloads ? (
                              <div className="flex justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                              </div>
                            ) : downloadedBooks.length > 0 ? (
                              <ul className="mt-4 space-y-2">
                                {downloadedBooks.map((book) => (
                                  <a
                                    key={book.bookid}
                                    href={book.downloadurl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-accent/50 transition">
                                    <Files className="w-5 h-5 text-primary" />
                                    <span>{book.title}</span>
                                  </a>
                                ))}
                              </ul>
                            ) : (
                              <div className="text-center py-8 text-muted-foreground">
                                No downloaded books yet.
                              </div>
                            )}
                          </>
                        )}

                        {item.title === "Search History" && (
                          <>
                            {isLoading.history ? (
                              <div className="flex justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                              </div>
                            ) : searchHistory.length > 0 ? (
                              <ul className="mt-4 space-y-2">
                                {searchHistory.map((item, index) => (
                                  <li key={index} className="p-2 border rounded-lg">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Search className="w-4 h-4 text-muted-foreground" />
                                        <span>{item.query}</span>
                                      </div>
                                      <span className="text-xs text-muted-foreground">
                                        {new Date(item.created_at).toLocaleString()}
                                      </span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className="text-center py-8 text-muted-foreground">
                                No search history yet.
                              </div>
                            )}
                          </>
                        )}

                        {item.title === "Sources Description" &&
                          sources.map((source) => (
                            <div key={source.name} className="mt-4 space-y-2">
                              <h1 className="text-xl text-foreground">{source.name}</h1>
                              <p>{source.description}</p>
                            </div>
                          ))}
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="p-4 mb-12">
        <Button onClick={handleLogout} className="w-full flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </Sidebar>
  );
}
